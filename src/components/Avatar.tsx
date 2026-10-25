import type { HTMLAttributes } from 'react';
import { cx } from '../lib/cx';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  square?: boolean;
  accent?: boolean;
  status?: boolean;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '··';
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  name = '',
  src,
  size = 'md',
  square,
  accent,
  status,
  className,
  ...rest
}: AvatarProps) {
  return (
    <span
      className={cx(
        'cs-avatar',
        size !== 'md' && `cs-avatar--${size}`,
        square && 'cs-avatar--square',
        accent && 'cs-avatar--accent',
        className,
      )}
      {...rest}
    >
      {src ? <img src={src} alt={name} /> : initials(name)}
      {status && <span className="cs-avatar__status" aria-hidden="true" />}
    </span>
  );
}
