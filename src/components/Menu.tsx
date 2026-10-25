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
import { Icon, type IconName } from './Icon';
import { Kbd } from './Kbd';

export interface MenuItem {
  id: string;
  label: ReactNode;
  icon?: IconName;
  shortcut?: string;
  disabled?: boolean;
  /** Renders in the danger colour and tints its icon. */
  danger?: boolean;
  /** Turns the item into a `menuitemcheckbox`. */
  checked?: boolean;
  onSelect?: () => void;
}

/** A menu entry: an item, a hairline, or a group heading. */
export type MenuEntry = MenuItem | 'separator' | { header: string };

export interface MenuProps {
  items: MenuEntry[];
  /** Accessible name. Also the default trigger text. */
  label?: string;
  icon?: IconName;
  /** Custom trigger content — rendered inside the menu button. */
  trigger?: ReactNode;
  /** Which trigger edge the menu aligns to. */
  align?: 'start' | 'end';
  /** Minimum menu width in px. Defaults to the trigger width. */
  width?: number;
  disabled?: boolean;
  className?: string;
}

const isItem = (entry: MenuEntry): entry is MenuItem =>
  typeof entry === 'object' && entry !== null && 'id' in entry;

export function Menu({
  items,
  label,
  icon,
  trigger,
  align = 'start',
  width,
  disabled,
  className,
}: MenuProps) {
  const uid = useId();
  const menuId = `cs-menu-${uid}`;

  const [active, setActive] = useState(-1);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const { open, setOpen, box, triggerRef, panelRef, panelStyle } = usePopover({
    align,
    minWidth: width,
  });

  // Indexes into `items` that can receive focus, in order.
  const nav = items.reduce<number[]>((acc, entry, i) => {
    if (isItem(entry) && !entry.disabled) acc.push(i);
    return acc;
  }, []);

  const close = (refocus = true) => {
    setOpen(false);
    setActive(-1);
    if (refocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) setActive(-1);
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    const target = nav[active] ?? nav[0];
    if (target !== undefined) itemRefs.current[target]?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  const move = (step: 1 | -1) => {
    if (!nav.length) return;
    const current = nav.indexOf(nav[active] ?? -1);
    const next =
      current === -1 ? (step === 1 ? 0 : nav.length - 1) : (current + step + nav.length) % nav.length;
    setActive(next);
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      move(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(nav.length - 1);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      close(false);
    }
  };

  const onTriggerKeyDown = (e: ReactKeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) setActive(0);
      else {
        setOpen(true);
        setActive(0);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setActive(nav.length - 1);
    } else if (e.key === 'Escape' && open) {
      e.preventDefault();
      close();
    }
  };

  const pick = (item: MenuItem) => {
    item.onSelect?.();
    close();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cx('cs-menu__trigger', className)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={label ?? (trigger ? 'Menu' : undefined)}
        disabled={disabled}
        data-open={open || undefined}
        onClick={() => {
          if (open) close();
          else {
            setOpen(true);
            setActive(0);
          }
        }}
        onKeyDown={onTriggerKeyDown}
      >
        {trigger ?? (
          <>
            {icon && <Icon name={icon} size={14} />}
            {label && <span className="cs-menu__trigger-label">{label}</span>}
            <Icon name="chevron-down" size={12} className="cs-menu__caret" />
          </>
        )}
      </button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={panelRef}
            id={menuId}
            role="menu"
            aria-label={label}
            className="cs-menu__list cs-scroll"
            data-up={box?.placement === 'top' || undefined}
            data-align={align}
            style={panelStyle}
            onKeyDown={onKeyDown}
          >
            {items.map((entry, i) => {
              if (entry === 'separator') {
                return <div key={`sep-${i}`} className="cs-menu__sep" role="separator" />;
              }
              if (!isItem(entry)) {
                return (
                  <div key={`hdr-${i}`} className="cs-menu__header" role="presentation">
                    {entry.header}
                  </div>
                );
              }
              return (
                <button
                  key={entry.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  role={entry.checked === undefined ? 'menuitem' : 'menuitemcheckbox'}
                  aria-checked={entry.checked}
                  tabIndex={-1}
                  disabled={entry.disabled}
                  className="cs-menu__item"
                  data-danger={entry.danger || undefined}
                  data-active={nav[active] === i || undefined}
                  onClick={() => pick(entry)}
                  onPointerEnter={() => {
                    if (!entry.disabled) setActive(nav.indexOf(i));
                  }}
                >
                  <span className="cs-menu__icon" aria-hidden="true">
                    {entry.checked ? (
                      <Icon name="check" size={13} />
                    ) : entry.icon ? (
                      <Icon name={entry.icon} size={13} />
                    ) : null}
                  </span>
                  <span className="cs-menu__label">{entry.label}</span>
                  {entry.shortcut && <Kbd className="cs-menu__shortcut">{entry.shortcut}</Kbd>}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
}
