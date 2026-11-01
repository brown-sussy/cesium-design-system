import { chromium } from 'playwright';
async function launch() {
  try { return await chromium.launch({ channel: 'chrome' }); } catch { return chromium.launch(); }
}
const browser = await launch();
async function shot(theme, route, path, w = 1440, h = 900) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  await ctx.addInitScript((t) => localStorage.setItem('cesium-theme', t), theme);
  const page = await ctx.newPage();
  await page.goto(`http://localhost:4399/#${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.screenshot({ path });
  await ctx.close();
}
await shot('dark', '/components/button', '/tmp/btn-dark.png');
await shot('light', '/components/button', '/tmp/btn-light.png');
await shot('dark', '/', '/tmp/home-dark.png');
await shot('dark', '/components/input', '/tmp/input-dark.png');
await browser.close();
console.log('ok');
