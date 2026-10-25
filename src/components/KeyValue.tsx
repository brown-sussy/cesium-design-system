import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface KeyValueItem {
  key: ReactNode;
  value: ReactNode;
  dim?: boolean;
}

export interface KeyValueProps {
  items: KeyValueItem[];
  className?: string;
}

export function KeyValue({ items, className }: KeyValueProps) {
  return (
    <dl className={cx('cs-kv', className)}>
      {items.map((item, i) => (
        <div className="cs-kv__row" key={i}>
          <dt className="cs-kv__key">{item.key}</dt>
          <span className="cs-kv__leader" aria-hidden="true" />
          <dd className={cx('cs-kv__value', item.dim && 'cs-kv__value--dim')}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
