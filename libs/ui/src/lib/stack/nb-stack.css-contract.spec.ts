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
// each engine. Markup mirrors NbStack: tokens are declared on `data-nb-stack`, inputs write
// them inline, separated items read them.
const css = ['../styles/theme.css', './nb-stack.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <div data-nb-stack data-separator="solid" id="default"><p id="default-a">a</p><p id="default-b">b</p></div>
  <div data-nb-stack data-separator="thick" id="input" style="--nb-stack-gap: 2rem"><p>a</p><p id="input-b">b</p></div>
  <section style="--nb-stack-gap: 40px; --nb-border-width: 3px">
    <div data-nb-stack data-separator="dashed" id="wrapper"><p>a</p><p id="wrapper-b">b</p></div>
  </section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-stack CSS contract (%s)', (_name, engine) => {
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

  it('spaces items and draws separators from its tokens', async () => {
    expect(await computed('default', 'row-gap')).toBe('12px');
    expect(await computed('default-a', 'border-top-width')).toBe('0px');
    expect(await computed('default-b', 'border-top-width')).toBe('2px');
    expect(await computed('default-b', 'padding-top')).toBe('12px');
  });

  it('follows the gap input below a separator', async () => {
    expect(await computed('input-b', 'padding-top')).toBe('32px');
    expect(await computed('input-b', 'border-top-width')).toBe('4px');
  });

  it('follows the border width role but ignores stack tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'row-gap')).toBe('12px');
    expect(await computed('wrapper-b', 'border-top-width')).toBe('3px');
    expect(await computed('wrapper-b', 'border-top-style')).toBe('dashed');
  });
});
