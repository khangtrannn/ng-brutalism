import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../../docs/docs-code-block';
import { DocsSourceTile } from '../../../docs/docs-source-tile';

import { TravelCard } from './travel-card';

@Component({
  selector: 'docs-recipe-travel-card-page',
  imports: [DocsCodeBlock, DocsSourceTile, TravelCard, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Travel Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A bold travel-package card composing the library's media, sticker,
            chip, and display primitives into a single brutalist promo. Hero
            banner, trip highlights, price, and a call to action — responsive
            down to mobile.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">{{ primitives.length }}</span>
            <span class="nb-stat-tile__label">primitives</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">100%</span>
            <span class="nb-stat-tile__label">Composed</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/travel-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>

        <recipe-travel-card />
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/travel-card"
            target="_blank"
            rel="noreferrer"
            >example source</a
          >
          for the full implementation.
        </p>
        <docs-code-block
          class="block mb-5"
          title="Imports"
          [code]="importCode"
        />
        <docs-code-block
          class="block mb-5"
          title="Composition skeleton"
          [code]="skeletonCode"
        />
        <docs-code-block title="Template" [code]="templateCode" />
      </section>

      <section id="primitives">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Primitives used
        </h2>
        <ul class="space-y-2 text-base font-medium">
          @for (item of primitives; track item.path) {
          <li class="flex items-center gap-2">
            <span
              class="inline-block size-2 border-2 border-(--nb-border) bg-(--nb-yellow)"
              aria-hidden="true"
            ></span>
            <a class="underline" [routerLink]="item.path">{{ item.name }}</a>
            <span class="text-sm font-normal opacity-80"
              >— {{ item.role }}</span
            >
          </li>
          }
        </ul>
      </section>

      <section id="layout-breakdown">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Layout breakdown
        </h2>
        <div
          class="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]"
        >
          <div
            class="border-b border-white/20 px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white/60"
          >
            How it is composed
          </div>
          @for (step of layoutBreakdown; track step.primitive) {
          <div
            class="flex flex-wrap gap-x-6 gap-y-1 border-b border-white/10 px-5 py-3 last:border-none"
          >
            <code
              class="shrink-0 font-mono text-sm font-black"
              style="color: var(--nb-yellow)"
              >{{ step.primitive }}</code
            >
            <span class="text-sm font-medium">{{ step.description }}</span>
          </div>
          }
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TravelCardRecipePage {
  protected readonly primitives = [
    {
      name: 'nbSurface',
      path: '/components/surface',
      role: 'bordered card shell',
    },
    {
      name: 'nbMediaFrame',
      path: '/components/media-frame',
      role: 'hero banner image',
    },
    {
      name: 'nbSticker',
      path: '/components/sticker',
      role: '4D/3N highlight burst',
    },
    {
      name: 'nbDisplay',
      path: '/components/display',
      role: 'destination mega title',
    },
    {
      name: 'nbStack',
      path: '/components/stack',
      role: 'vertical rhythm for card regions',
    },
    {
      name: 'nbSplit',
      path: '/components/split',
      role: 'responsive main-and-aside layout',
    },
    {
      name: 'nbSection',
      path: '/components/section',
      role: 'section border and padding',
    },
    {
      name: 'nbText',
      path: '/components/text',
      role: 'body copy and brand text',
    },
    {
      name: 'nbChip',
      path: '/components/chip',
      role: 'flight / hotel / top-pick tags',
    },
    {
      name: 'nbIcon',
      path: '/components/icon',
      role: 'decorative chip and button icons',
    },
    { name: 'nbCallout', path: '/components/callout', role: 'price callout' },
    {
      name: 'nbCluster',
      path: '/components/cluster',
      role: 'logo row and wrapping feature group',
    },
    {
      name: 'nbMediaItem',
      path: '/components/media-item',
      role: 'icon + label trip features',
    },
    {
      name: 'nbButton',
      path: '/components/button',
      role: 'book trip call to action',
    },
    {
      name: 'nbButtonTrailingIcon',
      path: '/components/button',
      role: 'button icon treatment',
    },
  ];

  protected readonly importCode = `import {
  NbButton,
  NbButtonTrailingIcon,
  NbCallout,
  NbChip,
  NbCluster,
  NbDisplay,
  NbIcon,
  NbMediaFrame,
  NbMediaItem,
  NbMediaItemTitle,
  NbSection,
  NbSplit,
  NbStack,
  NbSticker,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';`;

  protected readonly skeletonCode = `<article nbSurface>
  <div nbMediaFrame>
    ...
  </div>

  <div nbSplit>
    <section nbStack>
      ...
    </section>

    <aside nbStack>
      ...
    </aside>
  </div>

  <footer nbSection divider="top">
    <div nbSplit>
      ...
    </div>
  </footer>
</article>`;

  protected readonly layoutBreakdown = [
    {
      primitive: 'nbSurface',
      description:
        'Outer card shell — owns tone, radius, shadow, border, and clip.',
    },
    {
      primitive: 'nbMediaFrame',
      description: 'Hero banner image filling the full card width at the top.',
    },
    {
      primitive: 'nbSticker',
      description: '4D / 3N highlight burst floating over the hero image.',
    },
    {
      primitive: 'nbSplit',
      description:
        'Two-column responsive layout separating headline/description from tags/price.',
    },
    {
      primitive: 'nbStack',
      description:
        'Vertical rhythm within the headline column and the tag/price column.',
    },
    {
      primitive: 'nbCluster',
      description: 'Logo row and wrapping chip group for trip features.',
    },
    {
      primitive: 'nbSection',
      description: 'Feature strip at the bottom — padded with a top divider.',
    },
    {
      primitive: 'nbCallout',
      description: 'Price highlight — large, loud, and offset-shadowed.',
    },
    {
      primitive: 'nbChip',
      description: 'Flight, hotel, and top-pick metadata tags.',
    },
    {
      primitive: 'nbButton',
      description: 'Book Trip call-to-action at the bottom.',
    },
  ];

  protected readonly templateCode = `<div nbCluster justify="center" padding="xl" class="travel-stage">
<div nbSurface clip tone="cream" border="strong" shadow="hard" radius="xl">
  <div class="relative">
    <nb-sticker
      shape="burst"
      tone="mint"
      [rotate]="-12"
      aria-label="4 days, 3 nights"
      class="absolute top-2 left-2 z-20"
    >
      4D<br />/ 3N
    </nb-sticker>

    <div nbMediaFrame ratio="21/9" radius="none" shadow="none" border="none">
      <img src="/tokyo-city-escape/hero-illustration.png" alt="Illustrated Tokyo" />
    </div>
  </div>

  <div nbSplit ratio="2:1" gap="xl" padding="lg" collapse="md" separator="solid">
    <div nbStack gap="lg">
      <div nbCluster gap="md" align="center">
        <img src="/tokyo-city-escape/roam-go-logo.png" alt="Roam & Go logo" class="w-16" />
        <span nbText size="xl" weight="extrabold">Roam &amp; Go</span>
      </div>
      <h1 nbDisplay class="uppercase">Tokyo<br />City Escape</h1>
      <p nbText size="md" weight="medium" tone="muted" measure="md">
        Explore iconic neighborhoods, savor local flavors…
      </p>
    </div>

    <div nbStack gap="lg" align="start">
      <div nbChipGroup direction="vertical" gap="sm" align="start"
           radius="sm" shadow="none" transform="uppercase" tracking="wide">
        <span nbChip tone="mint">
          <span nbIcon src="/tokyo-city-escape/nb-plane-fill.svg" size="sm" decorative></span>
          Flight included
        </span>
        <span nbChip tone="lavender">Hotel</span>
        <span nbChip tone="pink">Top pick</span>
      </div>
      <div nbCallout tone="yellow" size="xl" shadow="hard">$799</div>
    </div>
  </div>

  <div nbSection divider="top" padding="lg">
    <div nbSplit ratio="2:1" gap="lg" collapse="md">
      <div nbCluster gap="lg" align="center" separator="dashed">
        <nb-media-item size="xs" icon="/tokyo-city-escape/central-locations.png">
          <span nbMediaItemTitle>Central<br />Locations</span>
        </nb-media-item>
        <nb-media-item size="xs" icon="/tokyo-city-escape/guided-experiences.png">
          <span nbMediaItemTitle>Guided<br />Experiences</span>
        </nb-media-item>
        <nb-media-item size="xs" icon="/tokyo-city-escape/24-7-support.png">
          <span nbMediaItemTitle>24/7<br />Support</span>
        </nb-media-item>
      </div>

      <button nbButton tone="lavender" size="xl" radius="md">
        <span nbText size="xl" weight="black" transform="uppercase" tracking="wide">
          Book Trip
        </span>
        <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md">
          <span nbIcon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative></span>
        </span>
      </button>
    </div>
  </div>
</div>
</div>`;
}
