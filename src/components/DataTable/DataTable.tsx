import { useState } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './DataTable.module.css';

export type EdsDataTableColumn = { key: string; label: string; sortable?: boolean };
export type EdsSortDirection = 'asc' | 'desc';

export type DataTableProps = {
  columns?: EdsDataTableColumn[];
  rows?: Record<string, string | number>[];
  sortable?: boolean;
  striped?: boolean;
  compact?: boolean;
  onSort?: (key: string, direction: EdsSortDirection) => void;
  className?: string;
};

export function DataTable({
  columns = [],
  rows = [],
  sortable = false,
  striped = false,
  compact = false,
  onSort,
  className,
}: DataTableProps) {
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<EdsSortDirection>('asc');

  const isColumnSortable = (column: EdsDataTableColumn) => sortable && column.sortable !== false;

  const handleSort = (key: string) => {
    const nextDirection: EdsSortDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(nextDirection);
    onSort?.(key, nextDirection);
  };

  const renderSortIcon = (key: string) => {
    const active = sortKey === key;
    const direction = active ? sortDirection : null;
    return (
      <span className={cx(styles.sortIcon, active && styles.sortActive)} aria-hidden="true">
        <svg viewBox="0 0 10 6" fill="currentColor" opacity={direction === 'desc' || !active ? 1 : 0.35}><path d="M5 0 10 6H0z" /></svg>
        <svg viewBox="0 0 10 6" fill="currentColor" opacity={direction === 'asc' || !active ? 1 : 0.35}><path d="M5 6 0 0h10z" /></svg>
      </span>
    );
  };

  const hasRows = rows.length > 0;

  return (
    <div className={cx(styles.root, striped && styles.striped, compact && styles.compact, className)}>
      <div className={styles.wrapper}>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={
                    isColumnSortable(column) && sortKey === column.key
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  {isColumnSortable(column) ? (
                    <button
                      type="button"
                      className={styles.headerButton}
                      aria-label={`Sort by ${column.label}`}
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                      {renderSortIcon(column.key)}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hasRows ? rows.map((row, i) => (
              <tr key={i}>{columns.map((column) => <td key={column.key}>{row[column.key] ?? ''}</td>)}</tr>
            )) : (
              <tr><td className={styles.empty} colSpan={Math.max(columns.length, 1)}>No data</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export type EdsDataTable = typeof DataTable;
export const EdsDataTable = DataTable;
