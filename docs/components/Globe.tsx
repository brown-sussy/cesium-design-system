/**
 * Hero globe — a wireframe sphere in orthographic projection.
 * Latitudes are ellipses, longitudes are ellipses with varying rx.
 * Purely decorative; drawn with the system's accent so it inherits theme.
 */
export function Globe({ size = 430 }: { size?: number }) {
  const R = 150;
  const C = 200;

  const latitudes = [-60, -30, 0, 30, 60].map((lat) => {
    const rad = (lat * Math.PI) / 180;
    return { lat, cy: C - Math.sin(rad) * R, rx: Math.cos(rad) * R, ry: Math.cos(rad) * R * 0.19 };
  });

  const longitudes = Array.from({ length: 11 }, (_, i) => (i - 5) * 15).map((lon) => {
    const rad = (lon * Math.PI) / 180;
    return { lon, rx: Math.abs(Math.cos(rad)) * R };
  });

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="cs-globe-body" cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor="var(--cs-accent)" stopOpacity="0.20" />
          <stop offset="46%" stopColor="var(--cs-accent)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--cs-accent)" stopOpacity="0.01" />
        </radialGradient>
        <radialGradient id="cs-globe-rim" cx="50%" cy="50%" r="50%">
          <stop offset="88%" stopColor="var(--cs-accent)" stopOpacity="0" />
          <stop offset="97%" stopColor="var(--cs-accent)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--cs-accent)" stopOpacity="0" />
        </radialGradient>
        <filter id="cs-globe-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <clipPath id="cs-globe-clip">
          <circle cx={C} cy={C} r={R} />
        </clipPath>
      </defs>

      {/* atmosphere halo */}
      <circle cx={C} cy={C} r={R + 7} fill="url(#cs-globe-rim)" filter="url(#cs-globe-blur)" opacity="0.8" />

      {/* body */}
      <circle cx={C} cy={C} r={R} fill="url(#cs-globe-body)" />

      <g clipPath="url(#cs-globe-clip)">
        {latitudes.map((l) => (
          <ellipse
            key={`lat-${l.lat}`}
            cx={C}
            cy={l.cy}
            rx={l.rx}
            ry={l.ry}
            stroke="var(--cs-accent)"
            strokeOpacity={l.lat === 0 ? 0.3 : 0.16}
            strokeWidth={l.lat === 0 ? 1 : 0.75}
          />
        ))}
        {longitudes.map((l) => (
          <ellipse
            key={`lon-${l.lon}`}
            cx={C}
            cy={C}
            rx={Math.max(l.rx, 0.6)}
            ry={R}
            stroke="var(--cs-accent)"
            strokeOpacity={l.lon === 0 ? 0.26 : 0.13}
            strokeWidth={l.lon === 0 ? 1 : 0.75}
          />
        ))}

      </g>

      {/* limb */}
      <circle cx={C} cy={C} r={R} stroke="var(--cs-accent)" strokeOpacity="0.5" strokeWidth="1" />

      {/* station marker — the rings ping outward like a radar contact */}
      <g>
        <circle cx={C + 58} cy={C - 92} r={3.2} fill="var(--cs-accent)" />
        <circle
          className="globe-ping"
          cx={C + 58}
          cy={C - 92}
          r={8}
          stroke="var(--cs-accent)"
          strokeOpacity="0.4"
          strokeWidth="0.9"
        />
        <circle
          className="globe-ping globe-ping--late"
          cx={C + 58}
          cy={C - 92}
          r={8}
          stroke="var(--cs-accent)"
          strokeOpacity="0.4"
          strokeWidth="0.9"
        />
      </g>
    </svg>
  );
}
