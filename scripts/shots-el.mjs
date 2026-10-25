import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 });

const targets = [
  { path: '/', selector: '.hero-stage', name: 'hero-stage' },
  { path: '/patterns/map-hud', selector: '.hud-demo', name: 'hud-demo' },
  { path: '/patterns/dashboard', selector: '.pattern-toolbar', name: 'pattern-toolbar' },
  { path: '/foundations/color', selector: '.swatch-grid', name: 'swatches' },
  { path: '/components/button', selector: '.doc-meta', name: 'meta' },
  { path: '/components/input', selector: '.preview', name: 'preview-input' },
];

for (const t of targets) {
  await page.goto(`http://127.0.0.1:5178/#${t.path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const el = await page.$(t.selector);
  if (!el) {
    console.log('missing', t.name);
    continue;
  }
  await el.screenshot({ path: `/tmp/el-${t.name}.png` });
  const box = await el.boundingBox();
  console.log(t.name, box && `${Math.round(box.width)}x${Math.round(box.height)}`);
}

// light theme full page of button
await page.goto('http://127.0.0.1:5178/#/components/button', { waitUntil: 'networkidle' });
await page.evaluate(() => (document.documentElement.dataset.theme = 'light'));
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/cs-button-light.png' });

await browser.close();
