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
// each engine. Markup mirrors NbSection: tokens are declared on `data-nb-section`, the
// padding input writes them inline.
const css = ['../styles/theme.css', './nb-section.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <div data-nb-section data-divider="top" data-divider-style="dashed" id="default">x</div>
  <div data-nb-section data-layout="between" data-align="center" id="layout" style="--nb-section-padding: 2rem">x</div>
  <div data-nb-section data-flush id="flush" style="--nb-section-padding: 8px">x</div>
  <section style="--nb-section-padding: 40px; --nb-border-width: 3px"><div data-nb-section data-divider="all" data-divider-style="solid" id="wrapper">x</div></section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-section CSS contract (%s)', (_name, engine) => {
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

  it('pads the section and draws its divider', async () => {
    expect(await computed('default', 'padding-top')).toBe('16px');
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-style')).toBe('dashed');
  });

  it('lays out content and follows the padding input', async () => {
    expect(await computed('layout', 'display')).toBe('flex');
    expect(await computed('layout', 'justify-content')).toBe('space-between');
    expect(await computed('layout', 'align-items')).toBe('center');
    expect(await computed('layout', 'padding-left')).toBe('32px');
  });

  it('pulls a flush section out by its padding', async () => {
    expect(await computed('flush', 'margin-left')).toBe('-8px');
  });

  it('follows the border width role but ignores section tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'padding-top')).toBe('16px');
    expect(await computed('wrapper', 'border-left-width')).toBe('3px');
  });
});
