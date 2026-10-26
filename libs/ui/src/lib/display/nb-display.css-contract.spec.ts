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
// each engine. Markup mirrors NbDisplay: tokens are declared on `data-nb-display`, data
// attributes pick the variants, underline inputs write tokens inline.
const css = ['../styles/theme.css', './nb-display.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <h1 data-nb-display data-size="md" data-weight="black" data-tracking="tight" data-leading="none" id="default">x</h1>
  <h1 data-nb-display data-size="xl" data-weight="bold" data-tracking="tighter" data-leading="display" id="variants">x</h1>
  <h1 data-nb-display data-size="md" data-weight="black" data-tracking="tight" data-leading="none" data-underline="bar" id="bar" style="--nb-display-underline-width: 45%">x</h1>
  <h1 data-nb-display data-size="md" data-weight="black" data-tracking="tight" data-leading="none" id="inline" style="--nb-display-font-size: 6rem">x</h1>
  <section style="--nb-display-font-size: 10px"><h1 data-nb-display data-size="md" data-weight="black" data-tracking="tight" data-leading="none" id="wrapper">x</h1></section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-display CSS contract (%s)', (_name, engine) => {
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

  it('renders the default look', async () => {
    expect(await computed('default', 'font-size')).toBe('48px');
    expect(await computed('default', 'font-weight')).toBe('900');
    expect(await computed('default', 'line-height')).toBe('48px');
  });

  it('applies size, weight, tracking and leading variants', async () => {
    expect(await computed('variants', 'font-size')).toBe('76px');
    expect(await computed('variants', 'font-weight')).toBe('700');
    // 4.75rem × 0.84; engines round it differently.
    expect(parseFloat(await computed('variants', 'line-height'))).toBeCloseTo(63.84, 0);
  });

  it('follows an inline underline width', async () => {
    expect(await after('bar', 'height')).toBe('6px');
    expect(parseFloat(await after('bar', 'width'))).toBeGreaterThan(0);
    expect(await after('bar', 'width')).not.toBe('112px');
  });

  it('applies an inline font size, and ignores one on a wrapper', async () => {
    expect(await computed('inline', 'font-size')).toBe('96px');
    expect(await computed('wrapper', 'font-size')).toBe('48px');
  });
});
