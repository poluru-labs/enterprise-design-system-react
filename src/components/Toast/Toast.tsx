import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx.js';
import { CloseIcon } from '../_shared/CloseIcon.js';
import { StatusIcon } from '../_shared/StatusIcon.js';
import styles from './Toast.module.css';

export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastRecord extends Required<Pick<ToastOptions, 'title'>> {
  id: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  show: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let externalShow: ((options: ToastOptions) => string) | null = null;

export function showToast(options: ToastOptions): string {
  if (!externalShow) {
    console.warn('ToastProvider is not mounted. Wrap your app with <ToastProvider>.');
    return '';
  }
  return externalShow(options);
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setOpen(true));
  }, []);

  useEffect(() => {
    if (!open || toast.duration <= 0) return;
    const timer = setTimeout(() => {
      setOpen(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, toast.duration);
    return () => clearTimeout(timer);
  }, [open, toast.duration, toast.id, onDismiss]);

  const close = () => {
    setOpen(false);
    setTimeout(() => onDismiss(toast.id), 300);
  };

  return (
    <div
      className={cx(styles.toast, styles[toast.variant], open && styles.open)}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon}>
        <StatusIcon variant={toast.variant} size={18} />
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{toast.title}</p>
        {toast.description ? (
          <p className={styles.description}>{toast.description}</p>
        ) : null}
      </div>
      <button
        className={styles.close}
        type="button"
        aria-label="Dismiss notification"
        onClick={close}
      >
        <CloseIcon size={14} />
      </button>
    </div>
  );
}

export interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback((options: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const record: ToastRecord = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? 'info',
      duration: options.duration ?? 5000,
    };
    setToasts((prev) => [...prev, record]);
    return id;
  }, []);

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  useEffect(() => {
    externalShow = show;
    return () => {
      if (externalShow === show) externalShow = null;
    };
  }, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className={styles.host} aria-live="polite">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export interface ToastProps extends ToastOptions {
  open?: boolean;
  onClose?: () => void;
}

/** Declarative toast for Storybook and controlled usage. */
export function Toast({
  title,
  description,
  variant = 'info',
  open = true,
  onClose,
}: ToastProps) {
  if (!open) return null;

  return (
    <div
      className={cx(styles.toast, styles[variant], styles.open)}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon}>
        <StatusIcon variant={variant} size={18} />
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {onClose ? (
        <button
          className={styles.close}
          type="button"
          aria-label="Dismiss notification"
          onClick={onClose}
        >
          <CloseIcon size={14} />
        </button>
      ) : null}
    </div>
  );
}

export {
  Toast as EdsToast,
  ToastProvider as EdsToastProvider,
};
