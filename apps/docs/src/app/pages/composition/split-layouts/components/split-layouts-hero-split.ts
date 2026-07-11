import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCluster,
  NbDisplay,
  NbSplit,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-split-layouts-hero-split',
  imports: [
    DocsExample,
    NbSurface,
    NbSplit,
    NbStack,
    NbCluster,
    NbButton,
    NbText,
    NbDisplay,
  ],
  template: `
    <section id="hero-split" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Hero split
      </h2>
      <p class="mb-6 text-base font-medium">
        A wide main area paired with a narrower aside - a typical hero layout.
        The aside stacks below on small screens when
        <code class="font-mono">collapse="md"</code>.
      </p>

      <docs-example [code]="heroSplitCode">
        <section
          nbSplit
          ratio="2:1"
          gap="lg"
          collapse="md"
          align="stretch"
          class="w-full"
        >
          <article
            nbSurface
            tone="yellow"
            padding="xl"
            radius="xl"
            shadow="hard"
            border="strong"
          >
            <div nbStack gap="md">
              <h1 nbDisplay size="lg">Build loud.<br />Stay sharp.</h1>
              <p nbText size="lg">
                Composition primitives for brutalist Angular UIs.
              </p>
              <div nbCluster gap="sm">
                <button nbButton tone="black">Get started</button>
                <button nbButton tone="white">Browse components</button>
              </div>
            </div>
          </article>

          <aside nbStack gap="md">
            <div
              nbSurface
              tone="pink"
              padding="lg"
              radius="lg"
              shadow="hard"
              border="strong"
            >
              <p nbText weight="bold">Composition primitives</p>
            </div>
            <div
              nbSurface
              tone="mint"
              padding="lg"
              radius="lg"
              shadow="hard"
              border="strong"
            >
              <p nbText weight="bold">Token-driven styling</p>
            </div>
            <div
              nbSurface
              tone="lavender"
              padding="lg"
              radius="lg"
              shadow="hard"
              border="strong"
            >
              <p nbText weight="bold">Angular-first APIs</p>
            </div>
          </aside>
        </section>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSplitLayoutsHeroSplit {
  protected readonly heroSplitCode = `<section nbSplit ratio="2:1" gap="lg" collapse="md" align="stretch">
  <article nbSurface tone="yellow" padding="xl" radius="xl"
           shadow="hard" border="strong">
    <div nbStack gap="md">
      <h1 nbDisplay size="lg">Build loud.<br />Stay sharp.</h1>
      <p nbText size="lg">
        Composition primitives for brutalist Angular UIs.
      </p>
      <div nbCluster gap="sm">
        <button nbButton tone="black">Get started</button>
        <button nbButton tone="white">Browse components</button>
      </div>
    </div>
  </article>

  <aside nbStack gap="md">
    <div nbSurface tone="pink" padding="lg" radius="lg"
         shadow="hard" border="strong">
      <p nbText weight="bold">Composition primitives</p>
    </div>
    <div nbSurface tone="mint" padding="lg" radius="lg"
         shadow="hard" border="strong">
      <p nbText weight="bold">Token-driven styling</p>
    </div>
    <div nbSurface tone="lavender" padding="lg" radius="lg"
         shadow="hard" border="strong">
      <p nbText weight="bold">Angular-first APIs</p>
    </div>
  </aside>
</section>`;
}
