import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  actions?: ReactNode;
  accent?: boolean;
  flush?: boolean;
}

export function Panel({ title, actions, accent, flush, className, children, ...rest }: PanelProps) {
  return (
    <div
      className={cx('cs-panel', accent && 'cs-panel--accent', flush && 'cs-panel--flush', className)}
      {...rest}
    >
      {(title || actions) && (
        <div className="cs-panel__head">
          {title && <div className="cs-panel__title">{title}</div>}
          {actions && <div className="cs-row" style={{ gap: 2 }}>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export function PanelBody({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('cs-panel__body', className)} {...rest}>
      {children}
    </div>
  );
}
