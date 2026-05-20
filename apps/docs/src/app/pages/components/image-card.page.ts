import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbImageCard } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
    selector: 'docs-image-card-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsSourceTile,
        DocsTokens,
        NbImageCard,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Image Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A card component optimized for displaying images with captions.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Inputs</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">A11y</span>
            <span class="nb-stat-tile__label">Alt + caption</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">IMG</span>
            <span class="nb-stat-tile__label">Optimized</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/image-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <nb-image-card
            class="w-full max-w-sm"
            [image]="previewImage"
            alt="Flowers, trees and bushes reaching peak full bloom"
            caption="Image"
          />
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="templateCode" />
      </section>

      <section id="image-only">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Image only</h2>
        <p class="mb-4 text-sm font-medium">
          When <code class="font-mono">caption</code> is omitted, the caption
          strip is not rendered.
        </p>
        <docs-example [code]="imageOnlyExampleCode">
          <nb-image-card
            class="w-full max-w-sm"
            [image]="previewImage"
            alt="Flowers, trees and bushes reaching peak full bloom"
          />
        </docs-example>
      </section>

      <docs-tokens component="image-card" />

      <section id="api">
        <h2 class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
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
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  image
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  string (required)
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 text-sm"
                >
                  URL of the image to render.
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  alt
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  string (required)
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 text-sm"
                >
                  Alternative text for the image.
                </td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  caption
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  string
                </td>
                <td class="px-4 py-3 text-sm">
                  Caption text rendered below the image. When empty, the
                  caption strip is omitted.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ImageCardPageComponent {
  protected readonly previewImage =
    'https://hips.hearstapps.com/hmg-prod/images/flowers-trees-and-bushes-reach-their-peak-of-full-bloom-in-news-photo-1678292967.jpg?resize=300:*';

  protected readonly importCode = `import { NbImageCard } from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<nb-image-card
  [image]="imageUrl"
  alt="A descriptive alt text"
  caption="Image"
/>`;

  protected readonly defaultExampleCode = `<nb-image-card
  class="w-full max-w-sm"
  image="https://hips.hearstapps.com/.../flowers.jpg"
  alt="Flowers, trees and bushes reaching peak full bloom"
  caption="Image"
/>`;

  protected readonly imageOnlyExampleCode = `<nb-image-card
  class="w-full max-w-sm"
  image="https://hips.hearstapps.com/.../flowers.jpg"
  alt="Flowers, trees and bushes reaching peak full bloom"
/>`;
}
