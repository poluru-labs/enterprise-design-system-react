import { useMemo, useState } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
  alt?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Avatar({ name = '', src = '', size = 'md', alt = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const initials = useMemo(() => getInitials(name), [name]);
  const accessibleLabel = alt || name || 'Avatar';
  const showImage = Boolean(src) && !imageError;

  return (
    <span
      className={cx(styles.avatar, styles[size])}
      role="img"
      aria-label={accessibleLabel}
    >
      {showImage ? (
        <img
          className={styles.image}
          src={src}
          alt=""
          aria-hidden="true"
          onError={() => setImageError(true)}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}

export { Avatar as EdsAvatar };
