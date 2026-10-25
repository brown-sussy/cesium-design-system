import { cx } from '../lib/cx';
import { Icon } from './Icon';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  showMeta?: boolean;
  total?: number;
  pageSize?: number;
  className?: string;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({
  page,
  pageCount,
  onChange,
  showMeta,
  total,
  pageSize,
  className,
}: PaginationProps) {
  const pages: Array<number | 'gap'> = [];
  if (pageCount <= 7) {
    pages.push(...range(1, pageCount));
  } else if (page <= 4) {
    pages.push(...range(1, 5), 'gap', pageCount);
  } else if (page >= pageCount - 3) {
    pages.push(1, 'gap', ...range(pageCount - 4, pageCount));
  } else {
    pages.push(1, 'gap', page - 1, page, page + 1, 'gap', pageCount);
  }

  return (
    <nav className={cx('cs-pagination', className)} aria-label="Pagination">
      <button
        type="button"
        className="cs-pagination__btn"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <Icon name="chevron-left" size={12} />
      </button>
      {pages.map((p, i) =>
        p === 'gap' ? (
          <span className="cs-pagination__gap" key={`gap-${i}`}>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className="cs-pagination__btn"
            aria-current={p === page ? 'page' : undefined}
            data-active={p === page}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        className="cs-pagination__btn"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
      >
        <Icon name="chevron-right" size={12} />
      </button>
      {showMeta && total !== undefined && (
        <span className="cs-pagination__meta">
          {total.toLocaleString('en-US')} records
          {pageSize ? ` · ${pageSize}/page` : ''}
        </span>
      )}
    </nav>
  );
}
