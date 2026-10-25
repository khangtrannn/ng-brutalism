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
// each engine. Markup mirrors what NbDialog renders: tokens are declared on the
// inner `<dialog data-nb-dialog>`, parts are matched by `data-slot`.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-dialog.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const dialog = (id: string, attrs = 'open') => `
  <dialog data-nb-dialog id="${id}" ${attrs}>
    <h2 data-slot="dialog-title" id="${id}-title">Title</h2>
    <p data-slot="dialog-description" id="${id}-description">Description</p>
    <div data-slot="dialog-content" id="${id}-content">Body</div>
    <div data-slot="dialog-actions" id="${id}-actions"></div>
  </dialog>`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and consumer rules. */
    @layer utilities { .rounded-full { border-radius: 9999px; } }
    .selected [data-nb-dialog] { --nb-dialog-bg: rgb(1, 2, 3); --nb-dialog-padding-x: 4px; }
  </style>

  ${dialog('default')}
  <section style="--nb-radius-box: 12px; --nb-shadow-box-offset: 2px; --nb-shadow: rgb(0, 0, 255)">
    ${dialog('roles')}
  </section>
  <section style="--nb-radius-control: 30px">${dialog('control')}</section>
  <section style="--nb-dialog-bg: rgb(9, 9, 9); --nb-dialog-description-fg: rgb(9, 9, 9)">${dialog('wrapper')}</section>
  <section class="selected">
    ${dialog('selected')}
    ${dialog('selected-input', 'open style="--nb-dialog-radius: var(--nb-radius-lg)"')}
    ${dialog('selected-tone', 'open data-nb-tone="mint"')}
  </section>
  ${dialog('utility', 'open class="rounded-full" style="--nb-dialog-radius: 3px"')}
  ${dialog('modal', '')}
`;

const SURFACE = 'rgb(255, 255, 255)';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-dialog CSS contract (%s)', (_name, engine) => {
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

  const computed = (id: string, property: string, pseudo?: string) =>
    page.evaluate(
      ([elementId, name, pseudoElement]) =>
        getComputedStyle(document.getElementById(elementId)!, pseudoElement).getPropertyValue(name),
      [id, property, pseudo ?? null] as const
    );

  it('renders the default theme look', async () => {
    expect(await computed('default', 'display')).toBe('flex');
    expect(await computed('default', 'background-color')).toBe(SURFACE);
    expect(await computed('default', 'border-top-width')).toBe('2px');
    expect(await computed('default', 'border-top-left-radius')).toBe('0px');
    expect(await computed('default', 'box-shadow')).toBe('rgb(0, 0, 0) 6px 6px 0px 0px');
    expect(await computed('default-title', 'padding-top')).toBe('24px');
    expect(await computed('default-description', 'color')).toBe('rgb(75, 85, 99)');
    expect(await computed('default-content', 'border-top-width')).toBe('2px');
    expect(await computed('default-actions', 'padding-left')).toBe('24px');
  });

  it('follows the box roles set on a section', async () => {
    expect(await computed('roles', 'border-top-left-radius')).toBe('12px');
    expect(await computed('roles', 'box-shadow')).toBe('rgb(0, 0, 255) 3px 3px 0px 0px');
  });

  it('ignores the control roles', async () => {
    expect(await computed('control', 'border-top-left-radius')).toBe('0px');
  });

  it('ignores dialog tokens set on a wrapper', async () => {
    expect(await computed('wrapper', 'background-color')).toBe(SURFACE);
    expect(await computed('wrapper-description', 'color')).toBe('rgb(75, 85, 99)');
  });

  it('applies tokens set by selecting the dialog, down to its parts', async () => {
    expect(await computed('selected', 'background-color')).toBe('rgb(1, 2, 3)');
    expect(await computed('selected-title', 'padding-left')).toBe('4px');
    expect(await computed('selected-content', 'padding-left')).toBe('4px');
  });

  it('lets an input beat a rule that selects the dialog', async () => {
    expect(await computed('selected-input', 'border-top-left-radius')).toBe('12px');
  });

  it('lets an explicit tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(155, 242, 207)');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('9999px');
  });

  it('hides a closed dialog', async () => {
    expect(await computed('modal', 'display')).toBe('none');
  });

  it('dims the page behind a modal and locks its scroll', async () => {
    await page.evaluate(() => (document.getElementById('modal') as HTMLDialogElement).showModal());
    expect(await computed('modal', 'background-color', '::backdrop')).toBe('rgba(0, 0, 0, 0.45)');
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden');
    await page.evaluate(() => (document.getElementById('modal') as HTMLDialogElement).close());
  });
});
