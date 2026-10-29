import { cx } from '../lib/cx';
import { fixed } from '../lib/format';

export interface DosePoint {
  x: number;
  y: number;
}

export interface DoseResponseProps {
  /** Half-maximal concentration, in the units of x. */
  ic50: number;
  /** Hill slope. 1 is the plain sigmoid. */
  hill?: number;
  top?: number;
  bottom?: number;
  points?: DosePoint[];
  xRange?: [number, number];
  height?: number;
  unit?: string;
  className?: string;
  'aria-label'?: string;
}

const W = 320;

function tickLabel(v: number): string {
  if (v >= 1000) return `${v / 1000}k`;
  if (v >= 1) return String(v);
  return String(v);
}

/**
 * A four-parameter dose–response curve on a log x axis, with the measured
 * points and the IC50 marked. Log scale is not an option here: a linear axis
 * turns every dose–response plot into an L.
 */
export function DoseResponse({
  ic50,
  hill = 1,
  top = 100,
  bottom = 0,
  points = [],
  xRange,
  height = 150,
  unit,
  className,
  'aria-label': ariaLabel,
}: DoseResponseProps) {
  const padL = 26;
  const padR = 10;
  const padT = 10;
  const padB = 18;
  const plotW = W - padL - padR;
  const plotH = height - padT - padB;

  const x0 = xRange?.[0] ?? ic50 / 100;
  const x1 = xRange?.[1] ?? ic50 * 100;
  const l0 = Math.log10(x0);
  const l1 = Math.log10(x1);

  const xOf = (v: number) => padL + ((Math.log10(v) - l0) / (l1 - l0)) * plotW;
  const yOf = (v: number) => padT + plotH - (v / top) * plotH;

  const curve = (x: number) => bottom + (top - bottom) / (1 + (ic50 / x) ** hill);

  const samples = Array.from({ length: 72 }, (_, i) => {
    const x = 10 ** (l0 + ((l1 - l0) * i) / 71);
    return `${i === 0 ? 'M' : 'L'} ${xOf(x).toFixed(2)} ${yOf(curve(x)).toFixed(2)}`;
  }).join(' ');

  const decades: number[] = [];
  for (let e = Math.ceil(l0); e <= Math.floor(l1); e += 1) decades.push(10 ** e);

  return (
    <div className={cx('cs-dose', className)}>
      <svg
        viewBox={`0 0 ${W} ${height}`}
        role="img"
        aria-label={
          ariaLabel ?? `Dose response, IC50 ${ic50}${unit ? ` ${unit}` : ''}`
        }
      >
        {[0, top / 2, top].map((value) => (
          <g key={value}>
            <line
              className="cs-dose__rule"
              x1={padL}
              x2={W - padR}
              y1={yOf(value)}
              y2={yOf(value)}
            />
            <text className="cs-dose__label" x={padL - 5} y={yOf(value) + 2.5} textAnchor="end">
              {fixed(value, 0)}
            </text>
          </g>
        ))}

        <line
          className="cs-dose__ic50"
          x1={xOf(ic50)}
          x2={xOf(ic50)}
          y1={yOf(top)}
          y2={yOf(0)}
        />
        <text
          className="cs-dose__label cs-dose__label--mark"
          x={xOf(ic50) + 4}
          y={yOf(top) + 8}
        >
          IC50 {fixed(ic50, ic50 < 10 ? 1 : 0)}
          {unit ? ` ${unit}` : ''}
        </text>

        <path className="cs-dose__curve" d={samples} />

        {points.map((point, i) => (
          <circle key={i} className="cs-dose__point" cx={xOf(point.x)} cy={yOf(point.y)} r={2.2} />
        ))}

        <line
          className="cs-dose__rule"
          x1={padL}
          x2={W - padR}
          y1={padT + plotH}
          y2={padT + plotH}
        />

        {decades.map((value, i) => (
          <text
            key={value}
            className="cs-dose__label"
            x={xOf(value)}
            y={height - 6}
            textAnchor={i === 0 ? 'start' : i === decades.length - 1 ? 'end' : 'middle'}
          >
            {tickLabel(value)}
          </text>
        ))}
      </svg>
    </div>
  );
}
