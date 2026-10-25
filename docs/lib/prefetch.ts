/**
 * Route prefetching.
 *
 * Pages are code-split, so a navigation has to fetch a chunk before it can
 * render. Fetching it on intent — the moment a pointer or the keyboard focus
 * lands on a link — hides that entirely: by the time the click arrives the
 * module is usually already in memory, and the Suspense fallback never shows.
 *
 * Hover-prefetch only ever downloads what the reader was about to ask for, so
 * it costs nothing for someone who lands and leaves.
 */

type Loader = () => Promise<unknown>;

/** One loader per page module, keyed by the route prefix it serves. */
const loaders: Array<[match: (path: string) => boolean, load: Loader]> = [
  // No entry for `/`: the landing page is in the entry chunk already.
  [(p) => p === '/components', () => import('../pages/ComponentsIndex')],
  [(p) => p.startsWith('/components/'), () => import('../pages/ComponentPage')],
  [(p) => p.startsWith('/foundations/'), () => import('../pages/Foundations')],
  [(p) => p.startsWith('/patterns/'), () => import('../pages/Patterns')],
  [(p) => p.startsWith('/templates'), () => import('../pages/Templates')],
  [(p) => p === '/resources', () => import('../pages/Resources')],
  [(p) => p === '/skill', () => import('../pages/Skill')],
];

/** Modules already requested, so a route is never fetched twice. */
const requested = new Set<string>();

/** Resolve an in-site hash href to its path, or `null` if it is not one. */
export function routeFromHref(href: string | null): string | null {
  if (!href || !href.startsWith('#/')) return null;
  return href.slice(1).split('?')[0];
}

export function prefetchRoute(path: string): void {
  if (requested.has(path)) return;
  const entry = loaders.find(([match]) => match(path));
  if (!entry) return;
  requested.add(path);
  // A failed prefetch is not an error: the real navigation will retry it.
  entry[1]().catch(() => requested.delete(path));
}

/**
 * The command palette is mounted on first open, so warm its chunk when the
 * pointer reaches the search button rather than on page load.
 */
export function prefetchPalette(): void {
  if (requested.has('@palette')) return;
  requested.add('@palette');
  import('../components/CommandPalette').catch(() => requested.delete('@palette'));
}

/**
 * Listen once, at the document, for intent on any in-site link.
 *
 * `pointerover` covers mouse and pen, `focusin` covers keyboard tabbing, and
 * both bubble — so one pair of listeners serves every link on the page,
 * including ones rendered later.
 */
export function startLinkPrefetch(): () => void {
  const onIntent = (event: Event) => {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest?.('a[href^="#/"]');
    if (!anchor) return;
    const path = routeFromHref(anchor.getAttribute('href'));
    if (path) prefetchRoute(path);
  };

  document.addEventListener('pointerover', onIntent, { passive: true });
  document.addEventListener('focusin', onIntent, { passive: true });
  return () => {
    document.removeEventListener('pointerover', onIntent);
    document.removeEventListener('focusin', onIntent);
  };
}
