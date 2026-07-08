import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCallout,
  NbChip,
  NbCluster,
  NbDisplay,
  NbSection,
  NbSplit,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import { DocsExample } from '../../docs/docs-example';

@Component({
  selector: 'docs-composition-common-patterns-page',
  imports: [
    DocsExample,
    NbSurface,
    NbSection,
    NbSplit,
    NbStack,
    NbCluster,
    NbButton,
    NbChip,
    NbText,
    NbDisplay,
    NbCallout,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <p class="eyebrow">Composition</p>
        <h1>Common Patterns</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Copy-pasteable composition patterns built from ng-brutalism primitives.
          Each pattern shows the rendered output and the template — adjust
          tones, radii, and gaps to fit your context.
        </p>
      </header>

      <section id="card-shell" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Brutalist card shell
        </h2>
        <p class="mb-6 text-base font-medium">
          The fundamental pattern: Surface wraps, Sections divide, Stack and
          Cluster handle layout within each region.
        </p>

        <docs-example [code]="cardShellCode">
          <article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip class="w-full max-w-md">
            <header nbSection padding="lg" divider="bottom">
              <div nbCluster gap="sm" align="center" justify="between">
                <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Card title</h2>
                <span nbChip tone="mint">Active</span>
              </div>
            </header>

            <div nbSection padding="lg">
              <div nbStack gap="md">
                <p nbText>
                  Card content goes here. Use Stack to control rhythm and
                  Cluster to group inline items.
                </p>
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
          </article>
        </docs-example>
      </section>

      <section id="toolbar-row" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Toolbar row
        </h2>
        <p class="mb-6 text-base font-medium">
          A heading and action group pushed apart. Use this inside a Surface
          section header or as a standalone toolbar.
        </p>

        <docs-example [code]="toolbarCode">
          <div class="w-full max-w-lg border-3 border-(--nb-border) bg-(--nb-paper) p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]">
            <div nbCluster gap="sm" align="center" justify="between">
              <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Components</h2>
              <div nbCluster gap="xs">
                <button nbButton size="sm" tone="white">Copy</button>
                <button nbButton size="sm" tone="black">Open</button>
              </div>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="feature-stack" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Feature card stack
        </h2>
        <p class="mb-6 text-base font-medium">
          Three loud feature cards in a Cluster that wraps on smaller screens.
          Each card is a Surface with Stack content.
        </p>

        <docs-example [code]="featureStackCode">
          <div nbCluster gap="md" justify="center" class="w-full">
            <article
              nbSurface
              tone="yellow"
              padding="lg"
              radius="lg"
              shadow="hard"
              border="strong"
              class="flex-1 min-w-[160px]"
            >
              <div nbStack gap="xs">
                <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Angular native</h3>
                <p nbText size="sm">Directive APIs, signal inputs.</p>
              </div>
            </article>

            <article
              nbSurface
              tone="mint"
              padding="lg"
              radius="lg"
              shadow="hard"
              border="strong"
              class="flex-1 min-w-[160px]"
            >
              <div nbStack gap="xs">
                <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Loud by default</h3>
                <p nbText size="sm">Chunky borders, punchy color.</p>
              </div>
            </article>

            <article
              nbSurface
              tone="pink"
              padding="lg"
              radius="lg"
              shadow="hard"
              border="strong"
              class="flex-1 min-w-[160px]"
            >
              <div nbStack gap="xs">
                <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Token driven</h3>
                <p nbText size="sm">CSS variables keep overrides local.</p>
              </div>
            </article>
          </div>
        </docs-example>
      </section>

      <section id="callout-panel" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Callout panel
        </h2>
        <p class="mb-6 text-base font-medium">
          Combine <code class="font-mono">nbCallout</code> inside a Surface for
          an eye-catching notice or price highlight.
        </p>

        <docs-example [code]="calloutPanelCode">
          <article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip class="w-full max-w-md">
            <header nbSection padding="lg" divider="bottom">
              <div nbCluster gap="sm" align="center" justify="between">
                <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Pricing</h2>
                <span nbChip tone="yellow">Early access</span>
              </div>
            </header>

            <div nbSection padding="lg">
              <div nbStack gap="lg">
                <div nbCallout tone="yellow" size="xl" shadow="hard">$49/mo</div>
                <p nbText>
                  Everything included. No usage limits. Cancel any time.
                </p>
                <button nbButton tone="black" size="lg">Start free trial</button>
              </div>
            </div>
          </article>
        </docs-example>
      </section>

      <section id="two-column-card" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Two-column card
        </h2>
        <p class="mb-6 text-base font-medium">
          A Surface with Split inside — the simplest media/content or
          stat/description pattern.
        </p>

        <docs-example [code]="twoColumnCode">
          <article nbSurface tone="lavender" radius="xl" shadow="hard" border="strong" clip class="w-full max-w-xl">
            <div nbSection padding="lg">
              <div nbSplit ratio="1:2" gap="lg" collapse="sm" align="center">
                <div
                  class="flex aspect-square items-center justify-center border-3 border-(--nb-border) bg-(--nb-yellow) text-4xl font-black"
                >
                  42
                </div>
                <div nbStack gap="xs">
                  <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Components shipped</h2>
                  <p nbText tone="muted" size="sm">
                    Fully composed, keyboard-ready, token-driven.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </docs-example>
      </section>

      <section id="primitives-used-panel" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Primitives used panel
        </h2>
        <p class="mb-6 text-base font-medium">
          A reusable panel for documenting which primitives a recipe or
          component relies on.
        </p>

        <docs-example [code]="primitivesUsedCode">
          <section nbSurface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong" class="w-full max-w-md">
            <div nbStack gap="md">
              <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Primitives used</h2>
              <div nbCluster gap="xs">
                <span nbChip tone="yellow">nbSurface</span>
                <span nbChip tone="pink">nbSection</span>
                <span nbChip tone="mint">nbSplit</span>
                <span nbChip tone="lavender">nbStack</span>
                <span nbChip tone="blue">nbCluster</span>
              </div>
            </div>
          </section>
        </docs-example>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CommonPatternsPage {
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

  protected readonly toolbarCode = `<div nbCluster gap="sm" align="center" justify="between">
  <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Components</h2>

  <div nbCluster gap="xs">
    <button nbButton size="sm" tone="white">Copy</button>
    <button nbButton size="sm" tone="black">Open</button>
  </div>
</div>`;

  protected readonly featureStackCode = `<div nbCluster gap="md">
  <article nbSurface tone="yellow" padding="lg" radius="lg"
           shadow="hard" border="strong" class="flex-1 min-w-[160px]">
    <div nbStack gap="xs">
      <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Angular native</h3>
      <p nbText size="sm">Directive APIs, signal inputs.</p>
    </div>
  </article>

  <article nbSurface tone="mint" padding="lg" radius="lg"
           shadow="hard" border="strong" class="flex-1 min-w-[160px]">
    <div nbStack gap="xs">
      <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Loud by default</h3>
      <p nbText size="sm">Chunky borders, punchy color.</p>
    </div>
  </article>

  <article nbSurface tone="pink" padding="lg" radius="lg"
           shadow="hard" border="strong" class="flex-1 min-w-[160px]">
    <div nbStack gap="xs">
      <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Token driven</h3>
      <p nbText size="sm">CSS variables keep overrides local.</p>
    </div>
  </article>
</div>`;

  protected readonly calloutPanelCode = `<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Pricing</h2>
      <span nbChip tone="yellow">Early access</span>
    </div>
  </header>

  <div nbSection padding="lg">
    <div nbStack gap="lg">
      <div nbCallout tone="yellow" size="xl" shadow="hard">$49/mo</div>
      <p nbText>
        Everything included. No usage limits. Cancel any time.
      </p>
      <button nbButton tone="black" size="lg">Start free trial</button>
    </div>
  </div>
</article>`;

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

  protected readonly primitivesUsedCode = `<section nbSurface tone="cream" padding="lg"
         radius="xl" shadow="hard" border="strong">
  <div nbStack gap="md">
    <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Primitives used</h2>

    <div nbCluster gap="xs">
      <span nbChip tone="yellow">nbSurface</span>
      <span nbChip tone="pink">nbSection</span>
      <span nbChip tone="mint">nbSplit</span>
      <span nbChip tone="lavender">nbStack</span>
      <span nbChip tone="blue">nbCluster</span>
    </div>
  </div>
</section>`;
}
