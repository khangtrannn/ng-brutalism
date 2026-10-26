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
// each engine. Markup mirrors what NbSticker renders: tokens are declared on
// `data-nb-sticker`; the shape and content repeat its `data-nb-tone`, and a
// projected nb-sticker-face is styled as a part.
const css = [
  '../styles/theme.css',
  '../styles/tone.css',
  './nb-sticker.css',
  './nb-sticker-face.css',
]
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const sticker = (id: string, attrs = 'data-shape="burst"', tone = '') => {
  const toned = tone ? `data-nb-tone="${tone}"` : '';
  return `
  <nb-sticker data-nb-sticker id="${id}" ${toned} ${attrs}>
    <span data-slot="sticker-root" id="${id}-root">
      <svg data-slot="sticker-svg"><path data-slot="sticker-shape" id="${id}-shape" ${toned} /></svg>
      <span data-slot="sticker-content" id="${id}-content" ${toned}>
        Hi
        <nb-sticker-face data-nb-sticker-face id="${id}-face">
          <svg data-slot="sticker-face-svg"><ellipse data-slot="sticker-face-eye" id="${id}-eye" /></svg>
        </nb-sticker-face>
      </span>
    </span>
  </nb-sticker>`;
};

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    .branded [data-nb-sticker] { --nb-sticker-bg: rgb(1, 2, 3); --nb-sticker-face-size: 50px; }
  </style>

  ${sticker('default')}
  ${sticker('star', 'data-shape="star"')}
  ${sticker('ink', 'data-shape="burst"', 'ink')}
  <section style="--nb-sticker-bg: rgb(9, 9, 9); --nb-sticker-face-size: 10px">${sticker('wrapper')}</section>
  <section class="branded">
    ${sticker('selected')}
    ${sticker('selected-tone', 'data-shape="burst"', 'pink')}
  </section>
  ${sticker('inline', 'data-shape="burst" style="--nb-sticker-fg: rgb(4, 5, 6)"')}
`;

const MINT = 'rgb(155, 242, 207)';
const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];


describe.each(engines)('nb-sticker CSS contract (%s)', (_name, engine) => {
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

  // Engines round the 5.55rem face width differently.
  it('renders the default theme look', async () => {
    expect(await computed('default-shape', 'fill')).toBe(MINT);
    expect(await computed('default-shape', 'stroke')).toBe('rgb(5, 5, 5)');
    expect(await computed('default-content', 'color')).toBe('rgb(5, 5, 5)');
    expect(parseFloat(await computed('default-face', 'width'))).toBeCloseTo(88.8, 0);
    expect(await computed('default-eye', 'fill')).toBe('rgb(5, 5, 5)');
  });

  it('applies shape variants, down to the face', async () => {
    expect(await computed('star-face', 'width')).toBe('56px');
  });

  it('paints a tone on the shape, the text and the face', async () => {
    expect(await computed('ink-shape', 'fill')).toBe('rgb(0, 0, 0)');
    expect(await computed('ink-content', 'color')).toBe('rgb(255, 255, 255)');
    expect(await computed('ink-eye', 'fill')).toBe('rgb(255, 255, 255)');
  });

  it('ignores sticker tokens set on a wrapper', async () => {
    expect(await computed('wrapper-shape', 'fill')).toBe(MINT);
    expect(parseFloat(await computed('wrapper-face', 'width'))).toBeCloseTo(88.8, 0);
  });

  it('applies tokens set by selecting the sticker, and lets a tone beat them', async () => {
    expect(await computed('selected-shape', 'fill')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected-face', 'width')).toBe('50px');
    expect(await computed('selected-tone-shape', 'fill')).toBe('rgb(255, 126, 182)');
  });

  it('lets the face follow an inline foreground', async () => {
    expect(await computed('inline-eye', 'fill')).toBe('rgb(4, 5, 6)');
  });
});
