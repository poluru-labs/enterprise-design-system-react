import { type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Kbd.module.css';
export type KbdProps = { keys?: string; children?: ReactNode; className?: string };
export function Kbd({ keys, children, className }: KbdProps) {
  return <kbd className={cx(styles.kbd, className)}>{keys ?? children}</kbd>;
}
export type EdsKbd = typeof Kbd;
export const EdsKbd = Kbd;
