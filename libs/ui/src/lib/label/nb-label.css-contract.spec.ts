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
// each engine. Markup mirrors NbLabel: tokens are declared on `data-nb-label`, and a
// label after a disabled checkbox dims.
const css = ['../styles/theme.css', '../checkbox/nb-checkbox.css', './nb-label.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
  </style>

  <label data-nb-label id="default">Label</label>
  <input type="checkbox" data-nb-checkbox data-size="md" disabled /><label data-nb-label id="disabled">Label</label>
  <section style="--nb-label-font-size: 40px"><label data-nb-label id="wrapper">Label</label></section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-label CSS contract (%s)', (_name, engine) => {
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

  it('renders the default look', async () => {
    expect(await computed('default', 'font-size')).toBe('14px');
    expect(await computed('default', 'font-weight')).toBe('700');
  });

  it('dims a label after a disabled checkbox', async () => {
    expect(await computed('disabled', 'opacity')).toBe('0.5');
    expect(await computed('disabled', 'cursor')).toBe('not-allowed');
  });

  it('ignores label tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'font-size')).toBe('14px');
  });
});
