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
// each engine. Markup mirrors NbSplit: tokens are declared on `data-nb-split`, ratio
// variants set the columns, the separator is the first item's ::after.
const css = ['../styles/theme.css', './nb-split.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <div data-nb-split data-ratio="1:1" data-collapse="none" data-separator="solid" id="default" style="width: 400px"><div id="default-a">a</div><div>b</div></div>
  <div data-nb-split data-ratio="3:1" data-collapse="none" id="ratio" style="width: 400px"><div id="ratio-a">a</div><div>b</div></div>
  <div data-nb-split data-ratio="1:1" data-collapse="none" data-separator="thick" id="gap" style="width: 400px; --nb-split-gap: 2rem"><div id="gap-a">a</div><div>b</div></div>
  <section style="--nb-split-gap: 40px"><div data-nb-split data-collapse="none" id="wrapper"></div></section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-split CSS contract (%s)', (_name, engine) => {
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

  const after = (id: string, property: string) =>
    page.evaluate(
      ([elementId, name]) =>
        getComputedStyle(document.getElementById(elementId)!, '::after').getPropertyValue(name),
      [id, property] as const
    );

  it('lays out the default 1:1 columns with a centered separator', async () => {
    expect(await computed('default', 'column-gap')).toBe('16px');
    expect(await computed('default-a', 'width')).toBe('192px');
    expect(await after('default-a', 'right')).toBe('-8px');
    expect(await after('default-a', 'border-right-width')).toBe('2px');
  });

  it('applies ratio variants', async () => {
    expect(await computed('ratio-a', 'width')).toBe('288px');
  });

  it('keeps the separator centered in a custom gap', async () => {
    expect(await after('gap-a', 'right')).toBe('-16px');
    expect(await after('gap-a', 'border-right-width')).toBe('4px');
  });

  it('ignores split tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'column-gap')).toBe('16px');
  });
});
