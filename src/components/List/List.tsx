import { type ReactNode } from 'react';
import type { EdsIconName } from '../../icons/names.js';
import { Icon } from '../Icon/Icon.js';
import { cx } from '../../utils/cx.js';
import styles from './List.module.css';

export type ListItemData = { label: string; description?: string; icon?: EdsIconName | ''; href?: string; disabled?: boolean };

export type ListItemProps = {
  label?: string; description?: string; icon?: EdsIconName | ''; href?: string;
  selected?: boolean; disabled?: boolean; onSelect?: () => void; className?: string;
};

export function ListItem({ label = '', description, icon = '', href, selected = false, disabled = false, onSelect, className }: ListItemProps) {
  const inner = (<>
    {icon ? <span className={styles.icon}><Icon name={icon} size="md" /></span> : null}
    <span className={styles.content}>
      <span className={styles.label}>{label}</span>
      {description ? <div className={styles.description}>{description}</div> : null}
    </span>
  </>);
  const cls = cx(href ? styles.itemLink : styles.itemButton, selected && styles.selected, disabled && styles.disabled, className);
  if (href && !disabled) return <a className={cls} href={href} aria-current={selected ? 'true' : undefined} onClick={() => onSelect?.()}>{inner}</a>;
  return <button type="button" className={cls} disabled={disabled} aria-pressed={selected || undefined} onClick={() => onSelect?.()}>{inner}</button>;
}

export type ListProps = {
  divided?: boolean; items?: ListItemData[]; selectedIndex?: number;
  onSelect?: (label: string, index?: number) => void; children?: ReactNode; className?: string;
};

export function List({ divided = false, items, selectedIndex = -1, onSelect, children, className }: ListProps) {
  return (
    <ul className={cx(styles.root, divided && styles.divided, className)}>
      {items ? items.map((item, index) => (
        <li key={item.label + index} className={styles.item}>
          <ListItem {...item} selected={selectedIndex === index} onSelect={() => !item.disabled && onSelect?.(item.label, index)} />
        </li>
      )) : children}
    </ul>
  );
}
export type EdsListItem = typeof ListItem; export const EdsListItem = ListItem;
export type EdsList = typeof List; export const EdsList = List;
