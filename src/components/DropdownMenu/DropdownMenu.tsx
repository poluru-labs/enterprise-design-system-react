import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import { MenuItem, type MenuItemProps } from '../MenuItem/MenuItem.js';
import styles from './DropdownMenu.module.css';

export type DropdownMenuPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface DropdownMenuProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: ReactNode;
  placement?: DropdownMenuPlacement;
  children?: ReactNode;
  onSelect?: (detail: { value: string; label: string }) => void;
}

const placementClass: Record<DropdownMenuPlacement, string> = {
  top: styles.placementTop,
  bottom: styles.placementBottom,
  left: styles.placementLeft,
  right: styles.placementRight,
};

function isMenuItemElement(child: ReactNode): child is ReactElement<MenuItemProps> {
  return isValidElement(child) && child.type === MenuItem;
}

export function DropdownMenu({
  open,
  onOpenChange,
  trigger,
  placement = 'bottom',
  children,
  onSelect,
}: DropdownMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const close = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  const toggle = useCallback(() => {
    onOpenChange?.(!open);
  }, [onOpenChange, open]);

  const menuChildren = Children.toArray(children).filter(isMenuItemElement);
  const enabledCount = menuChildren.filter((child) => !child.props.disabled).length;

  useEffect(() => {
    if (open) {
      setActiveIndex(enabledCount > 0 ? 0 : -1);
      queueMicrotask(() => itemRefs.current[0]?.focus());
    } else {
      setActiveIndex(-1);
    }
  }, [open, enabledCount]);

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
        return;
      }

      if (!enabledCount) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => {
          const next = prev < enabledCount - 1 ? prev + 1 : 0;
          itemRefs.current[next]?.focus();
          return next;
        });
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => {
          const next = prev > 0 ? prev - 1 : enabledCount - 1;
          itemRefs.current[next]?.focus();
          return next;
        });
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close, enabledCount]);

  const handleSelect = (detail: { value: string; label: string }) => {
    onSelect?.(detail);
    close();
  };

  let enabledIndex = -1;
  const renderedItems = menuChildren.map((child, index) => {
    const disabled = Boolean(child.props.disabled);
    if (!disabled) enabledIndex += 1;
    const itemEnabledIndex = disabled ? -1 : enabledIndex;
    const refIndex = itemEnabledIndex;

    return cloneElement(child as ReactElement<MenuItemProps & { ref?: (node: HTMLButtonElement | null) => void }>, {
      key: child.key ?? index,
      active: open && itemEnabledIndex === activeIndex,
      ref: (node: HTMLButtonElement | null) => {
        if (refIndex >= 0) itemRefs.current[refIndex] = node;
      },
      onSelect: (detail: { value: string; label: string }) => {
        child.props.onSelect?.(detail);
        handleSelect(detail);
      },
    });
  });

  const triggerElement = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': menuId,
        onClick: (event: React.MouseEvent) => {
          const existing = (trigger as ReactElement<{ onClick?: (e: React.MouseEvent) => void }>).props
            .onClick;
          existing?.(event);
          event.stopPropagation();
          toggle();
        },
      })
    : (
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={toggle}
        >
          {trigger}
        </button>
      );

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.trigger}>{triggerElement}</div>
      <div
        id={menuId}
        className={cx(
          styles.menu,
          placementClass[placement],
          open && styles.menuOpen,
        )}
        role="menu"
        hidden={!open}
      >
        {renderedItems}
      </div>
    </div>
  );
}

export { DropdownMenu as EdsDropdownMenu };
