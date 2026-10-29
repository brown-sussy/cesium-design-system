import { cx } from '../lib/cx';

export interface EventTrack {
  /** Degrees, counter-clockwise from +x. */
  angle: number;
  /** 0–1 of the tracker radius. */
  length: number;
  /** +1 curves one way, −1 the other, 0 draws straight. */
  charge?: 1 | -1 | 0;
}

export interface EventHit {
  /** −1…1 of the detector radius. */
  x: number;
  y: number;
  r?: number;
}

export interface EventCalo {
  angle: number;
  /** 0–1 of the maximum tower height. */
  energy: number;
}

export interface EventDisplayProps {
  tracks?: EventTrack[];
  hits?: EventHit[];
  calorimeter?: EventCalo[];
  label?: string;
  size?: number;
  className?: string;
  'aria-label'?: string;
}

const S = 240;
const C = S / 2;
const TRACKER = [26, 44, 62];
const CALO_INNER = 78;
const CALO_OUTER = 96;

const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * A transverse view of one collision: tracker layers, charged tracks from the
 * vertex, and calorimeter towers. Geometry only — no simulation, no randomness,
 * so the same event always draws the same picture.
 */
export function EventDisplay({
  tracks = [],
  hits = [],
  calorimeter = [],
  label,
  size,
  className,
  'aria-label': ariaLabel,
}: EventDisplayProps) {
  return (
    <svg
      className={cx('cs-event', className)}
      viewBox={`0 0 ${S} ${S}`}
      width={size}
      height={size}
      role="img"
      aria-label={ariaLabel ?? `Event display with ${tracks.length} tracks`}
    >
      {/* beam axis */}
      <line
        className="cs-event__ring"
        x1={8}
        x2={S - 8}
        y1={C}
        y2={C}
        strokeDasharray="2 4"
      />

      {TRACKER.map((r) => (
        <circle key={r} className="cs-event__ring" cx={C} cy={C} r={r} />
      ))}
      <circle
        className="cs-event__ring cs-event__ring--detector"
        cx={C}
        cy={C}
        r={CALO_INNER}
      />
      <circle
        className="cs-event__ring cs-event__ring--detector"
        cx={C}
        cy={C}
        r={CALO_OUTER}
      />

      {calorimeter.map((tower, i) => {
        const a = rad(tower.angle);
        const r2 = CALO_INNER + Math.min(Math.max(tower.energy, 0), 1) * (CALO_OUTER - CALO_INNER);
        return (
          <line
            key={i}
            className="cs-event__calo"
            x1={C + Math.cos(a) * (CALO_INNER + 1)}
            y1={C - Math.sin(a) * (CALO_INNER + 1)}
            x2={C + Math.cos(a) * r2}
            y2={C - Math.sin(a) * r2}
            strokeWidth={3.2}
          />
        );
      })}

      {hits.map((hit, i) => (
        <circle
          key={i}
          className="cs-event__hit"
          cx={C + hit.x * CALO_OUTER}
          cy={C - hit.y * CALO_OUTER}
          r={hit.r ?? 1.1}
        />
      ))}

      {tracks.map((track, i) => {
        const a = rad(track.angle);
        const r = TRACKER[0] + Math.min(Math.max(track.length, 0), 1) * (CALO_INNER - TRACKER[0]);
        const ex = C + Math.cos(a) * r;
        const ey = C - Math.sin(a) * r;
        const bend = (track.charge ?? 0) * 9;
        const mx = (C + ex) / 2 + Math.sin(a) * bend;
        const my = (C + ey) / 2 + Math.cos(a) * bend;
        const charge = track.charge ?? 0;
        return (
          <path
            key={i}
            className={cx(
              'cs-event__track',
              charge < 0 && 'cs-event__track--negative',
              charge === 0 && 'cs-event__track--neutral',
            )}
            d={`M ${C} ${C} Q ${mx} ${my} ${ex} ${ey}`}
          />
        );
      })}

      <circle className="cs-event__vertex" cx={C} cy={C} r={1.8} />

      {label && (
        <text className="cs-event__label" x={8} y={13}>
          {label}
        </text>
      )}
    </svg>
  );
}
