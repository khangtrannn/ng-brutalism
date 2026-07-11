import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCallout,
  NbChip,
  NbCluster,
  NbDisplay,
  NbSection,
  NbStack,
  NbSurface,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-section-composition',
  imports: [
    NbButton,
    NbCallout,
    NbChip,
    NbCluster,
    NbDisplay,
    NbSection,
    NbStack,
    NbSurface,
    DocsExample,
  ],
  template: `
    <section id="composition">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Composition
      </h2>
      <p class="mb-4 font-medium">
        Section pairs naturally with Surface (the outer shell) and Stack /
        Cluster (the inner rhythm). The mental model is:
        <code class="font-mono">Surface</code> owns the card,
        <code class="font-mono">Section</code> owns each region inside it.
      </p>
      <docs-example [code]="compositionExampleCode">
        <div
          nbSurface
          tone="white"
          shadow="hard"
          radius="lg"
          clip
          class="w-full max-w-2xl"
        >
          <div
            nbSection
            padding="lg"
            divider="bottom"
            layout="between"
            align="center"
            class="bg-(--nb-cream)"
          >
            <div nbStack gap="xs">
              <span class="font-mono text-xs font-black uppercase">
                Pro plan
              </span>
              <h2 nbDisplay class="[--nb-display-size:2rem]">
                Design Sprint
              </h2>
            </div>
            <span nbChip tone="lavender">Annual</span>
          </div>

          <div nbSection padding="lg">
            <div nbStack gap="md">
              <p class="max-w-lg font-medium">
                Three weeks of guided sessions, live critiques, and a final
                brutalist showcase. Bring your most ambitious card layout -
                we'll ship it together.
              </p>
              <div nbCluster gap="sm">
                <span nbChip tone="mint">12 seats</span>
                <span nbChip tone="yellow">Cohort starts Jun 3</span>
              </div>
            </div>
          </div>

          <div
            nbSection
            divider="top"
            padding="lg"
            layout="between"
            align="center"
          >
            <div nbCallout tone="yellow" shadow="hard">$799</div>
            <button nbButton>Enroll</button>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComposition {
  protected readonly compositionExampleCode = `<div nbSurface tone="white" shadow="hard" radius="lg" clip>
  <div nbSection padding="lg" divider="bottom" layout="between" align="center">
    <h2 nbDisplay>Design Sprint</h2>
    <span nbChip tone="lavender">Annual</span>
  </div>

  <div nbSection padding="lg">
    <p>Three weeks of guided sessions and a final brutalist showcase.</p>
  </div>

  <div nbSection divider="top" padding="lg" layout="between" align="center">
    <div nbCallout tone="yellow" shadow="hard">$799</div>
    <button nbButton>Enroll</button>
  </div>
</div>`;
}
