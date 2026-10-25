import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface TooltipProps {
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Horizontal alignment for `top` / `bottom`. Use `end` on controls pinned to
   * the right edge of the viewport, where a centred bubble would overflow.
   */
  align?: 'center' | 'end';
  children: ReactNode;
  className?: string;
}

export function Tooltip({
  content,
  placement = 'top',
  align = 'center',
  children,
  className,
}: TooltipProps) {
  const flip = placement === 'top' || placement === 'bottom';
  return (
    <span className={cx('cs-tooltip-anchor', className)}>
      {children}
      <span
        role="tooltip"
        className={cx(
          'cs-tooltip',
          `cs-tooltip--${placement}`,
          flip && align === 'end' && 'cs-tooltip--end',
        )}
      >
        {content}
      </span>
    </span>
  );
}
