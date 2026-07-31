import { cx } from '../../utils/cx.js';
import styles from './CircularProgress.module.css';

export type CircularProgressProps = {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  indeterminate?: boolean;
  className?: string;
};

export function CircularProgress({
  value = 0,
  max = 100,
  size = 48,
  strokeWidth = 4,
  showValue = false,
  indeterminate = false,
  className,
}: CircularProgressProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const pct = max > 0 ? clamped / max : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  return (
    <div
      className={cx(styles.root, className)}
      role="progressbar"
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuetext={indeterminate ? 'Loading' : undefined}
      style={{ width: size, height: size }}
    >
      <svg
        className={cx(styles.svg, indeterminate && styles.indeterminate)}
        width={size}
        height={size}
        aria-hidden="true"
      >
        <circle className={styles.track} cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <circle
          className={styles.fill}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={indeterminate ? circumference * 0.75 : offset}
        />
      </svg>
      {showValue && !indeterminate ? (
        <span className={styles.value}>{Math.round(pct * 100)}%</span>
      ) : null}
    </div>
  );
}

export type EdsCircularProgress = typeof CircularProgress;
export const EdsCircularProgress = CircularProgress;
