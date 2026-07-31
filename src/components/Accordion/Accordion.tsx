import {
  Children,
  isValidElement,
  useCallback,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Accordion.module.css';

export type AccordionItemProps = {
  heading?: string;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  onToggle?: (open: boolean) => void;
};

export function AccordionItem({
  heading = '',
  open: openProp,
  defaultOpen = false,
  disabled = false,
  children,
  className,
  onToggle,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;
  const panelId = `panel-${heading.replace(/\s+/g, '-').toLowerCase() || 'item'}`;

  const toggle = () => {
    if (disabled) return;
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  };

  return (
    <div className={cx(styles.item, className)}>
      <h3 className={styles.heading}>
        <button
          type="button"
          className={styles.trigger}
          id={`${panelId}-trigger`}
          aria-expanded={open}
          aria-controls={panelId}
          disabled={disabled}
          onClick={toggle}
        >
          <span className={styles.title}>{heading}</span>
          <svg
            className={cx(styles.icon, open && styles.iconOpen)}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>
      <div
        className={cx(styles.panel, open && styles.panelOpen)}
        id={panelId}
        role="region"
        aria-labelledby={`${panelId}-trigger`}
      >
        <div className={styles.panelInner}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export type AccordionProps = {
  single?: boolean;
  children?: ReactNode;
  className?: string;
  onChange?: (openHeadings: string[]) => void;
};

type ItemChild = ReactElement<AccordionItemProps>;

function itemKey(item: ItemChild, index: number) {
  return item.props.heading || `item-${index}`;
}

export function Accordion({ single = false, children, className, onChange }: AccordionProps) {
  const items = useMemo(
    () =>
      Children.toArray(children).filter(
        (child): child is ItemChild => isValidElement(child) && child.type === AccordionItem,
      ),
    [children],
  );

  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item, i) => [itemKey(item, i), item.props.defaultOpen ?? false])),
  );

  const notifyChange = useCallback(
    (next: Record<string, boolean>) => {
      onChange?.(
        Object.entries(next)
          .filter(([, open]) => open)
          .map(([heading]) => heading),
      );
    },
    [onChange],
  );

  const handleToggle = useCallback(
    (key: string, nextOpen: boolean) => {
      setOpenMap((prev) => {
        const next =
          single && nextOpen
            ? Object.fromEntries(Object.keys(prev).map((k) => [k, k === key]))
            : { ...prev, [key]: nextOpen };
        notifyChange(next);
        return next;
      });
    },
    [notifyChange, single],
  );

  return (
    <div className={cx(styles.root, className)}>
      {items.map((item, index) => {
        const key = itemKey(item, index);
        const open = item.props.open ?? openMap[key] ?? false;
        return (
          <AccordionItem
            key={key}
            heading={item.props.heading}
            open={open}
            disabled={item.props.disabled}
            className={item.props.className}
            onToggle={(next) => handleToggle(key, next)}
          >
            {item.props.children}
          </AccordionItem>
        );
      })}
    </div>
  );
}

export type EdsAccordionItem = typeof AccordionItem;
export const EdsAccordionItem = AccordionItem;
export type EdsAccordion = typeof Accordion;
export const EdsAccordion = Accordion;
