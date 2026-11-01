import { chromium } from 'playwright';
async function launch() {
  try { return await chromium.launch({ channel: 'chrome' }); } catch { return chromium.launch(); }
}
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:4399/#/', { waitUntil: 'load' });
await page.waitForTimeout(1200);
const out = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const hits = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('.doc-sidebar')) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.right > vw + 0.5) {
      hits.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className || '').slice(0, 70),
        left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
        text: (el.textContent || '').trim().slice(0, 40).replace(/\s+/g, ' '),
      });
    }
  }
  return { vw, hits: hits.slice(0, 16) };
});
console.log('viewport', out.vw, 'hits', out.hits.length);
for (const h of out.hits) console.log(`${String(h.left).padStart(5)}..${String(h.right).padStart(5)} (${h.w}) ${h.tag}.${h.cls} "${h.text}"`);
await browser.close();
