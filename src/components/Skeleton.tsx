import type { CSSProperties } from 'react';
import { cx } from '../lib/cx';

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect';
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ variant = 'text', width, height, className, style }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cx('cs-skeleton', variant !== 'rect' && `cs-skeleton--${variant}`, className)}
      style={{ width, height, ...style }}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <span className={cx('cs-stack', className)} style={{ gap: 'var(--cs-space-8)' }} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <span
          key={i}
          className="cs-skeleton cs-skeleton--text"
          style={{ width: i === lines - 1 ? '62%' : '100%' }}
        />
      ))}
    </span>
  );
}
