import {
  forwardRef,
  useId,
  type ChangeEvent,
  type InputHTMLAttributes,
  type MouseEvent,
} from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.js';
import fieldStyles from '../../styles/fields.module.css';
import styles from './NumberInput.module.css';

export type EdsNumberInputSize = 'sm' | 'md' | 'lg';

export type NumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> & {
  label?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: EdsNumberInputSize;
  hint?: string;
  errorMessage?: string;
  invalid?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: number) => void;
  onInput?: (event: ChangeEvent<HTMLInputElement>, value: number) => void;
};

function iconSize(size: EdsNumberInputSize): 'sm' | 'md' {
  return size === 'sm' ? 'sm' : 'md';
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundToStep(value: number, min: number, step: number): number {
  if (step <= 0) return value;
  const precision = (String(step).split('.')[1] ?? '').length;
  const rounded = Math.round((value - min) / step) * step + min;
  return Number(rounded.toFixed(precision));
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    label,
    value,
    defaultValue = 0,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 1,
    size = 'md',
    hint,
    errorMessage,
    invalid = false,
    className,
    disabled,
    id,
    onChange,
    onInput,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const currentValue = value ?? defaultValue;
  const describedBy =
    invalid && errorMessage
      ? `${inputId}-error`
      : hint
        ? `${inputId}-hint`
        : undefined;

  const canDecrement = !disabled && currentValue - step >= min;
  const canIncrement = !disabled && currentValue + step <= max;

  const emitChange = (
    next: number,
    event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>,
    emitInput = true,
  ) => {
    const normalized = clamp(roundToStep(next, min, step), min, max);
    if (emitInput) {
      onInput?.(event as ChangeEvent<HTMLInputElement>, normalized);
    }
    onChange?.(event as ChangeEvent<HTMLInputElement>, normalized);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = event.target.value === '' ? 0 : Number(event.target.value);
    if (Number.isNaN(parsed)) return;
    onInput?.(event, clamp(parsed, min, max));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = event.target.value === '' ? 0 : Number(event.target.value);
    if (!Number.isNaN(parsed)) {
      onChange?.(event, clamp(roundToStep(parsed, min, step), min, max));
    }
  };

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
          size === 'sm' && styles.wrapperSm,
          size === 'lg' && styles.wrapperLg,
          invalid && fieldStyles.controlInvalid,
          disabled && fieldStyles.controlDisabled,
        )}
        data-invalid={invalid ? 'true' : 'false'}
      >
        <button
          type="button"
          className={styles.stepper}
          aria-label="Decrease value"
          disabled={!canDecrement}
          onClick={(event) => emitChange(currentValue - step, event, true)}
        >
          <Icon name="minus" size={iconSize(size)} />
        </button>
        <span className={styles.divider} aria-hidden="true" />
        <input
          ref={ref}
          id={inputId}
          type="number"
          className={cx(fieldStyles.inputNative, styles.input)}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          min={Number.isFinite(min) ? min : undefined}
          max={Number.isFinite(max) ? max : undefined}
          step={step}
          disabled={disabled}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedBy}
          onInput={handleInput}
          onChange={handleChange}
          {...rest}
        />
        <span className={styles.divider} aria-hidden="true" />
        <button
          type="button"
          className={styles.stepper}
          aria-label="Increase value"
          disabled={!canIncrement}
          onClick={(event) => emitChange(currentValue + step, event, true)}
        >
          <Icon name="plus" size={iconSize(size)} />
        </button>
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

export type EdsNumberInput = typeof NumberInput;
export const EdsNumberInput = NumberInput;
