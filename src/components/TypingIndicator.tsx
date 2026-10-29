import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface TypingIndicatorProps {
  label?: ReactNode;
  className?: string;
}

/** Three dots and a mono caption — what the surface does while it waits. */
export function TypingIndicator({ label = 'Generating', className }: TypingIndicatorProps) {
  return (
    <div className={cx('cs-typing', className)} role="status" aria-live="polite">
      <span className="cs-typing__dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {label}
    </div>
  );
}
