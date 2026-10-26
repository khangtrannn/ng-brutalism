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
// each engine. Markup mirrors what NbMarquee renders: tokens are declared on
// `data-nb-marquee`, the measured duration is written inline on the wrapper.
const css = ['../styles/theme.css', './nb-marquee.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const marquee = (id: string, attrs = '', wrapperStyle = '') => `
  <nb-marquee data-nb-marquee id="${id}" ${attrs}>
    <div data-slot="marquee-wrapper" data-pause-on-hover id="${id}-wrapper" style="${wrapperStyle}">
      <div data-slot="marquee-strip" data-strip="1" id="${id}-strip">
        <nb-marquee-item data-nb-marquee-item id="${id}-item">One</nb-marquee-item>
      </div>
      <div data-slot="marquee-strip" data-strip="2" data-reverse id="${id}-clone"></div>
    </div>
  </nb-marquee>`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    .dark [data-nb-marquee] { --nb-marquee-bg: rgb(1, 2, 3); }
  </style>

  ${marquee('default')}
  ${marquee('measured', '', '--nb-marquee-duration: 7000ms')}
  <section style="--nb-marquee-bg: rgb(9, 9, 9); --nb-marquee-item-font-size: 10px">${marquee('wrapper')}</section>
  <section class="dark">${marquee('selected')}</section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-marquee CSS contract (%s)', (name, engine) => {
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

  it('renders the default look', async () => {
    expect(await computed('default-wrapper', 'background-color')).toBe('rgb(255, 255, 255)');
    expect(await computed('default-wrapper', 'border-top-width')).toBe('2px');
    expect(await computed('default-strip', 'animation-name')).toBe('nb-marquee-1');
    expect(await computed('default-strip', 'animation-duration')).toBe('5s');
    expect(await computed('default-clone', 'animation-name')).toBe('nb-marquee-reverse-2');
    expect(await computed('default-item', 'font-size')).toBe('36px');
  });

  it('runs the strips for the duration written on the wrapper', async () => {
    expect(await computed('measured-strip', 'animation-duration')).toBe('7s');
  });

  it('ignores marquee tokens set on a wrapper', async () => {
    expect(await computed('wrapper-wrapper', 'background-color')).toBe('rgb(255, 255, 255)');
    expect(await computed('wrapper-item', 'font-size')).toBe('36px');
  });

  it('applies tokens set by selecting the marquee', async () => {
    expect(await computed('selected-wrapper', 'background-color')).toBe('rgb(1, 2, 3)');
  });

  // Firefox headless reports no hover-capable pointer, so the gated rule never applies.
  it.skipIf(name === 'Firefox')('pauses on hover', async () => {
    await page.hover('#default-wrapper', { force: true });
    expect(await computed('default-strip', 'animation-play-state')).toBe('paused');
    await page.mouse.move(0, 0);
  });
});
