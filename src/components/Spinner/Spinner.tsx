import { cx } from '../../utils/cx.js';
import styles from './Spinner.module.css';

export type EdsSpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerProps = { size?: EdsSpinnerSize; label?: string; showLabel?: boolean; className?: string };

export function Spinner({ size = 'md', label = 'Loading', showLabel = false, className }: SpinnerProps) {
  return (
    <div className={cx(styles.root, className)} role="status" aria-live="polite" aria-busy="true">
      <span className={cx(styles.ring, styles[size])} aria-hidden="true" />
      {showLabel ? <span className={styles.label}>{label}</span> : <span className={styles.srOnly}>{label}</span>}
    </div>
  );
}
export type EdsSpinner = typeof Spinner;
export const EdsSpinner = Spinner;
