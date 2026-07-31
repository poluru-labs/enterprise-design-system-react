import { cx } from '../../utils/cx.js';
import styles from './Meter.module.css';
export type MeterProps = { value?: number; min?: number; max?: number; low?: number; high?: number; optimum?: number; label?: string; showValue?: boolean; className?: string };
export function Meter({ value = 0, min = 0, max = 100, low = 25, high = 75, optimum = 0, label, showValue = false, className }: MeterProps) {
  const clamped = Math.min(Math.max(value, min), max);
  return (
    <div className={cx(styles.root, className)}>
      {(label || showValue) ? (
        <div className={styles.header}>{label ? <span>{label}</span> : <span />}{showValue ? <span>{clamped} of {max}</span> : null}</div>
      ) : null}
      <meter className={styles.meter} min={min} max={max} low={low} high={high} optimum={optimum} value={clamped} />
    </div>
  );
}
export type EdsMeter = typeof Meter;
export const EdsMeter = Meter;
