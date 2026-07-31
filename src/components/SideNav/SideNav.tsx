import { useState, type ReactElement } from 'react';
import type { EdsIconName } from '../../icons/names.js';
import { Icon } from '../Icon/Icon.js';
import { cx } from '../../utils/cx.js';
import styles from './SideNav.module.css';

export type SideNavItem = { label: string; href?: string; icon?: EdsIconName | ''; active?: boolean; children?: SideNavItem[] };

export type SideNavProps = {
  items?: SideNavItem[]; collapsed?: boolean;
  onNavigate?: (label: string, href?: string) => void; className?: string;
};

export function SideNav({ items = [], collapsed = false, onNavigate, className }: SideNavProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const handleNavigate = (item: SideNavItem, event: React.MouseEvent) => {
    if (item.children?.length) {
      event.preventDefault();
      setExpandedSections((prev) => {
        const next = new Set(prev);
        if (next.has(item.label)) next.delete(item.label); else next.add(item.label);
        return next;
      });
      return;
    }
    onNavigate?.(item.label, item.href);
  };

  const renderItem = (item: SideNavItem, isChild = false): ReactElement => {
    const hasChildren = Boolean(item.children?.length);
    const expanded = expandedSections.has(item.label);
    const inner = (<>
      {item.icon ? <span className={styles.icon}><Icon name={item.icon} size="md" /></span> : null}
      <span className={styles.label}>{item.label}</span>
      {hasChildren && !collapsed ? <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size="sm" decorative /> : null}
    </>);
    const row = item.href && !hasChildren ? (
      <a className={cx(styles.item, item.active && styles.active)} href={item.href} aria-current={item.active ? 'page' : undefined} title={collapsed ? item.label : undefined} onClick={(e) => handleNavigate(item, e)}>{inner}</a>
    ) : (
      <button type="button" className={cx(styles.item, item.active && styles.active)} aria-current={item.active ? 'page' : undefined} aria-expanded={hasChildren ? expanded : undefined} title={collapsed ? item.label : undefined} onClick={(e) => handleNavigate(item, e)}>{inner}</button>
    );
    if (isChild) return <li className="child">{row}</li>;
    return (
      <li key={item.label}>
        {row}
        {hasChildren && expanded ? <ul className={styles.children}>{item.children!.map((c) => renderItem(c, true))}</ul> : null}
      </li>
    );
  };

  return (
    <div className={cx(styles.root, collapsed && styles.collapsed, className)}>
      <nav aria-label="Side navigation"><ul className={styles.list}>{items.map((item) => renderItem(item))}</ul></nav>
    </div>
  );
}
export type EdsSideNav = typeof SideNav; export const EdsSideNav = SideNav;
