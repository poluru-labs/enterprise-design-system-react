import {
  cloneElement,
  isValidElement,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string;
  placement?: TooltipPlacement;
  delay?: number;
  children: ReactNode;
}

const placementClass: Record<TooltipPlacement, string> = {
  top: styles.placementTop,
  bottom: styles.placementBottom,
  left: styles.placementLeft,
  right: styles.placementRight,
};

export function Tooltip({
  content,
  placement = 'top',
  delay = 200,
  children,
}: TooltipProps) {
  const tooltipId = useId();
  const [visible, setVisible] = useState(false);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (showTimer.current) clearTimeout(showTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    showTimer.current = null;
    hideTimer.current = null;
  };

  const show = () => {
    clearTimers();
    if (delay <= 0) {
      setVisible(true);
      return;
    }
    showTimer.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    hideTimer.current = setTimeout(() => setVisible(false), 50);
  };

  if (!content) {
    return <span className={styles.trigger}>{children}</span>;
  }

  const triggerProps = {
    'aria-describedby': visible ? tooltipId : undefined,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  };

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<typeof triggerProps>, triggerProps)
    : (
        <button type="button" className={styles.triggerButton} {...triggerProps}>
          {children}
        </button>
      );

  return (
    <span className={styles.root}>
      <span className={styles.trigger}>{trigger}</span>
      <span
        id={tooltipId}
        className={cx(styles.tooltip, placementClass[placement], visible && styles.visible)}
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
}

export { Tooltip as EdsTooltip };
