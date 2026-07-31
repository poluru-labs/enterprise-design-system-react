import { type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon.js';
import { cx } from '../../utils/cx.js';
import styles from './Link.module.css';

export type EdsLinkVariant = 'default' | 'subtle' | 'danger';
export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> & {
  href?: string; external?: boolean; disabled?: boolean; variant?: EdsLinkVariant;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void; children?: ReactNode; className?: string;
};

export function Link({ href = '#', target, rel, external = false, disabled = false, variant = 'default', onClick, children, className, ...rest }: LinkProps) {
  const resolvedTarget = target ?? (external ? '_blank' : undefined);
  const resolvedRel = rel ?? (external || resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined);
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) { event.preventDefault(); event.stopPropagation(); return; }
    onClick?.(event);
  };
  return (
    <a className={cx(styles.link, styles[variant], disabled && styles.disabled, className)}
      href={disabled ? undefined : href} target={resolvedTarget} rel={resolvedRel}
      aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined}
      onClick={handleClick} {...rest}>
      <span>{children}</span>
      {external ? <Icon name="external-link" size="sm" decorative /> : null}
    </a>
  );
}
export type EdsLink = typeof Link;
export const EdsLink = Link;
