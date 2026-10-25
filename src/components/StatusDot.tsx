import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
  label?: ReactNode;
  pulse?: boolean;
}

export function StatusDot({ tone = 'neutral', label, pulse, className, ...rest }: StatusDotProps) {
  return (
    <span
      className={cx(
        'cs-status',
        tone !== 'neutral' && `cs-status--${tone}`,
        pulse && 'cs-status--pulse',
        className,
      )}
      {...rest}
    >
      <span className="cs-status__dot" aria-hidden="true" />
      {label && <span>{label}</span>}
    </span>
  );
}
