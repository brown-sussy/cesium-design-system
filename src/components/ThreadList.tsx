import { cx } from '../lib/cx';

export interface ThreadItem {
  id: string;
  title: string;
  preview?: string;
  time?: string;
  unread?: number;
}

export interface ThreadListProps {
  items: ThreadItem[];
  value?: string;
  onSelect?: (id: string) => void;
  className?: string;
  'aria-label'?: string;
}

/** Conversations, as rows. The active one is marked by an accent edge. */
export function ThreadList({
  items,
  value,
  onSelect,
  className,
  'aria-label': ariaLabel = 'Conversations',
}: ThreadListProps) {
  return (
    <ul className={cx('cs-threads', className)} aria-label={ariaLabel}>
      {items.map((item) => {
        const active = item.id === value;
        return (
          <li key={item.id}>
            <button
              type="button"
              className="cs-threads__item"
              data-active={active || undefined}
              aria-current={active || undefined}
              onClick={() => onSelect?.(item.id)}
            >
              <span className="cs-threads__title">
                {item.title}
                {item.unread ? <span className="cs-threads__unread">{item.unread}</span> : null}
              </span>
              {item.time && <span className="cs-threads__time">{item.time}</span>}
              {item.preview && <span className="cs-threads__preview">{item.preview}</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
