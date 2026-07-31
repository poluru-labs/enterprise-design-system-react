import { type CSSProperties, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './DescriptionList.module.css';

export type DescriptionListItem = { term: string; description: string };

export type DescriptionListProps = {
  items?: DescriptionListItem[];
  columns?: 1 | 2 | 3;
  compact?: boolean;
  children?: ReactNode;
  className?: string;
};

export function DescriptionList({
  items,
  columns = 1,
  compact = false,
  children,
  className,
}: DescriptionListProps) {
  const style = { '--eds-dl-columns': String(columns) } as CSSProperties;

  if (items?.length) {
    return (
      <dl
        className={cx(styles.root, compact && styles.compact, className)}
        style={style}
      >
        {items.flatMap((item) => [
          <dt key={`${item.term}-term`} className={styles.term}>
            {item.term}
          </dt>,
          <dd key={`${item.term}-desc`} className={styles.description}>
            {item.description}
          </dd>,
        ])}
      </dl>
    );
  }

  return (
    <dl
      className={cx(styles.root, styles.slotted, compact && styles.compact, className)}
      style={style}
    >
      {children}
    </dl>
  );
}

export type EdsDescriptionList = typeof DescriptionList;
export const EdsDescriptionList = DescriptionList;
