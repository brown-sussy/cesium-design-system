import { useEffect, useState } from 'react';
import { Badge, Button, Icon, Tag } from '@cesium-ds/core';
import { PageHead, PropsTable, Section, Example } from '../components/DocsUI';
import { findDoc } from '../content/registry';
import { navigate } from '../lib/router';

/** Highlights the section currently occupying the upper third of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');
  const key = ids.join('|');

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-88px 0px -62% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}

function Toc({ sections }: { sections: Array<{ id: string; label: string }> }) {
  const active = useActiveSection(sections.map((s) => s.id));
  return (
    <nav className="doc-toc">
      <div className="doc-toc__title">On this page</div>
      {sections.map((s) => (
        <a
          key={s.id}
          className="doc-toc__link"
          data-active={active === s.id}
          href={`#${s.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}

export function ComponentPage({ slug }: { slug: string }) {
  const doc = findDoc(slug);

  if (!doc) {
    return (
      <div className="doc-main__inner">
        <PageHead eyebrow="404" title="Component not found" lede="That component does not exist — or has been renamed." />
        <div style={{ marginTop: 22 }}>
          <Button variant="secondary" onClick={() => navigate('/components')}>
            Back to the index
          </Button>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'examples', label: 'Examples' },
    { id: 'api', label: 'API' },
    ...(doc.a11y ? [{ id: 'accessibility', label: 'Accessibility' }] : []),
    ...(doc.guidance ? [{ id: 'guidance', label: 'Guidance' }] : []),
    ...(doc.related ? [{ id: 'related', label: 'Related' }] : []),
  ];

  return (
    <div className="doc-main__inner">
      <div className="doc-with-toc">
        <div>
          <PageHead
            eyebrow={doc.category}
            title={doc.name}
            lede={doc.summary}
            meta={
              <>
                {doc.status && <Badge tone={doc.status === 'New' ? 'accent' : 'neutral'}>{doc.status}</Badge>}
                <Badge>React</Badge>
                <Badge>TypeScript</Badge>
                <span className="doc-meta__code">
                  import {'{ '}
                  {doc.name}
                  {' }'} from '@cesium-ds/core'
                </span>
              </>
            }
          />

          {doc.intro && (
            <div className="prose" style={{ marginTop: 22 }}>
              <p>{doc.intro}</p>
            </div>
          )}

          <Section id="examples" title="Examples">
            {doc.examples.map((ex) => {
              const Demo = ex.render;
              return (
                <Example
                  key={ex.title}
                  title={ex.title}
                  description={typeof ex.description === 'string' ? ex.description : undefined}
                  code={ex.code}
                  align={ex.align}
                  stageStyle={ex.stageStyle}
                >
                  <Demo />
                </Example>
              );
            })}
          </Section>

          <Section id="api" title="API">
            <PropsTable rows={doc.props} />
          </Section>

          {doc.a11y && (
            <Section id="accessibility" title="Accessibility">
              <div className="prose">
                <ul>
                  {doc.a11y.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Section>
          )}

          {doc.guidance && (
            <Section id="guidance" title="Guidance">
              <div className="guidance-grid">
                <div className="guidance guidance--do">
                  <div className="guidance__head">
                    <Icon name="check" size={11} /> Do
                  </div>
                  <ul>
                    {doc.guidance.do.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="guidance guidance--dont">
                  <div className="guidance__head">
                    <Icon name="close" size={11} /> Don’t
                  </div>
                  <ul>
                    {doc.guidance.dont.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>
          )}

          {doc.related && (
            <Section id="related" title="Related">
              <div className="related-row">
                {doc.related.map((r) => {
                  const target = findDoc(r);
                  if (!target) return null;
                  return (
                    <Tag
                      key={r}
                      accent
                      onClick={() => navigate(`/components/${r}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {target.name}
                    </Tag>
                  );
                })}
              </div>
            </Section>
          )}
        </div>

        <Toc sections={sections} />
      </div>
    </div>
  );
}
