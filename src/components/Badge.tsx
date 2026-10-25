import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
  solid?: boolean;
  children: ReactNode;
}

export function Badge({ tone = 'neutral', dot, solid, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cx(
        'cs-badge',
        tone !== 'neutral' && `cs-badge--${tone}`,
        solid && 'cs-badge--solid',
        className,
      )}
      {...rest}
    >
      {dot && <span className="cs-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
