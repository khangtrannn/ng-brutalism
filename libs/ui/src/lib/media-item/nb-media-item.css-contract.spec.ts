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
// each engine. Markup mirrors what NbMediaItem renders: tokens are declared on
// `data-nb-media-item`, the title and description are parts that inherit them.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-media-item.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const item = (id: string, attrs = '') => {
  const variant = attrs.includes('data-variant') ? '' : 'data-variant="plain"';
  const size = attrs.includes('data-size') ? '' : 'data-size="md"';
  return `
  <nb-media-item data-nb-media-item data-orientation="horizontal" data-align="start" id="${id}" ${variant} ${size} ${attrs}>
    <svg id="${id}-icon"></svg>
    <div data-nb-media-item-content>
      <span data-nb-media-item-title id="${id}-title">Title</span>
      <span data-nb-media-item-description id="${id}-description">Description</span>
    </div>
  </nb-media-item>`;
};

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-media-item] { --nb-media-item-bg: rgb(1, 2, 3); --nb-media-item-title-font-size: 20px; }
  </style>

  ${item('plain')}
  ${item('boxed', 'data-variant="boxed"')}
  ${item('chip', 'data-variant="chip"')}
  ${item('lg', 'data-size="lg"')}

  <section style="--nb-radius-box: 12px; --nb-shadow-box-offset: 2px; --nb-shadow: rgb(0, 0, 255); --nb-radius-pill: 6px">
    ${item('roles', 'data-variant="boxed"')}
    ${item('roles-chip', 'data-variant="chip"')}
  </section>
  <section style="--nb-media-item-title-font-size: 30px; --nb-media-item-icon-size: 30px; font-family: serif">
    ${item('wrapper')}
  </section>

  <section class="selected">
    ${item('selected', 'data-variant="boxed"')}
    ${item('selected-tone', 'data-variant="boxed" data-nb-tone="mint"')}
  </section>
  ${item('plain-tone', 'data-nb-tone="ink"')}
  ${item('inline', 'style="--nb-media-item-icon-size: 40px; --nb-media-item-title-font-family: monospace"')}
  ${item('utility', 'data-variant="boxed" class="rounded-full"')}
`;

const SURFACE = 'rgb(255, 255, 255)';
const TRANSPARENT = 'rgba(0, 0, 0, 0)';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-media-item CSS contract (%s)', (_name, engine) => {
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

  it('renders a plain item without a surface', async () => {
    expect(await computed('plain', 'background-color')).toBe(TRANSPARENT);
    expect(await computed('plain', 'border-top-width')).toBe('0px');
    expect(await computed('plain', 'padding-left')).toBe('0px');
    expect(await computed('plain-icon', 'height')).toBe('20px');
    expect(await computed('plain-title', 'font-size')).toBe('14px');
  });

  it('draws boxed and chip surfaces', async () => {
    expect(await computed('boxed', 'background-color')).toBe(SURFACE);
    expect(await computed('boxed', 'border-top-width')).toBe('2px');
    expect(await computed('boxed', 'padding-left')).toBe('12px');
    expect(await computed('boxed', 'box-shadow')).toBe('rgb(0, 0, 0) 4px 4px 0px 0px');
    expect(await computed('chip', 'border-top-left-radius')).toBe('9999px');
    expect(await computed('chip', 'box-shadow')).toBe('none');
  });

  it('sizes the icon, title and padding from data-size', async () => {
    expect(await computed('lg-icon', 'height')).toBe('24px');
    expect(await computed('lg-title', 'font-size')).toBe('16px');
    expect(await computed('lg-description', 'font-size')).toBe('12px');
  });

  it('follows the box and pill roles set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
    expect(await computed('roles-chip', 'border-top-left-radius')).toBe('6px');
  });

  it('ignores media-item tokens set on a wrapper but keeps its font', async () => {
    expect(await computed('wrapper-title', 'font-size')).toBe('14px');
    expect(await computed('wrapper-icon', 'height')).toBe('20px');
    expect(await computed('wrapper-title', 'font-family')).toBe('serif');
  });

  it('applies tokens set by selecting the item, down to its parts', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected-title', 'font-size')).toBe('20px');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(155, 242, 207)');
  });

  it('gives a plain item only the tone text color', async () => {
    expect(await computed('plain-tone', 'background-color')).toBe(TRANSPARENT);
    expect(await computed('plain-tone', 'color')).toBe(SURFACE);
  });

  it('applies inline tokens to the item and its parts', async () => {
    expect(await computed('inline-icon', 'height')).toBe('40px');
    expect(await computed('inline-title', 'font-family')).toBe('monospace');
  });

  it('lets a utility class beat the variant radius', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });
});
