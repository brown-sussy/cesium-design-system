import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { cx } from '../lib/cx';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  /** Readout to the right of the track. */
  showValue?: boolean;
  formatValue?: (value: number) => string;
  /** Explicit marks under the track, in value units. */
  ticks?: number[];
  disabled?: boolean;
  /** Posts the value with a native form via a hidden input. */
  name?: string;
  /** Accessible name, when there is no visible Field label. */
  label?: string;
  className?: string;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * A track, a fill and a thumb, all drawn by the system.
 *
 * The native range input renders a different widget in every engine and can
 * only be reached through `::-webkit-slider-thumb` / `::-moz-range-thumb`,
 * which means no ticks, no drag readout and no consistent hit area. This
 * builds the same affordance from a div with `role="slider"` and keeps the
 * keyboard model intact.
 */
export function Slider({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  showValue = false,
  formatValue,
  ticks,
  disabled,
  name,
  label,
  className,
}: SliderProps) {
  const uid = useId();
  const controlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue ?? min);
  const current = controlled ? (value as number) : inner;

  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const span = max - min;
  const pct = span === 0 ? 0 : ((current - min) / span) * 100;
  const text = formatValue ? formatValue(current) : String(current);

  const set = useCallback(
    (next: number) => {
      const snapped = clamp(min + Math.round((next - min) / step) * step, min, max);
      const clean = Number(snapped.toFixed(6));
      if (clean === current) return;
      if (!controlled) setInner(clean);
      onValueChange?.(clean);
    },
    [controlled, current, min, max, step, onValueChange],
  );

  const fromClientX = (clientX: number) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r || r.width === 0) return;
    set(min + clamp((clientX - r.left) / r.width, 0, 1) * span);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    fromClientX(e.clientX);
    e.currentTarget.focus();
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || disabled) return;
    fromClientX(e.clientX);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (disabled) return;
    const big = step * 10;
    const map: Record<string, number> = {
      ArrowRight: current + step,
      ArrowUp: current + step,
      ArrowLeft: current - step,
      ArrowDown: current - step,
      PageUp: current + big,
      PageDown: current - big,
      Home: min,
      End: max,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    set(map[e.key]);
  };

  const tickList = ticks?.filter((t) => t >= min && t <= max) ?? [];

  return (
    <div
      className={cx('cs-slider', className)}
      data-dragging={dragging || undefined}
      data-disabled={disabled || undefined}
    >
      {name && <input type="hidden" name={name} value={current} />}

      <div className="cs-slider__rail">
        <div
          ref={trackRef}
          className="cs-slider__track"
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
          aria-valuetext={text}
          aria-label={label}
          aria-disabled={disabled || undefined}
          aria-orientation="horizontal"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
        >
          <span className="cs-slider__fill" style={{ width: `${pct}%` }} />
          <span className="cs-slider__thumb" style={{ left: `${pct}%` }}>
            <span className="cs-slider__bubble" aria-hidden="true">
              {text}
            </span>
          </span>
        </div>

        {tickList.length > 0 && (
          <div className="cs-slider__ticks" aria-hidden="true">
            {tickList.map((t) => (
              <span
                key={t}
                className="cs-slider__tick"
                data-on={t <= current || undefined}
                style={{ left: `${((t - min) / (span || 1)) * 100}%` }}
              />
            ))}
          </div>
        )}
      </div>

      {showValue && (
        <span className="cs-slider__value" id={`cs-slider-val-${uid}`}>
          {text}
        </span>
      )}
    </div>
  );
}
