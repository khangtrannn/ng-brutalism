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
// each engine. Markup mirrors what NbImageCard renders: tokens are declared
// on `data-nb-image-card`, and the caption reads them by inheritance.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-image-card.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const el = (id: string, attrs = '') => `
  <nb-image-card data-nb-image-card data-slot="image-card" id="${id}" ${attrs}>
    <img data-slot="image-card-image" alt="" />
    <nb-image-card-caption data-slot="image-card-caption" id="${id}-caption">Caption</nb-image-card-caption>
  </nb-image-card>
`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-image-card] { --nb-image-card-bg: rgb(1, 2, 3); --nb-image-card-border-color: rgb(255, 0, 0); }
  </style>

  ${el('default')}
  ${el('bordered', 'style="--nb-image-card-border-width: var(--nb-border-width-thick)"')}
  <section style="--nb-radius-box: 12px; --nb-shadow-box-offset: 2px; --nb-shadow: rgb(0, 0, 255)">${el('roles')}</section>
  <section style="--nb-radius-control: 30px">${el('control')}</section>
  <section style="--nb-image-card-bg: rgb(9, 9, 9)">${el('wrapper')}</section>
  <section class="selected">
    ${el('selected')}
    ${el('selected-tone', 'data-nb-tone="pink"')}
  </section>
  ${el('utility', 'class="rounded-full" style="--nb-image-card-radius: 3px"')}
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-image-card CSS contract (%s)', (_name, engine) => {
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

  it('renders the default theme look', async () => {
    expect(await computed('default', 'background-color')).toBe('rgb(255, 255, 255)');
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'box-shadow')).toBe('rgb(0, 0, 0) 4px 4px 0px 0px');
    expect(await computed('default-caption', 'border-top-width')).toBe('2px');
    expect(await computed('default-caption', 'padding-left')).toBe('24px');
  });

  it('carries a border input to the caption divider', async () => {
    expect(await computed('bordered', 'border-top-width')).toBe('4px');
    expect(await computed('bordered-caption', 'border-top-width')).toBe('4px');
  });

  it('follows the box roles set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
  });

  it('ignores the control role', async () => {
    expect(await computed('control', 'border-top-left-radius')).toBe('0px');
  });

  it('ignores an image card token set on a wrapper', async () => {
    expect(await computed('wrapper', 'background-color')).toBe('rgb(255, 255, 255)');
  });

  it('applies tokens set by selecting the card, including on the caption', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected-caption', 'border-top-color')).toBe('rgb(255, 0, 0)');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(255, 126, 182)');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });
});
