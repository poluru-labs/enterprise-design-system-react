import { cx } from '../../utils/cx.js';
import styles from './Status.module.css';

export type EdsStatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export type StatusProps = {
  label?: string;
  variant?: EdsStatusVariant;
  pulse?: boolean;
  className?: string;
};

export function Status({ label = '', variant = 'neutral', pulse = false, className }: StatusProps) {
  return (
    <span className={cx(styles.root, styles[variant], pulse && styles.pulse, className)} role="status">
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}

export type EdsStatus = typeof Status;
export const EdsStatus = Status;
