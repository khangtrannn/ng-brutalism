import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-halftone-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Place <code class="font-mono">&lt;div nbHalftone&gt;</code> inside a
        <code class="font-mono">relative overflow-hidden</code> container.
        Position it with Tailwind classes (<code class="font-mono"
          >absolute</code
        >, <code class="font-mono">top-*</code>,
        <code class="font-mono">right-*</code>, etc). The component is
        decorative (<code class="font-mono">aria-hidden="true"</code>).
      </p>
      <docs-code-block
        class="block mb-5"
        title="Import"
        [code]="importCode"
      />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalftoneUsage {
  protected readonly importCode = `import { NbHalftone } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div
  class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
  style="min-height: 140px;"
>
  <div nbHalftone class="absolute bottom-0 right-0"></div>
  <p class="font-bold text-lg">Card with halftone</p>
  <p class="font-medium text-sm mt-1">Dot grid anchors to the bottom-right corner.</p>
</div>`;
}
