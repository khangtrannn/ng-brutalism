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
// each engine. Markup mirrors what NbHalftone renders: tokens are declared on
// `data-nb-halftone`, its inputs write them inline.
const css = ['../styles/theme.css', './nb-halftone.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const grid = '--nb-halftone-columns: 4; --nb-halftone-rows: 3';

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    .tinted [data-nb-halftone] { --nb-halftone-fg: rgb(1, 2, 3); }
  </style>

  <div data-nb-halftone data-shape="rectangle" id="rectangle" style="${grid}"></div>
  <div data-nb-halftone data-shape="rectangle" id="inputs" style="${grid}; --nb-halftone-gap-x: 10px; --nb-halftone-gap-y: 5px"></div>
  <svg data-nb-halftone data-shape="circle" id="circle"><circle id="dot" r="3" /></svg>
  <section style="--nb-halftone-fg: rgb(9, 9, 9); --nb-halftone-gap-x: 1px">
    <div data-nb-halftone data-shape="rectangle" id="wrapper" style="${grid}"></div>
  </section>
  <section class="tinted"><svg data-nb-halftone data-shape="circle"><circle id="selected-dot" r="3" /></svg></section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-halftone CSS contract (%s)', (_name, engine) => {
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

  it('sizes a rectangle from its columns, rows and gaps', async () => {
    expect(await computed('rectangle', 'width')).toBe('112px');
    expect(await computed('rectangle', 'height')).toBe('81px');
    expect(await computed('inputs', 'width')).toBe('40px');
    expect(await computed('inputs', 'height')).toBe('15px');
  });

  it('draws circle dots in the border color, clipped round', async () => {
    expect(await computed('dot', 'fill')).toBe('rgb(0, 0, 0)');
    expect(await computed('circle', 'border-top-left-radius')).toBe('9999px');
  });

  it('ignores halftone tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'width')).toBe('112px');
  });

  it('applies tokens set by selecting the halftone', async () => {
    expect(await computed('selected-dot', 'fill')).toBe('rgb(1, 2, 3)');
  });
});
