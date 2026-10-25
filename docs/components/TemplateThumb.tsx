import { useEffect, useRef, type ReactNode } from 'react';

/**
 * A live render of a template, scaled to a third and clipped to the top of the
 * page. `inert` keeps the links and buttons inside it out of the tab order and
 * the accessibility tree — the card or panel around it owns the interaction.
 */
export function TemplateThumb({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.setAttribute('inert', '');
  }, []);
  return (
    <div className={className ?? 'tpl-thumb'} ref={ref} aria-hidden="true">
      <div className="tpl-thumb__inner">{children}</div>
    </div>
  );
}
