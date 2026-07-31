import { type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './VisuallyHidden.module.css';
export type VisuallyHiddenProps = { children?: ReactNode; className?: string };
export function VisuallyHidden({ children, className }: VisuallyHiddenProps) {
  return <span className={styles.root}><span className={cx(styles.hidden, className)}>{children}</span></span>;
}
export type EdsVisuallyHidden = typeof VisuallyHidden;
export const EdsVisuallyHidden = VisuallyHidden;
