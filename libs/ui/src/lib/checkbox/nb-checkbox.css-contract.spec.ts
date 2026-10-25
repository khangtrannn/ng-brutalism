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
// each engine. Elements mirror what NbCheckbox renders: `data-nb-checkbox`,
// its `data-size` variant and the inline radius its input writes.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-checkbox.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const checkbox = (id: string, attrs = '') => {
  const size = attrs.includes('data-size') ? '' : 'data-size="md"';
  return `<input type="checkbox" data-nb-checkbox id="${id}" ${size} ${attrs} />`;
};

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-checkbox] { --nb-checkbox-checked-bg: rgb(1, 2, 3); --nb-checkbox-radius: 20px; }
    .invalid-red [data-nb-checkbox] { --nb-checkbox-invalid-border-color: rgb(255, 0, 0); }
    * { box-sizing: border-box; }
  </style>

  ${checkbox('default')}
  ${checkbox('checked', 'checked')}
  ${checkbox('sm', 'data-size="sm"')}
  ${checkbox('lg', 'data-size="lg"')}

  <section style="--nb-radius-field: 12px; --nb-border-width: 3px">${checkbox('roles')}</section>
  <section style="--nb-radius-control: 30px">${checkbox('control')}</section>
  <section style="--nb-checkbox-checked-bg: rgb(9, 9, 9)">${checkbox('wrapper', 'checked')}</section>

  <section class="selected">
    ${checkbox('selected', 'checked')}
    ${checkbox('selected-input', 'style="--nb-checkbox-radius: var(--nb-radius-lg)"')}
    ${checkbox('selected-tone', 'checked data-nb-tone="mint"')}
  </section>
  ${checkbox('utility', 'class="rounded-full" style="--nb-checkbox-radius: 3px"')}

  ${checkbox('tone-unchecked', 'data-nb-tone="mint"')}
  ${checkbox('invalid', 'aria-invalid="true"')}
  <section class="invalid-red">${checkbox('invalid-custom', 'aria-invalid="true"')}</section>
  ${checkbox('focus')}
  ${checkbox('disabled', 'disabled')}
`;

const PRIMARY = 'rgb(255, 144, 232)';
const TRANSPARENT = 'rgba(0, 0, 0, 0)';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-checkbox CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'background-color')).toBe(TRANSPARENT);
    expect(await computed('default', 'width')).toBe('16px');
    expect(await computed('default', 'outline-width')).toBe('2px');
    expect(await computed('default', 'outline-color')).toBe('rgb(0, 0, 0)');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
  });

  it('fills a checked box and draws the check mark', async () => {
    expect(await computed('checked', 'background-color')).toBe(PRIMARY);
    expect(await computed('checked', 'background-image')).toContain('data:image/svg+xml');
  });

  it('sizes the box from data-size', async () => {
    expect(await computed('sm', 'width')).toBe('14px');
    expect(await computed('lg', 'height')).toBe('20px');
  });

  it('follows the field radius and border width set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'outline-width')).toBe('3px');
  });

  it('ignores the control radius', async () => {
    expect(await computed('control', 'border-top-left-radius')).toBe('0px');
  });

  it('ignores a checkbox token set on a wrapper', async () => {
    expect(await computed('wrapper', 'background-color')).toBe(PRIMARY);
  });

  it('applies tokens set by selecting the checkbox', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected', 'border-top-left-radius')).toBe('20px');
  });

  it('lets an input beat a rule that selects the checkbox', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(155, 242, 207)');
  });

  it('keeps an unchecked toned box transparent', async () => {
    expect(await computed('tone-unchecked', 'background-color')).toBe(TRANSPARENT);
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });

  it('marks an invalid box with its own token', async () => {
    expect(await computed('invalid', 'outline-color')).toBe('rgb(255, 79, 138)');
    expect(await computed('invalid-custom', 'outline-color')).toBe('rgb(255, 0, 0)');
  });

  it('draws a focus ring around a keyboard-focused box', async () => {
    await page.focus('#focus');
    await page.keyboard.press('Shift');
    expect(await computed('focus', 'outline-color')).toBe(TRANSPARENT);
    expect(await computed('focus', 'box-shadow')).toBe(
      'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 0, 0) 0px 0px 0px 4px'
    );
  });

  it('dims a disabled box', async () => {
    expect(await computed('disabled', 'opacity')).toBe('0.5');
  });
});
