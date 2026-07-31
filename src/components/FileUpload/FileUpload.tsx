import { useId, useRef, useState } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './FileUpload.module.css';

export interface FileUploadChangeDetail {
  files: File[];
}

export interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  hint?: string;
  onChange?: (detail: FileUploadChangeDetail) => void;
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 16V4M12 4L8 8M12 4L16 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16V17.5C4 18.8807 5.11929 20 6.5 20H17.5C18.8807 20 20 18.8807 20 17.5V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M9 1.5H4.5C3.67157 1.5 3 2.17157 3 3V13C3 13.8284 3.67157 14.5 4.5 14.5H11.5C12.3284 14.5 13 13.8284 13 13V5.5L9 1.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M9 1.5V5.5H13" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function FileUpload({
  label = '',
  accept = '',
  multiple = false,
  disabled = false,
  hint = '',
  onChange,
}: FileUploadProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const updateFiles = (files: File[]) => {
    const nextFiles = multiple ? files : files.slice(0, 1);
    setSelectedFiles(nextFiles);
    onChange?.({ files: nextFiles });
  };

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.field}>
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div
        className={cx(
          styles.dropzone,
          dragOver && styles.dragOver,
          disabled && styles.disabled,
        )}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={openFileDialog}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openFileDialog();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          if (disabled) return;
          updateFiles(Array.from(event.dataTransfer?.files ?? []));
        }}
      >
        <span className={styles.icon}>
          <UploadIcon />
        </span>
        <p className={styles.prompt}>
          <strong>Click to upload</strong> or drag and drop
        </p>
        <p className={styles.promptSubtle}>
          {multiple ? 'Multiple files supported' : 'Single file only'}
        </p>
      </div>
      <input
        ref={fileInputRef}
        id={inputId}
        className={styles.fileInput}
        type="file"
        accept={accept || undefined}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => {
          updateFiles(Array.from(event.target.files ?? []));
        }}
      />
      {hint ? <span className={styles.hint}>{hint}</span> : null}
      {selectedFiles.length ? (
        <ul className={styles.fileList} aria-live="polite">
          {selectedFiles.map((file) => (
            <li key={`${file.name}-${file.lastModified}`} className={styles.fileItem}>
              <FileIcon />
              {file.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export { FileUpload as EdsFileUpload };
