import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Icon } from './Icon';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  /** Monospace affix, e.g. a unit such as "km" or a protocol. */
  prefixText?: string;
  suffixText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', invalid, prefix, suffix, prefixText, suffixText, className, disabled, ...rest },
  ref,
) {
  return (
    <div
      className={cx(
        'cs-input-shell',
        size !== 'md' && `cs-input-shell--${size}`,
        className,
      )}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
    >
      {prefix && <span className="cs-input-shell__affix">{prefix}</span>}
      {prefixText && <span className="cs-input-shell__affix cs-input-shell__affix--mono">{prefixText}</span>}
      <input
        ref={ref}
        className="cs-input-shell__input"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      {suffixText && <span className="cs-input-shell__affix cs-input-shell__affix--mono">{suffixText}</span>}
      {suffix && <span className="cs-input-shell__affix">{suffix}</span>}
    </div>
  );
});

export interface SearchInputProps extends Omit<InputProps, 'prefix' | 'suffix'> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { placeholder = 'Search…', onClear, ...rest },
  ref,
) {
  const [value, setValue] = useState('');
  return (
    <Input
      ref={ref}
      type="search"
      prefix={<Icon name="search" size={14} />}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        rest.onChange?.(e);
      }}
      suffix={
        value ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setValue('');
              onClear?.();
            }}
            style={{ display: 'inline-flex', background: 'none', border: 0, color: 'inherit', cursor: 'pointer' }}
          >
            <Icon name="close" size={12} />
          </button>
        ) : undefined
      }
      {...rest}
    />
  );
});
