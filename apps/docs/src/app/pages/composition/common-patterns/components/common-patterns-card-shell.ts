import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NbButton,
  NbChip,
  NbCluster,
  NbDisplay,
  NbSection,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-common-patterns-card-shell',
  imports: [
    RouterLink,
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
    <section id="card-shell" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Brutalist card shell
      </h2>
      <p class="mb-6 text-base font-medium">
        The header/body/footer shell from
        <a class="underline" routerLink="/composition/surface-and-section"
          >Surface & Section</a
        >, ready to copy - Surface wraps, Sections divide, Stack and Cluster
        handle layout within each region.
      </p>

      <docs-example [code]="cardShellCode">
        <article
          nbSurface
          tone="cream"
          radius="xl"
          shadow="hard"
          border="strong"
          clip
          class="w-full max-w-md"
        >
          <header nbSection padding="lg" divider="bottom">
            <div nbCluster gap="sm" align="center" justify="between">
              <h2
                nbDisplay
                size="sm"
                underline="bar"
                underlineGap="xs"
                class="inline-flex flex-col items-start"
                style="--nb-underline-width: 45%"
              >
                Card title
              </h2>
              <span nbChip tone="mint">Active</span>
            </div>
          </header>

          <div nbSection padding="lg">
            <div nbStack gap="md">
              <p nbText>
                Card content goes here. Use Stack to control rhythm and Cluster
                to group inline items.
              </p>
              <div nbCluster gap="xs">
                <span nbChip tone="yellow">Tag one</span>
                <span nbChip tone="pink">Tag two</span>
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
            <span nbText tone="muted">Meta info</span>
            <button nbButton tone="yellow">Action</button>
          </footer>
        </article>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionCommonPatternsCardShell {
  protected readonly cardShellCode = `<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Card title</h2>
      <span nbChip tone="mint">Active</span>
    </div>
  </header>

  <div nbSection padding="lg">
    <div nbStack gap="md">
      <p nbText>Card content goes here.</p>
      <div nbCluster gap="xs">
        <span nbChip tone="yellow">Tag one</span>
        <span nbChip tone="pink">Tag two</span>
      </div>
    </div>
  </div>

  <footer nbSection padding="lg" divider="top" layout="between" align="center">
    <span nbText tone="muted">Meta info</span>
    <button nbButton tone="yellow">Action</button>
  </footer>
</article>`;
}
