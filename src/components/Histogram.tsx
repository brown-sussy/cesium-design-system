import { cx } from '../lib/cx';
import { fixed } from '../lib/format';

export interface HistogramBin {
  x0: number;
  x1: number;
  count: number;
}

export interface HistogramProps {
  bins: HistogramBin[];
  height?: number;
  /** Log-scaled counts — the only way a spectrum with a 10⁴ dynamic range reads. */
  log?: boolean;
  unit?: string;
  marker?: number;
  className?: string;
  'aria-label'?: string;
}

const W = 320;

/**
 * Binned counts as a static SVG. No animation, no tooltip layer: a histogram in
 * an instrument panel is read at a glance, and every pixel of interaction is a
 * pixel that can lag behind the data.
 */
export function Histogram({
  bins,
  height = 120,
  log,
  unit,
  marker,
  className,
  'aria-label': ariaLabel,
}: HistogramProps) {
  const padL = 30;
  const padR = 6;
  const padT = 8;
  const padB = 18;
  const plotW = W - padL - padR;
  const plotH = height - padT - padB;

  const n = bins.length;
  const peak = Math.max(1, ...bins.map((b) => b.count));
  const scale = (c: number) => (log ? Math.log10(c + 1) : c);
  const top = scale(peak);
  const total = bins.reduce((sum, b) => sum + b.count, 0);

  const barW = plotW / Math.max(n, 1);
  const gap = barW > 6 ? 1 : barW > 3 ? 0.6 : 0.3;

  const first = bins[0]?.x0 ?? 0;
  const last = bins[n - 1]?.x1 ?? 1;
  const span = last - first;
  const dp = span >= 100 ? 0 : span >= 10 ? 0 : span >= 1 ? 1 : 2;

  const yOf = (count: number) => padT + plotH - (scale(count) / top) * plotH;
  const xOf = (v: number) => padL + ((v - first) / (span || 1)) * plotW;

  const gridValues = [0, peak / 2, peak];
  const xTicks = [bins[0]?.x0 ?? 0, bins[Math.floor(n / 2)]?.x0 ?? 0, last];

  return (
    <div className={cx('cs-hist', className)}>
      <div className="cs-hist__frame">
        <svg
          viewBox={`0 0 ${W} ${height}`}
          role="img"
          aria-label={
            ariaLabel ??
            `Histogram of ${n} bins, ${total} events${unit ? `, ${unit}` : ''}`
          }
        >
          {gridValues.map((value) => (
            <g key={value}>
              <line
                className="cs-hist__grid"
                x1={padL}
                x2={W - padR}
                y1={yOf(value)}
                y2={yOf(value)}
              />
              <text className="cs-hist__tick" x={padL - 5} y={yOf(value) + 2.5} textAnchor="end">
                {fixed(log ? Math.round(10 ** scale(value) - 1) : value, 0)}
              </text>
            </g>
          ))}

          {bins.map((bin) => {
            const h = padT + plotH - yOf(bin.count);
            return (
              <rect
                key={bin.x0}
                className="cs-hist__bar"
                data-empty={bin.count === 0 || undefined}
                x={padL + (bin.x0 - first) * (plotW / (span || 1))}
                y={yOf(bin.count)}
                width={Math.max(barW - gap, 0.5)}
                height={Math.max(h, 0)}
              />
            );
          })}

          {marker !== undefined && (
            <>
              <line
                className="cs-hist__marker"
                x1={xOf(marker)}
                x2={xOf(marker)}
                y1={padT}
                y2={padT + plotH}
              />
              <text
                className="cs-hist__marker-label"
                x={xOf(marker) + 3}
                y={padT + 7}
                textAnchor="start"
              >
                {fixed(marker, dp)}
              </text>
            </>
          )}

          <line
            className="cs-hist__axis"
            x1={padL}
            x2={W - padR}
            y1={padT + plotH}
            y2={padT + plotH}
          />

          {xTicks.map((tick, i) => (
            <text
              key={tick}
              className="cs-hist__tick"
              x={xOf(tick)}
              y={height - 6}
              textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'}
            >
              {fixed(tick, dp)}
            </text>
          ))}
        </svg>
      </div>

      <div className="cs-hist__foot">
        <span>
          {n} bins
          {unit ? ` · ${unit}` : ''}
        </span>
        <span>{fixed(total, 0)} events</span>
      </div>
    </div>
  );
}
