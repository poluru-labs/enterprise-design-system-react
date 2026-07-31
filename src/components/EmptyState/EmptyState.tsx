import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  heading?: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

function FolderIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7.5C3 6.67157 3.67157 6 4.5 6H9.17157C9.70201 6 10.2107 6.21071 10.5858 6.58579L12 8H19.5C20.3284 8 21 8.67157 21 9.5V18C21 18.8284 20.3284 19.5 19.5 19.5H4.5C3.67157 19.5 3 18.8284 3 18V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmptyState({
  heading = '',
  description = '',
  icon,
  actions,
  children,
}: EmptyStateProps) {
  const showIcon = icon !== null;

  return (
    <div className={styles.empty}>
      {showIcon ? (
        <span className={styles.icon}>{icon ?? <FolderIcon />}</span>
      ) : null}
      <div className={styles.text}>
        {heading ? <h3 className={styles.heading}>{heading}</h3> : null}
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {children ? <div className={styles.extra}>{children}</div> : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}

export { EmptyState as EdsEmptyState };
