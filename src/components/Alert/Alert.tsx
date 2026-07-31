import { useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import { CloseIcon } from '../_shared/CloseIcon.js';
import { StatusIcon } from '../_shared/StatusIcon.js';
import styles from './Alert.module.css';

export type AlertVariant = 'success' | 'info' | 'warning' | 'danger';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message?: string;
  dismissible?: boolean;
  hideIcon?: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
}

export function Alert({
  variant = 'info',
  title = '',
  message = '',
  dismissible = false,
  hideIcon = false,
  onDismiss,
  children,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className={cx(styles.alert, styles[variant])} role="alert" aria-live="polite">
      {!hideIcon ? (
        <span className={styles.icon}>
          <StatusIcon variant={variant} />
        </span>
      ) : null}
      <div className={styles.content}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {message ? (
          <p className={styles.message}>{message}</p>
        ) : (
          <div className={styles.message}>{children}</div>
        )}
      </div>
      {dismissible ? (
        <button
          className={styles.close}
          type="button"
          aria-label="Dismiss alert"
          onClick={handleDismiss}
        >
          <CloseIcon size={14} />
        </button>
      ) : null}
    </div>
  );
}

export { Alert as EdsAlert };
