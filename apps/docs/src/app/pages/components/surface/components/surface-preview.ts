import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSurface } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-surface-preview',
  imports: [NbSurface, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <article
          nbSurface
          tone="yellow"
          radius="xl"
          border="thick"
          shadow="heavy"
          clip
          class="w-full max-w-md"
        >
          <div
            class="border-b-2 border-(--nb-border) bg-nb-primary px-5 py-3 text-nb-primary-fg"
          >
            <p class="font-mono text-xs font-black uppercase">Launch deck</p>
          </div>
          <div class="p-5">
            <h3 class="text-2xl font-black">Ship the loud version</h3>
            <p class="mt-2 text-sm font-medium">
              Surface gives custom layouts the same brutalist frame as the
              core components.
            </p>
          </div>
        </article>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfacePreview {
  protected readonly defaultExampleCode = `<article
  nbSurface
  tone="yellow"
  radius="xl"
  border="thick"
  shadow="heavy"
  clip
  class="max-w-md"
>
  <div class="border-b-2 border-(--nb-border) bg-nb-primary px-5 py-3">
    <p class="font-mono text-xs font-black uppercase">Launch deck</p>
  </div>
  <div class="p-5">
    <h3>Ship the loud version</h3>
    <p>Surface gives custom layouts the same brutalist frame.</p>
  </div>
</article>`;
}
