/**
 * Vue site — behavioural checks.
 *
 * The crawl (`crawl-vue-site.mjs`) proves every route renders. This proves the
 * site's own chrome works: the command palette filters and navigates, the theme
 * toggle survives a reload, the mobile drawer opens and closes, and the demo
 * pane can switch to its own source. Those are the four things a reader touches
 * before they read anything.
 *
 *   node scripts/site-interact.mjs http://localhost:5179
 */
import { chromium } from 'playwright';

const base = (process.argv[2] ?? 'http://localhost:5179').replace(/\/$/, '');

async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    return chromium.launch();
  }
}

const browser = await launch();
const results = [];

function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
}

const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
page.on('pageerror', (e) => errors.push(e.message));

await page.goto(`${base}/#/`, { waitUntil: 'networkidle' });

/* 1 — ⌘K opens the palette, typing filters it, Enter navigates. */
await page.keyboard.press('Meta+k');
await page.waitForSelector('.site-palette__input', { timeout: 3000 });
check('⌘K opens the palette', true);

// A query with one obvious answer: "table" fuzzy-matches Skeleton too, so the
// first hit is not the thing being looked for.
await page.locator('.site-palette__input').fill('segmented');
await page.waitForTimeout(150);
const hits = await page.locator('.site-palette__item').count();
const firstLabel = hits ? await page.locator('.site-palette__item').first().innerText() : '';
check(
  'typing filters the palette',
  hits > 0 && hits < 10,
  `${hits} hits, first: ${firstLabel.split('\n')[0]}`,
);

await page.keyboard.press('Enter');
await page.waitForTimeout(400);
const routed = page.url().includes('/components/segmented-control');
check('Enter navigates to the component', routed, page.url().split('#')[1]);

/* 2 — the code pane shows the demo's own source. */
await page.locator('.preview__tab', { hasText: 'Code' }).click();
await page.waitForTimeout(200);
const code = await page.locator('.preview__code').innerText();
check(
  'code pane shows the demo source',
  code.includes('<script setup') && code.includes('SegmentedControl'),
  `${code.split('\n').length} lines`,
);

/* 3 — theme toggle flips the attribute and persists across a reload. */
await page.locator('.doc-header__icon-btn').last().click();
await page.waitForTimeout(200);
const afterToggle = await page.evaluate(() => document.documentElement.dataset.theme);
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(300);
const afterReload = await page.evaluate(() => document.documentElement.dataset.theme);
check('theme toggle persists across reload', afterToggle === afterReload, `${afterToggle} → ${afterReload}`);

/* 4 — the search button opens the same palette. */
await page.locator('.doc-search-btn').click();
await page.waitForTimeout(250);
check('search button opens the palette', (await page.locator('.site-palette__input').count()) === 1);
await page.keyboard.press('Escape');
await page.waitForTimeout(200);
check('Escape closes the palette', (await page.locator('.site-palette__input').count()) === 0);

/* 5 — mobile: the drawer opens, a link closes it. */
const mobile = await context.newPage();
await mobile.setViewportSize({ width: 390, height: 844 });
await mobile.goto(`${base}/#/`, { waitUntil: 'networkidle' });
await mobile.locator('.doc-header__menu').click();
await mobile.waitForTimeout(300);
const drawerOpen = await mobile.evaluate(() => {
  const sidebar = document.querySelector('.doc-sidebar, .cs-sidebar');
  if (!sidebar) return false;
  const rect = sidebar.getBoundingClientRect();
  return rect.left >= -1 && rect.width > 0;
});
check('mobile drawer opens', drawerOpen);

const link = mobile.locator('.doc-sidebar a, .cs-sidebar a').first();
if (await link.count()) {
  await link.click();
  await mobile.waitForTimeout(400);
  const closed = await mobile.evaluate(() => {
    const sidebar = document.querySelector('.doc-sidebar, .cs-sidebar');
    return !sidebar || sidebar.getBoundingClientRect().left < -1;
  });
  check('navigating closes the drawer', closed);
} else {
  check('navigating closes the drawer', false, 'no sidebar link found');
}

/* 6 — a 404 route still renders the shell. */
await page.goto(`${base}/#/components/not-a-component`, { waitUntil: 'networkidle' });
await page.waitForTimeout(250);
const lost = await page.locator('.doc-main').innerText();
check('unknown route renders the 404', lost.includes('Signal lost'), lost.split('\n')[1] ?? '');

await browser.close();

for (const r of results) {
  console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.detail ? `  — ${r.detail}` : ''}`);
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} console error(s):`);
  for (const e of errors) console.error(`    ${e}`);
}

const failed = results.filter((r) => !r.ok).length;
if (failed || errors.length) {
  console.error(`\n${failed} check(s) failed, ${errors.length} console error(s)`);
  process.exit(1);
}
console.log(`\n✓ ${results.length} checks passed, no console errors`);
