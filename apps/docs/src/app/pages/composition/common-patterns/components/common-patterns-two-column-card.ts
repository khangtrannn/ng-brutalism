import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbDisplay,
  NbSection,
  NbSplit,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-common-patterns-two-column-card',
  imports: [DocsExample, NbSurface, NbSection, NbSplit, NbStack, NbDisplay, NbText],
  template: `
    <section id="two-column-card" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Two-column card
      </h2>
      <p class="mb-6 text-base font-medium">
        A Surface with Split inside - the simplest media/content or
        stat/description pattern.
      </p>

      <docs-example [code]="twoColumnCode">
        <article
          nbSurface
          tone="lavender"
          radius="xl"
          shadow="hard"
          border="strong"
          clip
          class="w-full max-w-xl"
        >
          <div nbSection padding="lg">
            <div nbSplit ratio="1:2" gap="lg" collapse="sm" align="center">
              <div
                class="flex aspect-square items-center justify-center border-3 border-(--nb-border) bg-(--nb-yellow) text-4xl font-black"
              >
                42
              </div>
              <div nbStack gap="xs">
                <h2
                  nbDisplay
                  size="sm"
                  underline="bar"
                  underlineGap="xs"
                  class="inline-flex flex-col items-start"
                  style="--nb-underline-width: 45%"
                >
                  Components shipped
                </h2>
                <p nbText tone="muted" size="sm">
                  Fully composed, keyboard-ready, token-driven.
                </p>
              </div>
            </div>
          </div>
        </article>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionCommonPatternsTwoColumnCard {
  protected readonly twoColumnCode = `<article nbSurface tone="lavender" radius="xl"
         shadow="hard" border="strong" clip>
  <div nbSection padding="lg">
    <div nbSplit ratio="1:2" gap="lg" collapse="sm" align="center">
      <div>42</div>

      <div nbStack gap="xs">
        <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Components shipped</h2>
        <p nbText tone="muted" size="sm">
          Fully composed, keyboard-ready, token-driven.
        </p>
      </div>
    </div>
  </div>
</article>`;
}
