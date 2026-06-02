import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NbButton,
  NbChip,
  NbCluster,
  NbDisplay,
  NbSplit,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';

@Component({
  selector: 'docs-composition-split-layouts-page',
  imports: [
    RouterLink,
    DocsCodeBlock,
    DocsExample,
    NbSurface,
    NbSplit,
    NbStack,
    NbCluster,
    NbButton,
    NbChip,
    NbText,
    NbDisplay,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <p class="eyebrow">Composition</p>
        <h1>Split Layouts</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          <code class="font-mono">nbSplit</code> creates two-region layouts —
          hero sections, media/content pairs, sidebar layouts, pricing sections,
          and profile cards. It replaces repeated grid boilerplate with a
          single, responsive primitive.
        </p>
      </header>

      <section id="how-it-works" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          How it works
        </h2>
        <p class="mb-5 text-base font-medium">
          Split uses a CSS grid with two columns. The
          <code class="font-mono">ratio</code> input controls the column
          proportion. The <code class="font-mono">collapse</code> input sets the
          responsive breakpoint where the two columns stack vertically.
        </p>
        <docs-code-block title="Ratios" [code]="ratiosCode" />
      </section>

      <section id="hero-split" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Hero split
        </h2>
        <p class="mb-6 text-base font-medium">
          A wide main area paired with a narrower aside — a typical hero
          layout. The aside stacks below on small screens when
          <code class="font-mono">collapse="md"</code>.
        </p>

        <docs-example [code]="heroSplitCode">
          <section nbSplit ratio="2:1" gap="lg" collapse="md" align="stretch" class="w-full">
            <article nbSurface tone="yellow" padding="xl" radius="xl" shadow="hard" border="strong">
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
              <div nbSurface tone="pink" padding="lg" radius="lg" shadow="hard" border="strong">
                <p nbText weight="bold">Composition primitives</p>
              </div>
              <div nbSurface tone="mint" padding="lg" radius="lg" shadow="hard" border="strong">
                <p nbText weight="bold">Token-driven styling</p>
              </div>
              <div nbSurface tone="lavender" padding="lg" radius="lg" shadow="hard" border="strong">
                <p nbText weight="bold">Angular-first APIs</p>
              </div>
            </aside>
          </section>
        </docs-example>
      </section>

      <section id="media-content" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Media / content split
        </h2>
        <p class="mb-6 text-base font-medium">
          Equal columns — a media placeholder on the left and rich content
          on the right. Classic recipe card or feature block pattern.
        </p>

        <docs-example [code]="mediaContentCode">
          <section nbSplit ratio="1:1" gap="lg" collapse="md" class="w-full">
            <div nbSurface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong">
              <div
                class="flex aspect-video items-center justify-center border-3 border-(--nb-border) bg-(--nb-mint) text-5xl font-black"
              >
                01
              </div>
            </div>

            <div nbStack gap="md">
              <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Recipe card</h2>
              <p nbText tone="muted">
                Use split layouts for visual/content compositions. The left side holds
                an image or media frame; the right holds structured content.
              </p>
              <div nbCluster gap="xs">
                <span nbChip tone="yellow">30 min</span>
                <span nbChip tone="mint">Easy</span>
                <span nbChip tone="pink">Vegan</span>
              </div>
              <button nbButton tone="black" size="sm">View recipe</button>
            </div>
          </section>
        </docs-example>
      </section>

      <section id="api" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Key inputs
        </h2>
        <div class="grid gap-3 sm:grid-cols-2">
          @for (input of keyInputs; track input.name + input.description) {
            <div class="border-3 border-(--nb-border) bg-white p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]">
              <code class="font-mono text-sm font-black">{{ input.name }}</code>
              <p class="mt-1.5 text-sm font-medium text-black/70">{{ input.description }}</p>
            </div>
          }
        </div>
        <p class="mt-5 text-sm font-medium">
          See the full API:
          <a class="underline" routerLink="/components/split">Split</a>.
        </p>
      </section>

      <section id="when-to-use" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          When to use Split
        </h2>
        <div
          class="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]"
        >
          @for (use of whenToUse; track use) {
            <div class="flex gap-3 border-b border-white/10 px-5 py-3 last:border-none">
              <span
                class="mt-1.5 inline-block h-2 w-2 shrink-0 border-2 border-(--nb-yellow) bg-(--nb-yellow)"
                aria-hidden="true"
              ></span>
              <span class="text-sm font-medium">{{ use }}</span>
            </div>
          }
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SplitLayoutsPage {
  protected readonly whenToUse = [
    'Hero layout with a wide main area and a narrower sidebar or aside',
    'Media/content pairs — image on one side, description on the other',
    'Pricing sections with features on the left and a highlighted card on the right',
    'Profile cards with an avatar panel and identity/details panel',
    'Any layout where two sibling regions need proportional width',
  ];

  protected readonly keyInputs = [
    {
      name: 'ratio',
      description: 'Column proportions — 1:1, 2:1, 3:1, 1:2, 1:3, fill:auto, auto:fill',
    },
    {
      name: 'collapse',
      description: 'Breakpoint where columns stack — none, sm, md, lg',
    },
    {
      name: 'gap',
      description: 'Space between the two columns — xs, sm, md, lg, xl',
    },
    {
      name: 'align',
      description: 'Cross-axis alignment — start, center, end, stretch',
    },
    {
      name: 'separator',
      description: 'Vertical divider — none, solid, dashed, thick',
    },
    {
      name: 'padding',
      description: 'Inner padding on the split container — xs, sm, md, lg, xl',
    },
  ];

  protected readonly ratiosCode = `<!-- Equal columns -->
<section nbSplit ratio="1:1" gap="lg" collapse="md">...</section>

<!-- Wide main + narrow aside (2:1) -->
<section nbSplit ratio="2:1" gap="lg" collapse="md">...</section>

<!-- Very wide main + narrow panel (3:1) -->
<section nbSplit ratio="3:1" gap="xl" collapse="lg">...</section>

<!-- Fixed aside, flexible main -->
<section nbSplit ratio="fill:auto" gap="lg" collapse="md">...</section>`;

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

  protected readonly mediaContentCode = `<section nbSplit ratio="1:1" gap="lg" collapse="md">
  <div nbSurface tone="cream" padding="lg" radius="xl"
       shadow="hard" border="strong"
       class="grid aspect-video place-items-center text-5xl font-black">
    01
  </div>

  <div nbStack gap="md">
    <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Recipe card</h2>
    <p nbText tone="muted">
      Use split layouts for visual/content compositions.
    </p>
    <div nbCluster gap="xs">
      <span nbChip tone="yellow">30 min</span>
      <span nbChip tone="mint">Easy</span>
      <span nbChip tone="pink">Vegan</span>
    </div>
    <button nbButton tone="black" size="sm">View recipe</button>
  </div>
</section>`;
}
