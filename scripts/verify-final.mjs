import { chromium } from 'playwright';

const BASE = 'http://localhost:5199';
const browser = await chromium.launch({ channel: 'chrome' });
const errors = [];

const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 });
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.message}`));

const shot = async (path, name, opts = {}) => {
  await page.goto(`${BASE}/#${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  if (opts.theme) {
    await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, opts.theme);
    await page.waitForTimeout(450);
  }
  await page.screenshot({ path: `/tmp/v-${name}.png`, fullPage: Boolean(opts.full) });
  console.log(`shot ${name}`);
};

await shot('/', 'hero');
await shot('/patterns/map-hud', 'hud');
await shot('/patterns/dashboard', 'dashboard');
await shot('/foundations/color', 'color');
await shot('/components/compass', 'compass');
await shot('/', 'hero-light', { theme: 'light' });

// fonts actually used
const fonts = await page.evaluate(() => {
  const out = new Set();
  document.fonts.forEach((f) => { if (f.status === 'loaded') out.add(`${f.family} ${f.weight}`); });
  return [...out];
});

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await mobile.goto(`${BASE}/#/`, { waitUntil: 'networkidle' });
await mobile.waitForTimeout(600);
await mobile.screenshot({ path: '/tmp/v-mobile.png' });
console.log('shot mobile');

console.log('FONTS:', JSON.stringify(fonts));
console.log('ERRORS:', errors.length ? JSON.stringify(errors.slice(0, 10), null, 2) : 'none');
await browser.close();
