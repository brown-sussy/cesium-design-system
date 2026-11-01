/**
 * Vue site — behavioural checks.
 *
 * The crawl (`crawl-vue-site.mjs`) proves every route renders. This proves the
 * site's own chrome works: the command palette filters and navigates, the theme
 * toggle survives a reload, the mobile drawer opens and closes, the demo pane
 * can switch to its own source, navigation does not replay the pane entrance,
 * and a slow chunk shows the skeleton instead of a blank pane. Those are the
 * things a reader touches before they read anything.
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
await page
  .waitForFunction(() => location.hash.includes('/components/segmented-control'), { timeout: 5000 })
  .catch(() => {});
const routed = page.url().includes('/components/segmented-control');
check('Enter navigates to the component', routed, page.url().split('#')[1]);

/* 2 — the code pane shows the demo's own source.
 *
 * The pane is created on demand and fills in after the highlighter runs, so
 * wait for the text rather than for a duration. A fixed 200ms passed on
 * localhost and failed against the deployed site. */
await page.locator('.preview__tab', { hasText: 'Code' }).click();
const codeLoaded = await page
  .waitForFunction(
    () => {
      const el = document.querySelector('.preview__code');
      return Boolean(el) && el.innerText.includes('<script setup');
    },
    { timeout: 5000 },
  )
  .then(() => true)
  .catch(() => false);
const code = codeLoaded ? await page.locator('.preview__code').innerText() : '';
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

/* 4 — the search button opens the same palette. It is a lazy chunk, so wait
 * for it rather than for a duration. */
await page.locator('.doc-search-btn').click();
const searchOpened = await page
  .waitForSelector('.site-palette__input', { timeout: 5000 })
  .then(() => true)
  .catch(() => false);
check('search button opens the palette', searchOpened);
await page.keyboard.press('Escape');
const escaped = await page
  .waitForSelector('.site-palette__input', { state: 'detached', timeout: 5000 })
  .then(() => true)
  .catch(() => false);
check('Escape closes the palette', escaped);

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

/* 7 — moving between pages must not replay the pane entrance.
 *
 * `<main>` is keyed by route, so it remounts on every navigation. An entrance
 * animation left on it blanks a pane whose content is already rendered: the
 * reader sees the page blink. Both routes are visited first so the chunk is
 * warm and the measurement is about the animation, not the network. */
await page.goto(`${base}/#/components/button`, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.goto(`${base}/#/components/table`, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.goto(`${base}/#/components/button`, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

const pane = await page.evaluate(async () => {
  const frames = [];
  const start = performance.now();
  location.hash = '#/components/table';
  await new Promise((resolve) => {
    function tick() {
      const main = document.querySelector('.doc-main');
      if (main) {
        frames.push({
          op: Number(getComputedStyle(main).opacity),
          cls: main.className,
        });
      }
      if (performance.now() - start < 600) requestAnimationFrame(tick);
      else resolve();
    }
    requestAnimationFrame(tick);
  });
  return frames;
});
const dim = pane.filter((f) => f.op < 0.9).length;
const reentered = pane.some((f) => f.cls.includes('page-enter'));
check(
  'navigation does not fade the pane',
  pane.length > 0 && dim === 0 && !reentered,
  `${pane.length} frames, ${dim} below 0.9 opacity, page-enter=${reentered}`,
);

/* 8 — a page chunk that is genuinely slow gets the skeleton, not a blank pane.
 * Its own context, so nothing is already in the HTTP cache. */
const slowContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const slow = await slowContext.newPage();
await slow.route('**/*ComponentPage*', async (route) => {
  await new Promise((r) => setTimeout(r, 700));
  await route.continue();
});
await slow.goto(`${base}/#/`, { waitUntil: 'networkidle' });
await slow.evaluate(() => {
  location.hash = '#/components/button';
});
const sawSkeleton = await slow
  .waitForSelector('.page-skeleton', { timeout: 2500 })
  .then(() => true)
  .catch(() => false);
const landed = await slow
  .waitForSelector('.doc-h1', { timeout: 6000 })
  .then(() => true)
  .catch(() => false);
check('a slow chunk shows the skeleton', sawSkeleton && landed, `skeleton=${sawSkeleton} content=${landed}`);
await slowContext.close();

/* 9 — the bound controls actually bind.
 *
 * `v-model` on the Vue side is `defineModel`, and a rewrite of that declaration
 * can leave a control that renders perfectly and never updates. Mounting is
 * not proof; the value has to move. */
const controls = await context.newPage();
await controls.setViewportSize({ width: 1440, height: 900 });

async function openControl(route, selector) {
  await controls.goto(`${base}/#/components/${route}`, { waitUntil: 'load' });
  await controls.waitForSelector(`.preview__stage ${selector}`, { timeout: 10000, state: 'attached' });
  return controls.locator(`.preview__stage ${selector}`).first();
}

const box = await openControl('checkbox', '.cs-check__input');
const boxBefore = await box.isChecked();
await box.click({ force: true });
check('checkbox toggles', (await box.isChecked()) !== boxBefore, `${boxBefore} → ${await box.isChecked()}`);

const toggle = await openControl('switch', '.cs-switch__input');
const toggleBefore = await toggle.isChecked();
await toggle.click({ force: true });
check('switch toggles', (await toggle.isChecked()) !== toggleBefore, `${toggleBefore} → ${await toggle.isChecked()}`);

const field = await openControl('textarea', '.cs-textarea');
await field.fill('');
await field.type('hello');
check('textarea takes input', (await field.inputValue()) === 'hello', await field.inputValue());

const tabButtons = controls.locator('.preview__stage .cs-tabs__tab');
await controls.goto(`${base}/#/components/tabs`, { waitUntil: 'load' });
await controls.waitForSelector('.preview__stage .cs-tabs__tab', { timeout: 10000, state: 'attached' });
const tabBefore = await controls
  .locator('.preview__stage .cs-tabs__tab[data-active="true"]')
  .first()
  .innerText();
await tabButtons.nth(2).click();
await controls.waitForTimeout(250);
const tabAfter = await controls
  .locator('.preview__stage .cs-tabs__tab[data-active="true"]')
  .first()
  .innerText();
check('tabs select on click', tabBefore !== tabAfter, `${tabBefore.split('\n')[0]} → ${tabAfter.split('\n')[0]}`);
await controls.close();

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
