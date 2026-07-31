import { forwardRef, useId, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import fieldStyles from '../../styles/fields.module.css';
import styles from './TimePicker.module.css';

export type TimePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  label?: string;
  hint?: string;
  errorMessage?: string;
  invalid?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
};

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(function TimePicker(
  {
    label,
    hint,
    errorMessage,
    invalid = false,
    className,
    disabled,
    id,
    onChange,
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
          styles.wrapper,
          invalid && fieldStyles.controlInvalid,
          disabled && fieldStyles.controlDisabled,
        )}
        data-invalid={invalid ? 'true' : 'false'}
      >
        <input
          ref={ref}
          id={inputId}
          type="time"
          className={cx(fieldStyles.inputNative, styles.input)}
          disabled={disabled}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange?.(event, event.target.value)}
          {...rest}
        />
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

export type EdsTimePicker = typeof TimePicker;
export const EdsTimePicker = TimePicker;
