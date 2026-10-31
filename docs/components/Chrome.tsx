import { useEffect, useRef, useState } from 'react';
import {
  Icon,
  Kbd,
  Menu,
  Sidebar,
  Tooltip,
  type SidebarItem,
  type SidebarSection,
} from '@cesium-ds/core';
import { navByCategory, componentCount } from '../content/nav.generated';
import { foundations, patterns, resources, templates } from '../lib/site';
import { navigate } from '../lib/router';
import { prefetchPalette } from '../lib/prefetch';
import { useScrollProgress } from '../lib/motion';

export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="cs-logo-glow" cx="34%" cy="26%" r="70%">
          <stop offset="0%" stopColor="var(--cs-accent)" stopOpacity="0.42" />
          <stop offset="70%" stopColor="var(--cs-accent)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="var(--cs-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill="url(#cs-logo-glow)" />
      <circle cx="16" cy="16" r="13" stroke="var(--cs-accent)" strokeOpacity="0.62" strokeWidth="1" />
      <ellipse cx="16" cy="16" rx="13" ry="4.7" stroke="var(--cs-accent)" strokeOpacity="0.32" strokeWidth="0.8" />
      <ellipse cx="16" cy="16" rx="5.1" ry="13" stroke="var(--cs-accent)" strokeOpacity="0.32" strokeWidth="0.8" />
      <circle cx="16" cy="16" r="1.7" fill="var(--cs-accent)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

export interface HeaderProps {
  onSearch: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onToggleMenu: () => void;
}

export function DocsHeader({ onSearch, theme, onToggleTheme, onToggleMenu }: HeaderProps) {
  const progress = useScrollProgress();
  const { style, setStyle } = useStyle();

  return (
    <header className="doc-header">
      <button type="button" className="doc-header__icon-btn doc-header__menu" aria-label="Menu" onClick={onToggleMenu}>
        <Icon name="menu" size={16} />
      </button>
      <a
        className="doc-header__brand"
        href="#/"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
      >
        <LogoMark />
        <span className="doc-wordmark">
          <span className="doc-wordmark__main">Cesium</span>
          <span className="doc-wordmark__sub">Design System</span>
        </span>
      </a>
      <span className="doc-header__spacer" />
      <button
        type="button"
        className="doc-search-btn"
        onClick={onSearch}
        onPointerEnter={prefetchPalette}
        onFocus={prefetchPalette}
        aria-label="Search documentation"
      >
        <Icon name="search" size={13} />
        <span className="doc-search-btn__text">Search…</span>
        <Kbd>⌘K</Kbd>
      </button>
      <Menu
        className="doc-style"
        align="end"
        width={210}
        label="Shape preset"
        trigger={
          <>
            <span className="doc-style__swatch" aria-hidden="true" />
            <span>{style === 'plus' ? 'Plus' : 'Cesium'}</span>
            <Icon name="chevron-down" size={11} className="cs-menu__caret" />
          </>
        }
        items={[
          { header: 'Shape preset' },
          {
            id: 'classic',
            label: 'Cesium — instrument',
            checked: style === 'classic',
            onSelect: () => setStyle('classic'),
          },
          {
            id: 'plus',
            label: 'Plus — continuous',
            checked: style === 'plus',
            onSelect: () => setStyle('plus'),
          },
        ]}
      />
      {/*
        Absolute, not relative: the Vue site is built into `site/vue` and the two
        dev servers run on different ports, so `./vue/` would 404 under
        `npm run dev` and be silently right only after a deploy.
      */}
      <a className="site-switch" href="https://brown-sussy.github.io/cesium-design-system/vue/">
        Vue
      </a>
      <Tooltip
        content={theme === 'dark' ? 'Light theme' : 'Dark theme'}
        placement="bottom"
        align="end"
      >
        <button
          type="button"
          className="doc-header__icon-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} />
        </button>
      </Tooltip>
      <div className="doc-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}

/* ------------------------------------------------------------------ */

export interface SidebarProps {
  route: string;
  open: boolean;
  onNavigate: () => void;
}

/**
 * The docs nav is the library's own `Sidebar` — sections, one active row and a
 * travelling tick. The docs.css layer only restores the editorial typography
 * (serif italic headings) on top of the component's structure.
 */
export function DocsSidebar({ route, open, onNavigate }: SidebarProps) {
  const link = (to: string, label: string): SidebarItem => ({
    id: to,
    label,
    href: `#${to}`,
    // A section root stays lit while one of its pages is open.
    active: route === to || (to !== '/' && route.startsWith(`${to}/`)),
    onSelect: () => {
      navigate(to);
      onNavigate();
    },
  });

  const sections: SidebarSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      items: [link('/', 'Introduction')],
    },
    {
      id: 'foundations',
      title: 'Foundations',
      items: foundations.map((item) => link(item.to, item.label)),
    },
    {
      id: 'components',
      title: 'Components',
      count: String(componentCount).padStart(2, '0'),
      href: '#/components',
      groups: navByCategory.map((group) => ({
        id: group.category,
        title: group.category,
        items: group.docs.map((doc) => link(`/components/${doc.slug}`, doc.name)),
      })),
    },
    {
      id: 'patterns',
      title: 'Patterns',
      items: patterns.map((item) => link(item.to, item.label)),
    },
    {
      id: 'templates',
      title: 'Templates',
      count: String(templates.length).padStart(2, '0'),
      href: '#/templates',
      items: templates.map((item) => link(item.to, item.label)),
    },
    {
      id: 'resources',
      title: 'Resources',
      items: resources.map((item) => link(item.to, item.label)),
    },
  ];

  return (
    <>
      {open && <div className="doc-scrim" onClick={onNavigate} aria-hidden="true" />}
      <aside className="doc-sidebar" data-open={open || undefined}>
        <Sidebar
          className="doc-sidebar__inner"
          label="Documentation"
          sections={sections}
          rail
        />
      </aside>
    </>
  );
}

/* ------------------------------------------------------------------ */

export function DocsFooter() {
  return (
    <footer className="doc-footer">
      <div className="doc-container doc-footer__inner">
        <span>Cesium Design System · MIT</span>
        <span>Tokens → Components → Patterns</span>
        <span>v1.0.0</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

export type StylePreset = 'classic' | 'plus';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () =>
      (document.documentElement.dataset.theme as 'dark' | 'light') ||
      (localStorage.getItem('cesium-theme') as 'dark' | 'light') ||
      'dark',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('cesium-theme', theme);
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) };
}

/** Shape preset — `classic` (default) or `plus`. Swaps the radius + elevation layer. */
export function useStyle() {
  const [style, setStyle] = useState<StylePreset>(
    () => (document.documentElement.dataset.style as StylePreset) || 'classic',
  );

  useEffect(() => {
    if (style === 'classic') delete document.documentElement.dataset.style;
    else document.documentElement.dataset.style = style;
    localStorage.setItem('cesium-style', style);
  }, [style]);

  return { style, setStyle };
}

/* ------------------------------------------------------------------ */

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  const ref = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    ref.current = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    ref.current.addEventListener('change', handler);
    setMatches(ref.current.matches);
    return () => ref.current?.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
