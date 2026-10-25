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
// each engine. Markup mirrors an open NbSelect: tokens are declared on
// `data-nb-select`; the listbox repeats the select's `data-nb-tone`.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-select.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const select = (id: string, attrs = '') => {
  const tone = attrs.match(/data-nb-tone="[^"]+"/)?.[0] ?? '';
  return `
  <nb-select data-nb-select data-size="md" id="${id}" ${attrs}>
    <button data-slot="select-trigger" id="${id}-trigger"><span data-slot="select-value">One</span></button>
    <div data-slot="select-listbox" id="${id}-listbox" ${tone}>
      <nb-select-option data-nb-select-option>
        <button data-slot="select-option-button" id="${id}-option">One</button>
      </nb-select-option>
      <nb-select-option data-nb-select-option>
        <button data-slot="select-option-button" data-selected id="${id}-selected">Two</button>
      </nb-select-option>
    </div>
  </nb-select>`;
};

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-select] { --nb-select-bg: rgb(1, 2, 3); --nb-select-radius: 20px; }
    nb-select { margin-bottom: 160px; }
  </style>

  ${select('default')}

  <section style="--nb-radius-field: 12px; --nb-shadow-field-offset: 2px; --nb-shadow: rgb(0, 0, 255)">
    ${select('roles')}
  </section>
  <section style="--nb-radius-control: 30px; --nb-shadow-control-offset: 9px">${select('control')}</section>
  <section style="--nb-select-bg: rgb(9, 9, 9)">${select('wrapper')}</section>

  <section class="selected">
    ${select('selected')}
    ${select('selected-input', 'style="--nb-select-radius: var(--nb-radius-lg)"')}
    ${select('selected-tone', 'data-nb-tone="mint"')}
  </section>
  ${select('utility', 'class="rounded-full" style="--nb-select-radius: 3px"')}
  ${select('ink', 'data-nb-tone="ink"')}
  ${select('invalid', 'data-invalid')}
  ${select('disabled', 'data-disabled')}
  <div style="display: flex">${select('in-group', 'data-in-group data-invalid')}</div>
`;

const SURFACE = 'rgb(255, 255, 255)';
const DEFAULT_SHADOW = 'rgb(0, 0, 0) 4px 4px 0px 0px';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-select CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default-trigger', 'height')).toBe('56px');
    expect(await computed('default-listbox', 'background-color')).toBe(SURFACE);
    expect(await computed('default-listbox', 'box-shadow')).toBe(DEFAULT_SHADOW);
    expect(await computed('default-selected', 'background-color')).toBe('rgb(189, 247, 200)');
  });

  it('follows the field roles set on a section, listbox included', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
    expect(await computed('roles-listbox', 'border-bottom-right-radius')).toBe('12px');
  });

  it('ignores the control roles', async () => {
    expect(await computed('control', 'border-top-left-radius')).toBe('0px');
    expect(await computed('control', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('ignores a select token set on a wrapper', async () => {
    expect(await computed('wrapper', 'background-color')).toBe(SURFACE);
    expect(await computed('wrapper-listbox', 'background-color')).toBe(SURFACE);
  });

  it('applies tokens set by selecting the select, down to the listbox', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected-listbox', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected-listbox', 'border-bottom-left-radius')).toBe('20px');
  });

  it('lets an input beat a rule that selects the select', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
    expect(await computed('selected-input-listbox', 'border-bottom-left-radius')).toBe('12px');
  });

  it('lets an explicit tone beat a component-wide color, listbox included', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(155, 242, 207)');
    expect(await computed('selected-tone-listbox', 'background-color')).toBe('rgb(155, 242, 207)');
  });

  it('colors the trigger and options with the tone foreground', async () => {
    expect(await computed('ink-trigger', 'color')).toBe(SURFACE);
    expect(await computed('ink-option', 'color')).toBe(SURFACE);
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });

  it('shows the invalid border', async () => {
    expect(await computed('invalid', 'border-top-color')).toBe('rgb(255, 79, 138)');
  });

  it('greys a disabled select', async () => {
    expect(await computed('disabled', 'border-top-color')).toBe('rgb(156, 163, 175)');
    expect(await computed('disabled', 'box-shadow')).toBe('rgb(156, 163, 175) 5px 5px 0px 0px');
  });

  it('leaves the field look to the group when inside nb-input-group', async () => {
    expect(await computed('in-group', 'background-color')).toBe('rgba(0, 0, 0, 0)');
    expect(await computed('in-group', 'border-top-width')).toBe('0px');
    expect(await computed('in-group', 'box-shadow')).toBe('none');
    expect(await computed('in-group-trigger', 'padding-left')).toBe('12px');
  });
});
