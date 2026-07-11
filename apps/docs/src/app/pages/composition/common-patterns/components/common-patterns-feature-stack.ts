import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCluster, NbStack, NbSurface, NbText } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-common-patterns-feature-stack',
  imports: [DocsExample, NbCluster, NbSurface, NbStack, NbText],
  template: `
    <section id="feature-stack" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Feature card stack
      </h2>
      <p class="mb-6 text-base font-medium">
        Three loud feature cards in a Cluster that wraps on smaller screens.
        Each card is a Surface with Stack content.
      </p>

      <docs-example [code]="featureStackCode">
        <div nbCluster gap="md" justify="center" class="w-full">
          <article
            nbSurface
            tone="yellow"
            padding="lg"
            radius="lg"
            shadow="hard"
            border="strong"
            class="flex-1 min-w-[160px]"
          >
            <div nbStack gap="xs">
              <h3
                nbText
                size="2xl"
                weight="black"
                leading="tight"
                underline="bar"
                underlineGap="xs"
                style="--nb-underline-width: 45%"
              >
                Angular native
              </h3>
              <p nbText size="sm">Directive APIs, signal inputs.</p>
            </div>
          </article>

          <article
            nbSurface
            tone="mint"
            padding="lg"
            radius="lg"
            shadow="hard"
            border="strong"
            class="flex-1 min-w-[160px]"
          >
            <div nbStack gap="xs">
              <h3
                nbText
                size="2xl"
                weight="black"
                leading="tight"
                underline="bar"
                underlineGap="xs"
                style="--nb-underline-width: 45%"
              >
                Loud by default
              </h3>
              <p nbText size="sm">Chunky borders, punchy color.</p>
            </div>
          </article>

          <article
            nbSurface
            tone="pink"
            padding="lg"
            radius="lg"
            shadow="hard"
            border="strong"
            class="flex-1 min-w-[160px]"
          >
            <div nbStack gap="xs">
              <h3
                nbText
                size="2xl"
                weight="black"
                leading="tight"
                underline="bar"
                underlineGap="xs"
                style="--nb-underline-width: 45%"
              >
                Token driven
              </h3>
              <p nbText size="sm">CSS variables keep overrides local.</p>
            </div>
          </article>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionCommonPatternsFeatureStack {
  protected readonly featureStackCode = `<div nbCluster gap="md">
  <article nbSurface tone="yellow" padding="lg" radius="lg"
           shadow="hard" border="strong" class="flex-1 min-w-[160px]">
    <div nbStack gap="xs">
      <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Angular native</h3>
      <p nbText size="sm">Directive APIs, signal inputs.</p>
    </div>
  </article>

  <article nbSurface tone="mint" padding="lg" radius="lg"
           shadow="hard" border="strong" class="flex-1 min-w-[160px]">
    <div nbStack gap="xs">
      <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Loud by default</h3>
      <p nbText size="sm">Chunky borders, punchy color.</p>
    </div>
  </article>

  <article nbSurface tone="pink" padding="lg" radius="lg"
           shadow="hard" border="strong" class="flex-1 min-w-[160px]">
    <div nbStack gap="xs">
      <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Token driven</h3>
      <p nbText size="sm">CSS variables keep overrides local.</p>
    </div>
  </article>
</div>`;
}
