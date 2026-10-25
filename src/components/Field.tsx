import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Icon } from './Icon';

export interface FieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ label, hint, error, required, htmlFor, className, children }: FieldProps) {
  return (
    <div className={cx('cs-field', className)}>
      {label && (
        <label className="cs-field__label" htmlFor={htmlFor}>
          {label}
          {required && (
            <span className="cs-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <span className="cs-field__error" role="alert">
          <Icon name="error" size={12} />
          {error}
        </span>
      ) : (
        hint && <span className="cs-field__hint">{hint}</span>
      )}
    </div>
  );
}
