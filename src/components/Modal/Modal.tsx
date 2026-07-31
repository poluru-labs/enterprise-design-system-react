import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx.js';
import { useBodyScrollLock } from '../_hooks/useBodyScrollLock.js';
import { getFocusable, useFocusTrap } from '../_hooks/useFocusTrap.js';
import { CloseIcon } from '../_shared/CloseIcon.js';
import styles from './Modal.module.css';

export interface ModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  heading?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children?: ReactNode;
  footer?: ReactNode;
}

export function Modal({
  open,
  onOpenChange,
  heading = 'Dialog',
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
  footer,
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useBodyScrollLock(open);
  useFocusTrap(dialogRef, open);

  const close = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    queueMicrotask(() => {
      const container = dialogRef.current;
      if (!container) return;
      const focusable = getFocusable(container);
      (focusable[0] ?? container).focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, closeOnEscape, close]);

  if (!open) return null;

  return createPortal(
    // Backdrop dismiss is mouse/pointer only; Escape is handled in the keydown effect.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- overlay backdrop
    <div
      className={cx(styles.backdrop, styles.backdropOpen)}
      onClick={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className={styles.header}>
          <h2 className={styles.title} id={titleId}>
            {heading}
          </h2>
          <button
            className={styles.close}
            type="button"
            aria-label="Close dialog"
            onClick={close}
          >
            <CloseIcon />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

export { Modal as EdsModal };
