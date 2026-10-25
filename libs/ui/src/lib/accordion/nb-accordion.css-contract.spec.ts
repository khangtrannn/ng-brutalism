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
// each engine. Markup mirrors what the accordion components render: tokens
// are declared on `data-nb-accordion`, and item inputs write inline tokens
// on `data-nb-accordion-item`.
const css = ['../styles/theme.css', '../styles/tone.css', './nb-accordion.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const item = (id: string, { item = '', trigger = '', open = true } = {}) => `
  <nb-accordion-item data-nb-accordion-item id="${id}" ${item}>
    <nb-accordion-trigger data-nb-accordion-trigger ${trigger}>
      <h3 data-slot="accordion-trigger-heading">
        <button data-slot="accordion-trigger-button" id="${id}-trigger"
                data-state="${open ? 'open' : 'closed'}" ${trigger}
                ${item.includes('data-disabled') ? 'disabled' : ''}>
          Title
          <svg data-slot="accordion-trigger-icon" id="${id}-icon" viewBox="0 0 24 24"></svg>
        </button>
      </h3>
    </nb-accordion-trigger>
    <nb-accordion-content data-nb-accordion-content>
      <div role="region" id="${id}-region" data-state="${open ? 'open' : 'closed'}">
        <div data-slot="accordion-content-inner">Body</div>
      </div>
    </nb-accordion-content>
  </nb-accordion-item>
`;

const accordion = (id: string, items: string, attrs = '') => `
  <nb-accordion data-nb-accordion id="${id}" ${attrs}>
    <div data-slot="accordion-items" id="${id}-items">${items}</div>
  </nb-accordion>
`;

const html = `
  <style>
    @layer theme, base, components, utilities;
    ${css}
    /* Stand-ins for consumer rules. */
    .selected [data-nb-accordion] { --nb-accordion-item-bg: rgb(1, 2, 3); --nb-accordion-gap: 5px; }
    .part [data-nb-accordion-item] { --nb-accordion-trigger-bg: rgb(255, 255, 0); }
    .bordered [data-nb-accordion-item] { --nb-accordion-item-border-color: rgb(255, 0, 0); }
    .ring [data-nb-accordion] { --nb-accordion-trigger-focus-ring-color: rgb(0, 0, 255); }
    :root { --nb-motion-base: 0s; }
  </style>

  ${accordion('default', item('plain') + item('closed', { open: false }))}

  <section style="--nb-radius-box: 12px; --nb-shadow-box-offset: 2px; --nb-shadow: rgb(0, 0, 255)">
    ${accordion('roles', item('role-item'))}
  </section>
  <section style="--nb-radius-control: 30px; --nb-shadow-control-offset: 9px">
    ${accordion('control', item('control-item'))}
  </section>
  <section style="--nb-accordion-item-bg: rgb(9, 9, 9)">
    ${accordion('wrapper', item('wrapper-item'))}
  </section>

  <section class="selected">${accordion('selected', item('selected-item') + item('selected-tone', { item: 'data-nb-tone="pink"' }))}</section>
  <section class="part">${accordion('part', item('part-item'))}</section>
  <section class="bordered">${accordion('bordered', item('bordered-item'))}</section>
  <section class="ring">${accordion('ring', item('ring-item'))}</section>

  ${accordion('inputs', item('input-item', {
    item: 'data-nb-tone="cream" style="--nb-accordion-item-border-width: var(--nb-border-width-strong); --nb-accordion-item-radius: var(--nb-radius-lg)"',
  }) + item('sibling'))}
  ${accordion('trigger-tone', item('toned', { trigger: 'data-nb-tone="yellow"' }))}
  ${accordion('disabled', item('off', { item: 'data-disabled', open: false }))}

  ${accordion('outer', `
    <nb-accordion-item data-nb-accordion-item id="outer-item" style="--nb-accordion-item-radius: 20px">
      <nb-accordion-content data-nb-accordion-content>
        <div role="region" data-state="open"><div data-slot="accordion-content-inner">
          ${accordion('inner', item('inner-item'))}
        </div></div>
      </nb-accordion-content>
    </nb-accordion-item>
  `)}
`;

const SURFACE = 'rgb(255, 255, 255)';
const TRANSPARENT = 'rgba(0, 0, 0, 0)';
const DEFAULT_SHADOW = 'rgb(0, 0, 0) 4px 4px 0px 0px';

const engines: Array<[string, BrowserType]> = [
  ['Chromium', chromium],
  ['Firefox', firefox],
  ['WebKit', webkit],
];

describe.each(engines)('nb-accordion CSS contract (%s)', (_name, engine) => {
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

  // Keyboard focus, so :focus-visible matches in every engine.
  const focus = async (id: string) => {
    await page.focus(`#${id}`);
    await page.keyboard.press('Shift');
  };

  it('renders the default theme look', async () => {
    expect(await computed('default-items', 'row-gap')).toBe('12px');
    expect(await computed('plain', 'background-color')).toBe(SURFACE);
    expect(await computed('plain', 'border-top-width')).toBe('2px');
    expect(await computed('plain', 'border-top-left-radius')).toBe('0px');
    expect(await computed('plain', 'box-shadow')).toBe(DEFAULT_SHADOW);
    expect(await computed('plain-trigger', 'background-color')).toBe(TRANSPARENT);
    expect(await computed('plain-trigger', 'min-height')).toBe('56px');
    expect(await computed('plain-icon', 'width')).toBe('24px');
  });

  it('draws the divider only under an open trigger', async () => {
    expect(await computed('plain-trigger', 'border-bottom-width')).toBe('2px');
    expect(await computed('plain-trigger', 'border-bottom-color')).toBe('rgb(0, 0, 0)');
    expect(await computed('closed-trigger', 'border-bottom-width')).toBe('0px');
  });

  it('follows the box roles set on a section', async () => {
    expect(await computed('role-item', 'border-top-left-radius')).toBe('12px');
    expect(await computed('role-item', 'box-shadow')).toBe('rgb(0, 0, 255) 2px 2px 0px 0px');
  });

  it('ignores the control roles', async () => {
    expect(await computed('control-item', 'border-top-left-radius')).toBe('0px');
    expect(await computed('control-item', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('ignores an accordion token set on a wrapper', async () => {
    expect(await computed('wrapper-item', 'background-color')).toBe(SURFACE);
  });

  it('applies tokens set by selecting the accordion', async () => {
    expect(await computed('selected-items', 'row-gap')).toBe('5px');
    expect(await computed('selected-item', 'background-color')).toBe('rgb(1, 2, 3)');
  });

  it('lets an item tone beat a component-wide color', async () => {
    expect(await computed('selected-tone', 'background-color')).toBe('rgb(255, 126, 182)');
  });

  it('lets a part token set on an item reach its part', async () => {
    expect(await computed('part-item-trigger', 'background-color')).toBe('rgb(255, 255, 0)');
  });

  it('keeps an item border override on its divider and focus ring', async () => {
    expect(await computed('bordered-item', 'border-top-color')).toBe('rgb(255, 0, 0)');
    expect(await computed('bordered-item-trigger', 'border-bottom-color')).toBe('rgb(255, 0, 0)');
    await focus('bordered-item-trigger');
    expect(await computed('bordered-item-trigger', 'outline-color')).toBe('rgb(255, 0, 0)');
  });

  it('applies item inputs to that item and its divider only', async () => {
    expect(await computed('input-item', 'background-color')).toBe('rgb(250, 246, 240)');
    expect(await computed('input-item', 'border-top-width')).toBe('3px');
    expect(await computed('input-item', 'border-top-left-radius')).toBe('12px');
    expect(await computed('input-item-trigger', 'border-bottom-width')).toBe('3px');
    expect(await computed('sibling', 'border-top-width')).toBe('2px');
    expect(await computed('sibling', 'border-top-left-radius')).toBe('0px');
  });

  it('paints a trigger tone on the trigger only', async () => {
    expect(await computed('toned-trigger', 'background-color')).toBe('rgb(255, 210, 74)');
    expect(await computed('toned', 'background-color')).toBe(SURFACE);
    expect(await computed('toned-region', 'background-color')).toBe(TRANSPARENT);
  });

  it('draws the focus ring from the item border, or its own token', async () => {
    await focus('plain-trigger');
    expect(await computed('plain-trigger', 'outline-style')).toBe('solid');
    expect(await computed('plain-trigger', 'outline-width')).toBe('2px');
    expect(await computed('plain-trigger', 'outline-color')).toBe('rgb(0, 0, 0)');
    expect(await computed('plain-trigger', 'outline-offset')).toBe('2px');
    await focus('ring-item-trigger');
    expect(await computed('ring-item-trigger', 'outline-color')).toBe('rgb(0, 0, 255)');
  });

  it('dims a disabled item', async () => {
    expect(await computed('off', 'opacity')).toBe('0.5');
    expect(await computed('off-trigger', 'opacity')).toBe('0.5');
  });

  it('does not leak an item input into a nested accordion', async () => {
    expect(await computed('outer-item', 'border-top-left-radius')).toBe('20px');
    expect(await computed('inner-item', 'border-top-left-radius')).toBe('0px');
  });
});
