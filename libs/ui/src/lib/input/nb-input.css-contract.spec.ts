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
// each engine. Elements mirror what NbInput renders: `data-nb-input`, its
// `data-*` variants and the inline tokens its inputs write.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-input.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-input] { --nb-input-bg: rgb(1, 2, 3); --nb-input-border-color: rgb(0, 128, 0); }
    .bordered [data-nb-input] { --nb-input-border-width: 5px; }
    .invalid-red [data-nb-input] { --nb-input-invalid-border-color: rgb(255, 0, 0); }
    [data-nb-input][data-size='sm'].custom-sm { --nb-input-height: 30px; }
    * { box-sizing: border-box; }
  </style>

  <input id="default" data-nb-input data-size="md" />
  <input id="sm" data-nb-input data-size="sm" />
  <input id="lg" data-nb-input data-size="lg" />
  <input id="custom-sm" class="custom-sm" data-nb-input data-size="sm" />

  <section style="--nb-radius-field: 12px; --nb-shadow-field-offset: 2px; --nb-shadow: rgb(0, 0, 255)">
    <input id="role-section" data-nb-input data-size="md" />
  </section>
  <section style="--nb-radius-control: 30px; --nb-shadow-control-offset: 9px">
    <input id="control-role" data-nb-input data-size="md" />
  </section>
  <section style="--nb-input-bg: rgb(9, 9, 9)">
    <input id="wrapper-token" data-nb-input data-size="md" />
  </section>

  <section class="selected">
    <input id="selected" data-nb-input data-size="md" />
    <input id="selected-input" data-nb-input data-size="md" style="--nb-input-radius: var(--nb-radius-lg)" />
    <input id="selected-tone" data-nb-input data-size="md" data-nb-tone="yellow" />
    <input id="selected-invalid" data-nb-input data-size="md" aria-invalid="true" />
    <input id="selected-focus" data-nb-input data-size="md" />
  </section>
  <input id="utility" class="rounded-full" data-nb-input data-size="md" style="--nb-input-radius: 3px" />

  <input id="invalid" data-nb-input data-size="md" aria-invalid="true" />
  <section class="invalid-red">
    <input id="invalid-custom" data-nb-input data-size="md" aria-invalid="true" />
  </section>
  <input id="focus" data-nb-input data-size="md" />
  <input id="focus-tone" data-nb-input data-size="md" data-nb-tone="danger"
         style="--nb-tone-border: rgb(200, 0, 0)" />
  <input id="disabled" data-nb-input data-size="md" disabled />

  <section class="bordered">
    <div style="display: flex">
      <input id="in-group" data-nb-input data-size="md" data-in-group data-nb-tone="yellow" />
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

describe.each(engines)('nb-input CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'height')).toBe('40px');
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
    expect(await computed('default', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('applies size variants, and a consumer rule for one size', async () => {
    expect(await computed('sm', 'height')).toBe('36px');
    expect(await computed('lg', 'height')).toBe('44px');
    expect(await computed('lg', 'font-size')).toBe('16px');
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

  it('ignores an input token set on a wrapper', async () => {
    expect(await computed('wrapper-token', 'background-color')).toBe(SURFACE);
  });

  it('applies tokens set by selecting the input', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected', 'border-top-color')).toBe('rgb(0, 128, 0)');
  });

  it('lets an input beat a rule that selects the input', async () => {
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

  it('dims disabled inputs', async () => {
    expect(await computed('disabled', 'opacity')).toBe('0.5');
  });

  it('leaves the field look to the group when inside nb-input-group', async () => {
    expect(await computed('in-group', 'background-color')).toBe('rgba(0, 0, 0, 0)');
    expect(await computed('in-group', 'border-top-width')).toBe('0px');
    expect(await computed('in-group', 'box-shadow')).toBe('none');
    await focus('in-group');
    expect(await computed('in-group', 'outline-style')).toBe('none');
  });
});
