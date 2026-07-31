import {
  forwardRef,
  useId,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Switch.module.css';

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role' | 'onChange'> & {
  label?: string;
  children?: ReactNode;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, children, className, disabled, checked, defaultChecked, onChange, id, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <span className={cx(styles.root, className)}>
      <label
        className={cx(styles.switch, disabled && styles.switchDisabled)}
        data-disabled={disabled ? 'true' : 'false'}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          className={styles.input}
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          aria-checked={checked}
          onChange={(event) => onChange?.(event, event.target.checked)}
          {...rest}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
        {label ? <span className={styles.labelText}>{label}</span> : children}
      </label>
    </span>
  );
});

export type EdsSwitch = typeof Switch;
export const EdsSwitch = Switch;
