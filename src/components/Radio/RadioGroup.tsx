import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type ChangeEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import { Radio, type RadioProps } from './Radio.js';
import styles from './Radio.module.css';

export type EdsRadioGroupOrientation = 'horizontal' | 'vertical';
export type EdsRadioGroupOption = { label: string; value: string; disabled?: boolean };

export type RadioGroupProps = {
  label?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  orientation?: EdsRadioGroupOrientation;
  options?: EdsRadioGroupOption[];
  children?: ReactNode;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
};

export function RadioGroup({
  label,
  name: nameProp,
  value,
  defaultValue,
  disabled = false,
  orientation = 'vertical',
  options,
  children,
  className,
  onChange,
}: RadioGroupProps) {
  const generatedName = useId();
  const name = nameProp ?? generatedName;

  const handleChange = (event: ChangeEvent<HTMLInputElement>, selected: string) => {
    onChange?.(event, selected);
  };

  const renderOptions = options?.map((option) => (
    <Radio
      key={option.value}
      name={name}
      value={option.value}
      label={option.label}
      checked={value !== undefined ? value === option.value : undefined}
      defaultChecked={value === undefined ? defaultValue === option.value : undefined}
      disabled={disabled || option.disabled}
      onChange={handleChange}
    />
  ));

  const renderChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    if (child.type !== Radio) return child;
    const radio = child as ReactElement<RadioProps>;
    return cloneElement(radio, {
      name,
      checked: value !== undefined ? value === radio.props.value : radio.props.checked,
      disabled: disabled || radio.props.disabled,
      onChange: (event: ChangeEvent<HTMLInputElement>, selected: string) => {
        radio.props.onChange?.(event, selected);
        handleChange(event, selected);
      },
    });
  });

  return (
    <fieldset
      className={cx(
        styles.group,
        orientation === 'horizontal' && styles.groupHorizontal,
        className,
      )}
      data-orientation={orientation}
      disabled={disabled}
    >
      {label ? <legend className={styles.groupLabel}>{label}</legend> : null}
      <div className={styles.options}>{options ? renderOptions : renderChildren}</div>
    </fieldset>
  );
}

export type EdsRadioGroup = typeof RadioGroup;
export const EdsRadioGroup = RadioGroup;
