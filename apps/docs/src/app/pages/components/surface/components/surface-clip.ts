import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSurface } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-surface-clip',
  imports: [NbSurface, DocsExample],
  template: `
    <section id="clip">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Clip</h2>
      <p class="mb-4 font-medium">
        Use the boolean <code class="font-mono">clip</code> input when a surface
        has colored bands, media, or decorative children that should respect the
        surface radius.
      </p>
      <docs-example [code]="clipExampleCode">
        <article
          nbSurface
          tone="white"
          radius="xl"
          shadow="hard"
          clip
          class="relative w-full max-w-sm"
        >
          <div class="relative h-44 bg-(--nb-blue) text-white">
            <div
              class="absolute -right-10 -top-10 size-28 rounded-full border-2 border-(--nb-border) bg-(--nb-yellow)"
              aria-hidden="true"
            ></div>
            <div
              class="absolute -left-12 bottom-8 h-10 w-44 rotate-[-14deg] border-2 border-(--nb-border) bg-(--nb-primary)"
              aria-hidden="true"
            ></div>
          </div>
          <div class="p-5">
            <p class="text-sm font-black uppercase">Corners hold</p>
            <p class="mt-2 text-sm font-medium">
              Decorative children stay inside the surface radius.
            </p>
          </div>
        </article>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceClip {
  protected readonly clipExampleCode = `<article nbSurface radius="xl" clip class="relative">
  <div class="relative h-44 bg-(--nb-blue)">
    <div class="absolute -right-10 -top-10 size-28 rounded-full bg-(--nb-yellow)"></div>
    <div class="absolute -left-12 bottom-8 h-10 w-44 rotate-[-14deg] bg-(--nb-primary)"></div>
  </div>
  <div class="p-5">Decorative children stay inside the surface radius.</div>
</article>`;
}
