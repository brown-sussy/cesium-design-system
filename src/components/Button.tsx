import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'subtle'
  | 'danger'
  | 'danger-ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    block = false,
    loading = false,
    iconLeft,
    iconRight,
    className,
    children,
    disabled,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'cs-btn',
        `cs-btn--${variant}`,
        size !== 'md' && `cs-btn--${size}`,
        block && 'cs-btn--block',
        className,
      )}
      disabled={disabled || loading}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="cs-btn__spinner" aria-hidden="true" />}
      {iconLeft && <span className="cs-btn__icon">{iconLeft}</span>}
      {children}
      {iconRight && <span className="cs-btn__icon">{iconRight}</span>}
    </button>
  );
});

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'iconLeft' | 'iconRight' | 'block'> {
  /** Accessible name — icon-only controls must be labelled. */
  label: string;
  children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, variant = 'ghost', className, children, ...rest },
  ref,
) {
  return (
    <Button
      ref={ref}
      variant={variant}
      aria-label={label}
      className={cx('cs-btn--icon', className)}
      {...rest}
    >
      <span className="cs-btn__icon">{children}</span>
    </Button>
  );
});

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function ButtonGroup({ children, className, ...rest }: ButtonGroupProps) {
  return (
    <div className={cx('cs-btn-group', className)} role="group" {...rest}>
      {children}
    </div>
  );
}
