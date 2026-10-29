import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { useIndicator } from '../lib/useIndicator';

export interface TabItem {
  id: string;
  label: ReactNode;
  count?: number;
  icon?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'enclosed';
  className?: string;
  'aria-label'?: string;
}

export function Tabs({ items, value, onChange, variant = 'underline', className, ...rest }: TabsProps) {
  const underline = variant === 'underline';
  const { ref, box } = useIndicator<HTMLDivElement>(value);

  return (
    <div
      ref={ref}
      role="tablist"
      data-indicator={underline && box ? 'on' : 'off'}
      className={cx('cs-tabs', variant === 'enclosed' && 'cs-tabs--enclosed', className)}
      {...rest}
    >
      {underline && box && (
        <span
          className="cs-tabs__indicator"
          aria-hidden="true"
          style={{ transform: `translateX(${box.x}px)`, width: `${box.w}px` }}
        />
      )}
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          type="button"
          aria-selected={value === item.id}
          data-active={value === item.id}
          className="cs-tabs__tab"
          onClick={() => onChange(item.id)}
        >
          {item.icon}
          {item.label}
          {item.count !== undefined && <span className="cs-tabs__count">{item.count}</span>}
        </button>
      ))}
    </div>
  );
}
