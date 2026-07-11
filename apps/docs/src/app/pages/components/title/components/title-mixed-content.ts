import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTitle } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-title-mixed-content',
  imports: [NbTitle, DocsExample],
  template: `
    <section id="mixed-content">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Mixed Content
      </h2>
      <docs-example [code]="mixedContentExampleCode">
        <div
          class="max-w-xl border-2 border-(--nb-border) bg-nb-surface p-6 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <p
            class="mb-3 inline-block border-2 border-(--nb-border) bg-nb-secondary px-3 py-1 font-mono text-xs font-black uppercase"
          >
            Release notes
          </p>
          <h2 nbTitle class="font-mono text-4xl font-black leading-tight">
            Fast primitives, loud defaults
          </h2>
          <p class="mt-5 font-medium">
            Use it with your own typography classes, then tune the underline
            with CSS variables when a title needs more attitude.
          </p>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleMixedContent {
  protected readonly mixedContentExampleCode = `<div class="max-w-xl border-2 border-(--nb-border) bg-nb-surface p-6 shadow-[5px_5px_0_0_var(--nb-shadow)]">
  <p class="mb-3 inline-block border-2 border-(--nb-border) bg-nb-secondary px-3 py-1 font-mono text-xs font-black uppercase">
    Release notes
  </p>
  <h2 nbTitle class="font-mono text-4xl font-black leading-tight">
    Fast primitives, loud defaults
  </h2>
  <p class="mt-5 font-medium">
    Use it with your own typography classes, then tune the underline with CSS variables when a title needs more attitude.
  </p>
</div>`;
}
