import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  size?: 'sm' | 'md';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, size = 'md', className, ...rest },
  ref,
) {
  return (
    <label className={cx('cs-switch', size === 'sm' && 'cs-switch--sm', className)}>
      <input ref={ref} type="checkbox" role="switch" className="cs-switch__input" {...rest} />
      <span className="cs-switch__track" aria-hidden="true">
        <span className="cs-switch__thumb" />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
});
