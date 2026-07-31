import { cx } from '../../utils/cx.js';
import styles from './Timeline.module.css';

export type EdsTimelineStatus = 'complete' | 'current' | 'upcoming';

export type TimelineItem = {
  title: string;
  description?: string;
  timestamp?: string;
  status?: EdsTimelineStatus;
};

export type TimelineProps = {
  items?: TimelineItem[];
  className?: string;
};

function resolveStatus(item: TimelineItem, index: number): EdsTimelineStatus {
  if (item.status) return item.status;
  return index === 0 ? 'current' : 'upcoming';
}

export function Timeline({ items = [], className }: TimelineProps) {
  return (
    <div className={cx(styles.root, className)}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const status = resolveStatus(item, index);
          const isLast = index === items.length - 1;
          return (
            <li key={item.title + index} className={cx(styles.item, styles[status])}>
              <div className={styles.track}>
                <span className={styles.dot} aria-hidden="true" />
                {!isLast ? <span className={styles.connector} aria-hidden="true" /> : null}
              </div>
              <div className={styles.content}>
                <div className={styles.title}>{item.title}</div>
                {item.description ? (
                  <div className={styles.description}>{item.description}</div>
                ) : null}
                {item.timestamp ? (
                  <div className={styles.timestamp}>{item.timestamp}</div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export type EdsTimeline = typeof Timeline;
export const EdsTimeline = Timeline;
