import { useMemo } from 'react';
import {
  compareISODates,
  formatDisplayDate,
  formatMonthYear,
  getCalendarDays,
  getWeekdayLabels,
  isISODateInRange,
  todayISO,
  toISODate,
} from '../../utils/date-utils.js';
import { cx } from '../../utils/cx.js';
import styles from './calendar.module.css';

export type CalendarDayState = {
  iso: string;
  inMonth: boolean;
  disabled: boolean;
  selected: boolean;
  today: boolean;
  inRange?: boolean;
  rangeStart?: boolean;
  rangeEnd?: boolean;
};

export type CalendarPopoverProps = {
  viewYear: number;
  viewMonth: number;
  min?: string;
  max?: string;
  selected?: string;
  startValue?: string;
  endValue?: string;
  hoverEnd?: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelect: (iso: string) => void;
  onDayHover?: (iso: string) => void;
  ariaLabel?: string;
  className?: string;
};

function canNavigateToMonth(year: number, month: number, min?: string, max?: string): boolean {
  const first = toISODate(new Date(year, month, 1));
  const last = toISODate(new Date(year, month + 1, 0));
  if (min && compareISODates(last, min) < 0) return false;
  if (max && compareISODates(first, max) > 0) return false;
  return true;
}

function isInPreviewRange(iso: string, start?: string, end?: string): boolean {
  if (!start || !end) return false;
  const [a, b] = compareISODates(start, end) <= 0 ? [start, end] : [end, start];
  return compareISODates(iso, a) >= 0 && compareISODates(iso, b) <= 0;
}

export function CalendarPopover({
  viewYear,
  viewMonth,
  min,
  max,
  selected,
  startValue,
  endValue,
  hoverEnd,
  onPrevMonth,
  onNextMonth,
  onSelect,
  onDayHover,
  ariaLabel = 'Choose date',
  className,
}: CalendarPopoverProps) {
  const days = useMemo(() => getCalendarDays(viewYear, viewMonth), [viewYear, viewMonth]);
  const weekdays = useMemo(() => getWeekdayLabels(), []);
  const today = todayISO();

  const prevDisabled = !canNavigateToMonth(
    viewMonth === 0 ? viewYear - 1 : viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1,
    min,
    max,
  );
  const nextDisabled = !canNavigateToMonth(
    viewMonth === 11 ? viewYear + 1 : viewYear,
    viewMonth === 11 ? 0 : viewMonth + 1,
    min,
    max,
  );

  const previewEnd = hoverEnd && startValue && !endValue ? hoverEnd : endValue;

  return (
    <div className={cx(styles.popover, className)} role="dialog" aria-label={ariaLabel}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navButton}
          aria-label="Previous month"
          disabled={prevDisabled}
          onClick={onPrevMonth}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className={styles.monthLabel}>{formatMonthYear(viewYear, viewMonth)}</div>
        <button
          type="button"
          className={styles.navButton}
          aria-label="Next month"
          disabled={nextDisabled}
          onClick={onNextMonth}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.weekdays} aria-hidden="true">
        {weekdays.map((weekday, index) => (
          <span key={`${weekday}-${index}`} className={styles.weekday}>
            {weekday}
          </span>
        ))}
      </div>

      <div className={styles.days} role="grid" aria-label={formatMonthYear(viewYear, viewMonth)}>
        {days.map((cell) => {
          const disabled = !isISODateInRange(cell.iso, min, max);
          const isSelected = selected === cell.iso;
          const isStart = startValue === cell.iso;
          const isEnd = endValue === cell.iso || hoverEnd === cell.iso;
          const inRange =
            startValue && previewEnd
              ? isInPreviewRange(cell.iso, startValue, previewEnd)
              : false;

          return (
            <button
              key={cell.iso}
              type="button"
              className={cx(
                styles.day,
                !cell.inMonth && styles.outside,
                cell.iso === today && styles.today,
                isSelected && styles.selected,
                inRange && styles.inRange,
                isStart && styles.rangeStart,
                isEnd && styles.rangeEnd,
              )}
              role="gridcell"
              aria-selected={isSelected || isStart || isEnd ? true : undefined}
              aria-label={formatDisplayDate(cell.iso)}
              disabled={disabled}
              onClick={() => onSelect(cell.iso)}
              onMouseEnter={() => onDayHover?.(cell.iso)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
