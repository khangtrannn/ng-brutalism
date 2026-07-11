import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbChip,
  NbCluster,
  NbDisplay,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-stack-cluster-combined-example',
  imports: [
    DocsExample,
    NbSurface,
    NbStack,
    NbCluster,
    NbButton,
    NbChip,
    NbText,
    NbDisplay,
  ],
  template: `
    <section id="combined-example" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Combined inside a Surface
      </h2>
      <p class="mb-6 text-base font-medium">
        Stack and Cluster working together inside a Surface. The outer Stack
        controls top-level spacing; the inner Clusters handle inline groups.
      </p>

      <docs-example [code]="combinedCode">
        <article
          nbSurface
          tone="cream"
          padding="lg"
          radius="xl"
          shadow="hard"
          border="strong"
          class="w-full max-w-md"
        >
          <div nbStack gap="lg">
            <div nbStack gap="xs">
              <h2
                nbDisplay
                size="sm"
                underline="bar"
                underlineGap="xs"
                class="inline-flex flex-col items-start"
                style="--nb-underline-width: 45%"
              >
                Senior Angular Engineer
              </h2>
              <p nbText tone="muted">Build loud UI primitives.</p>
            </div>

            <div nbCluster gap="xs">
              <span nbChip tone="yellow">Remote</span>
              <span nbChip tone="mint">Full-time</span>
              <span nbChip tone="pink">Urgent</span>
            </div>

            <div nbCluster gap="sm">
              <button nbButton tone="black">Apply</button>
              <button nbButton tone="white">Save</button>
            </div>
          </div>
        </article>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionStackClusterCombinedExample {
  protected readonly combinedCode = `<article nbSurface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong">
  <div nbStack gap="lg">
    <div nbStack gap="xs">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Senior Angular Engineer</h2>
      <p nbText tone="muted">Build loud UI primitives.</p>
    </div>

    <div nbCluster gap="xs">
      <span nbChip tone="yellow">Remote</span>
      <span nbChip tone="mint">Full-time</span>
      <span nbChip tone="pink">Urgent</span>
    </div>

    <div nbCluster gap="sm">
      <button nbButton tone="black">Apply</button>
      <button nbButton tone="white">Save</button>
    </div>
  </div>
</article>`;
}
