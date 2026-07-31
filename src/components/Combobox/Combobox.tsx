import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from 'react';
import { cx } from '../../utils/cx.js';
import fieldStyles from '../../styles/fields.module.css';
import styles from './Combobox.module.css';

export type EdsComboboxOption = { label: string; value: string; disabled?: boolean };

export type ComboboxProps = {
  label?: string;
  value?: string;
  defaultValue?: string;
  options?: EdsComboboxOption[];
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  className?: string;
  onChange?: (value: string) => void;
  onInput?: (filter: string) => void;
};

export function Combobox({
  label,
  value,
  defaultValue = '',
  options = [],
  placeholder,
  disabled = false,
  invalid = false,
  errorMessage,
  className,
  onChange,
  onInput,
}: ComboboxProps) {
  const comboboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const selectedOption = options.find((option) => option.value === currentValue);
  const [filter, setFilter] = useState(selectedOption?.label ?? currentValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!open) {
      const match = options.find((option) => option.value === currentValue);
      setFilter(match?.label ?? currentValue);
    }
  }, [currentValue, open, options]);

  const filteredOptions = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) => option.label.toLowerCase().includes(query));
  }, [filter, options]);

  const activeOption = filteredOptions[activeIndex];

  const selectOption = (option: EdsComboboxOption) => {
    if (option.disabled) return;
    if (!isControlled) setInternalValue(option.value);
    setFilter(option.label);
    setOpen(false);
    setActiveIndex(-1);
    onChange?.(option.value);
  };

  const openList = () => {
    if (disabled) return;
    setOpen(true);
    setActiveIndex(
      Math.max(
        0,
        filteredOptions.findIndex((option) => option.value === currentValue),
      ),
    );
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setOpen(true);
    setActiveIndex(0);
    onInput?.(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openList();
      setActiveIndex((index) => Math.min(index + 1, filteredOptions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      openList();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option && !option.disabled) selectOption(option);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      const match = options.find((option) => option.value === currentValue);
      setFilter(match?.label ?? '');
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const related = event.relatedTarget as Node | null;
    if (related && rootRef.current?.contains(related)) return;
    setOpen(false);
    const match = options.find((option) => option.value === currentValue);
    setFilter(match?.label ?? filter);
  };

  return (
    <div className={cx(fieldStyles.field, className)}>
      {label ? (
        <label className={fieldStyles.label} htmlFor={comboboxId}>
          {label}
        </label>
      ) : null}
      <div className={styles.combobox} ref={rootRef}>
        <div
          className={cx(
            fieldStyles.control,
            fieldStyles.md,
            invalid && fieldStyles.controlInvalid,
            disabled && fieldStyles.controlDisabled,
          )}
          data-invalid={invalid ? 'true' : 'false'}
        >
          <input
            id={comboboxId}
            role="combobox"
            type="text"
            className={fieldStyles.inputNative}
            value={filter}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={invalid ? true : undefined}
            aria-expanded={open}
            aria-controls={`${comboboxId}-listbox`}
            aria-activedescendant={
              activeOption ? `${comboboxId}-opt-${activeOption.value}` : undefined
            }
            aria-describedby={errorMessage ? `${comboboxId}-error` : undefined}
            autoComplete="off"
            onInput={handleInput}
            onFocus={openList}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
        {open ? (
          <ul id={`${comboboxId}-listbox`} className={styles.listbox} role="listbox">
            {filteredOptions.length === 0 ? (
              <li className={styles.empty}>No matches found</li>
            ) : (
              filteredOptions.map((option, index) => (
                // Keyboard selection is handled on the input (combobox pattern).
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- listbox option; keys on input
                <li
                  key={option.value}
                  id={`${comboboxId}-opt-${option.value}`}
                  className={cx(
                    styles.option,
                    index === activeIndex && styles.optionActive,
                    option.disabled && styles.optionDisabled,
                  )}
                  role="option"
                  aria-selected={option.value === currentValue}
                  data-disabled={option.disabled ? 'true' : 'false'}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        ) : null}
      </div>
      {invalid && errorMessage ? (
        <span className={fieldStyles.error} id={`${comboboxId}-error`}>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

export type EdsCombobox = typeof Combobox;
export const EdsCombobox = Combobox;
