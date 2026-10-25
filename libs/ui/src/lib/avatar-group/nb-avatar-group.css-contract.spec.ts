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
// each engine. Markup mirrors what NbAvatarGroup renders: tokens are declared
// on `data-nb-avatar-group`, the overflow count is a part.
const css = ['../styles/theme.css', './nb-avatar-group.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const group = (id: string, attrs = '') => `
  <nb-avatar-group data-nb-avatar-group id="${id}" ${attrs}>
    <span id="${id}-first">A</span><span id="${id}-second">B</span>
    <span data-slot="avatar-group-overflow" id="${id}-overflow">+3</span>
  </nb-avatar-group>`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    .tight [data-nb-avatar-group] { --nb-avatar-group-overlap: 4px; }
  </style>

  ${group('default')}
  <section style="--nb-radius-pill: 12px; --nb-avatar-group-overlap: 30px">${group('roles')}</section>
  <section class="tight">${group('selected')}</section>
`;

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-avatar-group CSS contract (%s)', (_name, engine) => {
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

  it('overlaps every avatar after the first', async () => {
    expect(await computed('default-first', 'margin-left')).toBe('0px');
    expect(await computed('default-second', 'margin-left')).toBe('-12px');
  });

  it('draws the overflow count as a pill', async () => {
    expect(await computed('default-overflow', 'width')).toBe('40px');
    expect(await computed('default-overflow', 'border-top-left-radius')).toBe('9999px');
    expect(await computed('default-overflow', 'box-shadow')).toBe('rgb(0, 0, 0) 2px 2px 0px 0px');
  });

  it('follows the pill radius but ignores group tokens set on a wrapper', async () => {
    expect(await computed('roles-overflow', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles-second', 'margin-left')).toBe('-12px');
  });

  it('applies tokens set by selecting the group', async () => {
    expect(await computed('selected-second', 'margin-left')).toBe('-4px');
  });
});
