import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCluster,
  NbSplit,
  NbStack,
  NbSurface,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-split-composition',
  imports: [NbButton, NbCluster, NbSplit, NbStack, NbSurface, DocsExample],
  template: `
    <section id="composition">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Composition
      </h2>
      <docs-example [code]="compositionExampleCode">
        <div
          nbSurface
          tone="cream"
          shadow="hard"
          radius="lg"
          class="w-full max-w-3xl"
        >
          <div nbSplit ratio="2:1" gap="xl" padding="lg" collapse="md">
            <div nbStack gap="lg">
              <div nbCluster gap="sm">
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-1 font-mono text-xs font-black uppercase"
                  >Course</span
                >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-1 font-mono text-xs font-black uppercase"
                  >Intermediate</span
                >
              </div>

              <div nbStack gap="sm">
                <h3 class="mb-0 text-3xl font-black">Design Systems Sprint</h3>
                <p class="max-w-lg font-medium">
                  Stack and Cluster handle local rhythm. Split handles the
                  larger main-and-aside card structure.
                </p>
              </div>
            </div>

            <div nbStack gap="md" align="start">
              <span
                class="border-2 border-(--nb-border) bg-(--nb-yellow) px-4 py-2 font-black shadow-[4px_4px_0_0_var(--nb-shadow)]"
                >12 seats</span
              >
              <button nbButton>Enroll</button>
            </div>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitComposition {
  protected readonly compositionExampleCode = `<div nbSplit ratio="2:1" gap="xl" padding="lg" collapse="md">
  <div nbStack gap="lg">
    ...
  </div>

  <div nbStack gap="md" align="start">
    ...
  </div>
</div>`;
}
