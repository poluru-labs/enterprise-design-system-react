import {
  forwardRef,
  useId,
  type ChangeEvent,
  type TextareaHTMLAttributes,
} from 'react';
import { cx } from '../../utils/cx.js';
import fieldStyles from '../../styles/fields.module.css';
import styles from './Textarea.module.css';

export type EdsTextareaResize = 'none' | 'vertical' | 'both';

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
  label?: string;
  hint?: string;
  errorMessage?: string;
  invalid?: boolean;
  resize?: EdsTextareaResize;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    hint,
    errorMessage,
    invalid = false,
    resize = 'vertical',
    className,
    id,
    disabled,
    required,
    rows = 4,
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
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cx(
            fieldStyles.inputNative,
            styles.textarea,
            resize === 'none' && styles.resizeNone,
            resize === 'vertical' && styles.resizeVertical,
            resize === 'both' && styles.resizeBoth,
          )}
          disabled={disabled}
          required={required}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedBy}
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

export type EdsTextarea = typeof Textarea;
export const EdsTextarea = Textarea;
