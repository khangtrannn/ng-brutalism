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
// each engine. Markup mirrors what NbRating renders: tokens are declared on
// `data-nb-rating`; each star repeats the rating's `data-nb-tone`.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-rating.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const rating = (id: string, attrs = '', tone = '') => {
  const toned = tone ? `data-nb-tone="${tone}"` : '';
  return `
  <nb-rating data-nb-rating id="${id}" ${toned} ${attrs}>
    <span data-slot="rating-star" data-filled id="${id}-filled" ${toned}>★</span>
    <span data-slot="rating-star" id="${id}-empty" ${toned}>☆</span>
    <span data-slot="rating-count" id="${id}-count">(3)</span>
  </nb-rating>`;
};

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    .branded [data-nb-rating] { --nb-rating-filled-fg: rgb(1, 2, 3); }
  </style>

  ${rating('default')}
  ${rating('tone', '', 'mint')}
  <section style="--nb-rating-filled-fg: rgb(9, 9, 9); --nb-rating-size: 40px">${rating('wrapper')}</section>
  <section class="branded">
    ${rating('selected')}
    ${rating('selected-tone', '', 'mint')}
  </section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-rating CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default-filled', 'color')).toBe('rgb(255, 156, 66)');
    expect(await computed('default-empty', 'color')).toBe('rgb(0, 0, 0)');
    expect(await computed('default-filled', 'font-size')).toBe('20px');
    expect(await computed('default-count', 'font-size')).toBe('12px');
  });

  it('colors only the filled stars with the tone', async () => {
    expect(await computed('tone-filled', 'color')).toBe('rgb(155, 242, 207)');
    expect(await computed('tone-empty', 'color')).toBe('rgb(0, 0, 0)');
  });

  it('ignores rating tokens set on a wrapper', async () => {
    expect(await computed('wrapper-filled', 'color')).toBe('rgb(255, 156, 66)');
    expect(await computed('wrapper-filled', 'font-size')).toBe('20px');
  });

  it('applies tokens set by selecting the rating, and lets a tone beat them', async () => {
    expect(await computed('selected-filled', 'color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected-tone-filled', 'color')).toBe('rgb(155, 242, 207)');
  });
});
