import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { chromium, type Browser, type Page } from '@playwright/test';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// Public variables registered with `inherits: false` must stay on the element
// that sets them, but variables read by descendants must still inherit.
// Chromium renders the real stylesheets so the cascade is what gets checked.
const css = [
  '../styles/theme.css',
  '../styles/tone.css',
  '../input/nb-input.css',
  '../icon-button/nb-icon-button.css',
  '../button/nb-button.css',
  '../chip/nb-chip.css',
  '../stack/nb-stack.css',
  '../select/nb-select.css',
  '../dialog/nb-dialog.css',
  '../card/nb-card.css',
  '../icon/nb-icon.css',
  '../image-card/nb-image-card.css',
  '../input-group/nb-input-group.css',
]
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer base, components, utilities;
    ${css}
    :root { --nb-motion-fast: 0s; }
    .scoped [data-nb-card] { --nb-card-radius: 20px; }
  </style>

  <div style="--nb-input-bg: rgb(1, 2, 3)">
    <input data-nb-input id="input-nested" />
  </div>
  <input data-nb-input id="input-self" style="--nb-input-bg: rgb(4, 5, 6)" />

  <div data-nb-stack data-separator="solid" style="--nb-stack-separator-gap: 5px; --nb-stack-gap: 1px">
    <div id="stack-first"></div>
    <div id="stack-second"></div>
  </div>

  <span data-nb-chip style="--nb-chip-icon-size: 2rem"><svg id="chip-svg"></svg></span>

  <button data-nb-button style="--nb-button-trailing-icon-size: 2rem">
    <span data-nb-button-trailing-icon data-size="sm" id="trailing"></span>
  </button>

  <dialog data-nb-dialog open style="--nb-dialog-description-fg: rgb(7, 8, 9)">
    <p data-slot="dialog-description" id="description"></p>
  </dialog>

  <button data-nb-icon-button data-shape="circle" data-size="md" id="circle" style="--nb-icon-button-radius: 4px"></button>

  <section style="--nb-card-radius: 30px">
    <nb-card data-nb-card id="card-in-scope"></nb-card>
  </section>
  <section class="scoped"><nb-card data-nb-card id="card-selected"></nb-card></section>

  <div style="--nb-icon-size: 40px"><span data-nb-icon data-size="md" id="icon"></span></div>

  <nb-image-card data-nb-image-card style="--nb-image-card-border-width: 7px">
    <nb-image-card-caption data-slot="image-card-caption" id="caption"></nb-image-card-caption>
  </nb-image-card>

  <nb-input-group data-nb-input-group style="--nb-input-group-border-color: rgb(1, 1, 1)">
    <span nbInputPrefix id="prefix"></span>
  </nb-input-group>

  <nb-select data-nb-select style="--nb-select-radius: 3px">
    <div data-slot="select-listbox" id="listbox"></div>
  </nb-select>
`;

describe('component public variables CSS contract (Chromium)', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch();
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

  it('applies a variable to the input that sets it', async () => {
    expect(await computed('input-self', 'background-color')).toBe('rgb(4, 5, 6)');
  });

  it('does not leak a parent variable into a nested input', async () => {
    expect(await computed('input-nested', 'background-color')).toBe('rgb(255, 255, 255)');
  });

  it('lets stack children read the separator gap set on the stack', async () => {
    expect(await computed('stack-second', 'padding-top')).toBe('5px');
  });

  it('lets chip icons read the icon size set on the chip', async () => {
    expect(await computed('chip-svg', 'width')).toBe('32px');
  });

  it('lets the trailing icon read the size set on its button', async () => {
    expect(await computed('trailing', 'width')).toBe('32px');
  });

  it('lets dialog descriptions read the foreground set on the dialog', async () => {
    expect(await computed('description', 'color')).toBe('rgb(7, 8, 9)');
  });

  it('lets an icon-button circle honor its radius input', async () => {
    expect(await computed('circle', 'border-top-left-radius')).toBe('4px');
  });

  it('lets the select listbox read the radius set on nb-select', async () => {
    expect(await computed('listbox', 'border-bottom-right-radius')).toBe('3px');
  });

  it('keeps a card variable set on a parent element out of the card', async () => {
    expect(await computed('card-in-scope', 'border-top-left-radius')).toBe('0px');
  });

  it('applies a card variable set by selecting the card', async () => {
    expect(await computed('card-selected', 'border-top-left-radius')).toBe('20px');
  });

  it('lets an icon read the size set on a wrapper', async () => {
    expect(await computed('icon', 'width')).toBe('40px');
  });

  it('lets the image-card caption read the border width set on the card', async () => {
    expect(await computed('caption', 'border-top-width')).toBe('7px');
  });

  it('lets an input-group prefix read the border color set on the group', async () => {
    expect(await computed('prefix', 'border-right-color')).toBe('rgb(1, 1, 1)');
  });
});
