import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Sparkline } from './Sparkline';

export interface StatProps {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  delta?: { value: string; direction?: 'up' | 'down' | 'flat'; label?: string };
  spark?: number[];
  size?: 'sm' | 'md';
  className?: string;
}

export function Stat({ label, value, unit, delta, spark, size = 'md', className }: StatProps) {
  const direction = delta?.direction ?? 'flat';
  return (
    <div className={cx('cs-stat', size === 'sm' && 'cs-stat--sm', className)}>
      <div className="cs-stat__label">{label}</div>
      <div className="cs-stat__value">
        {value}
        {unit && <span className="cs-stat__unit">{unit}</span>}
      </div>
      {(delta || spark) && (
        <div className="cs-stat__foot">
          {delta && (
            <span
              className={cx(
                'cs-stat__delta',
                direction === 'up' && 'cs-stat__delta--up',
                direction === 'down' && 'cs-stat__delta--down',
              )}
            >
              {direction !== 'flat' && (
                <span className="cs-stat__arrow" aria-hidden="true">
                  {direction === 'up' ? '▲' : '▼'}
                </span>
              )}
              {delta.value}
              {delta.label && <span className="cs-dimmer">{delta.label}</span>}
            </span>
          )}
          {spark && <Sparkline data={spark} width={72} height={18} area={false} className="cs-grow" />}
        </div>
      )}
    </div>
  );
}
