import { cx } from '../../utils/cx.js';
import styles from './Divider.module.css';

export type EdsDividerSpacing = 'sm' | 'md' | 'lg';
export type DividerProps = { orientation?: 'horizontal' | 'vertical'; label?: string; spacing?: EdsDividerSpacing; className?: string };

const hSpacing = { sm: styles.spacingSmH, md: styles.spacingMdH, lg: styles.spacingLgH } as const;
const vSpacing = { sm: styles.spacingSmV, md: styles.spacingMdV, lg: styles.spacingLgV } as const;

export function Divider({ orientation = 'horizontal', label, spacing = 'md', className }: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={cx(styles.vertical, vSpacing[spacing], className)} role="separator" aria-orientation="vertical" />;
  }
  if (label) {
    return (
      <div className={cx(styles.horizontal, hSpacing[spacing], className)} role="separator" aria-orientation="horizontal">
        <span className={styles.label}>{label}</span>
      </div>
    );
  }
  return <hr className={cx(styles.line, hSpacing[spacing], className)} aria-orientation="horizontal" />;
}
export type EdsDivider = typeof Divider;
export const EdsDivider = Divider;
