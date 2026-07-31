import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type ChangeEvent,
} from 'react';
import { cx } from '../../utils/cx.js';
import fieldStyles from '../../styles/fields.module.css';
import styles from './PinInput.module.css';

export type EdsPinInputType = 'text' | 'number' | 'password';

export type PinInputProps = {
  length?: number;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  type?: EdsPinInputType;
  label?: string;
  invalid?: boolean;
  errorMessage?: string;
  className?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
};

export function PinInput({
  length = 6,
  value,
  defaultValue = '',
  disabled = false,
  type = 'text',
  label,
  invalid = false,
  errorMessage,
  className,
  onChange,
  onComplete,
}: PinInputProps) {
  const groupId = useId();
  const cellsRef = useRef<Array<HTMLInputElement | null>>([]);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const chars = useMemo(
    () => Array.from({ length }, (_, index) => currentValue[index] ?? ''),
    [currentValue, length],
  );

  const updateValue = useCallback(
    (next: string) => {
      const trimmed = next.slice(0, length);
      if (!isControlled) setInternalValue(trimmed);
      onChange?.(trimmed);
      if (trimmed.length === length) {
        onComplete?.(trimmed);
      }
    },
    [isControlled, length, onChange, onComplete],
  );

  const focusCell = (index: number) => {
    const cell = cellsRef.current[index];
    cell?.focus();
    cell?.select();
  };

  const syncFromCells = () => {
    const next = cellsRef.current.map((cell) => cell?.value ?? '').join('');
    updateValue(next);
  };

  const handleInput = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const char = target.value.slice(-1);

    if (type === 'number' && char && !/^\d$/.test(char)) {
      target.value = chars[index];
      return;
    }

    target.value = char;
    const next = chars.map((existing, i) => (i === index ? char : existing)).join('');
    updateValue(next);

    if (char && index < length - 1) {
      focusCell(index + 1);
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.currentTarget;

    if (event.key === 'Backspace' && !target.value && index > 0) {
      event.preventDefault();
      focusCell(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusCell(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault();
      focusCell(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').slice(0, length);
    if (type === 'number' && /[^\d]/.test(pasted)) return;

    pasted.split('').forEach((char, index) => {
      const cell = cellsRef.current[index];
      if (cell) cell.value = char;
    });

    syncFromCells();
    focusCell(Math.min(pasted.length, length - 1));
  };

  const inputType = type === 'number' ? 'text' : type;
  const inputMode = type === 'number' ? 'numeric' : undefined;

  return (
    <div className={cx(fieldStyles.field, className)}>
      {label ? (
        <span className={fieldStyles.label} id={`${groupId}-label`}>
          {label}
        </span>
      ) : null}
      <div
        className={styles.inputs}
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        onPaste={handlePaste}
      >
        {chars.map((char, index) => (
          <input
            key={index}
            ref={(node) => {
              cellsRef.current[index] = node;
            }}
            className={cx(styles.cell, invalid && styles.cellInvalid)}
            type={inputType}
            inputMode={inputMode}
            maxLength={1}
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            value={char}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={invalid ? true : undefined}
            aria-describedby={invalid && errorMessage ? `${groupId}-error` : undefined}
            onChange={(event) => handleInput(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          />
        ))}
      </div>
      {invalid && errorMessage ? (
        <span className={fieldStyles.error} id={`${groupId}-error`}>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

export type EdsPinInput = typeof PinInput;
export const EdsPinInput = PinInput;
