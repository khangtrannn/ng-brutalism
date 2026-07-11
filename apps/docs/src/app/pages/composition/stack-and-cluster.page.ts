import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NbButton,
  NbChip,
  NbCluster,
  NbDisplay,
  NbSpacing,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-stack-cluster-page',
  imports: [
    RouterLink,
    DocsExample,
    NbSurface,
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
        <h1>Stack & Cluster</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          <code class="font-mono">nbStack</code> is the default primitive for
          vertical rhythm. <code class="font-mono">nbCluster</code> is the
          default primitive for inline groups that may wrap. Use them everywhere
          instead of manually wiring up flex utilities.
        </p>
      </header>

      <section id="when-each" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          When to use each
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            class="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">nbStack</h3>
            <p class="mt-2 text-sm font-medium">
              Vertical flow with consistent gap. Use for page sections, form
              groups, card content, lists, and anywhere content stacks
              top-to-bottom.
            </p>
          </div>
          <div
            class="border-3 border-(--nb-border) bg-(--nb-pink) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">nbCluster</h3>
            <p class="mt-2 text-sm font-medium">
              Horizontal flow that wraps to multiple lines. Use for actions,
              chips, toolbar rows, tags, badges, and any group of inline items.
            </p>
          </div>
        </div>
      </section>

      <section id="stack-example" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Stack - vertical card content
        </h2>
        <p class="mb-6 text-base font-medium">
          A job card using Stack to control vertical rhythm between title,
          description, and action.
        </p>

        <docs-example [code]="stackExampleCode">
          <div nbStack gap="md" class="w-full max-w-sm">
            <span nbChip tone="mint" class="self-start">Hiring now</span>
            <h2
              nbDisplay
              size="sm"
              underline="bar"
              underlineGap="xs"
              class="inline-flex flex-col items-start"
              style="--nb-underline-width: 80%"
            >
              Open role
            </h2>
            <p nbText>Compose content vertically with predictable spacing.</p>
            <button nbButton tone="yellow" size="lg">Apply now</button>
          </div>
        </docs-example>
      </section>

      <section id="cluster-example" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Cluster - chip group
        </h2>
        <p class="mb-6 text-base font-medium">
          A Cluster wraps chips inline, letting them reflow naturally without
          fixed-width constraints.
        </p>

        <docs-example [code]="clusterExampleCode">
          <div nbCluster gap="xs" justify="center" class="max-w-md">
            <span nbChip tone="yellow">Angular</span>
            <span nbChip tone="mint">Signals</span>
            <span nbChip tone="pink">Zoneless</span>
            <span nbChip tone="lavender">TypeScript</span>
          </div>
        </docs-example>
      </section>

      <section id="combined-example" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Combined inside a Surface
        </h2>
        <p class="mb-6 text-base font-medium">
          Stack and Cluster working together inside a Surface. The outer Stack
          controls top-level spacing; the inner Clusters handle inline groups.
        </p>

        <docs-example [code]="combinedCode">
          <article
            nbSurface
            tone="cream"
            padding="lg"
            radius="xl"
            shadow="hard"
            border="strong"
            class="w-full max-w-md"
          >
            <div nbStack gap="lg">
              <div nbStack gap="xs">
                <h2
                  nbDisplay
                  size="sm"
                  underline="bar"
                  underlineGap="xs"
                  class="inline-flex flex-col items-start"
                  style="--nb-underline-width: 45%"
                >
                  Senior Angular Engineer
                </h2>
                <p nbText tone="muted">Build loud UI primitives.</p>
              </div>

              <div nbCluster gap="xs">
                <span nbChip tone="yellow">Remote</span>
                <span nbChip tone="mint">Full-time</span>
                <span nbChip tone="pink">Urgent</span>
              </div>

              <div nbCluster gap="sm">
                <button nbButton tone="black">Apply</button>
                <button nbButton tone="white">Save</button>
              </div>
            </div>
          </article>
        </docs-example>
      </section>

      <section id="gap-values" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Gap values
        </h2>
        <p class="mb-5 text-base font-medium">
          Both Stack and Cluster use the same gap scale. Pick the right gap for
          the relationship between items - tight for related items, wider for
          distinct groups.
        </p>
        <div
          class="grid gap-4 border-3 border-(--nb-border) bg-white p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          @for (gap of gapValues; track gap.value) {
          <div class="flex items-center gap-6">
            <code class="w-16 shrink-0 font-mono text-sm font-bold">{{
              gap.value
            }}</code>
            <div nbStack [gap]="gap.value" class="flex-1">
              <div
                class="h-3 border-3 border-(--nb-border)"
                [style.background]="gap.color"
              ></div>
              <div
                class="h-3 border-3 border-(--nb-border)"
                [style.background]="gap.color"
              ></div>
            </div>
            <span class="w-32 shrink-0 text-sm font-medium opacity-70">{{
              gap.use
            }}</span>
          </div>
          }
        </div>
      </section>

      <section id="api" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Key inputs
        </h2>
        <div class="grid gap-3 sm:grid-cols-2">
          @for (input of keyInputs; track input.name) {
          <div
            class="border-3 border-(--nb-border) bg-white p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]"
          >
            <div class="flex items-center gap-2">
              <code class="font-mono text-sm font-black">{{ input.name }}</code>
              <span
                class="border border-(--nb-border) px-1.5 py-0.5 font-mono text-xs font-bold uppercase"
                [style.background]="
                  input.primitive === 'nbStack'
                    ? 'var(--nb-mint)'
                    : 'var(--nb-pink)'
                "
                >{{ input.primitive }}</span
              >
            </div>
            <p class="mt-1.5 text-sm font-medium text-black/70">
              {{ input.description }}
            </p>
          </div>
          }
        </div>
        <p class="mt-5 text-sm font-medium">
          See the full APIs:
          <a class="underline" routerLink="/components/stack">Stack</a>
          and
          <a class="underline" routerLink="/components/cluster">Cluster</a>.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StackAndClusterPage {
  protected readonly gapValues: {
    value: NbSpacing;
    color: string;
    use: string;
  }[] = [
    { value: 'xs', color: 'var(--nb-yellow)', use: 'Related items' },
    { value: 'sm', color: 'var(--nb-mint)', use: 'Tight groups' },
    { value: 'md', color: 'var(--nb-pink)', use: 'Card sections' },
    { value: 'lg', color: 'var(--nb-lavender)', use: 'Distinct regions' },
    { value: 'xl', color: 'var(--nb-cream)', use: 'Page sections' },
  ];

  protected readonly keyInputs = [
    {
      name: 'gap',
      primitive: 'nbStack',
      description: 'Vertical spacing - xs, sm, md, lg, xl',
    },
    {
      name: 'align',
      primitive: 'nbStack',
      description: 'Cross-axis - stretch, start, center, end',
    },
    {
      name: 'justify',
      primitive: 'nbStack',
      description: 'Main-axis - start, center, end, between',
    },
    {
      name: 'separator',
      primitive: 'nbStack',
      description: 'Divider between children - none, solid, dashed, thick',
    },
    {
      name: 'gap',
      primitive: 'nbCluster',
      description: 'Horizontal spacing - xs, sm, md, lg, xl',
    },
    {
      name: 'align',
      primitive: 'nbCluster',
      description: 'Cross-axis - start, center, end, baseline, stretch',
    },
    {
      name: 'justify',
      primitive: 'nbCluster',
      description: 'Main-axis - start, center, end, between',
    },
    {
      name: 'wrap',
      primitive: 'nbCluster',
      description: 'Wrapping - wrap (default), nowrap',
    },
  ];

  protected readonly stackExampleCode = `<div nbStack gap="md">
  <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 80%">Open role</h2>
  <span nbChip tone="mint">Hiring now</span>
  <p nbText>Compose content vertically with predictable spacing.</p>
  <button nbButton tone="yellow" size="lg">Apply now</button>
</div>`;

  protected readonly clusterExampleCode = `<div nbCluster gap="xs">
  <span nbChip tone="yellow">Angular</span>
  <span nbChip tone="mint">Signals</span>
  <span nbChip tone="pink">Zoneless</span>
  <span nbChip tone="lavender">TypeScript</span>
</div>`;

  protected readonly combinedCode = `<article nbSurface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong">
  <div nbStack gap="lg">
    <div nbStack gap="xs">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Senior Angular Engineer</h2>
      <p nbText tone="muted">Build loud UI primitives.</p>
    </div>

    <div nbCluster gap="xs">
      <span nbChip tone="yellow">Remote</span>
      <span nbChip tone="mint">Full-time</span>
      <span nbChip tone="pink">Urgent</span>
    </div>

    <div nbCluster gap="sm">
      <button nbButton tone="black">Apply</button>
      <button nbButton tone="white">Save</button>
    </div>
  </div>
</article>`;
}
