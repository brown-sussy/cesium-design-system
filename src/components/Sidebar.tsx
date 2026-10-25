import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../lib/cx';
import { Icon, type IconName } from './Icon';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: IconName;
  /** Renders an anchor instead of a button. */
  href?: string;
  active?: boolean;
  disabled?: boolean;
  /** Count, status word, or a short marker. Hidden in collapsed mode. */
  badge?: ReactNode;
  onSelect?: () => void;
}

export interface SidebarGroup {
  id: string;
  /** Sub-heading inside a section — a category inside "Components". */
  title?: string;
  items: SidebarItem[];
}

export interface SidebarSection {
  id: string;
  /** Group heading. Omit for an unlabelled run of items. */
  title?: string;
  /** Trailing figure in the heading — a count, usually. */
  count?: string | number;
  /** Heading becomes a link. */
  href?: string;
  /** Heading becomes a toggle and the items fold away. */
  collapsible?: boolean;
  defaultOpen?: boolean;
  items?: SidebarItem[];
  /** One level of sub-headings, for taxonomies with categories. */
  groups?: SidebarGroup[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  /** Pinned above the nav — product name, switcher, search. */
  header?: ReactNode;
  /** Pinned below the nav. */
  footer?: ReactNode;
  /** Icon rail: 56px, labels hidden, flyout on hover. */
  collapsed?: boolean;
  /** Width in px. Defaults to the `sidebar-w` token. */
  width?: number;
  /** Show the travelling accent tick beside the active row. */
  rail?: boolean;
  /** Accessible name for the nav landmark. */
  label?: string;
  className?: string;
}

const allItems = (sections: SidebarSection[]) =>
  sections.flatMap((s) => [...(s.items ?? []), ...(s.groups ?? []).flatMap((g) => g.items)]);

/**
 * The heading that owns a row: its group title, else its section title.
 * Both live as direct children of the wrappers the row sits in.
 */
function headingAbove(row: HTMLElement): HTMLElement | null {
  const group = row.closest<HTMLElement>('.cs-sidebar__group');
  const groupTitle = group?.querySelector<HTMLElement>(':scope > .cs-sidebar__group-title');
  if (groupTitle) return groupTitle;

  const section = row.closest<HTMLElement>('.cs-sidebar__section');
  return section?.querySelector<HTMLElement>(':scope > .cs-sidebar__title') ?? null;
}

/**
 * The navigation spine of a data product: sections of rows, one active row,
 * optional folding, optional icon-rail mode.
 *
 * Everything is drawn here — the scroll container uses the system's own
 * scrollbar styling, collapsed labels use a portalled flyout rather than the
 * browser's `title` bubble, and the accent tick is measured from the active
 * row so it slides instead of being redrawn.
 */
export function Sidebar({
  sections,
  header,
  footer,
  collapsed = false,
  width,
  rail = true,
  label = 'Sections',
  className,
}: SidebarProps) {
  const uid = useId();
  const navRef = useRef<HTMLElement | null>(null);
  const [tick, setTick] = useState<{ top: number; height: number } | null>(null);
  const [fly, setFly] = useState<{ top: number; left: number; label: string } | null>(null);
  const [folded, setFolded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      sections.filter((s) => s.collapsible).map((s) => [s.id, s.defaultOpen ?? true]),
    ),
  );

  const activeId = allItems(sections).find((i) => i.active)?.id ?? '';

  // Re-measure only when the shape of the nav changes, not on every render —
  // callers rebuild their `sections` array inline.
  const signature = sections
    .map(
      (s) =>
        `${s.id}:${(s.items ?? []).map((i) => `${i.id}${i.active ? '*' : ''}`).join(',')}` +
        `|${(s.groups ?? [])
          .map((g) => g.items.map((i) => `${i.id}${i.active ? '*' : ''}`).join(','))
          .join(';')}`,
    )
    .join('|');

