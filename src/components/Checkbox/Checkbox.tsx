import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Checkbox.module.css';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  label?: string;
  indeterminate?: boolean;
  children?: ReactNode;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    indeterminate = false,
    children,
    className,
    disabled,
    checked,
    defaultChecked,
    onChange,
    id,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const innerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const node = innerRef.current;
    if (node) {
      node.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <span className={cx(styles.root, className)}>
      <label
        className={cx(styles.checkbox, disabled && styles.checkboxDisabled)}
        data-disabled={disabled ? 'true' : 'false'}
      >
        <input
          ref={setRefs}
          id={inputId}
          type="checkbox"
          className={styles.input}
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={(event) => {
            onChange?.(event, event.target.checked);
          }}
          {...rest}
        />
        <span className={styles.box} aria-hidden="true">
          <svg className={cx(styles.mark, styles.markCheck)} viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 8.5L6.5 11.5L12.5 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <svg className={cx(styles.mark, styles.markIndeterminate)} viewBox="0 0 16 16" fill="none">
            <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        {label ? <span className={styles.labelText}>{label}</span> : children}
      </label>
    </span>
  );
});

export type EdsCheckbox = typeof Checkbox;
export const EdsCheckbox = Checkbox;
