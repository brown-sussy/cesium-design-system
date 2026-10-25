import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  /** Inherit the surrounding text colour instead of the accent. */
  inherit?: boolean;
}

export function Spinner({ size = 'md', inherit, className, ...rest }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cx(
        'cs-spinner',
        size !== 'md' && `cs-spinner--${size}`,
        inherit && 'cs-spinner--accent',
        className,
      )}
      {...rest}
    />
  );
}
