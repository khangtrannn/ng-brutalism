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
// each engine. Markup mirrors what NbProgress renders: tokens are declared on
// `data-nb-progress`; the fill repeats the progress bar's `data-nb-tone`.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-progress.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const progress = (id: string, attrs = '', tone = '') => `
  <nb-progress data-nb-progress id="${id}" ${tone ? `data-nb-tone="${tone}"` : ''} ${attrs}>
    <div data-slot="progress-track">
      <div data-slot="progress-fill" id="${id}-fill" ${tone ? `data-nb-tone="${tone}"` : ''} style="width: 50%"></div>
    </div>
  </nb-progress>`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    .branded [data-nb-progress] { --nb-progress-fill-bg: rgb(1, 2, 3); }
  </style>

  ${progress('default')}
  ${progress('tone', '', 'mint')}
  <section style="--nb-shadow-box-offset: 2px; --nb-shadow: rgb(0, 0, 255)">${progress('roles')}</section>
  <section style="--nb-progress-fill-bg: rgb(9, 9, 9)">${progress('wrapper')}</section>
  <section class="branded">
    ${progress('selected')}
    ${progress('selected-tone', '', 'mint')}
  </section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-progress CSS contract (%s)', (_name, engine) => {
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
    expect(await computed('default', 'height')).toBe('12px');
    expect(await computed('default', 'box-shadow')).toBe('rgb(0, 0, 0) 4px 4px 0px 0px');
    expect(await computed('default-fill', 'background-color')).toBe('rgb(255, 144, 232)');
  });

  it('paints the tone on the fill only', async () => {
    expect(await computed('tone-fill', 'background-color')).toBe('rgb(155, 242, 207)');
    expect(await computed('tone', 'background-color')).toBe(
      await computed('default', 'background-color')
    );
  });

  it('follows the box depth set on a section', async () => {
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
  });

  it('ignores progress tokens set on a wrapper', async () => {
    expect(await computed('wrapper-fill', 'background-color')).toBe('rgb(255, 144, 232)');
  });

  it('applies tokens set by selecting the bar, and lets a tone beat them', async () => {
    expect(await computed('selected-fill', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected-tone-fill', 'background-color')).toBe('rgb(155, 242, 207)');
  });
});
