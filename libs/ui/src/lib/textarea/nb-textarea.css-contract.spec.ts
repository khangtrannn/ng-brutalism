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
// each engine. Elements mirror what NbTextarea renders: `data-nb-textarea`, its
// `data-*` variants and the inline tokens its inputs write.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-textarea.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-textarea] { --nb-textarea-bg: rgb(1, 2, 3); --nb-textarea-border-color: rgb(0, 128, 0); }
    .bordered [data-nb-textarea] { --nb-textarea-border-width: 5px; }
    .invalid-red [data-nb-textarea] { --nb-textarea-invalid-border-color: rgb(255, 0, 0); }
    [data-nb-textarea][data-size='sm'].custom-sm { --nb-textarea-min-height: 30px; }
    * { box-sizing: border-box; }
  </style>

  <textarea id="default" data-nb-textarea data-size="md"></textarea>
  <textarea id="sm" data-nb-textarea data-size="sm"></textarea>
  <textarea id="lg" data-nb-textarea data-size="lg"></textarea>
  <textarea id="custom-sm" class="custom-sm" data-nb-textarea data-size="sm"></textarea>

  <section style="--nb-radius-field: 12px; --nb-shadow-field-offset: 2px; --nb-shadow: rgb(0, 0, 255)">
    <textarea id="role-section" data-nb-textarea data-size="md"></textarea>
  </section>
  <section style="--nb-radius-control: 30px; --nb-shadow-control-offset: 9px">
    <textarea id="control-role" data-nb-textarea data-size="md"></textarea>
  </section>
  <section style="--nb-textarea-bg: rgb(9, 9, 9)">
    <textarea id="wrapper-token" data-nb-textarea data-size="md"></textarea>
  </section>

  <section class="selected">
    <textarea id="selected" data-nb-textarea data-size="md"></textarea>
    <textarea id="selected-input" data-nb-textarea data-size="md" style="--nb-textarea-radius: var(--nb-radius-lg)"></textarea>
    <textarea id="selected-tone" data-nb-textarea data-size="md" data-nb-tone="yellow"></textarea>
    <textarea id="selected-invalid" data-nb-textarea data-size="md" aria-invalid="true"></textarea>
    <textarea id="selected-focus" data-nb-textarea data-size="md"></textarea>
  </section>
  <textarea id="utility" class="rounded-full" data-nb-textarea data-size="md" style="--nb-textarea-radius: 3px"></textarea>

  <textarea id="invalid" data-nb-textarea data-size="md" aria-invalid="true"></textarea>
  <section class="invalid-red">
    <textarea id="invalid-custom" data-nb-textarea data-size="md" aria-invalid="true"></textarea>
  </section>
  <textarea id="focus" data-nb-textarea data-size="md"></textarea>
  <textarea id="focus-tone" data-nb-textarea data-size="md" data-nb-tone="danger"
         style="--nb-tone-border: rgb(200, 0, 0)"></textarea>
  <textarea id="disabled" data-nb-textarea data-size="md" disabled></textarea>

  <section class="bordered">
    <div style="display: flex">
      <textarea id="in-group" data-nb-textarea data-size="md" data-in-group data-nb-tone="yellow"></textarea>
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

describe.each(engines)('nb-textarea CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'min-height')).toBe('80px');
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
    expect(await computed('default', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('applies size variants, and a consumer rule for one size', async () => {
    expect(await computed('sm', 'min-height')).toBe('64px');
    expect(await computed('lg', 'min-height')).toBe('96px');
    expect(await computed('lg', 'font-size')).toBe('16px');
    expect(await computed('custom-sm', 'min-height')).toBe('30px');
  });

  it('follows the field roles set on a section', async () => {
    expect(await computed('role-section', 'border-top-left-radius')).toBe('12px');
    expect(await computed('role-section', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
  });

  it('ignores the control roles', async () => {
    expect(await computed('control-role', 'border-top-left-radius')).toBe('0px');
    expect(await computed('control-role', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('ignores a textarea token set on a wrapper', async () => {
    expect(await computed('wrapper-token', 'background-color')).toBe(SURFACE);
  });

  it('applies tokens set by selecting the textarea', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected', 'border-top-color')).toBe('rgb(0, 128, 0)');
  });

  it('lets an input beat a rule that selects the textarea', async () => {
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

  it('dims disabled textareas', async () => {
    expect(await computed('disabled', 'opacity')).toBe('0.5');
  });

  it('leaves the field look to the group when inside nb-textarea-group', async () => {
    expect(await computed('in-group', 'background-color')).toBe('rgba(0, 0, 0, 0)');
    expect(await computed('in-group', 'border-top-width')).toBe('0px');
    expect(await computed('in-group', 'box-shadow')).toBe('none');
    await focus('in-group');
    expect(await computed('in-group', 'outline-style')).toBe('none');
  });
});
