import { chromium } from 'playwright';
async function launch() {
  try { return await chromium.launch({ channel: 'chrome' }); } catch { return chromium.launch(); }
}
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:4399/#/', { waitUntil: 'load' });
await page.waitForTimeout(1000);
const out = await page.evaluate(() => {
  const list = document.querySelector('.index-list');
  const rows = [...document.querySelectorAll('.index-row')].map((r) => {
    const name = r.querySelector('.index-row__name');
    const cat = r.querySelector('.index-row__cat');
    return {
      text: name.textContent + ' / ' + cat.textContent,
      rowW: Math.round(r.getBoundingClientRect().width),
      nameW: Math.round(name.getBoundingClientRect().width),
      catW: Math.round(cat.getBoundingClientRect().width),
      scrollW: r.scrollWidth,
      clientW: r.clientWidth,
    };
  }).sort((a, b) => b.scrollW - a.scrollW).slice(0, 6);
  const listBox = list ? { w: Math.round(list.getBoundingClientRect().width), sw: list.scrollWidth } : null;
  const parent = list?.parentElement;
  return { listBox, parentCls: parent?.className, parentW: parent ? Math.round(parent.getBoundingClientRect().width) : null, rows };
});
console.log('list', JSON.stringify(out.listBox), 'parent', out.parentCls, out.parentW);
for (const r of out.rows) console.log(`row ${r.rowW} scroll ${r.scrollW}/${r.clientW}  name ${r.nameW}  cat ${r.catW}  "${r.text}"`);
await browser.close();
