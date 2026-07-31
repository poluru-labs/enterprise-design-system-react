import type { ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Card.module.css';

export interface CardProps {
  elevated?: boolean;
  padded?: boolean;
  header?: ReactNode;
  media?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export function Card({
  elevated = false,
  padded = true,
  header,
  media,
  footer,
  children,
}: CardProps) {
  return (
    <article className={cx(styles.card, elevated && styles.elevated, padded && styles.padded)}>
      {media ? <div className={styles.media}>{media}</div> : null}
      {header ? <div className={styles.header}>{header}</div> : null}
      <div className={styles.body}>{children}</div>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </article>
  );
}

export { Card as EdsCard };
