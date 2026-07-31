import { forwardRef } from 'react';
import { iconPaths } from '../../icons/paths.js';
import { isEdsIconName, type EdsIconName } from '../../icons/names.js';
import { cx } from '../../utils/cx.js';
import styles from './Icon.module.css';

export type EdsIconSize = 'sm' | 'md' | 'lg';

export type IconProps = {
  name: EdsIconName;
  size?: EdsIconSize;
  /** When false, exposes an accessible label on the SVG. */
  decorative?: boolean;
  label?: string;
  className?: string;
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 'md', decorative = true, label, className },
  ref,
) {
  if (!name || !isEdsIconName(name)) {
    return null;
  }

  const paths = iconPaths[name];
  const labelled = !decorative && Boolean(label || name);

  return (
    <span className={cx(styles.icon, className)}>
      <svg
        ref={ref}
        className={cx(styles.svg, styles[size])}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={labelled ? undefined : true}
        role={labelled ? 'img' : 'presentation'}
        aria-label={labelled ? label || name : undefined}
        dangerouslySetInnerHTML={{ __html: paths }}
      />
    </span>
  );
});

export const EdsIcon = Icon;
