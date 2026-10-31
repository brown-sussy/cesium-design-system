#!/usr/bin/env node
/**
 * Screenshots the Vue playground, section by section, in both themes.
 *
 *   node scripts/shots-vue.mjs [baseUrl] [sectionId]
 *
 * The playground scrolls inside `.pg-main`, not the document, so a fullPage
 * capture only ever shows the first viewport — each section is screenshotted
 * as an element instead. Also reports console errors and horizontal overflow,
 * which is how the React audit catches layout regressions.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, '.workbuddy-ai/shots/vue');
mkdirSync(out, { recursive: true });

const base = process.argv[2] ?? 'http://127.0.0.1:5180/';
const only = process.argv[3];

const SECTIONS = [
  'actions',
  'forms',
  'selection',
  'layout',
  'data',
  'navigation',
  'overlay',
  'hud',
  'ai',
  'chat',
  'science',
];

// Prefer the locally installed Chrome, which is what the React screenshots use.
// Fall back to Playwright's bundled build so the run also works on a machine
// (or CI image) without Chrome installed.
async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    return chromium.launch();
  }
}

const browser = await launch();
const errors = [];

async function open(viewport, theme) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${theme}] ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`[${theme}] ${err.message}`));

  await page.goto(base, { waitUntil: 'networkidle' });
  if (theme === 'light') {
    await page.evaluate(() => {
      document.documentElement.dataset.theme = 'light';
    });
  }
  await page.waitForTimeout(300);
  return page;
}

const desktop = { width: 1440, height: 960 };
const mobile = { width: 390, height: 844 };

for (const theme of ['dark', 'light']) {
  const page = await open(desktop, theme);
  let count = 0;
  for (const id of SECTIONS) {
    if (only && only !== id) continue;
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(220);
    await section.screenshot({ path: resolve(out, `${id}-${theme}.png`) });
    count += 1;
  }
  console.log(`✓ ${theme} — ${count} sections`);
  await page.close();
}

// Mobile: overflow check plus one capture of the visible column.
const page = await open(mobile, 'dark');
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
await page.screenshot({ path: resolve(out, 'mobile-dark.png') });
console.log(`✓ mobile — 390px, overflow ${overflow}px`);
await page.close();

await browser.close();

if (errors.length) {
  console.error(`\n✗ ${errors.length} console errors`);
  for (const line of errors.slice(0, 10)) console.error(`  ${line}`);
  process.exitCode = 1;
} else {
  console.log('\n✓ 0 console errors');
}

if (overflow > 0) {
  console.error(`✗ ${overflow}px horizontal overflow at 390px`);
  process.exitCode = 1;
}
