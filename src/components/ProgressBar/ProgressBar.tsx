import { cx } from '../../utils/cx.js';
import styles from './ProgressBar.module.css';

export type ProgressBarProps = {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  label?: string;
  showValue?: boolean;
  className?: string;
};

export function ProgressBar({
  value = 0,
  max = 100,
  indeterminate = false,
  label,
  showValue = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const pct = max > 0 ? Math.round((clamped / max) * 100) : 0;

  return (
    <div className={cx(styles.root, className)}>
      {(label || showValue) && !indeterminate ? (
        <div className={styles.header}>
          {label ? <span>{label}</span> : <span />}
          {showValue ? <span>{pct}%</span> : null}
        </div>
      ) : null}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : max}
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-valuetext={indeterminate ? 'Loading' : undefined}
        aria-label={label || 'Progress'}
      >
        <div
          className={cx(styles.fill, indeterminate && styles.indeterminate)}
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export type EdsProgressBar = typeof ProgressBar;
export const EdsProgressBar = ProgressBar;
