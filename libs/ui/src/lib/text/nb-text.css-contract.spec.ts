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
// each engine. Markup mirrors NbText: tokens are declared on `data-nb-text`, data
// attributes pick the variants, the tone input writes --nb-text-fg inline.
const css = ['../styles/theme.css', './nb-text.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <p data-nb-text data-size="md" data-weight="normal" data-transform="none" data-tracking="normal" data-measure="none" data-leading="normal" id="default">x</p>
  <p data-nb-text data-size="xl" data-weight="normal" data-transform="none" data-tracking="normal" data-measure="none" data-leading="tight" id="xl">x</p>
  <p data-nb-text data-size="md" data-weight="bold" data-transform="uppercase" data-tracking="wide" data-measure="sm" data-leading="normal" id="variants">x</p>
  <p data-nb-text data-size="md" data-weight="normal" data-transform="none" data-tracking="normal" data-measure="none" data-leading="normal" data-nb-tone="primary" id="toned" style="--nb-text-fg: rgb(1, 2, 3)">x</p>
  <p data-nb-text data-size="md" data-weight="normal" data-transform="none" data-tracking="normal" data-measure="none" data-leading="normal" data-underline="bar" id="bar" style="--nb-text-underline-width: 12rem">x</p>
  <p data-nb-text data-size="md" data-weight="normal" data-transform="none" data-tracking="normal" data-measure="none" data-leading="normal" data-underline="wave" id="wave">x</p>
  <section style="--nb-text-font-size: 40px"><p data-nb-text data-size="md" data-weight="normal" data-transform="none" data-tracking="normal" data-measure="none" data-leading="normal" id="wrapper">x</p></section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-text CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'font-size')).toBe('16px');
    expect(await computed('default', 'line-height')).toBe('24px');
    expect(await computed('default', 'font-weight')).toBe('400');
    expect(await computed('default', 'color')).toBe('rgb(0, 0, 0)');
  });

  it('lets leading beat the size line height', async () => {
    expect(await computed('xl', 'font-size')).toBe('20px');
    expect(await computed('xl', 'line-height')).toBe('23px');
  });

  it('applies weight, transform, tracking and measure variants', async () => {
    expect(await computed('variants', 'font-weight')).toBe('700');
    expect(await computed('variants', 'text-transform')).toBe('uppercase');
    expect(await computed('variants', 'letter-spacing')).toBe('0.4px');
    expect(await computed('variants', 'max-width')).toBe('448px');
  });

  it('uses the tone color written inline, not the tone slots', async () => {
    expect(await computed('toned', 'color')).toBe('rgb(1, 2, 3)');
  });

  it('draws bar and wave underlines, following the width input', async () => {
    expect(await after('bar', 'width')).toBe('192px');
    expect(await after('bar', 'height')).toBe('6px');
    expect(await after('wave', 'height')).toBe('10px');
    expect(await after('wave', 'margin-top')).toBe('8px');
  });

  it('ignores text tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'font-size')).toBe('16px');
  });
});
