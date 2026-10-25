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
// each engine. Markup mirrors what NbChip and NbChipGroup render: tokens are
// declared on `data-nb-chip` and `data-nb-chip-group`, inputs write them inline.
const css = [
  '../styles/theme.css',
  '../styles/tone.css',
  './nb-chip.css',
  './nb-chip-group.css',
]
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const chip = (id: string, attrs = '', inner = 'Chip') =>
  `<span data-nb-chip id="${id}" ${attrs}>${inner}</span>`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-chip] { --nb-chip-bg: rgb(1, 2, 3); --nb-chip-radius: 20px; }
  </style>

  ${chip('default')}

  <section style="--nb-radius-control: 12px; --nb-shadow-pill-offset: 3px; --nb-shadow: rgb(0, 0, 255)">
    ${chip('roles')}
  </section>
  <section style="--nb-radius-pill: 30px; --nb-shadow-control-offset: 9px">${chip('other-roles')}</section>
  <section style="--nb-chip-bg: rgb(9, 9, 9); --nb-chip-icon-size: 2rem">
    ${chip('wrapper', '', '<svg id="wrapper-svg"></svg>')}
  </section>

  <section class="selected">
    ${chip('selected')}
    ${chip('selected-input', 'style="--nb-chip-radius: var(--nb-radius-lg)"')}
    ${chip('selected-tone', 'data-nb-tone="mint"')}
  </section>
  ${chip('utility', 'class="rounded-full" style="--nb-chip-radius: 3px"')}
  ${chip('icon', 'style="--nb-chip-icon-size: 2rem"', '<svg id="icon-svg"></svg>')}

  <div data-nb-chip-group id="group">${chip('in-group')}</div>
  <div data-nb-chip-group id="group-custom" data-direction="vertical" data-tracking="wider"
       style="--nb-chip-group-gap: 4px; --nb-chip-group-text-transform: uppercase"></div>
  <section style="--nb-chip-group-gap: 9px"><div data-nb-chip-group id="group-wrapper"></div></section>
`;

const SURFACE = 'rgb(255, 255, 255)';
const DEFAULT_SHADOW = 'rgb(0, 0, 0) 2px 2px 0px 0px';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-chip CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'background-color')).toBe(SURFACE);
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
    expect(await computed('default', 'box-shadow')).toBe(DEFAULT_SHADOW);
    expect(await computed('default', 'padding-left')).toBe('10px');
    expect(await computed('default', 'font-weight')).toBe('700');
  });

  it('follows the control radius and pill depth set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 3px 3px 0px 0px');
  });

  it('ignores the pill radius and control depth', async () => {
    expect(await computed('other-roles', 'border-top-left-radius')).toBe('0px');
    expect(await computed('other-roles', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('ignores chip tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'background-color')).toBe(SURFACE);
    expect(await computed('wrapper-svg', 'width')).toBe('12px');
  });

  it('applies tokens set by selecting the chip', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected', 'border-top-left-radius')).toBe('20px');
  });

  it('lets an input beat a rule that selects the chip', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(155, 242, 207)');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });

  it('sizes icons from the chip', async () => {
    expect(await computed('icon-svg', 'width')).toBe('32px');
  });

  it('lays out a group with its defaults', async () => {
    expect(await computed('group', 'display')).toBe('flex');
    expect(await computed('group', 'column-gap')).toBe('8px');
    expect(await computed('group', 'letter-spacing')).toBe('normal');
    expect(await computed('group', 'text-transform')).toBe('none');
    expect(await computed('in-group', 'background-color')).toBe(SURFACE);
  });

  it('applies group variants and inputs', async () => {
    expect(await computed('group-custom', 'flex-direction')).toBe('column');
    expect(await computed('group-custom', 'row-gap')).toBe('4px');
    expect(await computed('group-custom', 'letter-spacing')).toBe('0.8px');
    expect(await computed('group-custom', 'text-transform')).toBe('uppercase');
  });

  it('ignores group tokens set on a wrapper', async () => {
    expect(await computed('group-wrapper', 'column-gap')).toBe('8px');
  });
});
