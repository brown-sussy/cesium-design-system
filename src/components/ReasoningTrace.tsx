import { useState, type ReactNode } from 'react';
import { cx } from '../lib/cx';
import { Icon } from './Icon';

export type TraceStatus = 'pending' | 'active' | 'done' | 'failed';

export interface TraceStep {
  id: string;
  label: ReactNode;
  /** Secondary line — the query that was run, the file that was read. */
  detail?: ReactNode;
  status?: TraceStatus;
  time?: string;
}

export interface ReasoningTraceProps {
  steps: TraceStep[];
  title?: ReactNode;
  /** Right-hand caption. Defaults to the step count. */
  summary?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * The steps an agent took before it answered. Collapsible, but open while a
 * step is still running — a trace you have to click to watch is a trace nobody
 * watches.
 */
export function ReasoningTrace({
  steps,
  title = 'Reasoning',
  summary,
  open,
  defaultOpen = true,
  onOpenChange,
  className,
}: ReasoningTraceProps) {
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const running = steps.some((s) => s.status === 'active');

  const toggle = () => {
    const next = !isOpen;
    if (open === undefined) setInner(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cx('cs-trace', className)} data-open={isOpen}>
      <button type="button" className="cs-trace__head" onClick={toggle} aria-expanded={isOpen}>
        <Icon name="chevron-right" size={10} />
        {title}
        <span className="cs-trace__summary">{running ? 'running' : (summary ?? `${steps.length} steps`)}</span>
      </button>

      {isOpen && (
        <ol className="cs-trace__list">
          {steps.map((step) => (
            <li key={step.id} className="cs-trace__step" data-status={step.status ?? 'done'}>
              <span className="cs-trace__dot" aria-hidden="true" />
              <span className="cs-trace__label">{step.label}</span>
              {step.time && <span className="cs-trace__time">{step.time}</span>}
              {step.detail && <span className="cs-trace__detail">{step.detail}</span>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
