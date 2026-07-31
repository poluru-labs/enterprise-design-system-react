import type { ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Badge.module.css';

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
  soft?: boolean;
  children?: ReactNode;
}

export function Badge({
  label = '',
  variant = 'neutral',
  size = 'md',
  pill = false,
  soft = true,
  children,
}: BadgeProps) {
  return (
    <span
      className={cx(
        styles.badge,
        styles[variant],
        styles[size],
        pill ? styles.pill : styles.rounded,
        soft ? styles.soft : styles.solid,
      )}
    >
      {label || children}
    </span>
  );
}

export { Badge as EdsBadge };
