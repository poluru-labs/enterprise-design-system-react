import { forwardRef, useId, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import fieldStyles from '../../styles/fields.module.css';
import styles from './Slider.module.css';

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  showValue?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: number) => void;
  onInput?: (event: ChangeEvent<HTMLInputElement>, value: number) => void;
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    label,
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue = 50,
    showValue = false,
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
  const sliderId = id ?? generatedId;
  const currentValue = value ?? defaultValue;

  const parseValue = (event: ChangeEvent<HTMLInputElement>) => Number(event.target.value);

  return (
    <div className={cx(fieldStyles.field, className)}>
      <div className={styles.header}>
        {label ? (
          <label className={fieldStyles.label} htmlFor={sliderId}>
            {label}
          </label>
        ) : (
          <span />
        )}
        {showValue ? <span className={styles.value}>{currentValue}</span> : null}
      </div>
      <input
        ref={ref}
        id={sliderId}
        type="range"
        className={styles.range}
        min={min}
        max={max}
        step={step}
        value={value ?? undefined}
        defaultValue={value === undefined ? defaultValue : undefined}
        disabled={disabled}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        onInput={(event) =>
          onInput?.(event as ChangeEvent<HTMLInputElement>, parseValue(event as ChangeEvent<HTMLInputElement>))
        }
        onChange={(event) => onChange?.(event, parseValue(event))}
        {...rest}
      />
    </div>
  );
});

export type EdsSlider = typeof Slider;
export const EdsSlider = Slider;
