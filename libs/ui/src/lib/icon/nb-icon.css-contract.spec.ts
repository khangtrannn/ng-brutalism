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
// each engine. Markup mirrors NbIcon. Size and color are context tokens: unlike
// other components, a wrapper's --nb-icon-size and --nb-icon-color reach icons inside it.
const css = ['../styles/theme.css', './nb-icon.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <span data-nb-icon data-size="md" data-mode="mask" id="default"></span>
  <span data-nb-icon data-size="xl" data-mode="mask" id="xl"></span>
  <span data-nb-icon data-size="md" data-mode="mask" id="toned" style="--nb-icon-color: rgb(1, 2, 3)"></span>
  <div style="--nb-icon-size: 40px; --nb-icon-color: rgb(4, 5, 6)">
    <span data-nb-icon data-size="sm" data-mode="mask" id="wrapped"></span>
  </div>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-icon CSS contract (%s)', (_name, engine) => {
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

  it('sizes the icon from data-size and paints it with the text color', async () => {
    expect(await computed('default', 'width')).toBe('20px');
    expect(await computed('xl', 'height')).toBe('32px');
    expect(await computed('default', 'background-color')).toBe('rgb(0, 0, 0)');
  });

  it('applies the tone color written inline', async () => {
    expect(await computed('toned', 'background-color')).toBe('rgb(1, 2, 3)');
  });

  it('takes size and color from a wrapper', async () => {
    expect(await computed('wrapped', 'width')).toBe('40px');
    expect(await computed('wrapped', 'background-color')).toBe('rgb(4, 5, 6)');
  });
});
