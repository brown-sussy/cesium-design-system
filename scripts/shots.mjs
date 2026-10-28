import { chromium } from 'playwright';

const base = process.env.DOCS_URL || 'http://127.0.0.1:5178';

const shots = [
  { path: '/', name: 'home', full: true },
  { path: '/components', name: 'components' },
  { path: '/components/button', name: 'button' },
  { path: '/foundations/color', name: 'color' },
  { path: '/patterns/dashboard', name: 'dashboard' },
  { path: '/patterns/map-hud', name: 'hud' },
];

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 });

const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', (err) => errors.push(`PAGEERROR: ${err.message}`));

/** Walk the page so every IntersectionObserver reveal has fired before we shoot. */
async function settle(p) {
  const height = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 700) {
    await p.evaluate((top) => window.scrollTo(0, top), y);
    await p.waitForTimeout(120);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(500);
}

for (const shot of shots) {
  await page.goto(`${base}/#${shot.path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await settle(page);
  await page.screenshot({ path: `/tmp/cs-${shot.name}.png`, fullPage: Boolean(shot.full) });
  console.log(`shot ${shot.name}`);
}

// light theme sample
await page.goto(`${base}/#/`, { waitUntil: 'networkidle' });
await page.evaluate(() => {
  document.documentElement.dataset.theme = 'light';
});
await page.waitForTimeout(400);
await settle(page);
await page.screenshot({ path: '/tmp/cs-home-light.png', fullPage: true });
console.log('shot home-light');

// mobile
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await mobile.goto(`${base}/#/`, { waitUntil: 'networkidle' });
await mobile.waitForTimeout(400);
await settle(mobile);
await mobile.screenshot({ path: '/tmp/cs-mobile.png' });
console.log('shot mobile');

console.log('ERRORS:', JSON.stringify(errors.slice(0, 20), null, 2));
await browser.close();
