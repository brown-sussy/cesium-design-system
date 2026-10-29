import { useState, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Icon } from './Icon';

export type ToolStatus = 'running' | 'done' | 'failed';

export interface ToolCallProps {
  name: string;
  args?: Record<string, string | number | boolean>;
  status?: ToolStatus;
  /** Returned payload — a string is printed as-is in the mono body. */
  result?: ReactNode;
  duration?: string;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * One tool invocation. The header carries enough to read the call without
 * expanding it; the body is the raw payload.
 */
export function ToolCall({
  name,
  args,
  status = 'done',
  result,
  duration,
  defaultOpen = false,
  className,
}: ToolCallProps) {
  const [open, setOpen] = useState(defaultOpen);
  const argLine = args
    ? Object.entries(args)
        .map(([k, v]) => `${k}=${typeof v === 'string' ? `"${v}"` : v}`)
        .join(' · ')
    : undefined;

  return (
    <div className={cx('cs-tool', className)} data-status={status} data-open={open}>
      <div className="cs-tool__head">
        <Icon name="terminal" size={12} className="cs-tool__icon" />
        <span className="cs-tool__name">{name}</span>
        {argLine && <span className="cs-tool__args">{argLine}</span>}
        <span className="cs-tool__meta">
          {duration && <span>{duration}</span>}
          <span className="cs-tool__status" data-status={status}>
            {status}
          </span>
          {result !== undefined && (
            <button
              type="button"
              className="cs-tool__toggle"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? 'Hide result' : 'Show result'}
            >
              <Icon name="chevron-down" size={10} />
            </button>
          )}
        </span>
      </div>

      {open && result !== undefined && <div className="cs-tool__body">{result}</div>}
    </div>
  );
}
