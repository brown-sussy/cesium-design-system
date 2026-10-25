import { cx } from '../lib/cx';

export interface ScaleBarProps {
  distance: number;
  unit?: string;
  width?: number;
  label?: string;
  className?: string;
}

export function ScaleBar({ distance, unit = 'km', width = 132, label, className }: ScaleBarProps) {
  return (
    <div
      className={cx('cs-scalebar', className)}
      style={{ ['--cs-scalebar-w' as string]: `${width}px` }}
      aria-label={`Scale: ${distance} ${unit}`}
    >
      <span className="cs-scalebar__label">{label ?? `${distance} ${unit}`}</span>
      <div className="cs-scalebar__track">
        <span className="cs-scalebar__mid" />
      </div>
    </div>
  );
}
