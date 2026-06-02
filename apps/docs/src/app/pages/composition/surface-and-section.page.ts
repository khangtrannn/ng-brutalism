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

import { DocsExample } from '../../docs/docs-example';

@Component({
  selector: 'docs-composition-surface-section-page',
  imports: [
    RouterLink,
    DocsExample,
    NbSurface,
    NbSection,
    NbStack,
    NbCluster,
    NbChip,
    NbText,
    NbDisplay,
    NbButton,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <p class="eyebrow">Composition</p>
        <h1>Surface & Section</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          <code class="font-mono">nbSurface</code> creates the outer brutalist
          container. <code class="font-mono">nbSection</code> creates internal
          regions. Together they replace repeated card shell markup with a
          clear, intentional structure.
        </p>
      </header>

      <section id="relationship" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          How they relate
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            class="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">nbSurface</h3>
            <p class="mt-2 text-sm font-medium">
              The outer container. Owns the tone, radius, shadow, and border of
              the whole card shell. Use <code class="font-mono">clip</code> to
              keep inner regions within the surface radius.
            </p>
          </div>
          <div
            class="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">nbSection</h3>
            <p class="mt-2 text-sm font-medium">
              An inner region. Owns its own padding and optional divider
              borders. Use <code class="font-mono">divider="top"</code> or
              <code class="font-mono">divider="bottom"</code> to structure the
              panel into clear zones. Use
              <code class="font-mono">divider="block"</code> for top + bottom
              and <code class="font-mono">divider="inline"</code> for left +
              right.
            </p>
          </div>
        </div>
      </section>

      <section id="basic-panel" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Basic panel
        </h2>
        <p class="mb-6 text-base font-medium">
          A surface with a header region and a body region — the minimal card
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
                  style="--nb-underline-width: 45%"
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

      <section id="clip" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          The clip input
        </h2>
        <p class="mb-5 text-base font-medium">
          When a surface has a non-zero radius, add
          <code class="font-mono">clip</code> so that section backgrounds,
          dividers, and other inner content respect the outer rounded corners.
          Without <code class="font-mono">clip</code>, inner backgrounds bleed
          through the corners.
        </p>
        <docs-example [code]="clipCode">
          <div class="grid w-full gap-5 sm:grid-cols-2">
            <div>
              <p class="mb-2 font-mono text-xs font-bold uppercase opacity-70">
                With clip
              </p>
              <article
                nbSurface
                tone="pink"
                radius="xl"
                shadow="hard"
                border="strong"
                clip
                class="relative w-full"
              >
                <header
                  nbSection
                  padding="md"
                  divider="bottom"
                  class="relative min-h-32 bg-(--nb-blue) text-white"
                >
                  <div
                    class="absolute -right-5 -top-5 size-16 rounded-full border-2 border-(--nb-border) bg-(--nb-yellow)"
                    aria-hidden="true"
                  ></div>
                  <div
                    class="absolute -left-8 bottom-5 h-5 w-36 rotate-[-12deg] border-2 border-(--nb-border) bg-(--nb-primary)"
                    aria-hidden="true"
                  ></div>
                  <h3
                    nbText
                    size="2xl"
                    weight="black"
                    leading="tight"
                    class="relative z-10"
                  >
                    With clip
                  </h3>
                </header>
                <div nbSection padding="md">
                  <p nbText size="sm">
                    The pushed-out dot and stripe are cut at the rounded edge.
                  </p>
                </div>
              </article>
            </div>
            <div>
              <p class="mb-2 font-mono text-xs font-bold uppercase opacity-70">
                Without clip
              </p>
              <article
                nbSurface
                tone="lavender"
                radius="xl"
                shadow="hard"
                border="strong"
                class="relative w-full"
              >
                <header
                  nbSection
                  padding="md"
                  divider="bottom"
                  class="relative min-h-32 bg-(--nb-blue) text-white"
                >
                  <div
                    class="absolute -right-5 -top-5 size-16 rounded-full border-2 border-(--nb-border) bg-(--nb-yellow)"
                    aria-hidden="true"
                  ></div>
                  <div
                    class="absolute -left-8 bottom-5 h-5 w-36 rotate-[-12deg] border-2 border-(--nb-border) bg-(--nb-primary)"
                    aria-hidden="true"
                  ></div>
                  <h3
                    nbText
                    size="2xl"
                    weight="black"
                    leading="tight"
                    class="relative z-10"
                  >
                    Without clip
                  </h3>
                </header>
                <div nbSection padding="md">
                  <p nbText size="sm">
                    The same inner children spill past the surface radius.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="when-to-use" class="scroll-mt-32">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          When to use Surface & Section
        </h2>
        <div
          class="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]"
        >
          <div
            class="border-b border-white/20 px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white/60"
          >
            Reach for this pattern when…
          </div>
          @for (use of whenToUse; track use) {
          <div
            class="flex gap-3 border-b border-white/10 px-5 py-3 last:border-none"
          >
            <span
              class="mt-1.5 inline-block h-2 w-2 shrink-0 border-2 border-(--nb-yellow) bg-(--nb-yellow)"
              aria-hidden="true"
            ></span>
            <span class="text-sm font-medium">{{ use }}</span>
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
                class="font-mono text-xs font-bold uppercase px-1.5 py-0.5 border border-(--nb-border)"
                [style.background]="
                  input.primitive === 'nbSurface'
                    ? 'var(--nb-yellow)'
                    : 'var(--nb-mint)'
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
          <a class="underline" routerLink="/components/surface">Surface</a>
          and
          <a class="underline" routerLink="/components/section">Section</a>.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SurfaceAndSectionPage {
  protected readonly whenToUse = [
    'You need a card, panel, docs example, callout shell, dashboard widget, or recipe card',
    'The UI has distinct header, body, and footer zones',
    'You want dividers to feel intentional rather than manually applied',
    'You want the outer shape (radius, shadow, border) defined in one place',
  ];

  protected readonly keyInputs = [
    {
      name: 'tone',
      primitive: 'nbSurface',
      description:
        'Color theme — cream, yellow, pink, mint, lavender, black, white, etc.',
    },
    {
      name: 'radius',
      primitive: 'nbSurface',
      description: 'Corner shape — none, xs, sm, md, lg, xl, full',
    },
    {
      name: 'shadow',
      primitive: 'nbSurface',
      description: 'Brutalist offset depth — none, sm, default, hard, heavy',
    },
    {
      name: 'border',
      primitive: 'nbSurface',
      description: 'Outline strength — none, thin, default, strong, thick',
    },
    {
      name: 'clip',
      primitive: 'nbSurface',
      description: 'Boolean. Clips inner content to the surface radius.',
    },
    {
      name: 'padding',
      primitive: 'nbSection',
      description: 'Internal space — none, xs, sm, md, lg, xl',
    },
    {
      name: 'divider',
      primitive: 'nbSection',
      description:
        'Divider position — top, bottom, left, right, block (top + bottom), inline (left + right), all, none',
    },
    {
      name: 'layout',
      primitive: 'nbSection',
      description: 'Flex layout — default, center, between',
    },
  ];

  protected readonly basicPanelCode = `<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <header nbSection padding="lg" divider="bottom">
    <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Profile</h2>
  </header>

  <div nbSection padding="lg">
    <p nbText>Chunky card shell with clear regions.</p>
  </div>
</article>`;

  protected readonly headerBodyFooterCode = `<article nbSurface tone="yellow" radius="xl" border="thick" shadow="hard" clip>
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Campaign draft</h2>
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

  protected readonly clipCode = `<!-- clip keeps inner content within the radius -->
<article nbSurface tone="cream" radius="xl" shadow="hard" clip class="relative">
  <header nbSection padding="md" divider="bottom" class="relative bg-(--nb-blue)">
    <div class="absolute -right-5 -top-5 size-16 rounded-full bg-(--nb-yellow)"></div>
    <div class="absolute -left-8 bottom-5 h-5 w-36 rotate-[-12deg] bg-(--nb-primary)"></div>
  </header>
  <div nbSection padding="md">Decorative children are clipped by the surface.</div>
</article>

<!-- without clip, the same children can bleed through rounded corners -->
<article nbSurface tone="cream" radius="xl" shadow="hard" class="relative">
  <header nbSection padding="md" divider="bottom" class="relative bg-(--nb-blue)">
    <div class="absolute -right-5 -top-5 size-16 rounded-full bg-(--nb-yellow)"></div>
    <div class="absolute -left-8 bottom-5 h-5 w-36 rotate-[-12deg] bg-(--nb-primary)"></div>
  </header>
  <div nbSection padding="md">Decorative children can spill outside the surface.</div>
</article>`;
}
