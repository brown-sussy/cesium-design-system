import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  block?: boolean;
}

export function Toolbar({ label, block, className, children, ...rest }: ToolbarProps) {
  return (
    <div className={cx('cs-toolbar', block && 'cs-toolbar--block', className)} role="toolbar" {...rest}>
      {label && <span className="cs-toolbar__label">{label}</span>}
      {children}
    </div>
  );
}

export function ToolbarSeparator() {
  return <span className="cs-toolbar__sep" aria-hidden="true" />;
}
