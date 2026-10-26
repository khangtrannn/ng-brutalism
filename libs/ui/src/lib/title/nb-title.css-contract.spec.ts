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
// each engine. Markup mirrors NbTitle: tokens are declared on `data-nb-title`; the
// wave underline is its ::after.
const css = ['../styles/theme.css', './nb-title.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <h2 data-nb-title data-underline="wave" id="default">Title</h2>
  <h2 data-nb-title data-underline="wave" id="inline" style="--nb-title-wave-color: rgb(1, 2, 3); --nb-title-font-size: 40px">Title</h2>
  <section style="--nb-title-font-size: 50px"><h2 data-nb-title data-underline="wave" id="wrapper">Title</h2></section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-title CSS contract (%s)', (_name, engine) => {
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

  it('renders the default look with a wave underline', async () => {
    expect(await computed('default', 'font-size')).toBe('28px');
    expect(await computed('default', 'font-weight')).toBe('900');
    expect(await after('default', 'background-color')).toBe('rgb(167, 139, 250)');
    expect(await after('default', 'height')).toBe('10px');
  });

  it('applies inline tokens, the wave color included', async () => {
    expect(await computed('inline', 'font-size')).toBe('40px');
    expect(await after('inline', 'background-color')).toBe('rgb(1, 2, 3)');
  });

  it('ignores title tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'font-size')).toBe('28px');
  });
});
