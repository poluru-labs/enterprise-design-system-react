import { cx } from '../../utils/cx.js';
import styles from './Stepper.module.css';

export type StepperStep = { label: string; description?: string };
export type EdsStepperOrientation = 'horizontal' | 'vertical';

export type StepperProps = {
  steps?: StepperStep[];
  current?: number;
  orientation?: EdsStepperOrientation;
  onStepClick?: (index: number) => void;
  className?: string;
};

export function Stepper({
  steps = [],
  current = 0,
  orientation = 'horizontal',
  onStepClick,
  className,
}: StepperProps) {
  return (
    <ol className={cx(styles.root, styles[orientation], className)} aria-label="Progress">
      {steps.map((step, index) => {
        const completed = index < current;
        const isCurrent = index === current;
        const clickable = index <= current;
        const stateClass = completed ? styles.completed : isCurrent ? styles.current : '';

        const content = (
          <>
            <div className={styles.indicatorWrap}>
              <span className={styles.indicator}>{completed ? '✓' : index + 1}</span>
              {index < steps.length - 1 ? (
                <span className={styles.connector} aria-hidden="true" />
              ) : null}
            </div>
            <div className={styles.content}>
              <div className={styles.label}>{step.label}</div>
              {step.description ? (
                <div className={styles.description}>{step.description}</div>
              ) : null}
            </div>
          </>
        );

        return (
          <li
            key={step.label + index}
            className={cx(styles.step, stateClass)}
            aria-current={isCurrent ? 'step' : undefined}
          >
            {clickable ? (
              <button
                type="button"
                className={styles.clickable}
                onClick={() => onStepClick?.(index)}
              >
                {content}
              </button>
            ) : (
              <div className={styles.disabled}>{content}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export type EdsStepper = typeof Stepper;
export const EdsStepper = Stepper;
