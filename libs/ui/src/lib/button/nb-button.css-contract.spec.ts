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
// each engine. Elements mirror what NbButton renders: `data-nb-button`, its
// `data-*` variants and the inline tokens its inputs write.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-button.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-button] { --nb-button-bg: rgb(1, 2, 3); --nb-button-radius: 20px; }
    .shadowed [data-nb-button] { --nb-button-shadow: 9px 9px 0 0 rgb(255, 0, 0); }
    [data-nb-button][data-size='sm'].custom-sm { --nb-button-height: 30px; }
    :root { --nb-motion-fast: 0s; }
  </style>

  <button id="default" data-nb-button data-press="push" data-size="md">Default</button>
  <button id="sm" data-nb-button data-press="push" data-size="sm">Small</button>
  <button id="custom-sm" class="custom-sm" data-nb-button data-press="push" data-size="sm">Small</button>

  <section style="--nb-radius-control: 12px; --nb-shadow-control-offset: 2px; --nb-shadow: rgb(0, 0, 255)">
    <button id="role-section" data-nb-button data-press="push">Role</button>
  </section>
  <section style="--nb-radius-box: 30px">
    <button id="box-role" data-nb-button data-press="push">Box role</button>
  </section>
  <section style="--nb-button-bg: rgb(9, 9, 9)">
    <button id="wrapper-token" data-nb-button data-press="push">Wrapper</button>
  </section>

  <section class="selected">
    <button id="selected" data-nb-button data-press="push">Selected</button>
    <button id="selected-input" data-nb-button data-press="push" style="--nb-button-radius: var(--nb-radius-lg)">Input</button>
    <button id="selected-tone" data-nb-button data-press="push" data-nb-tone="yellow">Tone</button>
  </section>
  <button id="custom-tone" data-nb-button data-press="push"
          style="--nb-tone-bg: rgb(14, 71, 223); --nb-tone-fg: rgb(255, 255, 255)">Custom tone</button>
  <button id="utility" class="rounded-full" data-nb-button data-press="push" style="--nb-button-radius: 3px">Utility</button>

  <section class="shadowed">
    <button id="push-shadowed" data-nb-button data-press="push">Push</button>
  </section>
  <button id="reverse" data-nb-button data-press="reverse">Reverse</button>
  <button id="none" data-nb-button data-press="none">None</button>
  <button id="disabled" data-nb-button data-press="push" disabled>Disabled</button>
  <a id="aria-disabled" data-nb-button data-press="push" aria-disabled="true">Link</a>

  <button data-nb-button data-press="push" style="--nb-button-radius: 6px">
    <span id="trailing" data-nb-button-trailing-icon data-push="none" data-size="lg"
          style="--nb-button-trailing-icon-size: 2.5rem"></span>
  </button>
  <button data-nb-button data-press="push">
    <span id="trailing-inverse" data-nb-button-trailing-icon data-push="none" data-tone="inverse"
          style="--nb-button-trailing-icon-radius: var(--nb-radius-sm)"></span>
  </button>
`;

const PRIMARY = 'rgb(255, 144, 232)';
const DEFAULT_SHADOW = 'rgb(0, 0, 0) 4px 4px 0px 0px';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-button CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'background-color')).toBe(PRIMARY);
    expect(await computed('default', 'height')).toBe('44px');
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
    expect(await computed('default', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('applies size variants, and a consumer rule for one size', async () => {
    expect(await computed('sm', 'height')).toBe('36px');
    expect(await computed('custom-sm', 'height')).toBe('30px');
  });

  it('follows the control roles set on a section', async () => {
    expect(await computed('role-section', 'border-top-left-radius')).toBe('12px');
    expect(await computed('role-section', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
  });

  it('ignores the box role', async () => {
    expect(await computed('box-role', 'border-top-left-radius')).toBe('0px');
  });

  it('ignores a button token set on a wrapper', async () => {
    expect(await computed('wrapper-token', 'background-color')).toBe(PRIMARY);
  });

  it('applies tokens set by selecting the button', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected', 'border-top-left-radius')).toBe('20px');
  });

  it('lets an input beat a rule that selects the button', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(255, 210, 74)');
  });

  it('accepts a custom tone set on the button', async () => {
    expect(await computed('custom-tone', 'background-color')).toBe('rgb(14, 71, 223)');
    expect(await computed('custom-tone', 'color')).toBe('rgb(255, 255, 255)');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });

  it('keeps the push hover state when the resting shadow is overridden', async () => {
    expect(await computed('push-shadowed', 'box-shadow')).toBe('rgb(255, 0, 0) 9px 9px 0px 0px');
    await page.hover('#push-shadowed');
    expect(await computed('push-shadowed', 'translate')).toBe('4px 4px');
    expect(await computed('push-shadowed', 'box-shadow')).toBe('none');
  });

  it('lifts a reverse button into its shadow on hover', async () => {
    expect(await computed('reverse', 'box-shadow')).toBe('none');
    await page.hover('#reverse');
    expect(await computed('reverse', 'translate')).toBe('-4px -4px');
    expect(await computed('reverse', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('keeps a press="none" button still on hover', async () => {
    await page.hover('#none');
    expect(await computed('none', 'translate')).toBe('none');
    expect(await computed('none', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('dims disabled buttons', async () => {
    expect(await computed('disabled', 'opacity')).toBe('0.5');
    expect(await computed('aria-disabled', 'opacity')).toBe('0.5');
  });

  it('sizes the trailing icon from its input and follows the button radius', async () => {
    expect(await computed('trailing', 'width')).toBe('40px');
    expect(await computed('trailing', 'border-top-left-radius')).toBe('6px');
    expect(await computed('trailing', 'background-color')).toBe('rgba(0, 0, 0, 0)');
  });

  it('applies the trailing icon tone and shape inputs', async () => {
    expect(await computed('trailing-inverse', 'background-color')).toBe('rgb(0, 0, 0)');
    expect(await computed('trailing-inverse', 'color')).toBe('rgb(255, 255, 255)');
    expect(await computed('trailing-inverse', 'border-top-left-radius')).toBe('4px');
  });
});
