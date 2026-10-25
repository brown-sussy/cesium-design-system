import { chromium } from 'playwright';

const slugs = [
  'button', 'input', 'textarea', 'select', 'checkbox', 'switch', 'slider', 'field',
  'segmented-control', 'badge', 'tag', 'avatar', 'kbd', 'status-dot', 'spinner',
  'progress', 'skeleton', 'divider', 'tooltip', 'icon', 'card', 'panel', 'toolbar',
  'table', 'stat', 'key-value', 'sparkline', 'coordinate-readout', 'legend', 'tabs',
  'breadcrumb', 'pagination', 'menu', 'sidebar', 'dropdown', 'modal', 'drawer', 'alert', 'compass', 'scale-bar',
];

const templates = ['homepage', 'sign-in', 'settings', 'not-found'];

const routes = [
  '/',
  '/components',
  ...slugs.map((s) => `/components/${s}`),
  '/foundations/principles',
  '/foundations/color',
  '/foundations/typography',
  '/foundations/spacing',
  '/foundations/motion',
  '/foundations/iconography',
  '/patterns/dashboard',
  '/patterns/map-hud',
  '/templates',
  ...templates.map((t) => `/templates/${t}`),
  '/resources',
  '/skill',
];

const BASE = process.env.DOCS_URL ?? 'http://127.0.0.1:5178';

// Prefer the locally installed Chrome, which is what the visual checks were
// taken with. Fall back to Playwright's bundled build so this still runs on a
// machine (or CI image) without Chrome installed.
async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    return chromium.launch();
  }
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });

const problems = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') problems.push(`[console] ${msg.text()}`);
});
page.on('pageerror', (err) => problems.push(`[pageerror] ${err.message}`));

for (const route of routes) {
  const before = problems.length;
  await page.goto(`${BASE}/#${route}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(220);
  const info = await page.evaluate(() => ({
    text: document.body.innerText.trim().length,
    h1: document.querySelector('h1')?.textContent ?? '',
  }));
  if (info.text < 200) problems.push(`[thin] ${route} text=${info.text}`);
  if (problems.length > before) console.log(`✗ ${route} → ${problems.slice(before).join(' | ')}`);
  else console.log(`✓ ${route}  ${info.h1.slice(0, 40)}`);
}

console.log(`\n${routes.length} routes, ${problems.length} problems`);
await browser.close();

// Fail the run when something is actually broken, so CI can gate on it.
process.exitCode = problems.length ? 1 : 0;
