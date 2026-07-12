import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbChip,
  NbCluster,
  NbSection,
  NbStack,
  NbText,
  NbTitle,
  NbSurface,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-overview-example',
  imports: [
    DocsExample,
    NbSurface,
    NbSection,
    NbStack,
    NbCluster,
    NbButton,
    NbChip,
    NbText,
    NbTitle,
  ],
  template: `
    <section id="example" nbStack gap="md" class="scroll-mt-32">
      <h2 data-docs-heading class="text-2xl font-bold">Rendered example</h2>
      <p class="text-base font-medium">
        A complete panel built with composition primitives only - no class soup
        required.
      </p>

      <docs-example [code]="launchPanelCode">
        <article
          nbSurface
          tone="cream"
          radius="xl"
          shadow="hard"
          border="strong"
          clip
          class="w-full max-w-xl"
        >
          <header nbSection padding="lg" divider="bottom">
            <div nbCluster gap="sm" align="center" justify="between">
              <h2 nbTitle>Launch checklist</h2>
              <span nbChip tone="yellow">v0.2.0</span>
            </div>
          </header>

          <div nbSection padding="lg">
            <div nbStack gap="md">
              <p nbText>
                Build a loud release panel using composition primitives instead
                of class-heavy wrappers.
              </p>
              <div nbCluster gap="xs">
                <span nbChip tone="yellow">Surface</span>
                <span nbChip tone="pink">Section</span>
                <span nbChip tone="mint">Stack</span>
                <span nbChip tone="lavender">Cluster</span>
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
            <span nbText tone="muted">Ready for release</span>
            <button nbButton tone="black">Ship it</button>
          </footer>
        </article>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionOverviewExample {
  protected readonly launchPanelCode = `<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbTitle>Launch checklist</h2>
      <span nbChip tone="yellow">v0.2.0</span>
    </div>
  </header>

  <div nbSection padding="lg">
    <div nbStack gap="md">
      <p nbText>
        Build a loud release panel using composition primitives
        instead of class-heavy wrappers.
      </p>

      <div nbCluster gap="xs">
        <span nbChip tone="yellow">Surface</span>
        <span nbChip tone="pink">Section</span>
        <span nbChip tone="mint">Stack</span>
        <span nbChip tone="lavender">Cluster</span>
      </div>
    </div>
  </div>

  <footer nbSection padding="lg" divider="top" layout="between" align="center">
    <span nbText tone="muted">Ready for release</span>
    <button nbButton tone="black">Ship it</button>
  </footer>
</article>`;
}
