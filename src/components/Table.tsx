import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface Column<T> {
  key: string;
  header: ReactNode;
  align?: 'left' | 'right';
  width?: string;
  mono?: boolean;
  primary?: boolean;
  render?: (row: T, index: number) => ReactNode;
}

export interface TableProps<T> {
  columns: Array<Column<T>>;
  rows: T[];
  rowKey: (row: T, index: number) => string;
  compact?: boolean;
  selectedKey?: string;
  onRowClick?: (row: T) => void;
  empty?: ReactNode;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  compact,
  selectedKey,
  onRowClick,
  empty = 'No records',
  className,
}: TableProps<T>) {
  return (
    <div className={cx('cs-table-wrap', className)}>
      <table className={cx('cs-table', compact && 'cs-table--compact')}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={col.align === 'right' ? 'cs-table__num' : undefined}
                scope="col"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="cs-table__empty">{empty}</div>
              </td>
            </tr>
          ) : (
            rows.map((row, i) => {
              const key = rowKey(row, i);
              return (
                <tr
                  key={key}
                  data-selected={selectedKey === key || undefined}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  style={onRowClick ? { cursor: 'pointer' } : undefined}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cx(
                        col.align === 'right' && 'cs-table__num',
                        col.mono && 'cs-table__mono',
                        col.primary && 'cs-table__primary',
                      )}
                    >
                      {col.render ? col.render(row, i) : (row[col.key] as ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
