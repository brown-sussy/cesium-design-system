import { useMemo, useState, type ReactNode } from 'react';
import { Icon } from '@cesium-ds/core';
import { highlight } from '../lib/highlight';
import { useCopy } from '../lib/useCopy';

/* ------------------------------------------------------------------ */
/* Code block                                                          */
/* ------------------------------------------------------------------ */

export interface CodeBlockProps {
  code: string;
  lang?: string;
  showHead?: boolean;
}

export function CodeBlock({ code, lang = 'tsx', showHead = true }: CodeBlockProps) {
  const { copied, copy } = useCopy();

  return (
    <div className="code-block">
      {showHead && (
        <div className="code-block__head">
          <span className="code-block__lang">{lang}</span>
          <button type="button" className="code-block__copy" data-copied={copied} onClick={() => copy(code)}>
            <Icon name={copied ? 'check' : 'copy'} size={10} />
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Preview                                                             */
/* ------------------------------------------------------------------ */

export interface PreviewProps {
  code: string;
  children: ReactNode;
  align?: 'center' | 'start' | 'stretch';
  stageStyle?: React.CSSProperties;
  minHeight?: number;
}

export function Preview({ code, children, align = 'center', stageStyle, minHeight }: PreviewProps) {
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [grid, setGrid] = useState(true);

  return (
    <div className="preview">
      <div className="preview__toolbar">
        <span className="preview__toolbar-label">Live</span>
        <div className="preview__toolbar-spacer" />
        {view === 'preview' && (
          <button
            type="button"
            className="preview__tab"
            onClick={() => setGrid((g) => !g)}
          >
            <Icon name="grid" size={11} />
            {grid ? 'Grid' : 'Plain'}
          </button>
        )}
        <button
          type="button"
          className="preview__tab"
          data-active={view === 'preview'}
          onClick={() => setView('preview')}
        >
          Preview
        </button>
        <button
          type="button"
          className="preview__tab"
          data-active={view === 'code'}
          onClick={() => setView('code')}
        >
          Code
        </button>
      </div>
      {view === 'preview' ? (
        <div
          className="preview__stage"
          data-bg={grid ? 'grid' : 'plain'}
          data-align={align}
          style={{ minHeight, ...stageStyle }}
        >
          {children}
        </div>
      ) : (
        <div className="preview__code">
          <CodeBlock code={code} showHead={false} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Props table                                                         */
/* ------------------------------------------------------------------ */

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  const sorted = useMemo(() => rows, [rows]);
  return (
    <div className="props-table">
      <table>
        <thead>
          <tr>
            <th style={{ width: '22%' }}>Prop</th>
            <th style={{ width: '30%' }}>Type</th>
            <th style={{ width: '16%' }}>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.name}>
              <td className="props-table__name">{row.name}</td>
              <td className="props-table__type">{row.type}</td>
              <td className="props-table__default">{row.default ?? '—'}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section helpers                                                     */
/* ------------------------------------------------------------------ */

export function Example({
  title,
  description,
  children,
  code,
  align,
  stageStyle,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  code: string;
  align?: 'center' | 'start' | 'stretch';
  stageStyle?: React.CSSProperties;
}) {
  return (
    <div className="doc-example">
      <h3 className="doc-h3">{title}</h3>
      {description && <p className="doc-sub">{description}</p>}
      <Preview code={code} align={align} stageStyle={stageStyle}>
        {children}
      </Preview>
    </div>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="doc-section" id={id}>
      <h2 className="doc-h2">{title}</h2>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page header                                                         */
/* ------------------------------------------------------------------ */

export function PageHead({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header>
      <div className="doc-eyebrow">{eyebrow}</div>
      <h1 className="doc-h1">{title}</h1>
      {lede && <p className="doc-lede">{lede}</p>}
      {meta && <div className="doc-meta">{meta}</div>}
    </header>
  );
}
