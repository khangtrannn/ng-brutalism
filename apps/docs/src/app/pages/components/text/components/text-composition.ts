import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbCallout,
  NbChip,
  NbDisplay,
  NbStack,
  NbText,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-text-composition',
  imports: [NbCallout, NbChip, NbDisplay, NbStack, NbText, DocsExample],
  template: `
    <section id="composition">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Composition
      </h2>
      <p class="mb-4 font-medium">
        Because <code class="font-mono">nbText</code> is a directive it
        composes with other directives on the same element and works naturally
        inside any layout primitive.
      </p>
      <docs-example [code]="compositionCode">
        <div class="p-6 w-full" nbStack gap="lg">
          <div nbStack gap="xs">
            <span
              nbText
              size="xs"
              weight="bold"
              transform="uppercase"
              tracking="wider"
              tone="muted"
            >
              Featured deal
            </span>
            <h2 nbDisplay>Build loud.</h2>
          </div>

          <p nbText size="lg" tone="muted" measure="md" leading="relaxed">
            A token-driven neo-brutalist Angular UI library for expressive
            product interfaces.
          </p>

          <div class="flex flex-wrap gap-2">
            <span nbChip tone="mint">
              <span
                nbText
                size="sm"
                weight="black"
                transform="uppercase"
                tracking="wide"
              >
                Flight included
              </span>
            </span>
            <span nbChip tone="lavender">
              <span
                nbText
                size="sm"
                weight="black"
                transform="uppercase"
                tracking="wide"
              >
                Hotel
              </span>
            </span>
          </div>

          <div
            nbCallout
            tone="yellow"
            size="lg"
            layout="between"
            shadow="hard"
          >
            <div nbStack gap="none">
              <span
                nbText
                size="xs"
                weight="bold"
                transform="uppercase"
                tracking="wider"
                tone="muted"
              >
                From
              </span>
              <span nbText size="xl" weight="black">$799</span>
            </div>
            <span nbText size="sm" weight="medium">per person</span>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComposition {
  protected readonly compositionCode = `<div nbStack gap="lg">
  <div nbStack gap="xs">
    <span nbText size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted">
      Featured deal
    </span>
    <h2 nbDisplay>Build loud.</h2>
  </div>

  <p nbText size="lg" tone="muted" measure="md" leading="relaxed">
    A token-driven neo-brutalist Angular UI library for expressive
    product interfaces.
  </p>

  <div class="flex flex-wrap gap-2">
    <span nbChip tone="mint">
      <span nbText size="sm" weight="black" transform="uppercase" tracking="wide">
        Flight included
      </span>
    </span>
    <span nbChip tone="lavender">
      <span nbText size="sm" weight="black" transform="uppercase" tracking="wide">
        Hotel
      </span>
    </span>
  </div>

  <div nbCallout tone="yellow" size="lg" layout="between" shadow="hard">
    <div nbStack gap="none">
      <span nbText size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted">
        From
      </span>
      <span nbText size="xl" weight="black">$799</span>
    </div>
    <span nbText size="sm" weight="medium">per person</span>
  </div>
</div>`;
}
