import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Icon, type IconName } from './Icon';

export type AlertTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral';

const toneIcon: Record<AlertTone, IconName> = {
  accent: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
  neutral: 'info',
};

export interface AlertProps {
  tone?: AlertTone;
  title?: ReactNode;
  children?: ReactNode;
  icon?: ReactNode | false;
  onClose?: () => void;
  className?: string;
}

export function Alert({ tone = 'neutral', title, children, icon, onClose, className }: AlertProps) {
  return (
    <div className={cx('cs-alert', tone !== 'neutral' && `cs-alert--${tone}`, className)} role="status">
      {icon !== false && <span className="cs-alert__icon">{icon ?? <Icon name={toneIcon[tone]} size={15} />}</span>}
      <div className="cs-alert__content">
        {title && <div className="cs-alert__title">{title}</div>}
        {children && <div className="cs-alert__desc">{children}</div>}
      </div>
      {onClose && (
        <button type="button" className="cs-alert__close" aria-label="Dismiss" onClick={onClose}>
          <Icon name="close" size={12} />
        </button>
      )}
    </div>
  );
}
