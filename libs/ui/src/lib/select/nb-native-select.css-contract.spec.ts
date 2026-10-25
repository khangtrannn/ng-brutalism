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
// each engine. Elements mirror what NbNativeSelect renders: `data-nb-native-select`, its
// `data-*` variants, its own `--nb-native-select-*` tokens (not the `--nb-select-*` of nb-select) and the inline tokens its inputs write.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-native-select.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-native-select] { --nb-native-select-bg: rgb(1, 2, 3); --nb-native-select-border-color: rgb(0, 128, 0); }
    .bordered [data-nb-native-select] { --nb-native-select-border-width: 5px; }
    .invalid-red [data-nb-native-select] { --nb-native-select-invalid-border-color: rgb(255, 0, 0); }
    [data-nb-native-select][data-size='sm'].custom-sm { --nb-native-select-height: 30px; }
    * { box-sizing: border-box; }
  </style>

  <select id="default" data-nb-native-select data-size="md"><option>a</option></select>
  <select id="sm" data-nb-native-select data-size="sm"><option>a</option></select>
  <select id="lg" data-nb-native-select data-size="lg"><option>a</option></select>
  <select id="custom-sm" class="custom-sm" data-nb-native-select data-size="sm"><option>a</option></select>

  <section style="--nb-radius-field: 12px; --nb-shadow-field-offset: 2px; --nb-shadow: rgb(0, 0, 255)">
    <select id="role-section" data-nb-native-select data-size="md"><option>a</option></select>
  </section>
  <section style="--nb-radius-control: 30px; --nb-shadow-control-offset: 9px">
    <select id="control-role" data-nb-native-select data-size="md"><option>a</option></select>
  </section>
  <select id="custom-select-token" data-nb-native-select data-size="md" style="--nb-select-bg: rgb(9, 9, 9)"><option>a</option></select>
  <select id="placeholder" data-nb-native-select data-size="md"><option disabled selected>Pick</option><option>a</option></select>
  <section style="--nb-native-select-bg: rgb(9, 9, 9)">
    <select id="wrapper-token" data-nb-native-select data-size="md"><option>a</option></select>
  </section>

  <section class="selected">
    <select id="selected" data-nb-native-select data-size="md"><option>a</option></select>
    <select id="selected-input" data-nb-native-select data-size="md" style="--nb-native-select-radius: var(--nb-radius-lg)"><option>a</option></select>
    <select id="selected-tone" data-nb-native-select data-size="md" data-nb-tone="yellow"><option>a</option></select>
    <select id="selected-invalid" data-nb-native-select data-size="md" aria-invalid="true"><option>a</option></select>
    <select id="selected-focus" data-nb-native-select data-size="md"><option>a</option></select>
  </section>
  <select id="utility" class="rounded-full" data-nb-native-select data-size="md" style="--nb-native-select-radius: 3px"><option>a</option></select>

  <select id="invalid" data-nb-native-select data-size="md" aria-invalid="true"><option>a</option></select>
  <section class="invalid-red">
    <select id="invalid-custom" data-nb-native-select data-size="md" aria-invalid="true"><option>a</option></select>
  </section>
  <select id="focus" data-nb-native-select data-size="md"><option>a</option></select>
  <select id="focus-tone" data-nb-native-select data-size="md" data-nb-tone="danger"
         style="--nb-tone-border: rgb(200, 0, 0)"><option>a</option></select>
  <select id="disabled" data-nb-native-select data-size="md" disabled><option>a</option></select>

  <section class="bordered">
    <div style="display: flex">
      <select id="in-group" data-nb-native-select data-size="md" data-in-group data-nb-tone="yellow"><option>a</option></select>
    </div>
  </section>
`;

const SURFACE = 'rgb(255, 255, 255)';
const DEFAULT_SHADOW = 'rgb(0, 0, 0) 4px 4px 0px 0px';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-native-select CSS contract (%s)', (_name, engine) => {
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

  // Keyboard focus, so :focus-visible matches in every engine.
  const focus = async (id: string) => {
    await page.focus(`#${id}`);
    await page.keyboard.press('Shift');
  };

  it('renders the default theme look', async () => {
    expect(await computed('default', 'background-color')).toBe(SURFACE);
    expect(await computed('default', 'height')).toBe('56px');
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
    expect(await computed('default', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('applies size variants, and a consumer rule for one size', async () => {
    expect(await computed('sm', 'height')).toBe('48px');
    expect(await computed('lg', 'height')).toBe('64px');
        expect(await computed('custom-sm', 'height')).toBe('30px');
  });

  it('follows the field roles set on a section', async () => {
    expect(await computed('role-section', 'border-top-left-radius')).toBe('12px');
    expect(await computed('role-section', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
  });

  it('ignores the control roles', async () => {
    expect(await computed('control-role', 'border-top-left-radius')).toBe('0px');
    expect(await computed('control-role', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('ignores a native-select token set on a wrapper', async () => {
    expect(await computed('wrapper-token', 'background-color')).toBe(SURFACE);
  });

  it('applies tokens set by selecting the select', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected', 'border-top-color')).toBe('rgb(0, 128, 0)');
  });

  it('lets an input beat a rule that selects the select', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(255, 210, 74)');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });

  it('shows the invalid border, even over a component-wide border color', async () => {
    expect(await computed('invalid', 'border-top-color')).toBe('rgb(255, 79, 138)');
    expect(await computed('selected-invalid', 'border-top-color')).toBe('rgb(255, 79, 138)');
    expect(await computed('invalid-custom', 'border-top-color')).toBe('rgb(255, 0, 0)');
  });

  it('draws the focus ring from the border color and drops the shadow', async () => {
    await focus('focus');
    expect(await computed('focus', 'outline-style')).toBe('solid');
    expect(await computed('focus', 'outline-width')).toBe('2px');
    expect(await computed('focus', 'outline-color')).toBe('rgb(0, 0, 0)');
    expect(await computed('focus', 'outline-offset')).toBe('2px');
    expect(await computed('focus', 'box-shadow')).toBe('none');
  });

  it('follows a component-wide border color and the tone in the focus ring', async () => {
    await focus('selected-focus');
    expect(await computed('selected-focus', 'outline-color')).toBe('rgb(0, 128, 0)');
    await focus('focus-tone');
    expect(await computed('focus-tone', 'outline-color')).toBe('rgb(200, 0, 0)');
  });

  it('ignores the custom nb-select tokens', async () => {
    expect(await computed('custom-select-token', 'background-color')).toBe(SURFACE);
  });

  it('greys the value while a disabled placeholder option is selected', async () => {
    expect(await computed('placeholder', 'color')).toBe('rgb(156, 163, 175)');
  });

  it('dims disabled selects', async () => {
    expect(await computed('disabled', 'opacity')).toBe('0.5');
  });

  it('leaves the field look to the group when inside nb-native-select-group', async () => {
    expect(await computed('in-group', 'background-color')).toBe('rgba(0, 0, 0, 0)');
    expect(await computed('in-group', 'border-top-width')).toBe('0px');
    expect(await computed('in-group', 'box-shadow')).toBe('none');
    await focus('in-group');
    expect(await computed('in-group', 'outline-style')).toBe('none');
  });
});
