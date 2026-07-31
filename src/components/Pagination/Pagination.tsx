import { cx } from '../../utils/cx.js';
import { buildPaginationItems } from '../_shared/pagination-utils.js';
import styles from './Pagination.module.css';

export type PaginationProps = {
  page?: number;
  pageSize?: number;
  total?: number;
  siblingCount?: number;
  onChange?: (page: number) => void;
  className?: string;
};

export function Pagination({
  page = 1,
  pageSize = 10,
  total = 0,
  siblingCount = 1,
  onChange,
  className,
}: PaginationProps) {
  const totalPages = Math.max(Math.ceil(total / pageSize), 0);
  const items = buildPaginationItems(page, totalPages, siblingCount);

  const changePage = (nextPage: number) => {
    const clamped = Math.min(Math.max(nextPage, 1), Math.max(totalPages, 1));
    if (clamped !== page) onChange?.(clamped);
  };

  return (
    <div className={cx(styles.root, className)}>
      <nav className={styles.nav} aria-label="Pagination">
        <button type="button" className={styles.button} aria-label="Previous page"
          disabled={page <= 1 || totalPages === 0} onClick={() => changePage(page - 1)}>Prev</button>
        {totalPages === 0 ? null : items.map((item, i) =>
          item === 'ellipsis' ? (
            <span key={`e-${i}`} className={styles.ellipsis} aria-hidden="true">…</span>
          ) : (
            <button key={item} type="button"
              className={cx(styles.button, page === item && styles.active)}
              aria-label={`Page ${item}`} aria-current={page === item ? 'page' : undefined}
              onClick={() => changePage(item)}>{item}</button>
          ),
        )}
        <button type="button" className={styles.button} aria-label="Next page"
          disabled={page >= totalPages || totalPages === 0} onClick={() => changePage(page + 1)}>Next</button>
      </nav>
    </div>
  );
}

export type EdsPagination = typeof Pagination;
export const EdsPagination = Pagination;

