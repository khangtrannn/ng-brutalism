import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbHalftone } from '@ng-brutalism/ui';

import { DocsCodeBlock, DocsExample, DocsSourceTile, DocsStatusBadge, DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-halftone-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    DocsStatusBadge,
    DocsTokens,
    NbHalftone,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Halftone</p>
          <h1>Halftone</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A decorative dot-grid component that anchors to card corners via absolute
            positioning or renders as a clean rectangular strip. The classic halftone
            pattern borrowed from print design adds depth and texture to brutalist cards
            without cluttering the layout.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <docs-status-badge status="stable" />
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">CSS</span>
            <span class="nb-stat-tile__label">Rectangle strip</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/halftone"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]" style="min-height: 140px;">
            <div nbHalftone class="absolute bottom-0 right-0"></div>
            <p class="font-bold text-lg">Card with halftone</p>
            <p class="font-medium text-sm mt-1">Dot grid anchors to the bottom-right corner.</p>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Place <code class="font-mono">&lt;div nbHalftone&gt;</code> inside a
          <code class="font-mono">relative overflow-hidden</code> container. Position it with
          Tailwind classes (<code class="font-mono">absolute</code>, <code class="font-mono">top-*</code>,
          <code class="font-mono">right-*</code>, etc). The component is decorative
          (<code class="font-mono">aria-hidden="true"</code>).
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="custom-color">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Custom Color & Positioning</h2>
        <docs-example [code]="customColorCode">
          <div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]" style="min-height: 140px;">
            <div nbHalftone color="#ff90e8" class="absolute top-0 right-0"></div>
            <div nbHalftone color="#8ae9ff" class="absolute bottom-0 left-0"></div>
            <p class="font-bold">Custom dot colors</p>
          </div>
        </docs-example>
      </section>

      <section id="rectangle">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Rectangle</h2>
        <p class="mb-4 max-w-3xl font-medium">
          Use rectangle halftone as a decorative strip behind headings, badges, image
          cards, recipe accents, and banner edges. Rows and columns give you a
          predictable dot count, while size and gap inputs tune the visual rhythm.
        </p>

        <docs-example [code]="rectangleExampleCode">
          <div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <div
              nbHalftone
              shape="rectangle"
              [rows]="3"
              [columns]="13"
              class="mb-5"
            ></div>
            <p class="font-bold text-lg">Graphic strip accent</p>
            <p class="font-medium text-sm mt-1">
              A rectangular dot matrix with a predictable 3 by 13 count.
            </p>
          </div>
        </docs-example>

        <docs-example [code]="customRectangleExampleCode">
          <div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <div
              nbHalftone
              shape="rectangle"
              [rows]="3"
              [columns]="13"
              [size]="8"
              [gapX]="28"
              [gapY]="27"
            ></div>
          </div>
        </docs-example>
      </section>

      <docs-tokens component="halftone" />

      <section id="accessibility">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Accessibility</h2>
        <p class="font-medium">
          <strong>APG pattern:</strong> N/A — Halftone is a decorative, presentational dot-grid accent hidden from assistive tech, not an interactive widget. <strong>Status:</strong> Stable.
        </p>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-160 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Input</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Type</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">shape</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'square' | 'circle' | 'rectangle'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'square'</td>
                <td class="px-4 py-3">Visual shape. Rectangle renders a CSS background strip.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">color</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">var(--nb-border)</td>
                <td class="px-4 py-3">Dot fill color (any CSS color value).</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">rows</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">7 / 3 rectangle</td>
                <td class="px-4 py-3">Number of dot rows.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">columns</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">7 / 13 rectangle</td>
                <td class="px-4 py-3">Number of dot columns.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">size</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">6 / 8 rectangle</td>
                <td class="px-4 py-3">Dot diameter in px.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">gap</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">5 / rectangle rhythm</td>
                <td class="px-4 py-3">Gap between dots in px. Rectangle strips use this as both axes unless gapX or gapY is set.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">gapX</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">28 rectangle</td>
                <td class="px-4 py-3">Horizontal rectangle dot rhythm in px.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">gapY</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">27 rectangle</td>
                <td class="px-4 py-3">Vertical rectangle dot rhythm in px.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HalftonePage {
  protected readonly importCode = `import { NbHalftone } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div
  class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
  style="min-height: 140px;"
>
  <div nbHalftone class="absolute bottom-0 right-0"></div>
  <p class="font-bold text-lg">Card with halftone</p>
  <p class="font-medium text-sm mt-1">Dot grid anchors to the bottom-right corner.</p>
</div>`;

  protected readonly customColorCode = `<div
  class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
  style="min-height: 140px;"
>
  <div nbHalftone color="#ff90e8" class="absolute top-0 right-0"></div>
  <div nbHalftone color="#8ae9ff" class="absolute bottom-0 left-0"></div>
  <p class="font-bold">Custom dot colors</p>
</div>`;

  protected readonly rectangleExampleCode = `<div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]">
  <div
    nbHalftone
    shape="rectangle"
    [rows]="3"
    [columns]="13"
    class="mb-5"
  ></div>
  <p class="font-bold text-lg">Graphic strip accent</p>
  <p class="font-medium text-sm mt-1">
    A rectangular dot matrix with a predictable 3 by 13 count.
  </p>
</div>`;

  protected readonly customRectangleExampleCode = `<div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]">
  <div
    nbHalftone
    shape="rectangle"
    [rows]="3"
    [columns]="13"
    [size]="8"
    [gapX]="28"
    [gapY]="27"
  ></div>
</div>`;
}
