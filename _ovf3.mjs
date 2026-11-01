import { chromium } from 'playwright';
async function launch() {
  try { return await chromium.launch({ channel: 'chrome' }); } catch { return chromium.launch(); }
}
const browser = await launch();
const routes = ['/', '/components', '/foundations/principles', '/templates', '/templates/homepage', '/resources', '/components/button', '/components/table'];
for (const base of ['http://localhost:4400', 'http://localhost:4399']) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const bad = [];
  for (const r of routes) {
    await page.goto(`${base}/#${r}`, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    const o = await page.evaluate(() => {
      const d = document.documentElement;
      return Math.max(0, d.scrollWidth - d.clientWidth);
    });
    if (o > 1) bad.push(`${r} +${o}px`);
  }
  console.log(`${base}  390px overflow: ${bad.length ? bad.join(', ') : 'none'}`);
  await page.close();
}
await browser.close();
