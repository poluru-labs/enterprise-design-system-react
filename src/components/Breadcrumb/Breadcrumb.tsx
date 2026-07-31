import { type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Breadcrumb.module.css';

export type BreadcrumbItemData = { label: string; href?: string };

export type BreadcrumbItemProps = {
  label?: string;
  href?: string;
  current?: boolean;
  separator?: boolean;
  className?: string;
};

export function BreadcrumbItem({
  label = '',
  href,
  current = false,
  separator = false,
  className,
}: BreadcrumbItemProps) {
  return (
    <li className={cx(styles.item, className)}>
      {current || !href ? (
        <span className={styles.current} aria-current={current ? 'page' : undefined}>
          {label}
        </span>
      ) : (
        <a className={styles.link} href={href}>
          {label}
        </a>
      )}
      {separator ? (
        <span className={styles.separator} aria-hidden="true">
          /
        </span>
      ) : null}
    </li>
  );
}

export type BreadcrumbProps = {
  items?: BreadcrumbItemData[];
  children?: ReactNode;
  className?: string;
};

export function Breadcrumb({ items, children, className }: BreadcrumbProps) {
  return (
    <nav className={cx(styles.root, className)} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items
          ? items.map((item, index) => (
              <BreadcrumbItem
                key={`${item.label}-${index}`}
                label={item.label}
                href={item.href}
                current={index === items.length - 1}
                separator={index < items.length - 1}
              />
            ))
          : children}
      </ol>
    </nav>
  );
}

export type EdsBreadcrumbItem = typeof BreadcrumbItem;
export const EdsBreadcrumbItem = BreadcrumbItem;
export type EdsBreadcrumb = typeof Breadcrumb;
export const EdsBreadcrumb = Breadcrumb;
