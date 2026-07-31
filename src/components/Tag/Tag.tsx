import type { ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import { CloseIcon } from '../_shared/CloseIcon.js';
import styles from './Tag.module.css';

export type TagVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

export interface TagProps {
  label?: string;
  variant?: TagVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
}

export function Tag({
  label = '',
  variant = 'neutral',
  dismissible = false,
  onDismiss,
  children,
}: TagProps) {
  return (
    <span className={cx(styles.tag, styles[variant])}>
      <span className={styles.label}>{label || children}</span>
      {dismissible ? (
        <button
          className={styles.dismiss}
          type="button"
          aria-label="Remove tag"
          onClick={(event) => {
            event.stopPropagation();
            onDismiss?.();
          }}
        >
          <CloseIcon size={12} />
        </button>
      ) : null}
    </span>
  );
}

export { Tag as EdsTag };
