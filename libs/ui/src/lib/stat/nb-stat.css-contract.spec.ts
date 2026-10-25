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
// each engine. Markup mirrors what NbStat renders: tokens are declared on
// `data-nb-stat`, the value and label are parts.
const css = ['../styles/theme.css', './nb-stat.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const stat = (id: string, attrs = 'data-direction="column"') => `
  <nb-stat data-nb-stat data-slot="stat" id="${id}" ${attrs}>
    <span data-slot="stat-body">
      <span data-slot="stat-value" id="${id}-value">12</span>
      <span data-slot="stat-label" id="${id}-label">Label</span>
    </span>
  </nb-stat>`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    .muted [data-nb-stat] { --nb-stat-label-fg: rgb(1, 2, 3); }
  </style>

  ${stat('default')}
  ${stat('row', 'data-direction="row"')}
  <section style="--nb-stat-value-font-size: 40px">${stat('wrapper')}</section>
  <section class="muted">${stat('selected')}</section>
  ${stat('inline', 'style="--nb-stat-label-fg: rgb(4, 5, 6)"')}
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-stat CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'flex-direction')).toBe('column');
    expect(await computed('default-value', 'font-size')).toBe('24px');
    expect(await computed('default-label', 'font-size')).toBe('10px');
    expect(await computed('default-label', 'color')).toBe('rgb(0, 0, 0)');
  });

  it('lays out in a row', async () => {
    expect(await computed('row', 'flex-direction')).toBe('row');
  });

  it('ignores stat tokens set on a wrapper', async () => {
    expect(await computed('wrapper-value', 'font-size')).toBe('24px');
  });

  it('applies tokens set by selecting the stat, or inline', async () => {
    expect(await computed('selected-label', 'color')).toBe('rgb(1, 2, 3)');
    expect(await computed('inline-label', 'color')).toBe('rgb(4, 5, 6)');
  });
});
