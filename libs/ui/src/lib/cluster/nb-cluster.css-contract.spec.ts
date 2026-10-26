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
// each engine. Markup mirrors NbCluster: tokens are declared on `data-nb-cluster`, inputs
// write them inline, separated items read them.
const css = ['../styles/theme.css', './nb-cluster.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <div data-nb-cluster data-separator="solid" id="default"><span>a</span><span id="default-b">b</span></div>
  <div data-nb-cluster data-separator="thick" id="input" style="--nb-cluster-gap: 2rem; --nb-cluster-padding: 4px"><span>a</span><span id="input-b">b</span></div>
  <section style="--nb-cluster-gap: 40px"><div data-nb-cluster id="wrapper"></div></section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-cluster CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'column-gap')).toBe('12px');
    expect(await computed('default-b', 'border-left-width')).toBe('2px');
    expect(await computed('default-b', 'padding-left')).toBe('6px');
  });

  it('derives the separator gap from the gap input', async () => {
    expect(await computed('input', 'padding-top')).toBe('4px');
    expect(await computed('input-b', 'margin-left')).toBe('16px');
    expect(await computed('input-b', 'border-left-width')).toBe('4px');
  });

  it('ignores cluster tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'column-gap')).toBe('12px');
  });
});
