import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../lib/cx';
import { usePopover, type PopoverAlign, type PopoverSide } from '../lib/usePopover';

export interface DropdownProps {
  /** The element that opens the panel. Rendered inside a button. */
  trigger: ReactNode;
  /** Panel content — anything: a form, a filter stack, a small table. */
  children: ReactNode;
  /** Accessible name for the panel and the trigger. */
  label?: string;
  align?: PopoverAlign;
  side?: PopoverSide;
  /** Minimum panel width in px. */
  width?: number;
  /** Panel takes the trigger's width — use for filter fields that mirror an input. */
  matchWidth?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Any descendant carrying `data-dropdown-close` closes the panel when
   * clicked. Use it on the primary action inside the panel.
   */
  closeOnAction?: boolean;
  disabled?: boolean;
  className?: string;
  panelClassName?: string;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * A trigger with a floating panel of arbitrary content.
 *
 * The distinction from `Menu`: a Menu is a list of actions on one object and
 * owns its own keyboard model. A Dropdown is a surface — it holds whatever you
 * put in it and hands focus to the first control. Use Dropdown for filters,
 * mini forms and detail popovers; use Menu for verbs.
 */
export function Dropdown({
  trigger,
  children,
  label,
  align = 'start',
  side = 'bottom',
  width,
  matchWidth,
  open: openProp,
  onOpenChange,
  closeOnAction = true,
  disabled,
  className,
  panelClassName,
}: DropdownProps) {
  const uid = useId();
  const panelId = `cs-dropdown-${uid}`;

  const { open, setOpen, triggerRef, panelRef, panelStyle, box } = usePopover<HTMLButtonElement>({
    align,
    side,
    minWidth: width,
    matchWidth,
    open: openProp,
    onOpenChange,
  });

  const restore = useRef(false);

  // Hand focus to the first control so keyboard users land inside the panel.
  useLayoutEffect(() => {
    if (!open) {
      if (restore.current) {
        triggerRef.current?.focus();
        restore.current = false;
      }
      return;
    }
    const panel = panelRef.current;
    if (!panel) return;
    const first = panel.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel).focus({ preventScroll: true });
  }, [open, triggerRef, panelRef]);

  // Esc closes from anywhere inside the panel, including nested inputs.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      restore.current = true;
      setOpen(false);
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open, setOpen]);

  const onPanelClick = (e: React.MouseEvent) => {
    if (!closeOnAction) return;
    if ((e.target as HTMLElement).closest('[data-dropdown-close]')) {
      restore.current = true;
      setOpen(false);
    }
  };

  const onTriggerKeyDown = (e: ReactKeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === 'Escape' && open) {
      e.preventDefault();
      restore.current = true;
      setOpen(false);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cx('cs-dropdown__trigger', className)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={label}
        disabled={disabled}
        data-open={open || undefined}
        onClick={() => setOpen(!open)}
        onKeyDown={onTriggerKeyDown}
      >
        {trigger}
      </button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-label={label}
            tabIndex={-1}
            className={cx('cs-dropdown__panel', 'cs-scroll', panelClassName)}
            data-align={align}
            data-side={box?.placement}
            style={panelStyle}
            onClick={onPanelClick}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  );
}

export interface DropdownHeaderProps {
  title: ReactNode;
  hint?: ReactNode;
  children?: ReactNode;
}

/** Optional chrome for a Dropdown panel: title, hint and a trailing action. */
export function DropdownHeader({ title, hint, children }: DropdownHeaderProps) {
  return (
    <div className="cs-dropdown__header">
      <div className="cs-dropdown__heading">
        <span className="cs-dropdown__title">{title}</span>
        {hint && <span className="cs-dropdown__hint">{hint}</span>}
      </div>
      {children && <div className="cs-dropdown__actions">{children}</div>}
    </div>
  );
}

export interface DropdownFooterProps {
  children: ReactNode;
}

/** Sticky action row at the bottom of a Dropdown panel. */
export function DropdownFooter({ children }: DropdownFooterProps) {
  return <div className="cs-dropdown__footer">{children}</div>;
}
