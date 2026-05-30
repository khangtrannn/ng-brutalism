import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSticker, NbStickerFace } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-sticker-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    NbSticker,
    NbStickerFace,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Sticker</p>
          <h1>Sticker</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            SVG-backed callout stickers for launches, cards, badges, and
            decorative bursts. The component auto-scales text inside jagged
            sticker shapes and includes a small face primitive for the star
            sticker.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Shapes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">10</span>
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
          <div class="flex flex-wrap items-center justify-center gap-9 p-8">
            <nb-sticker shape="burst" tone="mint" [rotate]="-8">
              GROW<br>YOUR<br>SELF
            </nb-sticker>
            <nb-sticker shape="burst-wide" tone="yellow" [rotate]="5">
              LIMITED<br />
              DROP
            </nb-sticker>
            <nb-sticker shape="star" tone="pink" aria-label="Happy sticker">
              <nb-sticker-face />
            </nb-sticker>
            <nb-sticker shape="splat" tone="blue" decorative />
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="shapes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Shapes</h2>
        <docs-example [code]="shapesExampleCode">
          <div class="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 p-8">
            <div class="flex flex-col items-center gap-4">
              <nb-sticker shape="burst" tone="mint">BURST</nb-sticker>
              <span class="font-mono text-xs font-bold">burst</span>
            </div>
            <div class="flex flex-col items-center gap-4">
              <nb-sticker shape="burst-wide" tone="yellow">WIDE</nb-sticker>
              <span class="font-mono text-xs font-bold">burst-wide</span>
            </div>
            <div class="flex flex-col items-center gap-4">
              <nb-sticker shape="star" tone="pink" aria-label="Face sticker">
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">star</span>
            </div>
            <div class="flex flex-col items-center gap-4">
              <nb-sticker shape="splat" tone="blue" decorative />
              <span class="font-mono text-xs font-bold">splat</span>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="tones">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
        <docs-example [code]="tonesExampleCode">
          <div class="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-5">
            <div class="flex flex-col items-center gap-2">
              <nb-sticker
                class="sticker-tone-face"
                shape="star"
                aria-label="Default tone smiling sticker"
              >
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">default</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <nb-sticker
                class="sticker-tone-face"
                shape="star"
                tone="yellow"
                aria-label="Yellow smiling sticker"
              >
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">yellow</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <nb-sticker
                class="sticker-tone-face"
                shape="star"
                tone="pink"
                aria-label="Pink smiling sticker"
              >
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">pink</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <nb-sticker
                class="sticker-tone-face"
                shape="star"
                tone="mint"
                aria-label="Mint smiling sticker"
              >
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">mint</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <nb-sticker
                class="sticker-tone-face"
                shape="star"
                tone="lavender"
                aria-label="Lavender smiling sticker"
              >
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">lavender</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <nb-sticker
                class="sticker-tone-face"
                shape="star"
                tone="blue"
                aria-label="Blue smiling sticker"
              >
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">blue</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <nb-sticker
                class="sticker-tone-face"
                shape="star"
                tone="accent"
                aria-label="Accent smiling sticker"
              >
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">accent</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <nb-sticker
                class="sticker-tone-face"
                shape="star"
                tone="success"
                aria-label="Success smiling sticker"
              >
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">success</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <nb-sticker
                class="sticker-tone-face"
                shape="star"
                tone="warning"
                aria-label="Warning smiling sticker"
              >
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">warning</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <nb-sticker
                class="sticker-tone-face"
                shape="star"
                tone="danger"
                aria-label="Danger smiling sticker"
              >
                <nb-sticker-face />
              </nb-sticker>
              <span class="font-mono text-xs font-bold">danger</span>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="rotate">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Rotation
        </h2>
        <docs-example [code]="rotateExampleCode">
          <div class="flex flex-wrap items-center gap-8 p-6">
            <nb-sticker tone="yellow" [rotate]="-12">-12</nb-sticker>
            <nb-sticker tone="pink" [rotate]="0">0</nb-sticker>
            <nb-sticker tone="mint" [rotate]="12">+12</nb-sticker>
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
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Input
                </th>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Type
                </th>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Default
                </th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  shape
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'burst' | 'burst-wide' | 'star' | 'splat'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'burst'
                </td>
                <td class="px-4 py-3">Outer SVG shape.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  tone
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'default' | 'cream' | 'white' | 'black' | 'yellow' | 'pink'
                  | 'mint' | 'lavender' | 'blue' | 'primary' | 'secondary' |
                  'accent' | 'success' | 'warning' | 'danger'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'mint'
                </td>
                <td class="px-4 py-3">Background fill token.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  decorative
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  boolean
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  false
                </td>
                <td class="px-4 py-3">
                  Marks purely visual stickers as hidden from assistive tech.
                </td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  rotate
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  number | undefined
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  shape default
                </td>
                <td class="px-4 py-3">Optional CSS rotation in degrees.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  styles: [
    `
      nb-sticker.sticker-tone-face {
        --nb-sticker-min-inline-size: 7.25rem;
        --nb-sticker-min-block-size: 6.25rem;
        --nb-sticker-max-inline-size: 7.75rem;
        --nb-sticker-max-block-size: 6.75rem;
        --nb-sticker-padding-inline: 2.35rem;
        --nb-sticker-padding-block: 2.15rem;
        --nb-sticker-content-max-inline-size: 58%;
        --nb-sticker-face-size: 2.8rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StickerPage {
  protected readonly importCode = `import { NbSticker, NbStickerFace } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-sticker shape="burst" tone="mint" [rotate]="-8">
  NEW<br />
  JOB!
</nb-sticker>
<nb-sticker shape="burst-wide" tone="yellow" [rotate]="5">
  LIMITED<br />
  DROP
</nb-sticker>
<nb-sticker shape="star" tone="pink" aria-label="Happy sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker shape="splat" tone="blue" decorative />`;

  protected readonly shapesExampleCode = `<nb-sticker shape="burst" tone="mint">BURST</nb-sticker>
<nb-sticker shape="burst-wide" tone="yellow">WIDE</nb-sticker>
<nb-sticker shape="star" tone="pink" aria-label="Face sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker shape="splat" tone="blue" decorative />`;

  protected readonly tonesExampleCode = `<nb-sticker class="sticker-tone-face" shape="star" aria-label="Default tone smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="yellow" aria-label="Yellow smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="pink" aria-label="Pink smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="mint" aria-label="Mint smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="lavender" aria-label="Lavender smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="blue" aria-label="Blue smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="accent" aria-label="Accent smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="success" aria-label="Success smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="warning" aria-label="Warning smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="danger" aria-label="Danger smiling sticker">
  <nb-sticker-face />
</nb-sticker>`;

  protected readonly rotateExampleCode = `<nb-sticker tone="yellow" [rotate]="-12">-12</nb-sticker>
<nb-sticker tone="pink" [rotate]="0">0</nb-sticker>
<nb-sticker tone="mint" [rotate]="12">+12</nb-sticker>`;
}
