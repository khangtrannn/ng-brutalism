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
// each engine. Elements mirror what NbCallout renders: `data-nb-callout`, its
// `data-*` variants and the inline tokens its inputs write.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-callout.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const el = (id: string, attrs = '') =>
  `<div data-nb-callout ${attrs.includes('data-size') ? '' : 'data-size="md"'} id="${id}" ${attrs}>Callout</div>`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-callout] { --nb-callout-bg: rgb(1, 2, 3); --nb-callout-border-width: 5px; }
  </style>

  ${el('default')}
  ${el('sm', 'data-size="sm"')}
  ${el('xl', 'data-size="xl"')}
  ${el('xl-input', 'data-size="xl" style="--nb-callout-border-width: var(--nb-border-width-thin)"')}
  <section style="--nb-radius-box: 12px; --nb-shadow-box-offset: 2px; --nb-shadow: rgb(0, 0, 255)">${el('roles')}</section>
  <section style="--nb-radius-control: 30px">${el('control')}</section>
  <section style="--nb-callout-bg: rgb(9, 9, 9)">${el('wrapper')}</section>
  <section class="selected">
    ${el('selected')}
    ${el('selected-xl', 'data-size="xl"')}
    ${el('selected-tone', 'data-nb-tone="pink"')}
  </section>
  ${el('utility', 'class="rounded-full" style="--nb-callout-radius: 3px"')}
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-callout CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'min-height')).toBe('44px');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
    expect(await computed('default', 'box-shadow')).toBe('rgb(0, 0, 0) 4px 4px 0px 0px');
  });

  it('applies size variants, including their border width', async () => {
    expect(await computed('sm', 'font-size')).toBe('14px');
    expect(await computed('xl', 'font-size')).toBe('48px');
    expect(await computed('xl', 'border-top-width')).toBe('4px');
  });

  it('lets a border input beat the size variant', async () => {
    expect(await computed('xl-input', 'border-top-width')).toBe('1px');
  });

  it('follows the box roles set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
  });

  it('ignores the control role', async () => {
    expect(await computed('control', 'border-top-left-radius')).toBe('0px');
  });

  it('ignores a callout token set on a wrapper', async () => {
    expect(await computed('wrapper', 'background-color')).toBe('rgb(255, 255, 255)');
  });

  it('applies tokens set by selecting the callout, over every size', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected-xl', 'border-top-width')).toBe('5px');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(255, 126, 182)');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });
});
