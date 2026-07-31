import {
  forwardRef,
  useId,
  type ChangeEvent,
  type SelectHTMLAttributes,
} from 'react';
import { cx } from '../../utils/cx.js';
import fieldStyles from '../../styles/fields.module.css';
import styles from './Select.module.css';

export type EdsSelectOption = { label: string; value: string; disabled?: boolean };
export type EdsSelectSize = 'sm' | 'md' | 'lg';

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  label?: string;
  options?: EdsSelectOption[];
  placeholder?: string;
  size?: EdsSelectSize;
  hint?: string;
  errorMessage?: string;
  invalid?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    options = [],
    placeholder,
    size = 'md',
    hint,
    errorMessage,
    invalid = false,
    className,
    id,
    disabled,
    required,
    value,
    defaultValue,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const describedBy =
    invalid && errorMessage
      ? `${selectId}-error`
      : hint
        ? `${selectId}-hint`
        : undefined;

  return (
    <div className={cx(fieldStyles.field, className)}>
      {label ? (
        <label className={fieldStyles.label} htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      <div
        className={cx(
          fieldStyles.control,
          fieldStyles[size],
          invalid && fieldStyles.controlInvalid,
          disabled && fieldStyles.controlDisabled,
        )}
        data-invalid={invalid ? 'true' : 'false'}
      >
        <select
          ref={ref}
          id={selectId}
          className={cx(fieldStyles.inputNative, styles.select)}
          disabled={disabled}
          required={required}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled={Boolean(value ?? defaultValue)}>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {invalid && errorMessage ? (
        <span className={fieldStyles.error} id={`${selectId}-error`}>
          {errorMessage}
        </span>
      ) : hint ? (
        <span className={fieldStyles.hint} id={`${selectId}-hint`}>
          {hint}
        </span>
      ) : null}
    </div>
  );
});

export type EdsSelect = typeof Select;
export const EdsSelect = Select;
