import { Fragment } from 'react';
import { cx } from '../lib/cx';

export interface KbdProps {
  children: string;
  className?: string;
}

export function Kbd({ children, className }: KbdProps) {
  return <kbd className={cx('cs-kbd', className)}>{children}</kbd>;
}

export interface KbdGroupProps {
  keys: string[];
  className?: string;
}

export function KbdGroup({ keys, className }: KbdGroupProps) {
  return (
    <span className={cx('cs-kbd-group', className)}>
      {keys.map((key, i) => (
        <Fragment key={`${key}-${i}`}>
          {i > 0 && <span className="cs-kbd-group__sep">+</span>}
          <Kbd>{key}</Kbd>
        </Fragment>
      ))}
    </span>
  );
}
