import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Icon } from './Icon';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  accent?: boolean;
  onRemove?: () => void;
  icon?: ReactNode;
  children: ReactNode;
}

export function Tag({ accent, onRemove, icon, className, children, ...rest }: TagProps) {
  return (
    <span className={cx('cs-tag', accent && 'cs-tag--accent', className)} {...rest}>
      {icon}
      {children}
      {onRemove && (
        <button
          type="button"
          className="cs-tag__remove"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Icon name="close" size={10} strokeWidth={2} />
        </button>
      )}
    </span>
  );
}
