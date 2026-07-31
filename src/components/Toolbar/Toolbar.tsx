import { type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import styles from './Toolbar.module.css';

export type ToolbarProps = {
  bordered?: boolean;
  sticky?: boolean;
  start?: ReactNode;
  center?: ReactNode;
  end?: ReactNode;
  children?: ReactNode;
  className?: string;
};

function Section({ content, slotClass }: { content?: ReactNode; slotClass: string }) {
  if (!content) return null;
  return <div className={cx(slotClass)}>{content}</div>;
}

export function Toolbar({
  bordered = false,
  sticky = false,
  start,
  center,
  end,
  children,
  className,
}: ToolbarProps) {
  const centerContent = center ?? children;

  return (
    <div
      className={cx(
        styles.root,
        bordered && styles.bordered,
        sticky && styles.sticky,
        className,
      )}
      role="toolbar"
    >
      <Section content={start} slotClass={styles.start} />
      <Section content={centerContent} slotClass={styles.center} />
      <Section content={end} slotClass={styles.end} />
    </div>
  );
}

export type EdsToolbar = typeof Toolbar;
export const EdsToolbar = Toolbar;
