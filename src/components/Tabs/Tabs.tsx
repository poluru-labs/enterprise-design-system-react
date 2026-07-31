import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Tabs.module.css';

export type TabProps = {
  label?: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
};

export function Tab({ children, className }: TabProps) {
  return <div className={className}>{children}</div>;
}

export type TabsProps = {
  selectedIndex?: number;
  defaultSelectedIndex?: number;
  onChange?: (index: number, label?: string) => void;
  children?: ReactNode;
  className?: string;
};

type TabChild = ReactElement<TabProps>;

export function Tabs({
  selectedIndex: selectedIndexProp,
  defaultSelectedIndex = 0,
  onChange,
  children,
  className,
}: TabsProps) {
  const [internalIndex, setInternalIndex] = useState(defaultSelectedIndex);
  const tabListRef = useRef<HTMLDivElement>(null);
  const isControlled = selectedIndexProp !== undefined;
  const selectedIndex = isControlled ? selectedIndexProp : internalIndex;

  const tabs = useMemo(
    () =>
      Children.toArray(children).filter(
        (child): child is TabChild => isValidElement(child) && child.type === Tab,
      ),
    [children],
  );

  const enabledIndexes = useMemo(
    () => tabs.map((tab, index) => ({ tab, index })).filter(({ tab }) => !tab.props.disabled).map(({ index }) => index),
    [tabs],
  );

  const applySelection = useCallback(
    (index: number) => {
      const fallback = enabledIndexes[0] ?? 0;
      const next = tabs[index]?.props.disabled ? fallback : index;

      if (!isControlled) {
        setInternalIndex(next);
      }
      onChange?.(next, tabs[next]?.props.label);
    },
    [enabledIndexes, isControlled, onChange, tabs],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!enabledIndexes.length) return;

    const currentPos = enabledIndexes.indexOf(selectedIndex);
    let nextPos = currentPos;

    switch (event.key) {
      case 'ArrowRight':
        nextPos = (currentPos + 1) % enabledIndexes.length;
        break;
      case 'ArrowLeft':
        nextPos = (currentPos - 1 + enabledIndexes.length) % enabledIndexes.length;
        break;
      case 'Home':
        nextPos = 0;
        break;
      case 'End':
        nextPos = enabledIndexes.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextIndex = enabledIndexes[nextPos];
    applySelection(nextIndex);
    const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[nextIndex]?.focus();
  };

  return (
    <div className={cx(styles.root, className)}>
      <div
        ref={tabListRef}
        className={styles.list}
        role="tablist"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => {
          const active = index === selectedIndex;
          const label = tab.props.label || `Tab ${index + 1}`;
          return (
            <button
              key={label + index}
              type="button"
              className={cx(styles.tab, active && styles.tabSelected)}
              role="tab"
              id={`eds-tab-${index}`}
              aria-selected={active}
              aria-controls={`eds-panel-${index}`}
              tabIndex={active ? 0 : -1}
              disabled={tab.props.disabled}
              onClick={() => applySelection(index)}
            >
              {label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, index) =>
        cloneElement(tab, {
          key: `panel-${index}`,
          className: cx(
            styles.panel,
            index === selectedIndex && styles.panelActive,
            tab.props.className,
          ),
          children: (
            <div role="tabpanel" id={`eds-panel-${index}`} aria-labelledby={`eds-tab-${index}`}>
              {tab.props.children}
            </div>
          ),
        }),
      )}
    </div>
  );
}

export type EdsTab = typeof Tab;
export const EdsTab = Tab;
export type EdsTabs = typeof Tabs;
export const EdsTabs = Tabs;
