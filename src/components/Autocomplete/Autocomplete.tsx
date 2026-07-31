import {
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
import styles from './Autocomplete.module.css';

export type AutocompleteProps = {
  label?: string;
  value?: string;
  defaultValue?: string;
  suggestions?: string[];
  placeholder?: string;
  disabled?: boolean;
  minChars?: number;
  className?: string;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  onSelect?: (value: string) => void;
};

export function Autocomplete({
  label,
  value,
  defaultValue = '',
  suggestions = [],
  placeholder,
  disabled = false,
  minChars = 1,
  className,
  onChange,
  onInput,
  onSelect,
}: AutocompleteProps) {
  const inputId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const filteredSuggestions = useMemo(() => {
    const query = currentValue.trim().toLowerCase();
    if (query.length < minChars) return [];
    return suggestions.filter((item) => item.toLowerCase().includes(query));
  }, [currentValue, minChars, suggestions]);

  const activeItem = filteredSuggestions[activeIndex];

  const openList = () => {
    if (disabled) return;
    setOpen(filteredSuggestions.length > 0);
    setActiveIndex(filteredSuggestions.length > 0 ? 0 : -1);
  };

  const closeList = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const selectSuggestion = (suggestion: string) => {
    if (!isControlled) setInternalValue(suggestion);
    closeList();
    onSelect?.(suggestion);
    onChange?.(suggestion);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    if (!isControlled) setInternalValue(next);
    onInput?.(next);
    onChange?.(next);
    if (next.trim().length >= minChars && suggestions.some((s) => s.toLowerCase().includes(next.toLowerCase()))) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      closeList();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (filteredSuggestions.length) {
        setOpen(true);
        setActiveIndex((index) => Math.min(index + 1, filteredSuggestions.length - 1));
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      if (open && activeIndex >= 0 && filteredSuggestions[activeIndex]) {
        event.preventDefault();
        selectSuggestion(filteredSuggestions[activeIndex]);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeList();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const related = event.relatedTarget as Node | null;
    if (related && rootRef.current?.contains(related)) return;
    closeList();
  };

  return (
    <div className={cx(fieldStyles.field, className)}>
      {label ? (
        <label className={fieldStyles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className={styles.autocomplete} ref={rootRef}>
        <div
          className={cx(
            fieldStyles.control,
            fieldStyles.md,
            disabled && fieldStyles.controlDisabled,
          )}
        >
          <input
            id={inputId}
            role="combobox"
            type="text"
            className={fieldStyles.inputNative}
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            aria-expanded={open}
            aria-controls={`${inputId}-listbox`}
            aria-activedescendant={
              activeItem ? `${inputId}-opt-${activeIndex}` : undefined
            }
            autoComplete="off"
            onChange={handleInput}
            onFocus={openList}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
        {open ? (
          <ul id={`${inputId}-listbox`} className={styles.listbox} role="listbox">
            {filteredSuggestions.map((suggestion, index) => (
              // Keyboard selection is handled on the input (combobox pattern).
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- listbox option; keys on input
              <li
                key={suggestion}
                id={`${inputId}-opt-${index}`}
                className={cx(styles.option, index === activeIndex && styles.optionActive)}
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export type EdsAutocomplete = typeof Autocomplete;
export const EdsAutocomplete = Autocomplete;
