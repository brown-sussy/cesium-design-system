import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { fixed, superscript } from '../lib/format';

export interface QuantityProps {
  value: number | string;
  unit?: ReactNode;
  /** Absolute uncertainty, printed as ±. */
  uncertainty?: number | string;
  /** Decimal places applied to a numeric value and uncertainty. */
  precision?: number;
  /** Powers of ten, printed as ×10⁻⁹ rather than crammed into the value. */
  exponent?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function render(v: number | string, precision?: number): string {
  return typeof v === 'number' ? fixed(v, precision ?? 0) : v;
}

/**
 * A measured value: digits, uncertainty, power of ten, unit. Every part is
 * tabular and monospace so a column of these lines up on the decimal point.
 */
export function Quantity({
  value,
  unit,
  uncertainty,
  precision,
  exponent,
  size = 'md',
  className,
}: QuantityProps) {
  return (
    <span className={cx('cs-qty', size !== 'md' && `cs-qty--${size}`, className)}>
      <span className="cs-qty__value">{render(value, precision)}</span>
      {exponent !== undefined && (
        <span className="cs-qty__exp" aria-label={`times ten to the ${exponent}`}>
          ×10{superscript(exponent)}
        </span>
      )}
      {uncertainty !== undefined && (
        <span className="cs-qty__pm">± {render(uncertainty, precision)}</span>
      )}
      {unit && <span className="cs-qty__unit">{unit}</span>}
    </span>
  );
}
