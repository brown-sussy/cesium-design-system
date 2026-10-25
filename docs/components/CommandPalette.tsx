import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, Kbd } from '@cesium-ds/core';
import { paletteItems } from '../lib/site';
import { navigate } from '../lib/router';

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q
      ? paletteItems.filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            item.group.toLowerCase().includes(q) ||
            (item.desc ?? '').toLowerCase().includes(q),
        )
      : paletteItems;
    return pool.slice(0, 14);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const go = (to: string) => {
    navigate(to);
    onClose();
  };

  let lastGroup = '';

  return (
    <div className="cmdk-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cmdk" role="dialog" aria-modal="true" aria-label="Search">
        <div className="cmdk__input-row">
          <Icon name="search" size={15} style={{ color: 'var(--cs-text-tertiary)' }} />
          <input
            ref={inputRef}
            className="cmdk__input"
            placeholder="Search components, foundations, patterns…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === 'Enter' && results[active]) {
                go(results[active].to);
              }
            }}
          />
          <Kbd>Esc</Kbd>
        </div>

        <div className="cmdk__list" ref={listRef}>
          {results.length === 0 && <div className="cmdk__empty">No matches for “{query}”.</div>}
          {results.map((item, i) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={`${item.group}-${item.to}`}>
                {showGroup && <div className="cmdk__group">{item.group}</div>}
                <div
                  className="cmdk__item"
                  data-index={i}
                  data-active={i === active || undefined}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(item.to)}
                >
                  <span>{item.label}</span>
                  <span className="cmdk__item-path">{item.to}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cmdk__footer">
          <span>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> navigate
          </span>
          <span>
            <Kbd>↵</Kbd> open
          </span>
          <span style={{ marginLeft: 'auto' }}>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
