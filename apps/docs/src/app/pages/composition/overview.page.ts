import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NbButton,
  NbChip,
  NbCluster,
  NbDisplay,
  NbSection,
  NbSplit,
  NbStack,
  NbSurface,
  NbText,
  NbTitle,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';

@Component({
  selector: 'docs-composition-overview-page',
  imports: [
    RouterLink,
    DocsCodeBlock,
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
    NbTitle,
  ],
  template: `
    <article nbStack gap="2xl">
      <header id="overview" nbStack gap="sm" align="start" class="relative scroll-mt-32">
        <p class="eyebrow">Composition</p>
        <h1>Build loud. Compose smart.</h1>
        <p class="max-w-3xl text-base font-medium sm:text-lg">
          v0.2.0 introduces a composition system for building loud,
          token-driven, Angular-first brutalist UIs. Small primitives that lock
          together like LEGO — each primitive owns one job, and they compose to
          build anything.
        </p>
      </header>

      <section id="mental-model" nbStack gap="md" class="scroll-mt-32">
        <h2 data-docs-heading class="text-2xl font-bold">The mental model</h2>
        <p class="text-base font-medium">
          Every ng-brutalism UI starts with a surface. Regions inside that
          surface are sections. Content flows vertically in stacks and
          horizontally in clusters. Two-column layouts use split. Actions and
          metadata complete the picture.
        </p>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          @for (item of primitiveMap; track item.name) {
          <a
            class="block border-3 border-(--nb-border) p-4 shadow-[4px_4px_0_0_var(--nb-shadow)]"
            [style.background]="item.color"
            [routerLink]="item.path"
          >
            <code class="font-mono text-sm font-black">{{ item.name }}</code>
            <p class="mt-1 text-sm font-medium">{{ item.role }}</p>
          </a>
          }
        </div>
      </section>

      <section id="decision-guide" nbStack gap="md" class="scroll-mt-32">
        <h2 data-docs-heading class="text-2xl font-bold">Decision guide</h2>
        <div
          class="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]"
        >
          <div
            class="border-b border-white/20 px-5 py-3 font-mono text-xs font-bold tracking-[0.1em] uppercase text-white/70"
          >
            Which primitive do I need?
          </div>
          @for (entry of decisionGuide; track entry.need) {
          <div
            class="flex flex-wrap gap-x-6 gap-y-1 border-b border-white/10 px-5 py-3 last:border-none"
          >
            <span class="shrink-0 font-mono text-xs text-white/50">{{
              entry.need
            }}</span>
            <span
              class="font-mono text-sm font-bold"
              [style.color]="entry.color"
              >→ {{ entry.primitive }}</span
            >
          </div>
          }
        </div>
      </section>

      <section id="example" nbStack gap="md" class="scroll-mt-32">
        <h2 data-docs-heading class="text-2xl font-bold">Rendered example</h2>
        <p class="text-base font-medium">
          A complete panel built with composition primitives only — no class
          soup required.
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

      <section id="before-after" nbStack gap="md" class="scroll-mt-32 w-full">
        <h2 data-docs-heading class="text-2xl font-bold">Before / after</h2>
        <p class="text-base font-medium">
          The same brutalist card — one written with raw Tailwind classes, one
          with composition primitives.
        </p>
        <div nbStack class="w-full" gap="2xl" align="start">
          <div nbStack gap="xs" class="w-full">
            <p class="font-mono text-xs font-bold uppercase opacity-70">
              Before — class soup
            </p>
            <docs-code-block title="HTML" [code]="beforeCode" />
          </div>
          <div nbStack class="w-full" gap="xs">
            <p class="font-mono text-xs font-bold uppercase opacity-70">
              After — composition
            </p>
            <docs-code-block title="Template" [code]="afterCode" />
          </div>
        </div>
        <p class="text-base font-bold">Less class soup. More composition.</p>
      </section>

      <section id="api-language" nbStack gap="md" class="scroll-mt-32">
        <h2 data-docs-heading class="text-2xl font-bold">API language</h2>
        <p class="text-base font-medium">
          Every primitive in ng-brutalism speaks the same token vocabulary.
          Learn it once, use it everywhere.
        </p>
        <div class="grid gap-3 sm:grid-cols-2">
          @for (token of apiLanguage; track token.name) {
          <div
            class="border-3 border-(--nb-border) bg-white p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]"
          >
            <code class="font-mono text-sm font-black">{{ token.name }}</code>
            <p class="mt-1 text-sm font-medium text-black/70">
              {{ token.description }}
            </p>
          </div>
          }
        </div>
      </section>

      <section id="customization" nbStack gap="md" class="scroll-mt-32">
        <h2 data-docs-heading class="text-2xl font-bold">Customization</h2>
        <p class="text-base font-medium">
          Use public inputs first. Reach for CSS custom properties when presets
          are not enough. Keep overrides local so they only affect the element
          and its descendants.
        </p>
        <docs-code-block
          title="CSS variable override"
          [code]="customizationCode"
        />
      </section>

      <section id="explore" nbStack gap="md" class="scroll-mt-32">
        <h2 data-docs-heading class="text-2xl font-bold">Explore the system</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--yellow"
            routerLink="/composition/surface-and-section"
          >
            <span class="nb-stat-tile__value">Surface & Section</span>
            <span class="nb-stat-tile__label">Panels and regions</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--mint"
            routerLink="/composition/stack-and-cluster"
          >
            <span class="nb-stat-tile__value">Stack & Cluster</span>
            <span class="nb-stat-tile__label"
              >Vertical and horizontal flow</span
            >
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--pink"
            routerLink="/composition/split-layouts"
          >
            <span class="nb-stat-tile__value">Split Layouts</span>
            <span class="nb-stat-tile__label">Main / aside patterns</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--lavender"
            routerLink="/composition/common-patterns"
          >
            <span class="nb-stat-tile__value">Common Patterns</span>
            <span class="nb-stat-tile__label">Copy-pasteable recipes</span>
          </a>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompositionOverviewPage {
  protected readonly primitiveMap = [
    {
      name: 'nbSurface',
      role: 'The brutalist panel',
      color: 'var(--nb-yellow)',
      path: '/components/surface',
    },
    {
      name: 'nbSection',
      role: 'Regions inside a panel',
      color: 'var(--nb-mint)',
      path: '/components/section',
    },
    {
      name: 'nbStack',
      role: 'Vertical composition',
      color: 'var(--nb-pink)',
      path: '/components/stack',
    },
    {
      name: 'nbCluster',
      role: 'Horizontal / wrapping groups',
      color: 'var(--nb-lavender)',
      path: '/components/cluster',
    },
    {
      name: 'nbSplit',
      role: 'Main + aside layout',
      color: 'var(--nb-cream)',
      path: '/components/split',
    },
    {
      name: 'nbButton',
      role: 'Action primitive',
      color: '#ffffff',
      path: '/components/button',
    },
    {
      name: 'nbChip',
      role: 'Small metadata primitive',
      color: 'var(--nb-yellow)',
      path: '/components/chip',
    },
    {
      name: 'nbText',
      role: 'Inline / block copy',
      color: 'var(--nb-mint)',
      path: '/components/text',
    },
    {
      name: 'nbTitle',
      role: 'Section heading',
      color: 'var(--nb-pink)',
      path: '/components/title',
    },
    {
      name: 'nbDisplay',
      role: 'Big loud heading',
      color: 'var(--nb-lavender)',
      path: '/components/display',
    },
  ];

  protected readonly decisionGuide = [
    {
      need: 'Need a panel?',
      primitive: 'nbSurface',
      color: 'var(--nb-yellow)',
    },
    {
      need: 'Need header / body / footer inside a panel?',
      primitive: 'nbSection',
      color: 'var(--nb-mint)',
    },
    {
      need: 'Need vertical spacing?',
      primitive: 'nbStack',
      color: 'var(--nb-pink)',
    },
    {
      need: 'Need horizontal or wrapping items?',
      primitive: 'nbCluster',
      color: 'var(--nb-lavender)',
    },
    {
      need: 'Need two columns or main/aside?',
      primitive: 'nbSplit',
      color: 'var(--nb-cream)',
    },
    {
      need: 'Need an action?',
      primitive: 'nbButton or nbIconButton',
      color: '#ffffff',
    },
    {
      need: 'Need metadata?',
      primitive: 'nbChip or nbBadge',
      color: 'var(--nb-yellow)',
    },
    {
      need: 'Need emphasis text?',
      primitive: 'nbTitle, nbDisplay, or nbText',
      color: 'var(--nb-mint)',
    },
    {
      need: 'Need status?',
      primitive: 'nbStatusDot, nbBadge, or nbCallout',
      color: 'var(--nb-pink)',
    },
  ];

  protected readonly apiLanguage = [
    { name: 'tone', description: 'Visual intent / color theme' },
    { name: 'size', description: 'Component scale' },
    { name: 'radius', description: 'Corner shape' },
    { name: 'shadow', description: 'Brutalist offset depth' },
    { name: 'border', description: 'Outline strength' },
    { name: 'padding', description: 'Internal space' },
    { name: 'gap', description: 'Child spacing' },
    { name: 'align', description: 'Cross-axis alignment' },
    { name: 'justify', description: 'Main-axis alignment' },
    { name: 'collapse', description: 'Responsive layout behavior' },
    { name: 'clip', description: 'Keep inner regions inside the outer radius' },
    {
      name: 'divider',
      description: 'Border between regions — top, bottom, etc.',
    },
  ];

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

  protected readonly beforeCode = `<div
  class="rounded-2xl border-4 border-black
         bg-yellow-300 p-6
         shadow-[8px_8px_0_#000]"
>
  <div
    class="flex items-center justify-between
           border-b-4 border-black pb-4"
  >
    <h2>Launch card</h2>
    <span>v0.2.0</span>
  </div>

  <div class="py-4">
    <p>Lots of repeated class decisions.</p>
  </div>
</div>`;

  protected readonly afterCode = `<article nbSurface tone="yellow" radius="xl"
         shadow="hard" clip>
  <header nbSection padding="lg" divider="bottom"
          layout="between" align="center">
    <h2 nbTitle>Launch card</h2>
    <span nbChip tone="pink">v0.2.0</span>
  </header>

  <div nbSection padding="lg">
    <p nbText>Same structure, clearer composition.</p>
  </div>
</article>`;

  protected readonly customizationCode = `<div nbSurface tone="cream" radius="xl" shadow="hard">
  Token-driven surface
</div>

<div
  nbSurface
  tone="cream"
  style="--nb-surface-bg: #faf6f0"
>
  Custom surface background
</div>

<div
  nbSurface
  style="--nb-shadow-offset-x: 12px; --nb-shadow-offset-y: 12px"
>
  Custom shadow offset
</div>`;
}
