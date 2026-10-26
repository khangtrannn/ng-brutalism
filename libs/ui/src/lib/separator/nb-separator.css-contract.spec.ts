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
// each engine. Markup mirrors NbSeparator: tokens are declared on `data-nb-separator`,
// `data-variant` picks the width and style.
const css = ['../styles/theme.css', './nb-separator.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <hr data-nb-separator data-orientation="horizontal" data-variant="solid" id="default" />
  <hr data-nb-separator data-orientation="horizontal" data-variant="thick" id="thick" />
  <div style="display: flex; height: 20px"><hr data-nb-separator data-orientation="vertical" data-variant="dashed" id="vertical" /></div>
  <hr data-nb-separator data-orientation="horizontal" data-variant="thick" id="inline" style="--nb-separator-border-color: rgb(1, 2, 3); --nb-separator-border-width: 1px" />
  <section style="--nb-separator-border-color: rgb(9, 9, 9)"><hr data-nb-separator data-orientation="horizontal" data-variant="solid" id="wrapper" /></section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-separator CSS contract (%s)', (_name, engine) => {
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

  it('draws a horizontal line', async () => {
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-style')).toBe('solid');
    expect(await computed('default', 'border-top-color')).toBe('rgb(0, 0, 0)');
    expect(await computed('default', 'border-bottom-width')).toBe('0px');
  });

  it('applies the thick and dashed variants', async () => {
    expect(await computed('thick', 'border-top-width')).toBe('4px');
    expect(await computed('vertical', 'border-left-style')).toBe('dashed');
    expect(await computed('vertical', 'height')).toBe('20px');
  });

  it('lets inline tokens beat the variant', async () => {
    expect(await computed('inline', 'border-top-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('inline', 'border-top-width')).toBe('1px');
  });

  it('ignores separator tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'border-top-color')).toBe('rgb(0, 0, 0)');
  });
});
