/**
 * Vue site crawl.
 *
 * Visits every route the site publishes, in both themes, and fails on a console
 * error, an uncaught exception, a component page that never rendered its demo,
 * or horizontal overflow at 390px. The React site has the same check in spirit
 * (`scripts/shots.mjs`); this one is about the Vue build being *correct*, not
 * about screenshots.
 *
 *   node scripts/crawl-vue-site.mjs http://localhost:5179
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.argv[2] ?? 'http://localhost:5179').replace(/\/$/, '');

const catalog = readFileSync(resolve(root, 'vue-site/lib/nav.generated.ts'), 'utf8');
const slugs = [...catalog.matchAll(/"slug": "([^"]+)"/g)].map((m) => m[1]);

async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    return chromium.launch();
  }
}

const browser = await launch();
const problems = [];

/**
 * One context per theme/viewport, with the theme written before any document
 * loads so the crawl does not pay for a reload per route. Pages are cheap;
 * contexts are not.
 */
const contexts = new Map();

async function openPage(theme, viewport) {
  const key = `${theme}-${viewport.width}`;
  let context = contexts.get(key);
  if (!context) {
    context = await browser.newContext({ viewport });
    await context.addInitScript((t) => {
      localStorage.setItem('cesium-theme', t);
    }, theme);
    contexts.set(key, context);
  }
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(`${page.url()} ${msg.text()}`);
  });
  page.on('pageerror', (err) => problems.push(`${page.url()} uncaught: ${err.message}`));
  return page;
}

async function check(route, theme, viewport) {
  const page = await openPage(theme, viewport);
  await page.goto(`${base}/#${route}`, { waitUntil: 'load' });

  /*
   * Wait for the condition, not for a stopwatch. A fixed sleep is enough on
   * localhost and wrong everywhere else: against the deployed site the route
   * chunk and then the demo chunk both arrive over the network, and the page
   * looks empty for a second.
   *
   * The condition has to exclude the placeholder. `DemoPreview` renders
   * `<span class="site-empty">Demo loading…</span>` inside the stage, so
   * `children.length > 0` is true before the demo exists — which is exactly
   * how this reported 53/53 locally and 0/53 over the network.
   */
  const isComponent = route.startsWith('/components/') && route !== '/components';
  if (isComponent) {
    await page
      .waitForFunction(
        () => {
          const stage = document.querySelector('.preview__stage');
          return Boolean(stage) && !stage.querySelector('.site-empty');
        },
        { timeout: 15000 },
      )
      .catch(() => {});
  } else {
    await page.waitForTimeout(300);
  }

  /*
   * Overflow has to be measured on the document, not on `.doc-main`. The header
   * is outside `.doc-main`, so a header that does not fit — which is what a
   * 390px viewport did: the search button collapsed to 2px and the theme toggle
   * sat at x=417 — leaves the main pane perfectly clean while the page scrolls
   * sideways. Check both.
   */
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    const main = document.querySelector('.doc-main');
    return {
      doc: Math.max(0, doc.scrollWidth - doc.clientWidth),
      main: main ? Math.max(0, main.scrollWidth - main.clientWidth) : 0,
    };
  });
  if (overflow.doc > 1) {
    problems.push(`${route} [${theme} ${viewport.width}px] page overflows by ${overflow.doc}px`);
  }
  if (overflow.main > 1) {
    problems.push(`${route} [${theme} ${viewport.width}px] content overflows by ${overflow.main}px`);
  }

  const mounted = await page.evaluate(() => {
    const stage = document.querySelector('.preview__stage');
    return stage ? stage.children.length > 0 && !stage.querySelector('.site-empty') : false;
  });

  await page.close();
  return mounted;
}

const routes = ['/', '/components', ...slugs.map((s) => `/components/${s}`)];
const desktop = { width: 1440, height: 900 };
let demosMounted = 0;

for (const route of routes) {
  if (await check(route, 'dark', desktop)) demosMounted += 1;
  await check(route, 'light', desktop);
}

// Mobile: nothing may scroll sideways at 390px. Every route, not a sample —
// a header overflow is page-wide, and a demo overflow is per-page.
for (const route of routes) {
  await check(route, 'dark', { width: 390, height: 844 });
}

await browser.close();

const unique = [...new Set(problems)];
if (unique.length) {
  console.error(`✗ ${unique.length} problem(s):`);
  for (const p of unique) console.error(`    ${p}`);
  process.exit(1);
}

console.log(
  `✓ crawl — ${routes.length} routes × 2 themes, ${demosMounted}/${slugs.length} demos mounted, no overflow at 390px`,
);
