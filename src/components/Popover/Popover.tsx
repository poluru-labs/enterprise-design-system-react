import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Popover.module.css';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: ReactNode;
  heading?: string;
  placement?: PopoverPlacement;
  children?: ReactNode;
}

const placementClass: Record<PopoverPlacement, string> = {
  top: styles.placementTop,
  bottom: styles.placementBottom,
  left: styles.placementLeft,
  right: styles.placementRight,
};

export function Popover({
  open,
  onOpenChange,
  trigger,
  heading = '',
  placement = 'bottom',
  children,
}: PopoverProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const headingId = `${panelId}-heading`;

  const close = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  const toggle = useCallback(() => {
    onOpenChange?.(!open);
  }, [onOpenChange, open]);

  useEffect(() => {
    if (!open) return;

    const onMouseDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  const triggerElement = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
        'aria-expanded': open,
        'aria-controls': panelId,
        onClick: (event: React.MouseEvent) => {
          const existing = (trigger as ReactElement<{ onClick?: (e: React.MouseEvent) => void }>).props
            .onClick;
          existing?.(event);
          event.stopPropagation();
          toggle();
        },
      })
    : (
        <button type="button" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
          {trigger}
        </button>
      );

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.trigger}>{triggerElement}</div>
      {open ? (
        <div
          id={panelId}
          className={cx(styles.panel, placementClass[placement], styles.panelOpen)}
          role="dialog"
          aria-labelledby={heading ? headingId : undefined}
        >
          {heading ? (
            <h3 className={styles.heading} id={headingId}>
              {heading}
            </h3>
          ) : null}
          <div className={styles.body}>{children}</div>
        </div>
      ) : null}
    </div>
  );
}

export { Popover as EdsPopover };
