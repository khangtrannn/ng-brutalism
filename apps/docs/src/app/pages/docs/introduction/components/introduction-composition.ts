import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-introduction-composition',
  imports: [DocsCodeBlock, NbStat, NbSurface, RouterLink],
  template: `
    <section id="composition">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Composition system
      </h2>
      <p class="mb-5 text-base font-medium">
        ng-brutalism ships a composition system for building loud, token-driven,
        Angular-first brutalist UIs: small primitives that lock together like
        LEGO, each owning one job - see
        <a routerLink="/composition/overview" class="underline"
          >Composition Overview</a
        >
        for the full mental model. The example below layers
        <code class="font-mono">nbSurface</code>,
        <code class="font-mono">nbSection</code>,
        <code class="font-mono">nbStack</code>, and
        <code class="font-mono">nbCluster</code> with
        <code class="font-mono">nbButton</code>,
        <code class="font-mono">nbChip</code>, and
        <code class="font-mono">nbText</code> to build a complete UI.
      </p>
      <docs-code-block title="Composition example" [code]="compositionCode" />

      <div class="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          nbSurface
          tone="yellow"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          routerLink="/composition/overview"
          class="items-start"
        >
          <nb-stat value="Overview" label="Mental model & decision guide" />
        </a>
        <a
          nbSurface
          tone="mint"
          border="strong"
          padding="sm"
          layout="stack"
          interactive
          routerLink="/composition/common-patterns"
          class="items-start"
        >
          <nb-stat value="Patterns" label="Copy-pasteable compositions" />
        </a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionComposition {
  protected readonly compositionCode = `<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbTitle>Launch checklist</h2>
      <span nbChip tone="yellow">On track</span>
    </div>
  </header>

  <div nbSection padding="lg">
    <div nbStack gap="md">
      <p nbText>Build loud UIs with composable primitives.</p>
      <div nbCluster gap="xs">
        <span nbChip tone="mint">Surface</span>
        <span nbChip tone="pink">Section</span>
        <span nbChip tone="lavender">Stack</span>
      </div>
    </div>
  </div>

  <footer nbSection padding="lg" divider="top" layout="between" align="center">
    <span nbText tone="muted">Ready for release</span>
    <button nbButton tone="black">Ship it</button>
  </footer>
</article>`;
}
