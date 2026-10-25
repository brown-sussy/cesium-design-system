import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:5178';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 });

const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.message}`));

async function shot(route, name, opts = {}) {
  await page.goto(`${BASE}/#${route}`, { waitUntil: 'networkidle' });
  if (opts.theme) await page.evaluate((t) => (document.documentElement.dataset.theme = t), opts.theme);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `/tmp/nav-${name}.png`, ...opts.clip });
  console.log(`shot ${name}`);
}

// sidebar element crops
for (const theme of ['dark', 'light']) {
  await page.goto(`${BASE}/#/components/button`, { waitUntil: 'networkidle' });
  await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
  await page.waitForTimeout(500);
  await page.locator('.doc-sidebar').screenshot({ path: `/tmp/nav-sidebar-${theme}.png` });
  console.log(`shot sidebar-${theme}`);
}

// full page, dark, with rail visible
await page.goto(`${BASE}/#/components/coordinate-readout`, { waitUntil: 'networkidle' });
await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
await page.waitForTimeout(700);
await page.screenshot({ path: '/tmp/nav-full-dark.png' });
console.log('shot full-dark');

// header crop
await page.locator('.doc-header').screenshot({ path: '/tmp/nav-header.png' });
console.log('shot header');

// rail geometry + travel
const geom = await page.evaluate(() => {
  const rail = document.querySelector('.doc-nav-rail');
  const active = document.querySelector('.doc-nav-item[data-active="true"]');
  const s = document.querySelector('.doc-sidebar');
  const r = rail.getBoundingClientRect();
  const a = active.getBoundingClientRect();
  return {
    rail: { top: Math.round(r.top), h: Math.round(r.height), left: Math.round(r.left), opacity: getComputedStyle(rail).opacity },
    active: { top: Math.round(a.top), h: Math.round(a.height), left: Math.round(a.left), text: active.textContent },
    sidebarLeft: Math.round(s.getBoundingClientRect().left),
    fonts: {
      display: getComputedStyle(document.querySelector('.doc-wordmark__main')).fontFamily,
      body: getComputedStyle(document.body).fontFamily,
      h1: getComputedStyle(document.querySelector('.doc-h1')).fontFamily,
    },
  };
});
console.log(JSON.stringify(geom, null, 2));

// mid-flight rail travel
await page.goto(`${BASE}/#/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const before = await page.evaluate(() => document.querySelector('.doc-nav-rail').getBoundingClientRect().top);
await page.evaluate(() => {
  location.hash = '#/components/coordinate-readout';
});
await page.waitForTimeout(90);
const mid = await page.evaluate(() => document.querySelector('.doc-nav-rail').getBoundingClientRect().top);
await page.waitForTimeout(700);
const after = await page.evaluate(() => document.querySelector('.doc-nav-rail').getBoundingClientRect().top);
console.log('rail travel', { before: Math.round(before), mid: Math.round(mid), after: Math.round(after) });

console.log('ERRORS:', JSON.stringify(errors.slice(0, 10)));
await browser.close();
