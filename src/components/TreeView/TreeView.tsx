import { type KeyboardEvent } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './TreeView.module.css';

export type EdsTreeNode = {
  id: string;
  label: string;
  children?: EdsTreeNode[];
};

export type TreeItemProps = {
  itemId?: string;
  label?: string;
  expanded?: boolean;
  selected?: boolean;
  hasChildren?: boolean;
  onSelect?: (id: string) => void;
  onToggle?: (id: string, expanded: boolean) => void;
  children?: React.ReactNode;
};

export function TreeItem({
  itemId = '',
  label = '',
  expanded = false,
  selected = false,
  hasChildren = false,
  onSelect,
  onToggle,
  children,
}: TreeItemProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        onSelect?.(itemId);
        break;
      case 'ArrowRight':
        if (hasChildren && !expanded) {
          event.preventDefault();
          onToggle?.(itemId, true);
        }
        break;
      case 'ArrowLeft':
        if (hasChildren && expanded) {
          event.preventDefault();
          onToggle?.(itemId, false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className={cx(styles.row, selected && styles.selected)}
        role="treeitem"
        aria-selected={selected}
        aria-expanded={hasChildren ? expanded : undefined}
        tabIndex={0}
        onClick={() => onSelect?.(itemId)}
        onKeyDown={handleKeyDown}
      >
        {hasChildren ? (
          <button
            type="button"
            className={cx(styles.toggle, expanded && styles.toggleExpanded)}
            aria-label={expanded ? 'Collapse' : 'Expand'}
            onClick={(event) => {
              event.stopPropagation();
              onToggle?.(itemId, !expanded);
            }}
          >
            <svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
              <path d="M3 1 8 5 3 9z" />
            </svg>
          </button>
        ) : (
          <span className={styles.spacer} aria-hidden="true" />
        )}
        <span className={styles.label}>{label}</span>
      </div>
      <div className={cx(styles.children, (!expanded || !hasChildren) && styles.hidden)}>
        {children}
      </div>
    </>
  );
}

export type TreeViewProps = {
  items?: EdsTreeNode[];
  selectedId?: string;
  expandedIds?: Record<string, boolean>;
  onSelect?: (id: string) => void;
  onToggle?: (id: string, expanded: boolean) => void;
  className?: string;
};

function renderNode(
  node: EdsTreeNode,
  selectedId: string,
  expandedIds: Record<string, boolean>,
  onSelect?: (id: string) => void,
  onToggle?: (id: string, expanded: boolean) => void,
) {
  const hasChildren = Boolean(node.children?.length);
  const expanded = expandedIds[node.id] ?? false;

  return (
    <li key={node.id} role="none">
      <TreeItem
        itemId={node.id}
        label={node.label}
        expanded={expanded}
        selected={selectedId === node.id}
        hasChildren={hasChildren}
        onSelect={onSelect}
        onToggle={onToggle}
      >
        {hasChildren ? (
          <ul className={styles.tree} role="group">
            {node.children!.map((child) =>
              renderNode(child, selectedId, expandedIds, onSelect, onToggle),
            )}
          </ul>
        ) : null}
      </TreeItem>
    </li>
  );
}

export function TreeView({
  items = [],
  selectedId = '',
  expandedIds = {},
  onSelect,
  onToggle,
  className,
}: TreeViewProps) {
  if (!items.length) {
    return <div className={cx(styles.root, className)}><div className={styles.empty}>No items</div></div>;
  }

  return (
    <div className={cx(styles.root, className)}>
      <ul className={styles.tree} role="tree" aria-label="Tree navigation">
        {items.map((item) => renderNode(item, selectedId, expandedIds, onSelect, onToggle))}
      </ul>
    </div>
  );
}

export type EdsTreeItem = typeof TreeItem;
export const EdsTreeItem = TreeItem;
export type EdsTreeView = typeof TreeView;
export const EdsTreeView = TreeView;
