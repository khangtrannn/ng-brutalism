import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbChip, NbChipGroup } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-chip-with-icon',
  imports: [DocsExample, NbChip, NbChipGroup],
  template: `
    <section id="with-icon">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        With Icon
      </h2>
      <p class="mb-4 font-medium">
        Pass an SVG URL to the <code class="font-mono">icon</code> input for a
        leading icon. It renders through <code class="font-mono">nbIcon</code>
        in mask mode, so it tints to the chip's foreground color. Use
        <code class="font-mono">iconSize</code> to scale it.
      </p>
      <docs-example [code]="withIconExampleCode">
        <div nbChipGroup class="p-4">
          <span nbChip tone="mint" icon="/podcast-card/clock.svg"
            >45 MIN</span
          >
          <span nbChip tone="lavender" icon="/podcast-card/sparkle.svg"
            >NEW</span
          >
        </div>
      </docs-example>
      <p class="mt-4 font-medium">
        For full-color or labeled icons, project any element as content
        instead - the leading slot is only used when
        <code class="font-mono">icon</code> is set.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipWithIcon {
  protected readonly withIconExampleCode = `<div nbChipGroup>
  <span nbChip tone="mint" icon="/podcast-card/clock.svg">45 MIN</span>
  <span nbChip tone="lavender" icon="/podcast-card/sparkle.svg">NEW</span>
</div>`;
}
