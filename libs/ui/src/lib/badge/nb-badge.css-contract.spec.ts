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
// each engine. Markup mirrors what NbBadge renders: tokens are declared on
// `data-nb-badge`, inputs write them inline.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-badge.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const badge = (id: string, attrs = '') =>
  `<span data-nb-badge id="${id}" ${attrs}>Badge</span>`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-none { border-radius: 0px; } }
    .selected [data-nb-badge] { --nb-badge-bg: rgb(1, 2, 3); --nb-badge-radius: 20px; }
  </style>

  ${badge('default')}

  <section style="--nb-radius-pill: 12px; --nb-shadow-pill-offset: 3px; --nb-shadow: rgb(0, 0, 255)">
    ${badge('roles')}
  </section>
  <section style="--nb-radius-control: 30px; --nb-shadow-control-offset: 9px">${badge('control')}</section>
  <section style="--nb-badge-bg: rgb(9, 9, 9)">${badge('wrapper')}</section>

  <section class="selected">
    ${badge('selected')}
    ${badge('selected-input', 'style="--nb-badge-radius: var(--nb-radius-lg)"')}
    ${badge('selected-tone', 'data-nb-tone="mint"')}
  </section>
  ${badge('utility', 'class="rounded-none" style="--nb-badge-radius: 3px"')}
`;

const SURFACE = 'rgb(255, 255, 255)';
const DEFAULT_SHADOW = 'rgb(0, 0, 0) 2px 2px 0px 0px';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-badge CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'border-top-left-radius')).toBe('9999px');
    expect(await computed('default', 'box-shadow')).toBe(DEFAULT_SHADOW);
    expect(await computed('default', 'padding-left')).toBe('10px');
  });

  it('follows the pill roles set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 3px 3px 0px 0px');
  });

  it('ignores the control roles', async () => {
    expect(await computed('control', 'border-top-left-radius')).toBe('9999px');
    expect(await computed('control', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('ignores a badge token set on a wrapper', async () => {
    expect(await computed('wrapper', 'background-color')).toBe(SURFACE);
  });

  it('applies tokens set by selecting the badge', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected', 'border-top-left-radius')).toBe('20px');
  });

  it('lets an input beat a rule that selects the badge', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(155, 242, 207)');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('0px');
  });
});
