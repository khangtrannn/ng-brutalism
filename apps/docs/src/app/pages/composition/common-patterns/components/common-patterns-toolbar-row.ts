import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbCluster, NbDisplay } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-common-patterns-toolbar-row',
  imports: [DocsExample, NbCluster, NbButton, NbDisplay],
  template: `
    <section id="toolbar-row" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Toolbar row
      </h2>
      <p class="mb-6 text-base font-medium">
        A heading and action group pushed apart. Use this inside a Surface
        section header or as a standalone toolbar.
      </p>

      <docs-example [code]="toolbarCode">
        <div
          class="w-full max-w-lg border-3 border-(--nb-border) bg-(--nb-paper) p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]"
        >
          <div nbCluster gap="sm" align="center" justify="between">
            <h2
              nbDisplay
              size="sm"
              underline="bar"
              underlineGap="xs"
              class="inline-flex flex-col items-start"
              style="--nb-display-underline-width: 45%"
            >
              Components
            </h2>
            <div nbCluster gap="xs">
              <button nbButton size="sm" tone="white">Copy</button>
              <button nbButton size="sm" tone="black">Open</button>
            </div>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionCommonPatternsToolbarRow {
  protected readonly toolbarCode = `<div nbCluster gap="sm" align="center" justify="between">
  <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-display-underline-width: 45%">Components</h2>

  <div nbCluster gap="xs">
    <button nbButton size="sm" tone="white">Copy</button>
    <button nbButton size="sm" tone="black">Open</button>
  </div>
</div>`;
}
