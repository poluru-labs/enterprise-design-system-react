import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import {
  compareISODates,
  formatDisplayDate,
  parseISODate,
  toISODate,
} from '../../utils/date-utils.js';
import { cx } from '../../utils/cx.js';
import fieldStyles from '../../styles/fields.module.css';
import { CalendarPopover } from '../_shared/CalendarPopover.js';
import styles from './DateRangePicker.module.css';

export type DateRangePickerProps = {
  label?: string;
  startValue?: string;
  endValue?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  onChange?: (start: string, end: string) => void;
  className?: string;
};

function canNavigateToMonth(year: number, month: number, min?: string, max?: string): boolean {
  const first = toISODate(new Date(year, month, 1));
  const last = toISODate(new Date(year, month + 1, 0));
  if (min && compareISODates(last, min) < 0) return false;
  if (max && compareISODates(first, max) > 0) return false;
  return true;
}

function formatRangeDisplay(start: string, end: string): string {
  if (start && end) return `${formatDisplayDate(start)} – ${formatDisplayDate(end)}`;
  if (start) return `${formatDisplayDate(start)} –`;
  return '';
}

export function DateRangePicker({
  label,
  startValue = '',
  endValue = '',
  min,
  max,
  disabled = false,
  onChange,
  className,
}: DateRangePickerProps) {
  const fieldId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [pendingStart, setPendingStart] = useState('');
  const [hoverEnd, setHoverEnd] = useState('');

  const syncView = useCallback((iso: string) => {
    const parsed = parseISODate(iso);
    if (parsed) {
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
    }
  }, []);

  useEffect(() => {
    if (startValue) syncView(startValue);
    else if (endValue) syncView(endValue);
  }, [startValue, endValue, syncView]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        inputRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const openPopover = () => {
    if (disabled) return;
    setSelectingEnd(false);
    setPendingStart('');
    setHoverEnd('');
    if (startValue) syncView(startValue);
    setOpen(true);
  };

  const selectDate = (iso: string) => {
    if (!selectingEnd && !pendingStart) {
      setPendingStart(iso);
      setSelectingEnd(true);
      return;
    }

    const start = pendingStart || startValue;
    let end = iso;
    let finalStart = start;
    if (compareISODates(start, end) > 0) {
      finalStart = end;
      end = start;
    }

    onChange?.(finalStart, end);
    setOpen(false);
    setSelectingEnd(false);
    setPendingStart('');
    setHoverEnd('');
    inputRef.current?.focus();
  };

  const displayStart = pendingStart || startValue;
  const displayEnd = endValue;
  const displayValue = formatRangeDisplay(displayStart, displayEnd);

  return (
    <div ref={rootRef} className={cx(fieldStyles.field, styles.root, className)}>
      {label ? (
        <label className={fieldStyles.label} htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      <div
        className={cx(
          fieldStyles.control,
          styles.trigger,
          disabled && styles.triggerDisabled,
          disabled && fieldStyles.controlDisabled,
        )}
        aria-disabled={disabled ? 'true' : 'false'}
      >
        <input
          ref={inputRef}
          className={styles.input}
          id={fieldId}
          type="text"
          role="combobox"
          value={displayValue}
          placeholder="Select date range"
          readOnly
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={`${fieldId}-calendar`}
          onClick={openPopover}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openPopover();
            }
          }}
        />
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Open calendar"
          aria-expanded={open}
          aria-controls={`${fieldId}-calendar`}
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            if (open) setOpen(false);
            else openPopover();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4.5 2.5V4M11.5 2.5V4M3 6.5H13M4 3.5H12C12.5523 3.5 13 3.94772 13 4.5V12.5C13 13.0523 12.5523 13.5 12 13.5H4C3.44772 13.5 3 13.0523 3 12.5V4.5C3 3.94772 3.44772 3.5 4 3.5Z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {open ? (
        <div id={`${fieldId}-calendar`}>
          <CalendarPopover
            viewYear={viewYear}
            viewMonth={viewMonth}
            min={min}
            max={max}
            startValue={displayStart}
            endValue={displayEnd}
            hoverEnd={selectingEnd ? hoverEnd : undefined}
            onPrevMonth={() => {
              const date = new Date(viewYear, viewMonth - 1, 1);
              if (!canNavigateToMonth(date.getFullYear(), date.getMonth(), min, max)) return;
              setViewYear(date.getFullYear());
              setViewMonth(date.getMonth());
            }}
            onNextMonth={() => {
              const date = new Date(viewYear, viewMonth + 1, 1);
              if (!canNavigateToMonth(date.getFullYear(), date.getMonth(), min, max)) return;
              setViewYear(date.getFullYear());
              setViewMonth(date.getMonth());
            }}
            onSelect={selectDate}
            onDayHover={selectingEnd ? setHoverEnd : undefined}
            ariaLabel="Choose date range"
          />
        </div>
      ) : null}
    </div>
  );
}

export type EdsDateRangePicker = typeof DateRangePicker;
export const EdsDateRangePicker = DateRangePicker;
