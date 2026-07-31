import { useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.js';
import { MenuItem } from '../MenuItem/MenuItem.js';
import styles from './SplitButton.module.css';

export type SplitButtonVariant = 'primary' | 'secondary' | 'danger';
export type SplitButtonSize = 'sm' | 'md';

export interface SplitButtonProps {
  label?: string;
  variant?: SplitButtonVariant;
  size?: SplitButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  onSelect?: (detail: { value: string; label: string }) => void;
  children?: ReactNode;
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SplitButton({
  label = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  onSelect,
  children,
}: SplitButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const variantClass = `${variant}Variant`;

  return (
    <div
      className={cx(styles.split, styles[size], styles[variantClass], disabled && styles.disabled)}
      role="group"
      aria-label={label || 'Split button'}
    >
      <button
        className={styles.primary}
        type="button"
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
      <div className={styles.menu}>
        <DropdownMenu
          open={menuOpen}
          onOpenChange={setMenuOpen}
          onSelect={onSelect}
          trigger={
            <button
              className={styles.menuTrigger}
              type="button"
              disabled={disabled}
              aria-label="More options"
            >
              <span className={styles.chevron}>
                <ChevronDownIcon />
              </span>
            </button>
          }
        >
          {children}
        </DropdownMenu>
      </div>
    </div>
  );
}

export { SplitButton as EdsSplitButton, MenuItem };
