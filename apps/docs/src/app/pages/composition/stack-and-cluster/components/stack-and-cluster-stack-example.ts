import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbChip,
  NbChipGroup,
  NbCluster,
  NbDisplay,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-stack-cluster-stack-example',
  imports: [
    DocsExample,
    NbStack,
    NbSurface,
    NbChip,
    NbChipGroup,
    NbCluster,
    NbText,
    NbDisplay,
    NbButton,
  ],
  template: `
    <section id="stack-example" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Stack - vertical card content
      </h2>
      <p class="mb-6 text-base font-medium">
        A job card using Stack to control vertical rhythm between title,
        description, and action.
      </p>

      <docs-example [code]="stackExampleCode">
        <article
          nbSurface
          tone="cream"
          border="strong"
          shadow="heavy"
          radius="xl"
          padding="xl"
          class="w-full max-w-3xl"
          aria-label="Senior Angular Engineer job card"
        >
          <div
            nbStack
            gap="lg"
            align="start"
            class="w-full"
            style="--nb-display-size-sm: clamp(2.5rem, 7vw, 4rem)"
          >
            <h2
              nbDisplay
              size="sm"
              underline="bar"
              underlineGap="xs"
              class="inline-flex flex-col items-start"
              style="--nb-underline-width: 62%"
            >
              Senior Angular Engineer
            </h2>

            <p nbText size="2xl" tone="muted">Build loud UI primitives.</p>

            <div nbChipGroup gap="sm" radius="none" shadow="md" class="pt-2">
              <span nbChip tone="yellow" size="lg">Remote</span>
              <span nbChip tone="mint" size="lg">Full-time</span>
              <span nbChip tone="pink" size="lg">Urgent</span>
            </div>

            <div nbCluster gap="md" class="pt-2">
              <button nbButton tone="inverse" size="lg">Apply</button>
              <button nbButton tone="surface" size="lg">Save</button>
            </div>
          </div>
        </article>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionStackClusterStackExample {
  protected readonly stackExampleCode = `<article nbSurface tone="cream" border="strong" shadow="heavy" radius="xl" padding="xl" aria-label="Senior Angular Engineer job card">
  <div nbStack gap="lg" align="start">
    <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 62%">Senior Angular Engineer</h2>
    <p nbText size="2xl" tone="muted">Build loud UI primitives.</p>

    <div nbChipGroup gap="sm" radius="none" shadow="md">
      <span nbChip tone="yellow" size="lg">Remote</span>
      <span nbChip tone="mint" size="lg">Full-time</span>
      <span nbChip tone="pink" size="lg">Urgent</span>
    </div>

    <div nbCluster gap="md">
      <button nbButton tone="inverse" size="lg">Apply</button>
      <button nbButton tone="surface" size="lg">Save</button>
    </div>
  </div>
</article>`;
}
