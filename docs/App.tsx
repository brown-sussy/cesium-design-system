import { lazy, Suspense, useEffect, useState } from 'react';
import { DocsFooter, DocsHeader, DocsSidebar, useMediaQuery, useTheme } from './components/Chrome';
import { Home } from './pages/Home';
import { navigate, useRoute } from './lib/router';
import { useScrollReveal } from './lib/motion';
import { startLinkPrefetch } from './lib/prefetch';
import { PageHead } from './components/DocsUI';
import { Button, Skeleton } from '@cesium-ds/core';

/**
 * Every page except the landing one is split into its own chunk.
 *
 * The docs are 40 component pages, six foundation essays, two patterns, four
 * templates and a resources page; a reader who arrives to look up `Button` was
 * previously downloading all of it. The landing page stays eager because it is
 * the default route and therefore the first paint.
 */
const FoundationsPage = lazy(() =>
  import('./pages/Foundations').then((m) => ({ default: m.FoundationsPage })),
);
const ComponentPage = lazy(() =>
  import('./pages/ComponentPage').then((m) => ({ default: m.ComponentPage })),
);
const ComponentsIndex = lazy(() =>
  import('./pages/ComponentsIndex').then((m) => ({ default: m.ComponentsIndex })),
);
const DashboardPattern = lazy(() =>
  import('./pages/Patterns').then((m) => ({ default: m.DashboardPattern })),
);
const MapHudPattern = lazy(() => import('./pages/Patterns').then((m) => ({ default: m.MapHudPattern })));
const Resources = lazy(() => import('./pages/Resources').then((m) => ({ default: m.Resources })));
const Skill = lazy(() => import('./pages/Skill').then((m) => ({ default: m.Skill })));
const TemplatesIndex = lazy(() =>
  import('./pages/Templates').then((m) => ({ default: m.TemplatesIndex })),
);
const TemplatePage = lazy(() => import('./pages/Templates').then((m) => ({ default: m.TemplatePage })));
const TemplateView = lazy(() => import('./pages/Templates').then((m) => ({ default: m.TemplateView })));
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette })),
);

/**
 * Shown only when a chunk is not already in memory — a deep link, or a
 * navigation faster than the network. Hover-prefetching means the common path
 * never sees it. The blocks mirror the real page head so nothing jumps when the
 * content replaces them.
 */
function PageFallback() {
  return (
    <div className="doc-container" style={{ paddingTop: 56 }}>
      <Skeleton width={132} height={10} />
      <div style={{ height: 22 }} />
      <Skeleton width={280} height={30} />
      <div style={{ height: 20 }} />
      <Skeleton width="min(560px, 82%)" height={13} />
    </div>
  );
}

function NotFound() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="404"
        title="Signal lost"
        lede="This route does not exist. The navigation on the left is the authoritative map of the system."
      />
      <div style={{ marginTop: 24 }}>
        <Button variant="primary" onClick={() => navigate('/')}>
          Return to overview
        </Button>
      </div>
    </div>
  );
}

/**
 * Runs the reveal scan from *inside* the Suspense boundary.
 *
 * `App`'s own layout effect fires before a lazily-loaded page exists, so it
 * would find no blocks to observe and the page would simply arrive without its
 * reveal. This component mounts with the page, so the scan sees the real DOM.
 * `<main>` is keyed by route, so it remounts — and rescans — on every
 * navigation.
 */
function PageReveal({ children }: { children: React.ReactNode }) {
  useScrollReveal('page');
  return <>{children}</>;
}

export function App() {
  const route = useRoute();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const isMobile = useMediaQuery('(max-width: 960px)');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === '/' && !(e.target as HTMLElement)?.closest('input, textarea')) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // One delegated listener for the whole document: hovering or tabbing to any
  // in-site link starts fetching the page behind it.
  useEffect(() => startLinkPrefetch(), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  // `#/templates/homepage?view=full` renders the template on its own, with no
  // docs chrome — that is what "Open full page" points at.
  const [path, query] = route.split('?');
  if (path.startsWith('/templates/') && query === 'view=full') {
    return (
      <Suspense fallback={null}>
        <TemplateView slug={path.slice('/templates/'.length)} />
      </Suspense>
    );
  }

  const wide = path === '/' || path.startsWith('/templates');

  let page: React.ReactNode;
  if (path === '/') page = <Home />;
  else if (path === '/templates') page = <TemplatesIndex />;
  else if (path.startsWith('/templates/')) page = <TemplatePage slug={path.slice('/templates/'.length)} />;
  else if (path === '/components') page = <ComponentsIndex />;
  else if (path.startsWith('/components/')) page = <ComponentPage slug={path.slice('/components/'.length)} />;
  else if (path.startsWith('/foundations/')) page = <FoundationsPage id={path.slice('/foundations/'.length)} />;
  else if (path === '/patterns/dashboard') page = <DashboardPattern />;
  else if (path === '/patterns/map-hud') page = <MapHudPattern />;
  else if (path === '/resources') page = <Resources />;
  else if (path === '/skill') page = <Skill />;
  else page = <NotFound />;

  return (
    <div className="doc-shell">
      <DocsHeader
        onSearch={() => setSearchOpen(true)}
        theme={theme}
        onToggleTheme={toggle}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />

      <div className="doc-body">
        <DocsSidebar route={route} open={menuOpen && isMobile} onNavigate={() => setMenuOpen(false)} />
        <main key={route} className={wide ? 'doc-main doc-main--wide page-enter' : 'doc-main page-enter'}>
          <Suspense fallback={<PageFallback />}>
            <PageReveal>{page}</PageReveal>
          </Suspense>
        </main>
      </div>

      <DocsFooter />
      {/* Mounted on first open rather than on load: the palette is a chunk of
          its own, and most visits never ask for it. */}
      {searchOpen && (
        <Suspense fallback={null}>
          <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
