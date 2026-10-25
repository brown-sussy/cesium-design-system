import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../lib/cx';
import { Icon } from './Icon';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  width?: number;
  children?: ReactNode;
  hideClose?: boolean;
  closeOnOverlay?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  footer,
  width = 480,
  children,
  hideClose,
  closeOnOverlay = true,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="cs-overlay"
      onMouseDown={(e) => {
        if (closeOnOverlay && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className={cx('cs-modal', className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'cs-modal-title' : undefined}
        tabIndex={-1}
        style={{ ['--cs-modal-w' as string]: `${width}px` }}
      >
        {(title || !hideClose) && (
          <div className="cs-modal__header">
            {title && (
              <h2 className="cs-modal__title" id="cs-modal-title">
                {title}
              </h2>
            )}
            {description && <p className="cs-modal__desc">{description}</p>}
            {!hideClose && (
              <button type="button" className="cs-modal__close" aria-label="Close" onClick={onClose}>
                <Icon name="close" size={14} />
              </button>
            )}
          </div>
        )}
        {children && <div className="cs-modal__body">{children}</div>}
        {footer && <div className="cs-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  width?: number;
  children?: ReactNode;
  className?: string;
}

export function Drawer({ open, onClose, title, footer, width = 420, children, className }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="cs-overlay cs-overlay--drawer"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        className={cx('cs-drawer', className)}
        role="dialog"
        aria-modal="true"
        style={{ ['--cs-drawer-w' as string]: `${width}px` }}
      >
        <div className="cs-drawer__header">
          <div className="cs-drawer__title">{title}</div>
          <button type="button" className="cs-modal__close" aria-label="Close" onClick={onClose} style={{ position: 'static' }}>
            <Icon name="close" size={14} />
          </button>
        </div>
        <div className="cs-drawer__body">{children}</div>
        {footer && <div className="cs-drawer__footer">{footer}</div>}
      </aside>
    </div>,
    document.body,
  );
}
