import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbChip,
  NbCluster,
  NbDisplay,
  NbStack,
  NbSurface,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-common-patterns-primitives-used-panel',
  imports: [DocsExample, NbSurface, NbStack, NbDisplay, NbCluster, NbChip],
  template: `
    <section id="primitives-used-panel" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Primitives used panel
      </h2>
      <p class="mb-6 text-base font-medium">
        A reusable panel for documenting which primitives a recipe or component
        relies on.
      </p>

      <docs-example [code]="primitivesUsedCode">
        <section
          nbSurface
          tone="cream"
          padding="lg"
          radius="xl"
          shadow="hard"
          border="strong"
          class="w-full max-w-md"
        >
          <div nbStack gap="md">
            <h2
              nbDisplay
              size="sm"
              underline="bar"
              underlineGap="xs"
              class="inline-flex flex-col items-start"
              style="--nb-underline-width: 45%"
            >
              Primitives used
            </h2>
            <div nbCluster gap="xs">
              <span nbChip tone="yellow">nbSurface</span>
              <span nbChip tone="pink">nbSection</span>
              <span nbChip tone="mint">nbSplit</span>
              <span nbChip tone="lavender">nbStack</span>
              <span nbChip tone="blue">nbCluster</span>
            </div>
          </div>
        </section>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionCommonPatternsPrimitivesUsedPanel {
  protected readonly primitivesUsedCode = `<section nbSurface tone="cream" padding="lg"
         radius="xl" shadow="hard" border="strong">
  <div nbStack gap="md">
    <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Primitives used</h2>

    <div nbCluster gap="xs">
      <span nbChip tone="yellow">nbSurface</span>
      <span nbChip tone="pink">nbSection</span>
      <span nbChip tone="mint">nbSplit</span>
      <span nbChip tone="lavender">nbStack</span>
      <span nbChip tone="blue">nbCluster</span>
    </div>
  </div>
</section>`;
}
