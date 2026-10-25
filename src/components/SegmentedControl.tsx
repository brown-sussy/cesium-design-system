import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { useIndicator } from '../lib/useIndicator';

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options: Array<SegmentedOption<T>>;
  value: T;
  onChange: (value: T) => void;
  accent?: boolean;
  block?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  accent,
  block,
  className,
  ...rest
}: SegmentedControlProps<T>) {
  const { ref, box } = useIndicator<HTMLDivElement>(value);

  return (
    <div
      ref={ref}
      role="tablist"
      data-indicator={box ? 'on' : 'off'}
      className={cx(
        'cs-segmented',
        accent && 'cs-segmented--accent',
        block && 'cs-segmented--block',
        className,
      )}
      {...rest}
    >
      {box && (
        <span
          className="cs-segmented__thumb"
          aria-hidden="true"
          style={{ transform: `translateX(${box.x}px)`, width: `${box.w}px` }}
        />
      )}
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          data-active={value === opt.value}
          disabled={opt.disabled}
          className="cs-segmented__item"
          onClick={() => onChange(opt.value)}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
