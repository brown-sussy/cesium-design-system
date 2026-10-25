import { useId } from 'react';
import { cx } from '../lib/cx';

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  area?: boolean;
  showDot?: boolean;
  color?: string;
  className?: string;
}

export function Sparkline({
  data,
  width = 120,
  height = 32,
  area = true,
  showDot = false,
  color,
  className,
}: SparklineProps) {
  const gradientId = useId().replace(/:/g, '');
  if (data.length < 2) return null;

  const pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = (width - pad * 2) / (data.length - 1);

  const points = data.map((value, i) => {
    const x = pad + i * step;
    const y = height - pad - ((value - min) / range) * (height - pad * 2);
    return [x, y] as const;
  });

  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  const areaPath = `${line} L${(width - pad).toFixed(2)} ${height} L${pad} ${height} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      className={cx('cs-spark', className)}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={color ? ({ ['--cs-accent' as string]: color } as React.CSSProperties) : undefined}
    >
      {area && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--cs-accent)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--cs-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="cs-spark__area" d={areaPath} fill={`url(#${gradientId})`} />
        </>
      )}
      <path className="cs-spark__line" d={line} pathLength={1} />
      {showDot && <circle className="cs-spark__dot" cx={last[0]} cy={last[1]} r={2.5} />}
    </svg>
  );
}
