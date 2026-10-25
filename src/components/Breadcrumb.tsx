import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { cx } from '../lib/cx';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

export function Breadcrumb({ items, separator = '/', className }: BreadcrumbProps) {
  return (
    <nav className={cx('cs-breadcrumb', className)} aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={i}>
            {i > 0 && (
              <span className="cs-breadcrumb__sep" aria-hidden="true">
                {separator}
              </span>
            )}
            {item.href ? (
              <a className="cs-breadcrumb__item" href={item.href} data-current={isLast || undefined}>
                {item.label}
              </a>
            ) : item.onClick ? (
              <button
                type="button"
                className="cs-breadcrumb__item"
                onClick={item.onClick}
                data-current={isLast || undefined}
                style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit' }}
              >
                {item.label}
              </button>
            ) : (
              <span className="cs-breadcrumb__item" data-current={isLast || undefined} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
