import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { chromium, type Browser, type Page } from '@playwright/test';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// jsdom can't run the cascade, so these specs render the real stylesheets in
// Chromium. Elements mirror what NbSurface renders: `data-nb-surface` plus the
// inline variables its inputs write (e.g. radius="lg" → var(--nb-radius-lg)).
const css = ['../styles/theme.css', '../styles/tone.css', './nb-surface.css']
  .map((path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))
  .join('\n');

const html = `
  <style>
    @layer base, components, utilities;
    ${css}
    /* Stand-ins for a Tailwind utility and a consumer rule. */
    @layer utilities { .rounded-none { border-radius: 0; } }
    .pricing [data-nb-surface] { --nb-surface-radius: 20px; }
    :root { --nb-motion-fast: 0s; }
  </style>

  <div id="with-inputs" data-nb-surface
       style="--nb-surface-padding: var(--nb-padding-xl); --nb-surface-radius: var(--nb-radius-lg);
              --nb-surface-shadow: none; --nb-surface-border-width: var(--nb-border-width-thick)">
    <div id="nested" data-nb-surface></div>
  </div>

  <section style="--nb-surface-radius: 30px">
    <div id="parent-variable" data-nb-surface></div>
  </section>

  <section class="pricing">
    <div id="selected" data-nb-surface></div>
    <div id="selected-with-input" data-nb-surface style="--nb-surface-radius: var(--nb-radius-lg)"></div>
  </section>

  <section style="--nb-radius: 8px">
    <div id="theme-token" data-nb-surface></div>
  </section>

  <div id="utility" data-nb-surface class="rounded-none" style="--nb-surface-radius: var(--nb-radius-lg)"></div>

  <section style="--nb-surface-shadow: 9px 9px 0 0 red">
    <div id="shadow-none-input" data-nb-surface style="--nb-surface-shadow: none"></div>
    <div id="shadow-default" data-nb-surface></div>
  </section>

  <a id="interactive" data-nb-surface data-interactive style="--nb-surface-shadow: none">tile</a>
`;

const DEFAULT_SHADOW = 'rgb(0, 0, 0) 4px 4px 0px 0px';

describe('nb-surface CSS contract (Chromium)', () => {
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

  it('applies inputs to the element that sets them', async () => {
    expect(await computed('with-inputs', 'padding-top')).toBe('32px');
    expect(await computed('with-inputs', 'border-top-left-radius')).toBe('12px');
    expect(await computed('with-inputs', 'box-shadow')).toBe('none');
    expect(await computed('with-inputs', 'border-top-width')).toBe('4px');
  });

  it('does not leak inputs into a nested surface', async () => {
    expect(await computed('nested', 'padding-top')).toBe('0px');
    expect(await computed('nested', 'border-top-left-radius')).toBe('0px');
    expect(await computed('nested', 'box-shadow')).toBe(DEFAULT_SHADOW);
    expect(await computed('nested', 'border-top-width')).toBe('2px');
  });

  it('ignores a component variable set on a parent element', async () => {
    expect(await computed('parent-variable', 'border-top-left-radius')).toBe('0px');
  });

  it('applies a component variable set by selecting the surface', async () => {
    expect(await computed('selected', 'border-top-left-radius')).toBe('20px');
  });

  it('lets an input beat a rule that selects the surface', async () => {
    expect(await computed('selected-with-input', 'border-top-left-radius')).toBe('12px');
  });

  it('follows theme tokens set on a section', async () => {
    expect(await computed('theme-token', 'border-top-left-radius')).toBe('8px');
  });

  it('lets a utility class beat an input', async () => {
    expect(await computed('utility', 'border-top-left-radius')).toBe('0px');
  });

  it('keeps a shadow input over a parent shadow variable', async () => {
    expect(await computed('shadow-none-input', 'box-shadow')).toBe('none');
    expect(await computed('shadow-default', 'box-shadow')).toBe(DEFAULT_SHADOW);
  });

  it('still lets the interactive hover state replace the shadow', async () => {
    await page.hover('#interactive');

    expect(await computed('interactive', 'box-shadow')).toBe('rgb(0, 0, 0) 6px 6px 0px 0px');
  });
});
