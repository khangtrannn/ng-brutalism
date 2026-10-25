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
// each engine. Elements mirror what NbMediaFrame renders: `data-nb-media-frame`,
// its `data-ratio`/`data-fit` variants and the inline tokens its inputs write.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-media-frame.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const el = (id: string, attrs = '', inner = '') =>
  `<div data-nb-media-frame ${attrs.includes('data-ratio') ? '' : 'data-ratio="auto"'}
        ${attrs.includes('data-fit') ? '' : 'data-fit="cover"'} id="${id}" ${attrs}>${inner}</div>`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-media-frame] { --nb-media-frame-radius: 20px; --nb-media-frame-object-fit: none; }
  </style>

  <div style="width: 320px">
    ${el('default', '', '<img id="default-img" alt="" />')}
    ${el('square', 'data-ratio="1/1" data-fit="contain"', '<picture><img id="square-img" alt="" /></picture>')}
    ${el('wide', 'data-ratio="16/9"')}
    <section style="--nb-radius-box: 12px">${el('roles')}</section>
    <section style="--nb-radius-control: 30px">${el('control')}</section>
    <section style="--nb-media-frame-radius: 9px">${el('wrapper')}</section>
    <section class="selected">
      ${el('selected', '', '<video id="selected-video"></video>')}
      ${el('selected-input', 'style="--nb-media-frame-radius: var(--nb-radius-lg)"')}
      ${el('selected-tone', 'data-nb-tone="pink"')}
    </section>
    ${el('utility', 'class="rounded-full" style="--nb-media-frame-radius: 3px"')}
  </div>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-media-frame CSS contract (%s)', (_name, engine) => {
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

  it('renders the default theme look, flat', async () => {
    expect(await computed('default', 'background-color')).toBe('rgb(255, 255, 255)');
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'box-shadow')).toBe('none');
    expect(await computed('default-img', 'object-fit')).toBe('cover');
  });

  it('applies ratio and fit variants', async () => {
    expect(await computed('square', 'aspect-ratio')).toBe('1 / 1');
    expect(await computed('square-img', 'object-fit')).toBe('contain');
    expect(await computed('wide', 'aspect-ratio')).toBe('16 / 9');
  });

  it('follows the box role set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
  });

  it('ignores the control role', async () => {
    expect(await computed('control', 'border-top-left-radius')).toBe('0px');
  });

  it('ignores a media frame token set on a wrapper', async () => {
    expect(await computed('wrapper', 'border-top-left-radius')).toBe('0px');
  });

  it('applies tokens set by selecting the frame, including on its media', async () => {
    expect(await computed('selected', 'border-top-left-radius')).toBe('20px');
    expect(await computed('selected-video', 'object-fit')).toBe('none');
  });

  it('lets an input beat a rule that selects the frame', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
  });

  it('lets an explicit tone color the frame', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(255, 126, 182)');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });
});
