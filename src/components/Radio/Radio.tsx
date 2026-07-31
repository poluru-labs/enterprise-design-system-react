import {
  forwardRef,
  useId,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Radio.module.css';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  label?: string;
  value: string;
  children?: ReactNode;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, value, children, className, disabled, checked, onChange, id, name, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <span className={cx(styles.root, className)}>
      <label
        className={cx(styles.radio, disabled && styles.radioDisabled)}
        data-disabled={disabled ? 'true' : 'false'}
      >
        <input
          ref={ref}
          id={inputId}
          type="radio"
          name={name}
          value={value}
          className={styles.input}
          disabled={disabled}
          checked={checked}
          onChange={(event) => onChange?.(event, value)}
          {...rest}
        />
        <span className={styles.dotWrap} aria-hidden="true">
          <span className={styles.dot} />
        </span>
        {label ? <span className={styles.labelText}>{label}</span> : children}
      </label>
    </span>
  );
});

export type EdsRadio = typeof Radio;
export const EdsRadio = Radio;
