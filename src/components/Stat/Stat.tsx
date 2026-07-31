import { Icon } from '../Icon/Icon.js';
import { cx } from '../../utils/cx.js';
import styles from './Stat.module.css';

export type EdsStatTrend = 'up' | 'down' | 'flat' | '';

export type StatProps = {
  value?: string | number;
  label?: string;
  hint?: string;
  trend?: EdsStatTrend;
  trendValue?: string;
  className?: string;
};

const trendIcon = { up: 'chevron-up', down: 'chevron-down', flat: 'minus' } as const;

export function Stat({
  value = '',
  label = '',
  hint = '',
  trend = '',
  trendValue = '',
  className,
}: StatProps) {
  return (
    <div className={cx(styles.root, className)}>
      {label ? <div className={styles.label}>{label}</div> : null}
      <div className={styles.valueRow}>
        <div className={styles.value}>{value}</div>
        {trend ? (
          <span className={cx(styles.trend, trend && styles[trend])}>
            <Icon name={trendIcon[trend]} size="sm" decorative />
            {trendValue}
          </span>
        ) : null}
      </div>
      {hint ? <div className={styles.hint}>{hint}</div> : null}
    </div>
  );
}

export type EdsStat = typeof Stat;
export const EdsStat = Stat;
