import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-overview-customization',
  imports: [NbStack, DocsCodeBlock],
  template: `
    <section id="customization" nbStack gap="md" class="scroll-mt-32">
      <h2 data-docs-heading class="text-2xl font-bold">Customization</h2>
      <p class="text-base font-medium">
        Use public inputs first. Reach for CSS custom properties when presets
        are not enough. Keep overrides local so they only affect the element
        and its descendants.
      </p>
      <docs-code-block
        title="CSS variable override"
        [code]="customizationCode"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionOverviewCustomization {
  protected readonly customizationCode = `<div nbSurface tone="cream" radius="xl" shadow="hard">
  Token-driven surface
</div>

<div
  nbSurface
  tone="cream"
  style="--nb-surface-bg: #faf6f0"
>
  Custom surface background
</div>

<div
  nbSurface
  style="--nb-shadow-offset-x: 12px; --nb-shadow-offset-y: 12px"
>
  Custom shadow offset
</div>`;
}
