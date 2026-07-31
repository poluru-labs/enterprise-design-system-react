import { cx } from '../../utils/cx.js';
import styles from './Skeleton.module.css';

export type EdsSkeletonVariant = 'text' | 'circular' | 'rectangular';
export type SkeletonProps = { variant?: EdsSkeletonVariant; width?: string; height?: string; lines?: number; className?: string };

export function Skeleton({ variant = 'text', width, height, lines = 1, className }: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cx(styles.lines, className)} aria-hidden="true">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className={cx(styles.root, styles.text, i === lines - 1 && styles.lastLine)} style={{ width }} />
        ))}
      </div>
    );
  }
  const style = {
    width: width ?? (variant === 'circular' ? '2.5rem' : '100%'),
    height: height ?? (variant === 'circular' ? '2.5rem' : variant === 'rectangular' ? '8rem' : '1rem'),
  };
  return <div className={cx(styles.root, styles[variant], className)} style={style} aria-hidden="true" />;
}
export type EdsSkeleton = typeof Skeleton;
export const EdsSkeleton = Skeleton;
