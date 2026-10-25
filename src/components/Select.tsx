import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../lib/cx';
import { usePopover } from '../lib/usePopover';
import { Icon } from './Icon';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** Right-aligned secondary text — a unit, a count, a key. */
  hint?: ReactNode;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  invalid?: boolean;
  /** Adds a filter field at the top of the list. */
  searchable?: boolean;
  /** Posts the value with a native form via a hidden input. */
  name?: string;
  id?: string;
  /** Accessible name, when there is no visible Field label. */
  label?: string;
  emptyText?: string;
  className?: string;
}

/**
 * A listbox drawn by the system, not by the operating system.
 *
 * The native `<select>` popup is the one surface a design system cannot style:
 * macOS and Windows each render their own menu, ignore tokens, and drop the
 * caret animation entirely. This replaces it with a portalled listbox that
 * keeps the parts that matter — `role="combobox"`, `aria-activedescendant`,
 * typeahead, form submission through a hidden input — and owns the rest.
 */
export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select…',
  size = 'md',
  disabled,
  invalid,
  searchable,
  name,
  id,
  label,
  emptyText = 'No matches',
  className,
}: SelectProps) {
  const uid = useId();
  const listId = `cs-select-list-${uid}`;
  const optId = (i: number) => `cs-select-opt-${uid}-${i}`;

  const controlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue ?? '');
  const current = controlled ? value : inner;

  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const typeahead = useRef({ buf: '', at: 0 });

  const { open, setOpen, triggerRef, panelRef, panelStyle } = usePopover<HTMLButtonElement>({
    align: 'start',
    side: 'bottom',
    matchWidth: true,
    offset: 4,
  });

  const selected = options.find((o) => o.value === current);
  const needle = query.trim().toLowerCase();
  const visible = needle
    ? options.filter((o) => o.label.toLowerCase().includes(needle))
    : options;

  const pickable = visible.reduce<number[]>((acc, o, i) => {
    if (!o.disabled) acc.push(i);
    return acc;
  }, []);

  const commit = (option: SelectOption) => {
    if (option.disabled) return;
    if (!controlled) setInner(option.value);
    onValueChange?.(option.value);
    setOpen(false);
    setQuery('');
    triggerRef.current?.focus();
  };

  const openList = () => {
    if (disabled) return;
    setOpen(true);
    const start = visible.findIndex((o) => o.value === current && !o.disabled);
    setActive(start >= 0 ? start : (pickable[0] ?? -1));
  };

  // Focus the filter field when the list opens in search mode.
  useLayoutEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    if (searchable) searchRef.current?.focus({ preventScroll: true });
  }, [open, searchable]);

  // Keep the active row in view inside the panel.
  useEffect(() => {
    if (!open || active < 0) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const move = (step: 1 | -1) => {
    if (!pickable.length) return;
    const at = pickable.indexOf(active);
    const next =
      at === -1
        ? step === 1
          ? pickable[0]
          : pickable[pickable.length - 1]
        : pickable[(at + step + pickable.length) % pickable.length];
    setActive(next);
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      move(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(pickable[0] ?? -1);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(pickable[pickable.length - 1] ?? -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const option = visible[active];
      if (option) commit(option);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
    } else if (e.key.length === 1 && !searchable && /\S/.test(e.key)) {
      // Typeahead — jump to the first label starting with the typed run.
      const now = Date.now();
      const t = typeahead.current;
      t.buf = now - t.at > 600 ? e.key : t.buf + e.key;
      t.at = now;
      const hit = visible.findIndex(
        (o) => !o.disabled && o.label.toLowerCase().startsWith(t.buf.toLowerCase()),
      );
      if (hit >= 0) setActive(hit);
    }
  };

  const activeId = active >= 0 && visible[active] ? optId(active) : undefined;

  return (
    <div
      className={cx('cs-selectbox', className)}
      data-size={size}
      data-open={open || undefined}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
    >
      {name && <input type="hidden" name={name} value={current ?? ''} />}

      <button
        ref={triggerRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? activeId : undefined}
        aria-label={label}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        className="cs-selectbox__trigger"
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span
          className="cs-selectbox__value"
          data-placeholder={!selected || undefined}
        >
          {selected ? selected.label : placeholder}
        </span>
        {selected?.hint !== undefined && (
          <span className="cs-selectbox__hint">{selected.hint}</span>
        )}
        <Icon name="chevron-down" size={13} className="cs-selectbox__caret" />
      </button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={panelRef}
            className="cs-selectbox__panel"
            data-size={size}
            style={panelStyle}
            onKeyDown={onKeyDown}
          >
            {searchable && (
              <div className="cs-selectbox__search">
                <Icon name="search" size={13} />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    const first = options.findIndex(
                      (o) => !o.disabled && o.label.toLowerCase().includes(e.target.value.toLowerCase()),
                    );
                    setActive(first);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                      e.preventDefault();
                      onKeyDown(e as unknown as ReactKeyboardEvent);
                    }
                  }}
                  placeholder="Filter…"
                  aria-label="Filter options"
                  aria-controls={listId}
                  aria-activedescendant={activeId}
                  className="cs-selectbox__input"
                />
              </div>
            )}

            <div
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label={label}
              className="cs-selectbox__list cs-scroll"
              tabIndex={-1}
            >
              {visible.length === 0 && (
                <div className="cs-selectbox__empty">{emptyText}</div>
              )}
              {visible.map((option, i) => (
                <div
                  key={option.value}
                  id={optId(i)}
                  data-idx={i}
                  role="option"
                  aria-selected={option.value === current}
                  aria-disabled={option.disabled || undefined}
                  data-active={i === active || undefined}
                  data-selected={option.value === current || undefined}
                  className="cs-selectbox__option"
                  onPointerEnter={() => {
                    if (!option.disabled) setActive(i);
                  }}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => commit(option)}
                >
                  <span className="cs-selectbox__check" aria-hidden="true">
                    {option.value === current ? <Icon name="check" size={12} /> : null}
                  </span>
                  <span className="cs-selectbox__option-label">{option.label}</span>
                  {option.hint !== undefined && (
                    <span className="cs-selectbox__option-hint">{option.hint}</span>
                  )}
                </div>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
