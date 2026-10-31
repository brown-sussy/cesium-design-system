#!/usr/bin/env node
/**
 * Behavioural check for the Vue package.
 *
 *   node scripts/vue-interact.mjs [baseUrl]
 *
 * Screenshots prove the components look right; this proves they work. Every
 * assertion is a real interaction — open, keyboard, select, dismiss — and the
 * teleported surfaces (Select, Menu, Dropdown, Modal, Drawer, flyout) are
 * checked against `document.body`, which is where they actually render.
 */
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://127.0.0.1:5180/';

const results = [];
function check(name, pass, detail = '') {
  results.push({ name, pass, detail });
  console.log(`${pass ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
}

// Prefer the locally installed Chrome, which is what these assertions were
// written against. Fall back to Playwright's bundled build so the run also
// works on a machine (or CI image) without Chrome installed.
async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    return chromium.launch();
  }
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});

await page.goto(base, { waitUntil: 'networkidle' });
await page.waitForTimeout(300);

/* --- Select: open, pick, close ---------------------------------------- */
{
  const trigger = page.locator('#forms .cs-selectbox__trigger').first();
  await trigger.click();
  await page.waitForTimeout(120);
  const open = await page.locator('.cs-selectbox__panel').count();
  check('Select opens a listbox', open === 1, `${open} panel(s)`);

  await page.locator('.cs-selectbox__option', { hasText: 'Web Mercator' }).click();
  await page.waitForTimeout(120);
  const value = (await trigger.locator('.cs-selectbox__value').innerText()).trim();
  const closed = await page.locator('.cs-selectbox__panel').count();
  check('Select commits the choice', value === 'Web Mercator', value);
  check('Select closes after choosing', closed === 0);
}

/* --- Select: searchable filter + keyboard ----------------------------- */
{
  const trigger = page.locator('#forms .cs-selectbox__trigger').first();
  await trigger.click();
  await page.waitForTimeout(120);
  await page.locator('.cs-selectbox__input').fill('lunar');
  await page.waitForTimeout(120);
  const count = await page.locator('.cs-selectbox__option').count();
  check('Select filters on search', count === 1, `${count} option(s)`);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(120);
  const value = (await trigger.locator('.cs-selectbox__value').innerText()).trim();
  check('Select commits from the keyboard', value === 'Lunar Mean', value);
}

/* --- Menu: keyboard navigation ---------------------------------------- */
{
  const trigger = page.locator('#navigation .cs-menu__trigger').first();
  await trigger.click();
  await page.waitForTimeout(120);
  check('Menu opens', (await page.locator('.cs-menu__list').count()) === 1);

  await page.keyboard.press('ArrowDown');
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? '');
  check('Menu moves focus with arrows', focused.includes('Capture frame'), focused);

  await page.keyboard.press('Escape');
  await page.waitForTimeout(120);
  check('Menu closes on Escape', (await page.locator('.cs-menu__list').count()) === 0);
  const refocused = await page.evaluate(() =>
    document.activeElement?.classList.contains('cs-menu__trigger'),
  );
  check('Menu returns focus to its trigger', refocused === true);
}

/* --- Dropdown: focus handoff + close on action ------------------------ */
{
  const trigger = page.locator('#overlay .cs-dropdown__trigger').first();
  await trigger.click();
  await page.waitForTimeout(150);
  const inPanel = await page.evaluate(
    () => !!document.activeElement?.closest('.cs-dropdown__panel'),
  );
  check('Dropdown focuses its first control', inPanel === true);

  await page.locator('.cs-dropdown__panel [data-dropdown-close]', { hasText: 'Apply' }).click();
  await page.waitForTimeout(150);
  check('Dropdown closes on an action', (await page.locator('.cs-dropdown__panel').count()) === 0);
}

/* --- Modal: scroll lock + Escape -------------------------------------- */
{
  await page.locator('#overlay button', { hasText: 'Open modal' }).click();
  await page.waitForTimeout(200);
  check('Modal portals to body', (await page.locator('body > .cs-overlay .cs-modal').count()) === 1);
  const locked = await page.evaluate(() => document.body.style.overflow);
  check('Modal locks body scroll', locked === 'hidden', locked);

  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  check('Modal closes on Escape', (await page.locator('.cs-modal').count()) === 0);
  const restored = await page.evaluate(() => document.body.style.overflow);
  check('Modal restores body scroll', restored !== 'hidden', `"${restored}"`);
}

/* --- Drawer ------------------------------------------------------------ */
{
  await page.locator('#overlay button', { hasText: 'Open drawer' }).click();
  await page.waitForTimeout(200);
  check('Drawer opens', (await page.locator('.cs-drawer').count()) === 1);
  await page.locator('.cs-overlay--drawer').click({ position: { x: 20, y: 400 } });
  await page.waitForTimeout(200);
  check('Drawer closes on overlay click', (await page.locator('.cs-drawer').count()) === 0);
}

/* --- Tabs -------------------------------------------------------------- */
{
  const tabs = page.locator('#navigation .cs-tabs').first();
  const before = await tabs.locator('.cs-tabs__indicator').getAttribute('style');
  await tabs.locator('.cs-tabs__tab', { hasText: 'Filters' }).click();
  await page.waitForTimeout(260);
  const after = await tabs.locator('.cs-tabs__indicator').getAttribute('style');
  const selected = await tabs.locator('.cs-tabs__tab', { hasText: 'Filters' }).getAttribute('aria-selected');
  check('Tabs select on click', selected === 'true');
  check('Tabs indicator moves', before !== after, `${before} → ${after}`);
}

/* --- Pagination -------------------------------------------------------- */
{
  await page.locator('#navigation .cs-pagination__btn', { hasText: '5' }).click();
  await page.waitForTimeout(150);
  const current = await page
    .locator('#navigation .cs-pagination__btn[aria-current="page"]')
    .innerText();
  check('Pagination changes page', current.trim() === '5', current);
}

/* --- Sidebar flyout in rail mode -------------------------------------- */
{
  const rail = page.locator('#navigation .cs-sidebar[data-collapsed]');
  const first = rail.locator('.cs-sidebar__item').first();
  await first.hover();
  await page.waitForTimeout(200);
  const flyout = page.locator('body > .cs-sidebar__flyout');
  const text = (await flyout.count()) ? (await flyout.innerText()).trim() : '';
  check('Rail shows a flyout label', text === 'Globe', text);
}

/* --- Slider keyboard --------------------------------------------------- */
{
  const slider = page.locator('#forms .cs-slider__track').first();
  await slider.focus();
  const before = Number(await slider.getAttribute('aria-valuenow'));
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(120);
  const after = Number(await slider.getAttribute('aria-valuenow'));
  check('Slider responds to arrows', after === before + 1, `${before} → ${after}`);
}

/* --- Checkbox indeterminate -------------------------------------------- */
{
  const indeterminate = await page.evaluate(() => {
    const boxes = [...document.querySelectorAll('#forms .cs-check__input')];
    const box = boxes.find((b) => b.closest('label')?.textContent?.includes('Partial'));
    return box ? box.indeterminate : null;
  });
  check('Checkbox renders the indeterminate state', indeterminate === true, String(indeterminate));
}

/* --- Theme toggle ------------------------------------------------------ */
{
  await page.locator('.pg-top .cs-btn--icon').last().click();
  await page.waitForTimeout(150);
  const theme = await page.evaluate(() => document.documentElement.dataset.theme);
  check('Theme toggles to light', theme === 'light', theme);
}

await browser.close();

const failed = results.filter((r) => !r.pass);
if (errors.length) {
  console.error(`\n✗ ${errors.length} console errors`);
  for (const line of errors.slice(0, 8)) console.error(`  ${line}`);
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length || errors.length) process.exitCode = 1;
