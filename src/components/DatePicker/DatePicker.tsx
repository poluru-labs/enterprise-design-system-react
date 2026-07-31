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
import styles from './DatePicker.module.css';

export type DatePickerProps = {
  label?: string;
  value?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  placeholder?: string;
  invalid?: boolean;
  errorMessage?: string;
  hint?: string;
  onChange?: (value: string) => void;
  className?: string;
};

function canNavigateToMonth(year: number, month: number, min?: string, max?: string): boolean {
  const first = toISODate(new Date(year, month, 1));
  const last = toISODate(new Date(year, month + 1, 0));
  if (min && compareISODates(last, min) < 0) return false;
  if (max && compareISODates(first, max) > 0) return false;
  return true;
}

export function DatePicker({
  label,
  value = '',
  min,
  max,
  disabled = false,
  placeholder = 'Select date',
  invalid = false,
  errorMessage,
  hint,
  onChange,
  className,
}: DatePickerProps) {
  const fieldId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());

  const syncViewToValue = useCallback(() => {
    const parsed = parseISODate(value);
    if (parsed) {
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
      return;
    }
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }, [value]);

  useEffect(() => {
    const parsed = parseISODate(value);
    if (parsed) {
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
    }
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        inputRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
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
    syncViewToValue();
    setOpen(true);
  };

  const goToPreviousMonth = () => {
    const date = new Date(viewYear, viewMonth - 1, 1);
    if (!canNavigateToMonth(date.getFullYear(), date.getMonth(), min, max)) return;
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  };

  const goToNextMonth = () => {
    const date = new Date(viewYear, viewMonth + 1, 1);
    if (!canNavigateToMonth(date.getFullYear(), date.getMonth(), min, max)) return;
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  };

  const selectDate = (iso: string) => {
    onChange?.(iso);
    setOpen(false);
    inputRef.current?.focus();
  };

  const displayValue = value ? formatDisplayDate(value) : '';
  const describedBy =
    invalid && errorMessage ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;

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
          invalid && fieldStyles.controlInvalid,
          disabled && fieldStyles.controlDisabled,
        )}
        data-invalid={invalid ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
      >
        <input
          ref={inputRef}
          className={styles.input}
          id={fieldId}
          type="text"
          role="combobox"
          value={displayValue}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={`${fieldId}-calendar`}
          aria-describedby={describedBy}
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
            inputRef.current?.focus();
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
            selected={value}
            onPrevMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
            onSelect={selectDate}
          />
        </div>
      ) : null}
      {invalid && errorMessage ? (
        <div className={fieldStyles.error} id={`${fieldId}-error`} role="alert">
          {errorMessage}
        </div>
      ) : null}
      {hint ? (
        <div className={fieldStyles.hint} id={`${fieldId}-hint`}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}

export type EdsDatePicker = typeof DatePicker;
export const EdsDatePicker = DatePicker;
