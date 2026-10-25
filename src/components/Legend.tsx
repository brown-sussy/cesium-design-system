import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface LegendItem {
  label: ReactNode;
  value?: ReactNode;
  color?: string;
  shape?: 'square' | 'line' | 'circle';
}

export interface LegendProps {
  items: LegendItem[];
  column?: boolean;
  className?: string;
}

export function Legend({ items, column, className }: LegendProps) {
  return (
    <ul className={cx('cs-legend', column && 'cs-legend--column', className)}>
      {items.map((item, i) => (
        <li className="cs-legend__item" key={i}>
          <span
            className={cx(
              'cs-legend__swatch',
              item.shape === 'line' && 'cs-legend__swatch--line',
            )}
            style={{
              background: item.color ?? 'var(--cs-accent)',
              borderRadius: item.shape === 'circle' ? '50%' : undefined,
            }}
            aria-hidden="true"
          />
          {item.label}
          {item.value !== undefined && <span className="cs-legend__value">{item.value}</span>}
        </li>
      ))}
    </ul>
  );
}
