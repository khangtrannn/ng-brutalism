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
// each engine. Markup mirrors what NbStatusDot renders: tokens are declared on
// `data-nb-status-dot`, `data-size` and `data-state` pick the variant.
const css = ['../styles/theme.css', './nb-status-dot.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const dot = (id: string, attrs = '') => {
  const size = attrs.includes('data-size') ? '' : 'data-size="md"';
  const state = attrs.includes('data-state') ? '' : 'data-state="online"';
  return `<span data-nb-status-dot id="${id}" ${size} ${state} ${attrs}></span>`;
};

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    .branded [data-nb-status-dot] { --nb-status-dot-online-bg: rgb(1, 2, 3); }
  </style>

  ${dot('default')}
  ${dot('xs', 'data-size="xs"')}
  ${dot('lg', 'data-size="lg"')}
  ${dot('offline', 'data-state="offline"')}
  ${dot('live', 'data-state="live"')}
  <section style="--nb-radius-pill: 3px; --nb-status-dot-size: 40px">${dot('roles')}</section>
  <section class="branded">${dot('selected')}</section>
  ${dot('input', 'style="--nb-status-dot-radius: 1px"')}
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-status-dot CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'width')).toBe('12px');
    expect(await computed('default', 'border-top-left-radius')).toBe('9999px');
    expect(await computed('default', 'background-color')).toBe('rgb(99, 230, 190)');
  });

  it('sizes the dot from data-size', async () => {
    expect(await computed('xs', 'width')).toBe('8px');
    expect(await computed('lg', 'height')).toBe('16px');
  });

  it('colors each state and pulses when live', async () => {
    expect(await computed('offline', 'background-color')).not.toBe(
      await computed('default', 'background-color')
    );
    expect(await computed('live', 'background-color')).toBe('rgb(255, 79, 138)');
    expect(await computed('live', 'animation-name')).toBe('nb-status-dot-pulse');
  });

  it('follows the pill radius but ignores dot tokens set on a wrapper', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('3px');
    expect(await computed('roles', 'width')).toBe('12px');
  });

  it('applies tokens set by selecting the dot', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
  });

  it('applies the radius input', async () => {
    expect(await computed('input', 'border-top-left-radius')).toBe('1px');
  });
});
