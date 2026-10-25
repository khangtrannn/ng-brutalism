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
// each engine. Elements mirror what NbIconButton renders: `data-nb-icon-button`,
// its `data-shape`/`data-size` variants and the inline tokens its inputs write.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-icon-button.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const iconButton = (id: string, attrs = '') => {
  const shape = attrs.includes('data-shape') ? '' : 'data-shape="square"';
  const size = attrs.includes('data-size') ? '' : 'data-size="md"';
  return `<button data-nb-icon-button id="${id}" ${shape} ${size} ${attrs}><svg id="${id}-svg"></svg></button>`;
};

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-icon-button] { --nb-icon-button-bg: rgb(1, 2, 3); --nb-icon-button-radius: 20px; }
    :root { --nb-motion-fast: 0s; }
  </style>

  ${iconButton('default')}
  ${iconButton('sm', 'data-size="sm"')}
  ${iconButton('xl', 'data-size="xl"')}
  ${iconButton('circle', 'data-shape="circle"')}
  ${iconButton('circle-input', 'data-shape="circle" style="--nb-icon-button-radius: 4px"')}

  <section style="--nb-radius-control: 12px; --nb-shadow-control-offset: 2px; --nb-shadow: rgb(0, 0, 255)">
    ${iconButton('roles')}
  </section>
  <section style="--nb-radius-box: 30px; --nb-shadow-box-offset: 9px">${iconButton('box')}</section>
  <section style="--nb-icon-button-bg: rgb(9, 9, 9)">${iconButton('wrapper')}</section>

  <section class="selected">
    ${iconButton('selected')}
    ${iconButton('selected-input', 'style="--nb-icon-button-radius: var(--nb-radius-lg)"')}
    ${iconButton('selected-tone', 'data-nb-tone="mint"')}
  </section>
  ${iconButton('utility', 'class="rounded-full" style="--nb-icon-button-radius: 3px"')}
  ${iconButton('disabled', 'disabled')}
`;

const SURFACE = 'rgb(255, 255, 255)';
const DEFAULT_SHADOW = 'rgb(0, 0, 0) 4px 4px 0px 0px';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-icon-button CSS contract (%s)', (name, engine) => {
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
      ([elementId, prop]) =>
        getComputedStyle(document.getElementById(elementId)!).getPropertyValue(prop),
      [id, property] as const
    );

  it('renders the default theme look', async () => {
    expect(await computed('default', 'background-color')).toBe(SURFACE);
    expect(await computed('default', 'width')).toBe('40px');
    expect(await computed('default-svg', 'width')).toBe('20px');
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
    expect(await computed('default', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('sizes the button and its icon from data-size', async () => {
    expect(await computed('sm', 'width')).toBe('32px');
    expect(await computed('sm-svg', 'width')).toBe('16px');
    expect(await computed('xl', 'height')).toBe('56px');
    expect(await computed('xl-svg', 'height')).toBe('32px');
  });

  it('rounds a circle fully unless a radius input is set', async () => {
    expect(await computed('circle', 'border-top-left-radius')).toBe('9999px');
    expect(await computed('circle-input', 'border-top-left-radius')).toBe('4px');
  });

  it('follows the control roles set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
  });

  it('ignores the box roles', async () => {
    expect(await computed('box', 'border-top-left-radius')).toBe('0px');
    expect(await computed('box', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('ignores an icon-button token set on a wrapper', async () => {
    expect(await computed('wrapper', 'background-color')).toBe(SURFACE);
  });

  it('applies tokens set by selecting the icon button', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected', 'border-top-left-radius')).toBe('20px');
  });

  it('lets an input beat a rule that selects the icon button', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(155, 242, 207)');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });

  it('dims a disabled icon button', async () => {
    expect(await computed('disabled', 'opacity')).toBe('0.5');
  });

  // Firefox headless reports no hover-capable pointer, so the gated rule never applies.
  it.skipIf(name === 'Firefox')('presses into its shadow on hover', async () => {
    await page.hover('#default');
    expect(await computed('default', 'translate')).toBe('4px 4px');
    expect(await computed('default', 'box-shadow')).toBe('none');
    await page.mouse.move(0, 0);
  });
});
