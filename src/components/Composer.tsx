import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Icon } from './Icon';

export interface ComposerProps {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  onStop?: () => void;
  /** Swaps send for stop and blocks Enter. */
  busy?: boolean;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  hint?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

/**
 * The input line of a chat surface. Enter sends, Shift+Enter breaks the line —
 * the same contract every other chat client has, so it is not documented in the
 * UI beyond a mono hint.
 */
export function Composer({
  value,
  onChange,
  onSend,
  onStop,
  busy,
  disabled,
  placeholder = 'Ask about the scene…',
  maxLength,
  rows = 2,
  hint = '⏎ send · ⇧⏎ line break',
  className,
  'aria-label': ariaLabel = 'Message',
}: ComposerProps) {
  const [inner, setInner] = useState('');
  const text = value ?? inner;

  const setText = (next: string) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  const canSend = text.trim().length > 0 && !busy && !disabled;
  const over = maxLength !== undefined && text.length > maxLength;

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (canSend && !over) onSend?.();
    }
  };

  return (
    <div
      className={cx('cs-composer', className)}
      data-disabled={disabled || undefined}
      data-busy={busy || undefined}
    >
      <textarea
        className="cs-composer__input"
        value={text}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-label={ariaLabel}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />

      <div className="cs-composer__bar">
        <button type="button" className="cs-composer__attach" aria-label="Attach a file">
          <Icon name="paperclip" size={12} />
        </button>

        <span className="cs-composer__hint">{hint}</span>

        {maxLength !== undefined && (
          <span className="cs-composer__count" data-over={over || undefined}>
            {text.length} / {maxLength}
          </span>
        )}

        <button
          type="button"
          className="cs-composer__send"
          data-busy={busy || undefined}
          disabled={busy ? false : !canSend || over}
          onClick={busy ? onStop : onSend}
          aria-label={busy ? 'Stop generating' : 'Send message'}
        >
          <Icon name={busy ? 'stop' : 'send'} size={12} />
        </button>
      </div>
    </div>
  );
}
