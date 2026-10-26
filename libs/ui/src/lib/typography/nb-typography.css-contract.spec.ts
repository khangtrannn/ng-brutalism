import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  chromium,
  firefox,
  webkit,
  type Browser,
  type BrowserType,
  type Page,
} from '@playwright/test';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// jsdom can't run the cascade, so these specs render the real stylesheets in
// each engine. Markup mirrors NbTypography: the font input writes
// --nb-typography-font-family inline; unset, the element keeps the font around it.
const css = ['../styles/theme.css', './nb-typography.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <div style="font-family: serif; --nb-typography-font-family: monospace">
    <span data-nb-typography="inherit" id="inherit">x</span>
    <span data-nb-typography="mono" id="mono" style="--nb-typography-font-family: cursive">x</span>
  </div>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-typography CSS contract (%s)', (_name, engine) => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await engine.launch();
    page = await browser.newPage();
    await page.setContent(html);
  });

  afterAll(async () => {
    await browser?.close();
  });

  const computed = (id: string, property: string) =>
    page.evaluate(
      ([elementId, name]) =>
        getComputedStyle(document.getElementById(elementId)!).getPropertyValue(name),
      [id, property] as const
    );

  it('keeps the surrounding font, ignoring the token on a wrapper', async () => {
    expect(await computed('inherit', 'font-family')).toBe('serif');
  });

  it('applies the font written inline', async () => {
    expect(await computed('mono', 'font-family')).toBe('cursive');
  });
});
