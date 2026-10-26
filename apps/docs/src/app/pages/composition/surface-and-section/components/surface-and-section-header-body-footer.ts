import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbChip,
  NbCluster,
  NbDisplay,
  NbSection,
  NbStack,
  NbSurface,
  NbText,
  NbButton,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-surface-section-header-body-footer',
  imports: [
    DocsExample,
    NbSurface,
    NbSection,
    NbCluster,
    NbDisplay,
    NbChip,
    NbStack,
    NbText,
    NbButton,
  ],
  template: `
    <section id="header-body-footer" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Header / body / footer
      </h2>
      <p class="mb-6 text-base font-medium">
        Three sections with a top and bottom divider create a structured panel
        layout. The footer uses
        <code class="font-mono">layout="between"</code>
        to push its two children to opposite ends.
      </p>

      <docs-example [code]="headerBodyFooterCode">
        <article
          nbSurface
          tone="yellow"
          radius="xl"
          border="thick"
          shadow="hard"
          clip
          class="w-full max-w-lg"
        >
          <header nbSection padding="lg" divider="bottom">
            <div nbCluster gap="sm" align="center" justify="between">
              <h2
                nbDisplay
                size="sm"
                underline="bar"
                underlineGap="xs"
                class="inline-flex flex-col items-start"
                style="--nb-display-underline-width: 45%"
              >
                Campaign draft
              </h2>
              <span nbChip tone="pink">Draft</span>
            </div>
          </header>

          <div nbSection padding="lg">
            <div nbStack gap="md">
              <p nbText>
                Body content lives here. Stack controls the vertical rhythm
                inside the section.
              </p>
              <div nbCluster gap="xs">
                <span nbChip tone="mint">Angular</span>
                <span nbChip tone="lavender">Signals</span>
              </div>
            </div>
          </div>

          <footer
            nbSection
            padding="lg"
            divider="top"
            layout="between"
            align="center"
          >
            <span nbText tone="muted">Last saved 2m ago</span>
            <button nbButton tone="black" size="sm">Publish</button>
          </footer>
        </article>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSurfaceSectionHeaderBodyFooter {
  protected readonly headerBodyFooterCode = `<article nbSurface tone="yellow" radius="xl" border="thick" shadow="hard" clip>
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-display-underline-width: 45%">Campaign draft</h2>
      <span nbChip tone="pink">Draft</span>
    </div>
  </header>

  <div nbSection padding="lg">
    <div nbStack gap="md">
      <p nbText>
        Body content lives here. Stack controls the vertical
        rhythm inside the section.
      </p>
      <div nbCluster gap="xs">
        <span nbChip tone="mint">Angular</span>
        <span nbChip tone="lavender">Signals</span>
      </div>
    </div>
  </div>

  <footer nbSection padding="lg" divider="top" layout="between" align="center">
    <span nbText tone="muted">Last saved 2m ago</span>
    <button nbButton tone="black" size="sm">Publish</button>
  </footer>
</article>`;
}
