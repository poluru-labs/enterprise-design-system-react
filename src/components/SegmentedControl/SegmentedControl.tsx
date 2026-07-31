import type { EdsIconName } from '../../icons/names.js';
import { Icon } from '../Icon/Icon.js';
import { cx } from '../../utils/cx.js';
import styles from './SegmentedControl.module.css';

export type SegmentedControlOption = { label: string; value: string; icon?: EdsIconName | ''; disabled?: boolean };
export type EdsSegmentedControlSize = 'sm' | 'md';

export type SegmentedControlProps = {
  options?: SegmentedControlOption[]; value?: string; size?: EdsSegmentedControlSize;
  fullWidth?: boolean; onChange?: (value: string) => void; className?: string;
};

export function SegmentedControl({ options = [], value = '', size = 'md', fullWidth = false, onChange, className }: SegmentedControlProps) {
  return (
    <div className={cx(styles.root, size === 'sm' && styles.sm, fullWidth && styles.fullWidth, className)} role="group">
      {options.map((option) => (
        <button key={option.value} type="button"
          className={cx(styles.segment, value === option.value && styles.selected)}
          aria-pressed={value === option.value} disabled={option.disabled}
          onClick={() => { if (!option.disabled && value !== option.value) onChange?.(option.value); }}>
          <span className={styles.inner}>
            {option.icon ? <Icon name={option.icon} size={size === 'sm' ? 'sm' : 'md'} decorative /> : null}
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
export type EdsSegmentedControl = typeof SegmentedControl; export const EdsSegmentedControl = SegmentedControl;
