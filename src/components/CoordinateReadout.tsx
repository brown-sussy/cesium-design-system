import { cx } from '../lib/cx';

export interface CoordinateReadoutProps {
  lat: number;
  lon: number;
  alt?: number;
  precision?: number;
  altUnit?: string;
  accentAlt?: boolean;
  className?: string;
}

function fmtCoord(value: number, precision: number, pos: string, neg: string) {
  const hemisphere = value >= 0 ? pos : neg;
  return `${Math.abs(value).toFixed(precision)}° ${hemisphere}`;
}

export function CoordinateReadout({
  lat,
  lon,
  alt,
  precision = 4,
  altUnit = 'm',
  accentAlt = true,
  className,
}: CoordinateReadoutProps) {
  return (
    <div className={cx('cs-coords', className)} aria-label="Camera position">
      <div className="cs-coords__item">
        <span className="cs-coords__key">Lat</span>
        <span className="cs-coords__value">{fmtCoord(lat, precision, 'N', 'S')}</span>
      </div>
      <div className="cs-coords__item">
        <span className="cs-coords__key">Lon</span>
        <span className="cs-coords__value">{fmtCoord(lon, precision, 'E', 'W')}</span>
      </div>
      {alt !== undefined && (
        <div className="cs-coords__item">
          <span className="cs-coords__key">Alt</span>
          <span className={cx('cs-coords__value', accentAlt && 'cs-coords__value--accent')}>
            {alt.toLocaleString('en-US', { maximumFractionDigits: 0 })} {altUnit}
          </span>
        </div>
      )}
    </div>
  );
}
