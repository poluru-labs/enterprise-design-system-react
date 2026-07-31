import { type MouseEvent } from 'react';
import { Icon } from '../Icon/Icon.js';
import { cx } from '../../utils/cx.js';
import styles from './Rating.module.css';

export type EdsRatingSize = 'sm' | 'md' | 'lg';

export type RatingProps = {
  value?: number;
  max?: number;
  readonly?: boolean;
  disabled?: boolean;
  size?: EdsRatingSize;
  allowHalf?: boolean;
  onChange?: (value: number) => void;
  className?: string;
};

export function Rating({
  value = 0,
  max = 5,
  readonly = false,
  disabled = false,
  size = 'md',
  allowHalf = false,
  onChange,
  className,
}: RatingProps) {
  const starState = (index: number): 'empty' | 'half' | 'full' => {
    const starValue = index + 1;
    if (value >= starValue) return 'full';
    if (allowHalf && value >= starValue - 0.5) return 'half';
    return 'empty';
  };

  const handleStarClick = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    if (readonly || disabled) return;

    let next = index + 1;
    if (allowHalf) {
      const rect = event.currentTarget.getBoundingClientRect();
      const isLeftHalf = event.clientX - rect.left < rect.width / 2;
      next = isLeftHalf ? index + 0.5 : index + 1;
    }

    if (value === next) {
      next = allowHalf ? Math.max(0, next - 0.5) : 0;
    }

    onChange?.(next);
  };

  return (
    <ul
      className={cx(styles.root, className)}
      role="group"
      aria-label={`Rating ${value} of ${max}`}
      aria-disabled={disabled || undefined}
    >
      {Array.from({ length: max }, (_, index) => {
        const state = starState(index);
        return (
          <li key={index}>
            <button
              type="button"
              className={cx(
                styles.star,
                state === 'full' && styles.filled,
                state === 'half' && styles.half,
                readonly && styles.readonly,
              )}
              disabled={disabled}
              aria-label={`Rate ${index + 1} of ${max}`}
              onClick={(event) => handleStarClick(index, event)}
            >
              <Icon name="star" size={size} decorative />
              {state === 'half' ? (
                <span className={styles.halfOverlay} aria-hidden="true">
                  <Icon name="star" size={size} decorative />
                </span>
              ) : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export type EdsRating = typeof Rating;
export const EdsRating = Rating;
