import { chromium } from 'playwright';
async function launch() {
  try { return await chromium.launch({ channel: 'chrome' }); } catch { return chromium.launch(); }
}
const browser = await launch();
for (const base of ['https://brown-sussy.github.io/cesium-design-system/vue', 'http://localhost:4399']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const fails = [];
  page.on('requestfailed', (r) => fails.push(`${r.url().split('/').pop()} ${r.failure()?.errorText}`));
  await page.goto(`${base}/#/components/segmented-control`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const before = await page.evaluate(() => ({
    hasCode: Boolean(document.querySelector('.preview__code')),
    blocks: document.querySelectorAll('.code-block').length,
  }));
  await page.locator('.preview__tab', { hasText: 'Code' }).click();
  await page.waitForTimeout(1500);
  const after = await page.evaluate(() => {
    const el = document.querySelector('.preview__code');
    return {
      exists: Boolean(el),
      len: el ? el.innerText.length : -1,
      lines: el ? el.innerText.split('\n').length : -1,
      head: el ? el.innerText.slice(0, 60).replace(/\n/g, '\\n') : '',
      blocks: document.querySelectorAll('.code-block').length,
    };
  });
  console.log(`\n${base}`);
  console.log(`  before: ${JSON.stringify(before)}`);
  console.log(`  after:  ${JSON.stringify(after)}`);
  if (fails.length) console.log(`  failed requests: ${fails.slice(0, 3).join(' | ')}`);
  await page.close();
}
await browser.close();
