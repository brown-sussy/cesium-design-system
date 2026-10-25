import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate, className, ...rest },
  ref,
) {
  const inner = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inner.current) inner.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  return (
    <label className={cx('cs-check', className)}>
      <input
        ref={(node) => {
          inner.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as { current: HTMLInputElement | null }).current = node;
        }}
        type="checkbox"
        className="cs-check__input"
        {...rest}
      />
      <span className="cs-check__box" aria-hidden="true" />
      {label && <span className="cs-check__label">{label}</span>}
    </label>
  );
});

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, ...rest },
  ref,
) {
  return (
    <label className={cx('cs-check', className)}>
      <input ref={ref} type="radio" className="cs-check__input" {...rest} />
      <span className="cs-check__box cs-radio__box" aria-hidden="true" />
      {label && <span className="cs-check__label">{label}</span>}
    </label>
  );
});

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{ value: string; label: ReactNode; disabled?: boolean }>;
  direction?: 'row' | 'column';
  className?: string;
}

export function RadioGroup({ name, value, onChange, options, direction = 'column', className }: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cx('cs-stack', className)}
      style={{ gap: 'var(--cs-space-8)', flexDirection: direction }}
    >
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          disabled={opt.disabled}
          checked={value === opt.value}
          onChange={() => onChange?.(opt.value)}
        />
      ))}
    </div>
  );
}