  // Only reveal the active row when the active row itself changes. Folding a
  // section or resizing the window must not yank the nav back.
  const revealed = useRef<string | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !rail) return;
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const active = nav.querySelector<HTMLElement>('[data-sidebar-item][data-active="true"]');
      if (!active) {
        setTick(null);
        return;
      }
      const a = active.getBoundingClientRect();
      const s = nav.getBoundingClientRect();
      setTick({
        top: a.top - s.top + nav.scrollTop + 7,
        height: Math.max(12, a.height - 14),
      });

      if (revealed.current === activeId) return;
      const first = revealed.current === null;
      revealed.current = activeId;

      const pad = 12;
      if (first) {
        // First paint parks the heading that owns the active row at the top of
        // the nav. Minimal scrolling would pin the row to the bottom edge and
        // hide the hierarchy it sits in — the reader lands on a stray label.
        const heading = headingAbove(active);
        const anchor = heading ?? active;
        const r = anchor.getBoundingClientRect();
        nav.scrollTop += r.top - s.top - (heading ? pad : (s.height - r.height) / 2);
      } else if (a.top < s.top + pad) {
        nav.scrollTop -= s.top + pad - a.top;
      } else if (a.bottom > s.bottom - pad) {
        nav.scrollTop += a.bottom - s.bottom + pad;
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(nav);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [rail, signature, folded, activeId]);

  useEffect(() => {
    if (!collapsed) setFly(null);
  }, [collapsed]);

  // A fixed flyout would go stale as soon as anything scrolls — the rail
  // itself or the page behind it. Scroll doesn't bubble, so listen in the
  // capture phase and catch every scroller at once.
  useEffect(() => {
    if (!fly) return;
    const clear = () => setFly(null);
    window.addEventListener('scroll', clear, { capture: true, passive: true });
    window.addEventListener('resize', clear);
    return () => {
      window.removeEventListener('scroll', clear, { capture: true });
      window.removeEventListener('resize', clear);
    };
  }, [fly]);

  // No icon gutter when nothing in the nav has an icon — labels start flush.
  const hasIcons = allItems(sections).some((i) => i.icon);

  const rows = () =>
    Array.from(navRef.current?.querySelectorAll<HTMLElement>('[data-sidebar-item]') ?? []).filter(
      (el) =>
        el.dataset.disabled !== 'true' &&
        !el.closest('.cs-sidebar__fold[data-open="false"]'),
    );

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const list = rows();
    if (!list.length) return;
    const current = list.indexOf(document.activeElement as HTMLElement);
    let next = current;
    if (e.key === 'ArrowDown') next = current < 0 ? 0 : Math.min(list.length - 1, current + 1);
    else if (e.key === 'ArrowUp') next = current < 0 ? list.length - 1 : Math.max(0, current - 1);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = list.length - 1;
    e.preventDefault();
    list[next]?.focus();
    list[next]?.scrollIntoView({ block: 'nearest' });
  };

  const showFly = (e: ReactMouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>, text: string) => {
    if (!collapsed) return;
    const r = e.currentTarget.getBoundingClientRect();
    setFly({ top: r.top + r.height / 2, left: r.right + 10, label: text });
  };

  const renderItem = (item: SidebarItem) => {
    // In the rail, an item without an icon would be a blank square — fall back
    // to its initial so the nav stays usable.
    const glyph =
      item.icon ? (
        <Icon name={item.icon} size={15} />
      ) : collapsed ? (
        <span className="cs-sidebar__initial">{item.label.slice(0, 1)}</span>
      ) : null;

    const body = (
      <>
        {(hasIcons || collapsed) && (
          <span className="cs-sidebar__icon" aria-hidden="true">
            {glyph}
          </span>
        )}
        <span className="cs-sidebar__label">{item.label}</span>
        {item.badge !== undefined && <span className="cs-sidebar__badge">{item.badge}</span>}
      </>
    );

    const shared = {
      className: 'cs-sidebar__item',
      'data-sidebar-item': '',
      'data-active': item.active || undefined,
      'data-disabled': item.disabled || undefined,
      'aria-label': collapsed ? item.label : undefined,
      onClick: (e: ReactMouseEvent<HTMLElement>) => {
        if (item.disabled) {
          e.preventDefault();
          return;
        }
        item.onSelect?.();
      },
      onPointerEnter: (e: ReactMouseEvent<HTMLElement>) => showFly(e, item.label),
      onPointerLeave: () => setFly(null),
      onFocus: (e: React.FocusEvent<HTMLElement>) => showFly(e, item.label),
      onBlur: () => setFly(null),
    };

    return item.href ? (
      <a key={item.id} {...shared} href={item.href} aria-current={item.active ? 'page' : undefined}>
        {body}
      </a>
    ) : (
      <button
        key={item.id}
        {...shared}
        type="button"
        disabled={item.disabled}
        aria-current={item.active ? 'page' : undefined}
      >
        {body}
      </button>
    );
  };

  return (
    <aside
      className={cx('cs-sidebar', className)}
      data-collapsed={collapsed || undefined}
      style={width ? { width } : undefined}
    >
      {header && <div className="cs-sidebar__header">{header}</div>}

      <nav
        ref={navRef}
        className="cs-sidebar__nav cs-scroll"
        aria-label={label}
        onKeyDown={onKeyDown}
      >
        {rail && (
          <span
            className="cs-sidebar__tick"
            data-on={tick ? 'true' : undefined}
            style={tick ? { top: tick.top, height: tick.height } : undefined}
            aria-hidden="true"
          />
        )}

        {sections.map((section) => {
          const open = folded[section.id] ?? true;
          const foldId = `${uid}-${section.id}`;
          const headingInner = (
            <>
              <span className="cs-sidebar__title-text">{section.title}</span>
              {section.count !== undefined && (
                <span className="cs-sidebar__count">{section.count}</span>
              )}
            </>
          );

          return (
            <div className="cs-sidebar__section" key={section.id}>
              {section.title &&
                (section.collapsible ? (
                  <button
                    type="button"
                    className="cs-sidebar__title cs-sidebar__title--button"
                    aria-expanded={open}
                    aria-controls={foldId}
                    onClick={() => setFolded((f) => ({ ...f, [section.id]: !open }))}
                  >
                    {headingInner}
                    <Icon name="chevron-down" size={12} className="cs-sidebar__chevron" />
                  </button>
                ) : section.href ? (
                  <a className="cs-sidebar__title cs-sidebar__title--link" href={section.href}>
                    {headingInner}
                  </a>
                ) : (
                  <div className="cs-sidebar__title">{headingInner}</div>
                ))}

              <div
                className="cs-sidebar__fold"
                id={foldId}
                data-open={!section.collapsible || open ? 'true' : 'false'}
              >
                <div className="cs-sidebar__items">
                  {section.items?.map(renderItem)}

                  {section.groups?.map((group) => (
                    <div className="cs-sidebar__group" key={group.id}>
                      {group.title && (
                        <div className="cs-sidebar__group-title">{group.title}</div>
                      )}
                      {group.items.map(renderItem)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {footer && <div className="cs-sidebar__footer">{footer}</div>}

      {/* Portalled: `position: fixed` breaks inside any transformed ancestor,
          and a demo stage with `overflow: hidden` would clip it. */}
      {collapsed &&
        fly &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="cs-sidebar__flyout"
            role="tooltip"
            style={{ top: fly.top, left: fly.left }}
          >
            {fly.label}
          </div>,
          document.body,
        )}
    </aside>
  );
}
