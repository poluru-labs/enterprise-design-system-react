import { forwardRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './MenuItem.module.css';

export interface MenuItemProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  danger?: boolean;
  active?: boolean;
  children?: ReactNode;
  onSelect?: (detail: { value: string; label: string }) => void;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  {
    label = '',
    value = '',
    disabled = false,
    danger = false,
    active = false,
    children,
    onSelect,
  },
  ref,
) {
  const resolvedLabel =
    typeof children === 'string' ? children : label || String(children ?? '');

  return (
    <button
      ref={ref}
      className={cx(styles.item, danger && styles.danger, active && styles.active)}
      type="button"
      role="menuitem"
      disabled={disabled}
      tabIndex={active ? 0 : -1}
      onClick={() => {
        if (disabled) return;
        onSelect?.({ value: value || resolvedLabel, label: resolvedLabel });
      }}
    >
      {children ?? label}
    </button>
  );
});

export { MenuItem as EdsMenuItem };
