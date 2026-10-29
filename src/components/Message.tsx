import type { ReactNode } from 'react';
import { cx } from '../lib/cx';

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

export interface MessageProps {
  role: MessageRole;
  children: ReactNode;
  /** Display name, when the role alone is not enough. */
  author?: ReactNode;
  time?: ReactNode;
  /** Adds the caret and announces the message as still arriving. */
  streaming?: boolean;
  actions?: ReactNode;
  /** Token count, latency — anything the transcript should admit to. */
  meta?: Array<{ label: string; value: ReactNode }>;
  className?: string;
}

export function Message({
  role,
  children,
  author,
  time,
  streaming,
  actions,
  meta,
  className,
}: MessageProps) {
  return (
    <li
      className={cx('cs-msg', className)}
      data-role={role}
      data-streaming={streaming || undefined}
      aria-busy={streaming || undefined}
    >
      <div className="cs-msg__head">
        <span className="cs-msg__role">{role}</span>
        {author && <span className="cs-msg__author">{author}</span>}
        {time && <span className="cs-msg__time">{time}</span>}
      </div>

      <div className="cs-msg__body">{children}</div>

      {(actions || meta) && (
        <div className="cs-msg__foot">
          {meta && (
            <span className="cs-msg__meta">
              {meta.map((item) => (
                <span key={item.label}>
                  {item.label} {item.value}
                </span>
              ))}
            </span>
          )}
          {actions}
        </div>
      )}
    </li>
  );
}

export interface MessageListProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

/** Ordered transcript. `role="log"` so a screen reader hears new messages. */
export function MessageList({ children, label = 'Conversation', className }: MessageListProps) {
  return (
    <ol className={cx('cs-thread', className)} role="log" aria-label={label}>
      {children}
    </ol>
  );
}
