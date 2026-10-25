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
// each engine. Markup mirrors what NbCard and its parts render: tokens are
// declared on `data-nb-card`, parts are matched by `data-slot`.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-card.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const card = (id: string, attrs = '', inner = '') =>
  `<nb-card data-nb-card data-slot="card" id="${id}" ${attrs}>${inner}</nb-card>`;

const parts = (prefix: string) => `
  <nb-card-header data-slot="card-header" id="${prefix}-header">
    <nb-card-title data-slot="card-title">Title</nb-card-title>
  </nb-card-header>
  <nb-card-content data-slot="card-content" id="${prefix}-content">Body</nb-card-content>
`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } .p-0 { --nb-card-padding: 0px; } }
    .selected [data-nb-card] { --nb-card-bg: rgb(1, 2, 3); --nb-card-radius: 20px; }
  </style>

  ${card('default', '', parts('default'))}

  <section style="--nb-radius-box: 12px; --nb-shadow-box-offset: 2px; --nb-shadow: rgb(0, 0, 255)">
    ${card('roles')}
  </section>
  <section style="--nb-radius-control: 30px; --nb-shadow-control-offset: 9px">${card('control')}</section>
  <section style="--nb-card-bg: rgb(9, 9, 9)">${card('wrapper')}</section>

  <section class="selected">
    ${card('selected')}
    ${card('selected-input', 'style="--nb-card-radius: var(--nb-radius-lg)"')}
    ${card('selected-tone', 'data-nb-tone="mint"')}
  </section>
  ${card('utility', 'class="rounded-full" style="--nb-card-radius: 3px"')}
  ${card('unpadded', 'class="p-0"', parts('unpadded'))}

  ${card('outer', 'style="--nb-card-radius: 20px; --nb-card-padding: 4px"', card('inner', '', parts('inner')))}
`;

const BACKGROUND = 'rgb(255, 255, 255)';
const DEFAULT_SHADOW = 'rgb(0, 0, 0) 4px 4px 0px 0px';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-card CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'background-color')).toBe(BACKGROUND);
    expect(await computed('default', 'padding-top')).toBe('24px');
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
    expect(await computed('default', 'box-shadow')).toBe(DEFAULT_SHADOW);
    expect(await computed('default-header', 'padding-left')).toBe('24px');
    expect(await computed('default-content', 'padding-left')).toBe('24px');
  });

  it('follows the box roles set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
  });

  it('ignores the control roles', async () => {
    expect(await computed('control', 'border-top-left-radius')).toBe('0px');
    expect(await computed('control', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('ignores a card token set on a wrapper', async () => {
    expect(await computed('wrapper', 'background-color')).toBe(BACKGROUND);
  });

  it('applies tokens set by selecting the card', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected', 'border-top-left-radius')).toBe('20px');
  });

  it('lets an input beat a rule that selects the card', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(155, 242, 207)');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });

  it('removes all padding with one token', async () => {
    expect(await computed('unpadded', 'padding-top')).toBe('0px');
    expect(await computed('unpadded-header', 'padding-left')).toBe('0px');
    expect(await computed('unpadded-content', 'padding-left')).toBe('0px');
  });

  it('does not leak tokens into a nested card', async () => {
    expect(await computed('outer', 'border-top-left-radius')).toBe('20px');
    expect(await computed('outer', 'padding-top')).toBe('4px');
    expect(await computed('inner', 'border-top-left-radius')).toBe('0px');
    expect(await computed('inner-content', 'padding-left')).toBe('24px');
  });
});
