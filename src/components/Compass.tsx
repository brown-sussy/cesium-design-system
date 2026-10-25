import { cx } from '../lib/cx';

export interface CompassProps {
  /** Camera heading in degrees, 0 = north. */
  heading?: number;
  size?: number;
  showHeading?: boolean;
  className?: string;
}

const TICKS = Array.from({ length: 24 }, (_, i) => i * 15);
const LABELS = [
  { text: 'N', angle: 0, cls: 'cs-compass__label--n' },
  { text: 'E', angle: 90, cls: '' },
  { text: 'S', angle: 180, cls: '' },
  { text: 'W', angle: 270, cls: '' },
];

export function Compass({ heading = 0, size = 72, showHeading = true, className }: CompassProps) {
  const c = 36;
  const normalized = ((heading % 360) + 360) % 360;
  const showPlate = showHeading && size >= 80;

  const polar = (angleDeg: number, radius: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return [c + Math.cos(rad) * radius, c + Math.sin(rad) * radius] as const;
  };

  return (
    <div
      className={cx('cs-compass', className)}
      style={{ ['--cs-compass-size' as string]: `${size}px` }}
      role="img"
      aria-label={`Compass, heading ${Math.round(normalized)} degrees`}
    >
      <span className="cs-compass__dial">
        <svg className="cs-compass__svg" viewBox="0 0 72 72">
          <circle className="cs-compass__ring" cx={c} cy={c} r={33.5} />
          <circle className="cs-compass__inner" cx={c} cy={c} r={17.5} />

          {/* Card — fixed. Ticks and cardinal letters never move. */}
          <g className="cs-compass__card">
            {TICKS.map((angle) => {
              const major = angle % 45 === 0;
              const [x1, y1] = polar(angle, major ? 26.5 : 28);
              const [x2, y2] = polar(angle, 31.5);
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className={major ? 'cs-compass__tick cs-compass__tick--major' : 'cs-compass__tick'}
                />
              );
            })}

            {LABELS.map((label) => {
              const [x, y] = polar(label.angle, 21.5);
              return (
                <text
                  key={label.text}
                  className={cx('cs-compass__label', label.cls)}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {label.text}
                </text>
              );
            })}
          </g>

          {/* Needle — the only thing that turns. It tracks north, so it
              rotates by the negative of the camera heading. */}
          <g className="cs-compass__needle" style={{ transform: `rotate(${-normalized}deg)` }}>
            <polygon className="cs-compass__needle-n" points="36,19.5 38.6,32.8 36,30.9 33.4,32.8" />
            <polygon className="cs-compass__needle-s" points="36,52.5 38.6,39.2 36,41.1 33.4,39.2" />
          </g>

          <circle className="cs-compass__hub" cx={c} cy={c} r={2.1} />
        </svg>
      </span>
      {showPlate && (
        <span className="cs-compass__heading">{String(Math.round(normalized)).padStart(3, '0')}°</span>
      )}
    </div>
  );
}
