import { useEffect, useRef, useState } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './CodeSnippet.module.css';

export interface CodeSnippetProps {
  code?: string;
  language?: string;
  label?: string;
  onCopy?: (code: string) => void;
}

export function CodeSnippet({
  code = '',
  language = 'html',
  label = 'Code snippet',
  onCopy,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trimmed = code.trim();

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  if (!trimmed) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed);
    } catch {
      const area = document.createElement('textarea');
      area.value = trimmed;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
    }

    setCopied(true);
    onCopy?.(trimmed);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={styles.root}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.label}>
            {label} · {language}
          </span>
          <button
            className={cx(styles.copy, copied && styles.copied)}
            type="button"
            onClick={copy}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className={styles.pre}>
          <code className={styles.code}>{trimmed}</code>
        </pre>
      </div>
    </div>
  );
}

export { CodeSnippet as EdsCodeSnippet };
