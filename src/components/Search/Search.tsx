import {
  forwardRef,
  useId,
  useRef,
  type ChangeEvent,
  type InputHTMLAttributes,
} from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.js';
import fieldStyles from '../../styles/fields.module.css';
import styles from './Search.module.css';

export type EdsSearchSize = 'sm' | 'md' | 'lg';

export type SearchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> & {
  size?: EdsSearchSize;
  clearable?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  onClear?: () => void;
};

function iconSize(size: EdsSearchSize): 'sm' | 'md' {
  return size === 'sm' ? 'sm' : 'md';
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  {
    value,
    defaultValue = '',
    placeholder = 'Search…',
    size = 'md',
    clearable = true,
    className,
    disabled,
    id,
    onChange,
    onClear,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const innerRef = useRef<HTMLInputElement | null>(null);
  const currentValue = value ?? defaultValue;
  const showClear = clearable && String(currentValue).length > 0;

  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const handleClear = () => {
    if (disabled) return;
    onClear?.();
    if (innerRef.current) {
      innerRef.current.value = '';
      innerRef.current.focus();
    }
    onChange?.(
      { target: { value: '' } } as ChangeEvent<HTMLInputElement>,
      '',
    );
  };

  return (
    <div className={cx(fieldStyles.field, className)}>
      <div
        className={cx(
          fieldStyles.control,
          fieldStyles[size],
          styles.wrapper,
          disabled && fieldStyles.controlDisabled,
        )}
      >
        <span className={styles.icon} aria-hidden="true">
          <Icon name="search" size={iconSize(size)} />
        </span>
        <input
          ref={setRefs}
          id={inputId}
          type="search"
          className={fieldStyles.inputNative}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange?.(event, event.target.value)}
          {...rest}
        />
        {showClear ? (
          <button
            type="button"
            className={styles.clear}
            aria-label="Clear search"
            disabled={disabled}
            onClick={handleClear}
          >
            <Icon name="x" size={iconSize(size)} />
          </button>
        ) : null}
      </div>
    </div>
  );
});

export type EdsSearch = typeof Search;
export const EdsSearch = Search;
