import { chromium } from 'playwright';

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

for (const shot of shots) {
  await page.goto(`http://127.0.0.1:5178/#${shot.path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `/tmp/cs-${shot.name}.png`, fullPage: Boolean(shot.full) });
  console.log(`shot ${shot.name}`);
}

// light theme sample
await page.goto('http://127.0.0.1:5178/#/', { waitUntil: 'networkidle' });
await page.evaluate(() => {
  document.documentElement.dataset.theme = 'light';
});
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/cs-home-light.png', fullPage: false });
console.log('shot home-light');

// mobile
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await mobile.goto('http://127.0.0.1:5178/#/', { waitUntil: 'networkidle' });
await mobile.waitForTimeout(500);
await mobile.screenshot({ path: '/tmp/cs-mobile.png' });
console.log('shot mobile');

console.log('ERRORS:', JSON.stringify(errors.slice(0, 20), null, 2));
await browser.close();
