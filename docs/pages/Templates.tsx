import { Badge, Button, Icon } from '@cesium-ds/core';
import { CodeBlock, PageHead } from '../components/DocsUI';
import { TemplateThumb } from '../components/TemplateThumb';
import { findTemplate, templates, type TemplateDoc } from '../templates';
import { navigate } from '../lib/router';
import { useCopy } from '../lib/useCopy';

/* ------------------------------------------------------------------ */
/* card                                                                */
/* ------------------------------------------------------------------ */

function Card({ doc }: { doc: TemplateDoc }) {
  const Comp = doc.component;
  const to = `/templates/${doc.slug}`;
  // A div rather than an anchor: the thumbnail is a live render, and a real
  // page contains its own links — nesting them inside another <a> is invalid.
  return (
    <div
      className="tpl-card"
      role="link"
      tabIndex={0}
      onClick={() => navigate(to)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(to);
        }
      }}
    >
      <TemplateThumb>
        <Comp />
      </TemplateThumb>
      <div className="tpl-card__body">
        <div className="cs-row" style={{ justifyContent: 'space-between', gap: 10 }}>
          <span className="tpl-card__name">{doc.name}</span>
          <span className="tpl-card__cat">{doc.category}</span>
        </div>
        <span className="tpl-card__tag">{doc.tagline}</span>
        <div className="tpl-card__parts">
          {doc.parts.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* index                                                               */
/* ------------------------------------------------------------------ */

export function TemplatesIndex() {
  return (
    <div className="doc-container" style={{ paddingTop: 56 }}>
      <PageHead
        eyebrow="Templates"
        title="Pages, not components"
        lede="Whole screens assembled from the system — a homepage, a sign-in, a settings shell, an error page. Each one is a single file you can copy into a project and keep, and every one is rendered live from that same file."
        meta={
          <>
            <Badge tone="accent">{templates.length} templates</Badge>
            <Badge>Single file</Badge>
            <Badge>Both themes</Badge>
            <Badge>No extra CSS</Badge>
          </>
        }
      />

      <div className="tpl-grid">
        {templates.map((doc) => (
          <Card key={doc.slug} doc={doc} />
        ))}
      </div>

      <p className="cs-t-sm" style={{ color: 'var(--cs-text-tertiary)', marginTop: 24, maxWidth: 620 }}>
        Nothing here is a screenshot. The thumbnails and the full previews are the components
        themselves, rendered at the current theme — switch to light and they follow. Copy the source
        and the page keeps working: it imports from <code className="cs-mono">@cesium-ds/core</code>{' '}
        and nothing else.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* detail                                                              */
/* ------------------------------------------------------------------ */

export function TemplatePage({ slug }: { slug: string }) {
  // Before the early return: a hook that only runs on some routes changes the
  // hook count between renders, and React cannot reconcile that.
  const { copied, copy } = useCopy();
  const doc = findTemplate(slug);

  if (!doc) {
    return (
      <div className="doc-container" style={{ paddingTop: 56 }}>
        <PageHead
          eyebrow="Templates"
          title="No such template"
          lede="That template is not in the set. The index lists every page that ships with the system."
        />
        <div style={{ marginTop: 24 }}>
          <Button variant="primary" onClick={() => navigate('/templates')}>
            All templates
          </Button>
        </div>
      </div>
    );
  }

  const Comp = doc.component;
  const index = templates.findIndex((t) => t.slug === doc.slug);
  const prev = templates[index - 1];
  const next = templates[index + 1];

  const openFull = () => {
    window.open(`${location.pathname}#/templates/${doc.slug}?view=full`, '_blank', 'noopener');
  };

  return (
    <div className="doc-container" style={{ paddingTop: 56 }}>
      <PageHead
        eyebrow={`Templates / ${doc.category}`}
        title={doc.name}
        lede={doc.description}
        meta={
          <>
            <Badge tone="accent">{doc.tagline}</Badge>
            <Badge>Full page</Badge>
            {doc.parts.slice(0, 4).map((p) => (
              <Badge key={p}>{p}</Badge>
            ))}
          </>
        }
      />

      <div className="tpl-toolbar">
        <span className="cs-mono cs-t-2xs cs-dimmer tpl-toolbar__name">
          {doc.slug}.tsx
          <span className="tpl-toolbar__dim">
            {' '}
            · {doc.source.trimEnd().split('\n').length} lines
          </span>
        </span>
        <span className="tpl-toolbar__spacer" />
        {/* The point of a template is taking it. Copying sits here, at the top,
            rather than only on the source block 400 lines further down. */}
        <Button
          size="sm"
          variant="secondary"
          iconLeft={<Icon name={copied ? 'check' : 'copy'} size={12} />}
          onClick={() => copy(doc.source)}
        >
          {copied ? 'Copied' : 'Copy source'}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          iconLeft={<Icon name="external" size={12} />}
          onClick={openFull}
        >
          Open full page
        </Button>
      </div>

      <div className="tpl-frame cs-scroll">
        <Comp />
      </div>
      <p className="cs-t-2xs cs-dimmer" style={{ marginTop: 8 }}>
        Rendered live at the current width and theme. Scroll inside the frame.
      </p>

      <section className="doc-section" id="notes">
        <h2 className="doc-h2">What it is doing</h2>
        <div className="prose">
          <ul>
            {doc.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="doc-section" id="code">
        <h2 className="doc-h2">Source</h2>
        <p className="doc-sub">
          One file, no local stylesheet. Everything below is what renders above.
        </p>
        <CodeBlock code={doc.source} lang="tsx" />
      </section>

      <nav className="tpl-pager" aria-label="Templates">
        {prev ? (
          <a className="tpl-pager__link" href={`#/templates/${prev.slug}`}>
            <span className="cs-t-2xs cs-dimmer">Previous</span>
            <span className="cs-row" style={{ gap: 7, marginTop: 4 }}>
              <Icon name="chevron-left" size={12} />
              {prev.name}
            </span>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a className="tpl-pager__link tpl-pager__link--next" href={`#/templates/${next.slug}`}>
            <span className="cs-t-2xs cs-dimmer">Next</span>
            <span className="cs-row" style={{ gap: 7, marginTop: 4 }}>
              {next.name}
              <Icon name="chevron-right" size={12} />
            </span>
          </a>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* full-page view                                                      */
/* ------------------------------------------------------------------ */

/** Rendered without the docs shell — the template at real size, nothing else. */
export function TemplateView({ slug }: { slug: string }) {
  const doc = findTemplate(slug);
  if (!doc) return null;
  const Comp = doc.component;
  return (
    <div className="tpl-full">
      <Comp />
    </div>
  );
}
