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
// each engine. Markup mirrors what NbInputGroup renders: tokens are declared
// on `data-nb-input-group`, the prefix and suffix are parts that inherit them.
const css = [
  '../styles/theme.css',
  '../styles/tone.css',
  '../input/nb-input.css',
  './nb-input-group.css',
]
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const group = (id: string, attrs = '', input = '<input data-nb-input data-in-group />') => `
  <nb-input-group data-nb-input-group id="${id}" ${attrs}>
    <span nbInputPrefix data-align="center" id="${id}-prefix">@</span>
    ${input}
    <span nbInputSuffix data-align="center" id="${id}-suffix">USD</span>
  </nb-input-group>`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-input-group] { --nb-input-group-bg: rgb(1, 2, 3); --nb-input-group-addon-bg: rgb(4, 5, 6); }
  </style>

  ${group('default')}

  <section style="--nb-radius-field: 12px; --nb-shadow-field-offset: 2px; --nb-shadow: rgb(0, 0, 255)">
    ${group('roles')}
  </section>
  <section style="--nb-radius-control: 30px; --nb-shadow-control-offset: 9px">${group('control')}</section>
  <section style="--nb-input-group-bg: rgb(9, 9, 9); --nb-input-bg: rgb(9, 9, 9)">${group('wrapper')}</section>

  <section class="selected">
    ${group('selected')}
    ${group('selected-input', 'style="--nb-input-group-radius: var(--nb-radius-lg)"')}
  </section>
  ${group('utility', 'class="rounded-full" style="--nb-input-group-radius: 3px"')}
  ${group('border', 'style="--nb-input-group-border-color: rgb(1, 1, 1)"')}
  ${group('prefix-only', 'style="--nb-input-group-prefix-bg: rgb(7, 7, 7)"')}
  ${group('invalid', '', '<input data-nb-input data-in-group aria-invalid="true" />')}
  ${group('focus', '', '<input data-nb-input data-in-group id="focus-input" />')}
`;

const FIELD_BG = 'rgb(250, 243, 214)';
const YELLOW = 'rgb(255, 210, 74)';
const DEFAULT_SHADOW = 'rgb(0, 0, 0) 4px 4px 0px 0px';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-input-group CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'background-color')).toBe(FIELD_BG);
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
    expect(await computed('default', 'box-shadow')).toBe(DEFAULT_SHADOW);
    expect(await computed('default-prefix', 'background-color')).toBe(YELLOW);
    expect(await computed('default-prefix', 'border-right-width')).toBe('2px');
    expect(await computed('default-prefix', 'border-top-width')).toBe('0px');
    expect(await computed('default-suffix', 'border-left-width')).toBe('2px');
  });

  it('follows the field roles set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
  });

  it('ignores the control roles', async () => {
    expect(await computed('control', 'border-top-left-radius')).toBe('0px');
    expect(await computed('control', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('ignores group and input tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'background-color')).toBe(FIELD_BG);
  });

  it('applies tokens set by selecting the group, down to its addons', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected-prefix', 'background-color')).toBe('rgb(4, 5, 6)');
    expect(await computed('selected-suffix', 'background-color')).toBe('rgb(4, 5, 6)');
  });

  it('lets an input beat a rule that selects the group', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });

  it('shares one border color between the group and its addon dividers', async () => {
    expect(await computed('border', 'border-top-color')).toBe('rgb(1, 1, 1)');
    expect(await computed('border-prefix', 'border-right-color')).toBe('rgb(1, 1, 1)');
    expect(await computed('border-suffix', 'border-left-color')).toBe('rgb(1, 1, 1)');
  });

  it('lets one addon override the shared addon background', async () => {
    expect(await computed('prefix-only-prefix', 'background-color')).toBe('rgb(7, 7, 7)');
    expect(await computed('prefix-only-suffix', 'background-color')).toBe(YELLOW);
  });

  it('shows the invalid border when a control inside is invalid', async () => {
    expect(await computed('invalid', 'border-top-color')).toBe('rgb(255, 79, 138)');
  });

  it('draws the focus ring on the group and drops the shadow', async () => {
    await page.focus('#focus-input');
    expect(await computed('focus', 'outline-style')).toBe('solid');
    expect(await computed('focus', 'outline-width')).toBe('2px');
    expect(await computed('focus', 'outline-offset')).toBe('2px');
    expect(await computed('focus', 'box-shadow')).toBe('none');
  });
});
