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
import { CloseIcon } from '../_shared/CloseIcon.js';
import styles from './Drawer.module.css';

export type DrawerSide = 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg';

export interface DrawerProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  heading?: string;
  side?: DrawerSide;
  size?: DrawerSize;
  children?: ReactNode;
  footer?: ReactNode;
}

export function Drawer({
  open,
  onOpenChange,
  heading = 'Panel',
  side = 'right',
  size = 'md',
  children,
  footer,
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useBodyScrollLock(open);

  const close = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    queueMicrotask(() => panelRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, close]);

  if (!open) return null;

  return createPortal(
    // Backdrop dismiss is mouse/pointer only; Escape is handled in the keydown effect.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- overlay backdrop
    <div
      className={cx(styles.backdrop, styles.backdropOpen)}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- stop backdrop close */}
      <aside
        ref={panelRef}
        className={cx(
          styles.panel,
          side === 'right' ? styles.sideRight : styles.sideLeft,
          styles[size],
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title} id={titleId}>
            {heading}
          </h2>
          <button
            className={styles.close}
            type="button"
            aria-label="Close panel"
            onClick={close}
          >
            <CloseIcon />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </aside>
    </div>,
    document.body,
  );
}

export { Drawer as EdsDrawer };
