import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbImageCard } from '@ng-neo-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-image-card-page',
  standalone: true,
  imports: [
    DocsCodeBlockComponent,
    DocsExampleComponent,
    NbButton,
    NbImageCard,
  ],
  template: `
    <article>
      <header id="overview" class="mb-8 scroll-mt-32">
        <div class="mb-4">
          <p class="mb-2 text-sm font-bold uppercase tracking-wide">
            Components
          </p>
          <h1 class="text-4xl font-black tracking-tight">Image Card</h1>
          <p class="mt-2 max-w-3xl text-base font-medium sm:text-lg">
            A card component optimized for displaying images with captions.
          </p>
        </div>

        <a
          nbButton
          size="sm"
          variant="neutral"
          href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/image-card"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <neo-image-card
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
          <neo-image-card
            class="w-full max-w-sm"
            [image]="previewImage"
            alt="Flowers, trees and bushes reaching peak full bloom"
          />
        </docs-example>
      </section>

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageCardPageComponent {
  protected readonly previewImage =
    'https://hips.hearstapps.com/hmg-prod/images/flowers-trees-and-bushes-reach-their-peak-of-full-bloom-in-news-photo-1678292967.jpg?resize=300:*';

  protected readonly importCode = `import { NbImageCard } from '@ng-neo-brutalism/ui';`;

  protected readonly templateCode = `<neo-image-card
  [image]="imageUrl"
  alt="A descriptive alt text"
  caption="Image"
/>`;

  protected readonly defaultExampleCode = `<neo-image-card
  class="w-full max-w-sm"
  image="https://hips.hearstapps.com/.../flowers.jpg"
  alt="Flowers, trees and bushes reaching peak full bloom"
  caption="Image"
/>`;

  protected readonly imageOnlyExampleCode = `<neo-image-card
  class="w-full max-w-sm"
  image="https://hips.hearstapps.com/.../flowers.jpg"
  alt="Flowers, trees and bushes reaching peak full bloom"
/>`;
}
