import {
  forwardRef,
  useId,
  type ChangeEvent,
  type InputHTMLAttributes,
} from 'react';
import type { EdsIconName } from '../../icons/names.js';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.js';
import fieldStyles from '../../styles/fields.module.css';
import styles from './Input.module.css';

export type EdsInputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
export type EdsInputSize = 'sm' | 'md' | 'lg';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
  label?: string;
  type?: EdsInputType;
  size?: EdsInputSize;
  hint?: string;
  errorMessage?: string;
  invalid?: boolean;
  icon?: EdsIconName | '';
  iconTrailing?: EdsIconName | '';
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

function iconSize(size: EdsInputSize): 'sm' | 'md' {
  return size === 'sm' ? 'sm' : 'md';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    type = 'text',
    size = 'md',
    hint,
    errorMessage,
    invalid = false,
    icon = '',
    iconTrailing = '',
    className,
    id,
    disabled,
    required,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy =
    invalid && errorMessage
      ? `${inputId}-error`
      : hint
        ? `${inputId}-hint`
        : undefined;

  return (
    <div className={cx(fieldStyles.field, className)}>
      {label ? (
        <label className={fieldStyles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div
        className={cx(
          fieldStyles.control,
          fieldStyles[size],
          styles.wrapper,
          invalid && fieldStyles.controlInvalid,
          disabled && fieldStyles.controlDisabled,
        )}
        data-invalid={invalid ? 'true' : 'false'}
      >
        {icon ? (
          <span className={fieldStyles.affix}>
            <Icon name={icon} size={iconSize(size)} />
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={fieldStyles.inputNative}
          disabled={disabled}
          required={required}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {iconTrailing ? (
          <span className={fieldStyles.affix}>
            <Icon name={iconTrailing} size={iconSize(size)} />
          </span>
        ) : null}
      </div>
      {invalid && errorMessage ? (
        <span className={fieldStyles.error} id={`${inputId}-error`}>
          {errorMessage}
        </span>
      ) : hint ? (
        <span className={fieldStyles.hint} id={`${inputId}-hint`}>
          {hint}
        </span>
      ) : null}
    </div>
  );
});

export type EdsInput = typeof Input;
export const EdsInput = Input;
