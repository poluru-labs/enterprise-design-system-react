import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import type { EdsButtonSize } from '../Button/Button.js';
import { cx } from '../../utils/cx.js';
import styles from './ButtonGroup.module.css';

export type EdsButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupProps = {
  orientation?: EdsButtonGroupOrientation; size?: EdsButtonSize;
  children?: ReactNode; className?: string;
};

export function ButtonGroup({ orientation = 'horizontal', size = 'md', children, className }: ButtonGroupProps) {
  const items = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    return cloneElement(child as ReactElement<{ size?: EdsButtonSize }>, { size });
  });
  return (
    <div className={cx(styles.root, styles[orientation], className)} role="group">
      {items}
    </div>
  );
}
export type EdsButtonGroup = typeof ButtonGroup; export const EdsButtonGroup = ButtonGroup;
