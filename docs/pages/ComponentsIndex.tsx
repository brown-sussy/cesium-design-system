import { useMemo, useState } from 'react';
import { Badge, Icon, Input } from '@cesium-ds/core';
import { PageHead } from '../components/DocsUI';
import { componentCount, navByCategory } from '../content/nav.generated';
import { navigate } from '../lib/router';

/**
 * The component index. Deliberately built on `nav.generated` rather than the
 * content registry: this page lists 40 components and needs four fields of
 * each, while the registry also carries every demo component and source
 * string. Same page, a fraction of the weight.
 */
export function ComponentsIndex() {
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return navByCategory;
    return navByCategory
      .map((group) => ({
        category: group.category,
        docs: group.docs.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.summary.toLowerCase().includes(q) ||
            d.category.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.docs.length > 0);
  }, [query]);

  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Library"
        title="Components"
        lede={`${componentCount} typed React components, grouped by the job they do. Every component is documented with live examples, a prop table and accessibility notes.`}
        meta={
          <>
            <Badge tone="accent">{componentCount} components</Badge>
            <Badge>8 categories</Badge>
            <Badge>0 runtime dependencies</Badge>
          </>
        }
      />

      <div className="filter-bar">
        <Input
          prefix={<Icon name="search" size={14} />}
          placeholder="Filter components…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="cs-mono cs-t-xs cs-dimmer">
          {groups.reduce((n, g) => n + g.docs.length, 0)} shown
        </span>
      </div>

      {groups.map((group) => (
        <div className="cat-block" key={group.category}>
          <div className="cat-block__head">
            <span className="cat-block__name">{group.category}</span>
            <span className="cat-block__count">{String(group.docs.length).padStart(2, '0')}</span>
            <span className="cat-block__line" />
          </div>
          <div className="comp-grid">
            {group.docs.map((doc) => (
              <a
                className="comp-card"
                key={doc.slug}
                href={`#/components/${doc.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/components/${doc.slug}`);
                }}
              >
                <span className="comp-card__name">{doc.name}</span>
                <span className="comp-card__desc">{doc.summary}</span>
                <span className="comp-card__cat">
                  {doc.status === 'New' ? 'NEW · ' : ''}
                  {doc.examples} examples
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}

      {groups.length === 0 && (
        <div className="cs-t-sm cs-dimmer" style={{ padding: '30px 0' }}>
          No component matches “{query}”.
        </div>
      )}

      <div style={{ marginTop: 48 }}>
        <div className="doc-h2">Also in the package</div>
        <div className="prose">
          <p>
            The index above covers the documented surface. The package also exports {componentCount}{' '}
            typed prop interfaces and the <code>Icon</code> name union, so you can build your own
            compositions without reaching for raw CSS.
          </p>
        </div>
      </div>
    </div>
  );
}
