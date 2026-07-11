import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDisplay, NbSection, NbSurface, NbText } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-surface-section-basic-panel',
  imports: [DocsExample, NbSurface, NbSection, NbText, NbDisplay],
  template: `
    <section id="basic-panel" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Basic panel
      </h2>
      <p class="mb-6 text-base font-medium">
        A surface with a header region and a body region - the minimal card
        shell.
      </p>

      <docs-example [code]="basicPanelCode">
        <article
          nbSurface
          tone="cream"
          radius="xl"
          shadow="hard"
          border="strong"
          clip
          class="w-full max-w-lg"
        >
          <header nbSection padding="lg" divider="bottom">
            <h2
              nbDisplay
              size="sm"
              underline="bar"
              underlineGap="xs"
              class="inline-flex flex-col items-start"
              style="--nb-underline-width: 75%"
            >
              Profile
            </h2>
          </header>
          <div nbSection padding="lg">
            <p nbText>Chunky card shell with clear regions.</p>
          </div>
        </article>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSurfaceSectionBasicPanel {
  protected readonly basicPanelCode = `<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <header nbSection padding="lg" divider="bottom">
    <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Profile</h2>
  </header>

  <div nbSection padding="lg">
    <p nbText>Chunky card shell with clear regions.</p>
  </div>
</article>`;
}
