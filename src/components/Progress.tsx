import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface ProgressProps {
  value?: number;
  max?: number;
  label?: ReactNode;
  tone?: 'accent' | 'success' | 'warning' | 'danger';
  indeterminate?: boolean;
  thin?: boolean;
  showValue?: boolean;
  formatValue?: (value: number, max: number) => string;
  className?: string;
}

export function Progress({
  value = 0,
  max = 100,
  label,
  tone = 'accent',
  indeterminate,
  thin,
  showValue,
  formatValue,
  className,
}: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const text = formatValue ? formatValue(value, max) : `${Math.round(pct)}%`;

  return (
    <div
      className={cx(
        'cs-progress',
        tone !== 'accent' && `cs-progress--${tone}`,
        indeterminate && 'cs-progress--indeterminate',
        thin && 'cs-progress--thin',
        className,
      )}
    >
      {(label || showValue) && (
        <div className="cs-progress__meta">
          {label && <span>{label}</span>}
          {showValue && !indeterminate && <span className="cs-progress__value">{text}</span>}
        </div>
      )}
      <div
        className="cs-progress__track"
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className="cs-progress__bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
