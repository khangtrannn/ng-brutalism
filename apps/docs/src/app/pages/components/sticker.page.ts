import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSticker } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-sticker-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, NbSticker],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Sticker</p>
          <h1>Sticker</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A decorative component for callouts, badges, and badges. Three shapes —
            <strong>stamp</strong>, <strong>burst</strong>, and <strong>pill</strong> — and
            9 tones let you highlight prices, statuses, and limited offers without leaving
            the brutalist aesthetic.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Shapes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">9</span>
            <span class="nb-stat-tile__label">Tones</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/sticker"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="flex flex-wrap items-center gap-6 p-6">
            <nb-sticker tone="yellow" [rotate]="-8">
              NEW
            </nb-sticker>
            <nb-sticker shape="burst" tone="pink" [rotate]="6">
              HOT
            </nb-sticker>
            <nb-sticker shape="pill" tone="mint">
              LIMITED
            </nb-sticker>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="shapes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Shapes</h2>
        <docs-example [code]="shapesExampleCode">
          <div class="flex flex-wrap items-center gap-8 p-6">
            <div class="flex flex-col items-center gap-3">
              <nb-sticker shape="stamp" tone="yellow">STAMP</nb-sticker>
              <span class="font-mono text-xs font-bold">stamp</span>
            </div>
            <div class="flex flex-col items-center gap-3">
              <nb-sticker shape="burst" tone="pink">BURST</nb-sticker>
              <span class="font-mono text-xs font-bold">burst</span>
            </div>
            <div class="flex flex-col items-center gap-3">
              <nb-sticker shape="pill" tone="mint">PILL</nb-sticker>
              <span class="font-mono text-xs font-bold">pill</span>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="tones">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
        <docs-example [code]="tonesExampleCode">
          <div class="flex flex-wrap items-center gap-4 p-6">
            <nb-sticker shape="pill">default</nb-sticker>
            <nb-sticker shape="pill" tone="yellow">yellow</nb-sticker>
            <nb-sticker shape="pill" tone="pink">pink</nb-sticker>
            <nb-sticker shape="pill" tone="mint">mint</nb-sticker>
            <nb-sticker shape="pill" tone="lavender">lavender</nb-sticker>
            <nb-sticker shape="pill" tone="accent">accent</nb-sticker>
            <nb-sticker shape="pill" tone="success">success</nb-sticker>
            <nb-sticker shape="pill" tone="warning">warning</nb-sticker>
            <nb-sticker shape="pill" tone="danger">danger</nb-sticker>
          </div>
        </docs-example>
      </section>

      <section id="rotate">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Rotation</h2>
        <p class="mb-4 font-medium">
          Pass a <code class="font-mono">[rotate]</code> angle in degrees to tilt the sticker — a
          small rotation gives cards a handcrafted feel.
        </p>
        <docs-example [code]="rotateExampleCode">
          <div class="flex flex-wrap items-center gap-8 p-6">
            <nb-sticker tone="yellow" [rotate]="-12">-12°</nb-sticker>
            <nb-sticker tone="pink" [rotate]="0">0°</nb-sticker>
            <nb-sticker tone="mint" [rotate]="12">+12°</nb-sticker>
          </div>
        </docs-example>
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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'stamp' | 'burst' | 'pill'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'stamp'</td>
                <td class="px-4 py-3">Outer shape of the sticker.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">tone</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'accent' | 'success' | 'warning' | 'danger'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'yellow'</td>
                <td class="px-4 py-3">Background fill color.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">rotate</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">0</td>
                <td class="px-4 py-3">CSS rotation in degrees.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StickerPage {
  protected readonly importCode = `import { NbSticker } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-sticker tone="yellow" [rotate]="-8">NEW</nb-sticker>
<nb-sticker shape="burst" tone="pink" [rotate]="6">HOT</nb-sticker>
<nb-sticker shape="pill" tone="mint">LIMITED</nb-sticker>`;

  protected readonly shapesExampleCode = `<nb-sticker shape="stamp" tone="yellow">STAMP</nb-sticker>
<nb-sticker shape="burst" tone="pink">BURST</nb-sticker>
<nb-sticker shape="pill" tone="mint">PILL</nb-sticker>`;

  protected readonly tonesExampleCode = `<nb-sticker shape="pill">default</nb-sticker>
<nb-sticker shape="pill" tone="yellow">yellow</nb-sticker>
<nb-sticker shape="pill" tone="pink">pink</nb-sticker>
<nb-sticker shape="pill" tone="mint">mint</nb-sticker>
<nb-sticker shape="pill" tone="lavender">lavender</nb-sticker>
<nb-sticker shape="pill" tone="accent">accent</nb-sticker>
<nb-sticker shape="pill" tone="success">success</nb-sticker>
<nb-sticker shape="pill" tone="warning">warning</nb-sticker>
<nb-sticker shape="pill" tone="danger">danger</nb-sticker>`;

  protected readonly rotateExampleCode = `<nb-sticker tone="yellow" [rotate]="-12">-12°</nb-sticker>
<nb-sticker tone="pink" [rotate]="0">0°</nb-sticker>
<nb-sticker tone="mint" [rotate]="12">+12°</nb-sticker>`;
}
