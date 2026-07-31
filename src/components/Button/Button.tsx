import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ForwardedRef,
  type MouseEvent,
  type ReactNode,
} from 'react';
import type { EdsIconName } from '../../icons/names.js';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.js';
import styles from './Button.module.css';

export type EdsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type EdsButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  variant?: EdsButtonVariant;
  size?: EdsButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: EdsIconName | '';
  iconTrailing?: EdsIconName | '';
  iconOnly?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
  accessibleLabel?: string;
  children?: ReactNode;
  className?: string;
};

function iconSize(size: EdsButtonSize): 'sm' | 'md' {
  return size === 'sm' ? 'sm' : 'md';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon = '',
    iconTrailing = '',
    iconOnly = false,
    type = 'button',
    href,
    target,
    rel,
    accessibleLabel,
    children,
    className,
    onClick,
    ...rest
  },
  ref,
) {
  const classes = cx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    iconOnly && styles.iconOnly,
    className,
  );

  const label =
    iconOnly
      ? accessibleLabel || rest['aria-label']?.toString() || icon || 'Button'
      : accessibleLabel || rest['aria-label']?.toString();

  const handleClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event as MouseEvent<HTMLButtonElement>);
  };

  const content = (
    <>
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : icon ? (
        <span className={styles.leading}>
          <Icon name={icon} size={iconSize(size)} />
        </span>
      ) : null}
      {!iconOnly && <span className={styles.label}>{children}</span>}
      {!loading && !iconOnly && iconTrailing ? (
        <span className={styles.trailing}>
          <Icon name={iconTrailing} size={iconSize(size)} />
        </span>
      ) : null}
    </>
  );

  const commonProps = {
    className: classes,
    'aria-label': label || undefined,
    'aria-busy': loading ? true : undefined,
    onClick: handleClick,
  };

  if (href && !disabled) {
    return (
      <a
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        {...commonProps}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      {...commonProps}
      {...rest}
    >
      {content}
    </button>
  );
});

export type EdsButton = typeof Button;
export const EdsButton = Button;
