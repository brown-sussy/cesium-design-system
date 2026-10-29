import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export type ContextTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export interface ContextSegment {
  label: string;
  tokens: number;
  tone?: ContextTone;
}

export interface ContextMeterProps {
  segments: ContextSegment[];
  /** Context window size, in tokens. */
  limit: number;
  label?: ReactNode;
  showLegend?: boolean;
  className?: string;
}

function compact(n: number): string {
  if (n >= 1000) {
    const v = n / 1000;
    return `${v >= 100 ? v.toFixed(0) : v.toFixed(1)}k`;
  }
  return String(n);
}

/**
 * How much of the context window is spent, split by what spent it. The bar is
 * scaled to the limit, not to the used total — an empty half means room left.
 */
export function ContextMeter({
  segments,
  limit,
  label = 'Context',
  showLegend = true,
  className,
}: ContextMeterProps) {
  const used = segments.reduce((sum, s) => sum + s.tokens, 0);
  const raw = limit > 0 ? (used / limit) * 100 : 0;
  const scale = raw > 100 ? 100 / raw : 1;

  return (
    <div className={cx('cs-ctx', className)}>
      <div className="cs-ctx__head">
        <span>{label}</span>
        <span className="cs-ctx__value">
          {compact(used)} / {compact(limit)}
        </span>
      </div>

      <div
        className="cs-ctx__bar"
        role="img"
        aria-label={`${compact(used)} of ${compact(limit)} tokens used: ${segments
          .map((s) => `${s.label} ${compact(s.tokens)}`)
          .join(', ')}`}
      >
        {segments.map((seg) => (
          <span
            key={seg.label}
            className="cs-ctx__seg"
            data-tone={seg.tone ?? 'neutral'}
            style={{ width: `${Math.min((seg.tokens / limit) * 100 * scale, 100)}%` }}
          />
        ))}
      </div>

      {showLegend && (
        <div className="cs-ctx__legend">
          {segments.map((seg) => (
            <span className="cs-ctx__key" data-tone={seg.tone ?? 'neutral'} key={seg.label}>
              <i aria-hidden="true" />
              {seg.label} {compact(seg.tokens)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
