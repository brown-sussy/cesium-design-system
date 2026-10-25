import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  accent?: boolean;
  flush?: boolean;
}

export function Card({ interactive, accent, flush, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cx(
        'cs-card',
        interactive && 'cs-card--interactive',
        accent && 'cs-card--accent',
        flush && 'cs-card--flush',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  title?: ReactNode;
  desc?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function CardHeader({ title, desc, actions, children, className }: CardHeaderProps) {
  return (
    <div className={cx('cs-card__header', className)}>
      {children ?? (
        <div className="cs-card__heading">
          {title && <div className="cs-card__title">{title}</div>}
          {desc && <div className="cs-card__desc">{desc}</div>}
        </div>
      )}
      {actions}
    </div>
  );
}

export function CardBody({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('cs-card__body', className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('cs-card__footer', className)} {...rest}>
      {children}
    </div>
  );
}
