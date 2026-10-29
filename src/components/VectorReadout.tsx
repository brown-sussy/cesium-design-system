import { cx } from '../lib/cx';
import { fixed } from '../lib/format';

export interface VectorReadoutProps {
  x: number;
  y: number;
  z?: number;
  unit?: string;
  /** Shown under the components, above a hairline. */
  magnitude?: number;
  precision?: number;
  labels?: [string, string, string];
  className?: string;
}

/**
 * Three components and, optionally, the magnitude. Each row is its own grid so
 * the numbers share a decimal column instead of drifting with the labels.
 */
export function VectorReadout({
  x,
  y,
  z,
  unit,
  magnitude,
  precision = 1,
  labels = ['x', 'y', 'z'],
  className,
}: VectorReadoutProps) {
  const rows: Array<[string, number]> = [
    [labels[0], x],
    [labels[1], y],
  ];
  if (z !== undefined) rows.push([labels[2], z]);

  return (
    <div className={cx('cs-vec', className)}>
      {rows.map(([axis, value]) => (
        <div className="cs-vec__row" key={axis}>
          <span className="cs-vec__axis">{axis}</span>
          <span className="cs-vec__val">{fixed(value, precision)}</span>
          {unit && <span className="cs-vec__unit">{unit}</span>}
        </div>
      ))}

      {magnitude !== undefined && (
        <div className="cs-vec__mag">
          <span className="cs-vec__axis">|v|</span>
          <span className="cs-vec__val">{fixed(magnitude, precision)}</span>
          {unit && <span className="cs-vec__unit">{unit}</span>}
        </div>
      )}
    </div>
  );
}
