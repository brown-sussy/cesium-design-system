import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: ReactNode;
  className?: string;
}

export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  if (label) {
    return (
      <div className={cx('cs-divider cs-divider--label', className)} role="separator">
        {label}
      </div>
    );
  }
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cx('cs-divider', orientation === 'vertical' && 'cs-divider--vertical', className)}
    />
  );
}
