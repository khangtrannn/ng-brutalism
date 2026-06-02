import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../../docs/docs-code-block';
import { DocsSourceTile } from '../../../docs/docs-source-tile';

import { PodcastCard } from './podcast-card';

@Component({
  selector: 'docs-recipe-podcast-card-page',
  imports: [DocsCodeBlock, DocsSourceTile, PodcastCard, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Podcast Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A loud podcast episode card composing surface, display, chip, media
            item, icon, and button primitives into a reusable audio-content
            layout. Demonstrates that the same primitive building blocks compose
            across media types — travel, jobs, and now audio.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">{{ primitives.length }}</span>
            <span class="nb-stat-tile__label">primitives</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">100%</span>
            <span class="nb-stat-tile__label">Composed</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/podcast-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>

        <recipe-podcast-card />
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/podcast-card"
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
              class="inline-block size-2 border-2 border-(--nb-border) bg-(--nb-pink)"
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
              style="color: var(--nb-pink)"
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
export default class PodcastCardRecipePage {
  protected readonly primitives = [
    {
      name: 'nbSurface',
      path: '/components/surface',
      role: 'bordered card shell and audio player panels',
    },
    {
      name: 'nbStack',
      path: '/components/stack',
      role: 'vertical rhythm for metadata and host sections',
    },
    {
      name: 'nbCluster',
      path: '/components/cluster',
      role: 'inline metadata chips and host identity row',
    },
    {
      name: 'nbSection',
      path: '/components/section',
      role: 'padded content regions with borders',
    },
    {
      name: 'nbDisplay',
      path: '/components/display',
      role: 'episode title mega heading',
    },
    {
      name: 'nbText',
      path: '/components/text',
      role: 'description, host name, role, and status copy',
    },
    {
      name: 'nbChip',
      path: '/components/chip',
      role: 'podcast badge, episode number, and metadata tags',
    },
    {
      name: 'nbStatusDot',
      path: '/components/status-dot',
      role: 'live "on air" indicator next to the host',
    },
    {
      name: 'nbIcon',
      path: '/components/icon',
      role: 'microphone, clock, sparkle, user, bookmark, and arrow icons',
    },
    {
      name: 'nbButton',
      path: '/components/button',
      role: 'listen now call to action',
    },
    {
      name: 'nbButtonTrailingIcon',
      path: '/components/button',
      role: 'CTA arrow affordance inside the button',
    },
    {
      name: 'nbIconButton',
      path: '/components/icon-button',
      role: 'bookmark / save episode action',
    },
    {
      name: 'nbSticker',
      path: '/components/sticker',
      role: 'overflowing star and splat decorations',
    },
    {
      name: 'nbStickerFace',
      path: '/components/sticker',
      role: 'smiling face inside the star sticker',
    },
    {
      name: 'nbHalftone',
      path: '/components/halftone',
      role: 'dotted halftone flourish in the host row',
    },
  ];

  protected readonly layoutBreakdown = [
    {
      primitive: 'nbSurface',
      description:
        'Outer card shell and inner audio player panel — cream tone, hard shadow, clip.',
    },
    {
      primitive: 'nbSection',
      description:
        'Each distinct content band (header, brand, episode badge, title, meta, host, player, footer) is a padded section. The host and footer sections use top dividers.',
    },
    {
      primitive: 'nbStack',
      description:
        'Vertical rhythm for host identity (name, role, on-air status).',
    },
    {
      primitive: 'nbCluster',
      description:
        'Inline metadata chips, host identity row, and footer action row.',
    },
    { primitive: 'nbDisplay', description: 'Episode title mega heading.' },
    {
      primitive: 'nbChip',
      description:
        'Podcast badge, episode number, and metadata tags (duration, new, category).',
    },
    {
      primitive: 'nbButton',
      description: 'Listen Now primary call to action.',
    },
    {
      primitive: 'nbSticker',
      description: 'Overflowing star and splat decorative elements.',
    },
    {
      primitive: 'nbHalftone',
      description: 'Dotted halftone flourish behind the host row.',
    },
  ];

  protected readonly importCode = `import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbCluster,
  NbDisplay,
  NbHalftone,
  NbIcon,
  NbIconButton,
  NbSection,
  NbStack,
  NbStatusDot,
  NbSticker,
  NbStickerFace,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';`;

  protected readonly skeletonCode = `<article nbSurface>
  <header nbSection>
    <div nbCluster>
      ...
    </div>
  </header>

  <section nbSection>
    <div nbStack>
      ...
    </div>
  </section>

  <section nbSection divider="top">
    <div nbCluster>
      ...
    </div>
  </section>

  <footer nbSection>
    <div nbCluster>
      ...
    </div>
  </footer>
</article>`;

  protected readonly templateCode = `<div nbCluster justify="center" padding="lg" class="podcast-stage">
<div nbSurface clip tone="cream" border="strong" shadow="hard" radius="xl">
  <!-- Header: podcast chip + menu -->
  <div nbSection padding="lg">
    <div nbCluster gap="md" align="center" justify="between">
      <span nbChip tone="pink" radius="md" class="uppercase font-bold">
        <span nbIcon src="/podcast-card/microphone.svg" decorative></span>
        Podcast
      </span>
      <button aria-label="Episode menu">•••</button>
    </div>
  </div>

  <!-- Brand row -->
  <div nbSection padding="lg">
    <div nbCluster gap="md" align="center">
      <img src="/podcast-card/bfm-logo.png" alt="Build Loud FM logo" />
      <span nbText weight="extrabold">Build Loud FM</span>
    </div>
  </div>

  <!-- Episode badge -->
  <div nbSection padding="lg">
    <span nbChip tone="yellow" radius="md" class="uppercase font-bold">
      EP 42
    </span>
  </div>

  <!-- Hero title -->
  <div nbSection padding="lg">
    <h1 nbDisplay class="uppercase">
      Design<br />Systems<br />That Scale
    </h1>
  </div>

  <!-- Metadata chips -->
  <div nbSection padding="lg">
    <div nbChipGroup gap="sm" radius="sm" shadow="none" transform="uppercase">
      <span nbChip tone="mint" class="text-xs">
        <span nbIcon src="/podcast-card/clock.svg" decorative></span>
        45 MIN
      </span>
      <span nbChip tone="lavender" class="text-xs">
        <span nbIcon src="/podcast-card/sparkle.svg" decorative></span>
        NEW
      </span>
      <span nbChip tone="pink" class="text-xs">
        <span nbIcon src="/podcast-card/user.svg" decorative></span>
        UX
      </span>
    </div>
  </div>

  <!-- Description -->
  <div nbSection padding="lg">
    <p nbText size="md" weight="medium" tone="muted">
      Practical strategies for building design systems that grow with your product.
    </p>
  </div>

  <!-- Host section -->
  <div nbSection divider="top" padding="lg">
    <div nbCluster gap="lg" align="center">
      <img src="/podcast-card/avatar.png" alt="Kai Nguyen"
           class="w-16 h-16 rounded-full" />
      <div nbStack gap="xs">
        <span nbText size="lg" weight="bold">Kai Nguyen</span>
        <span nbText size="sm" tone="muted">Host</span>
        <span class="flex items-center gap-1.5">
          <span nbStatusDot state="online"></span>
          <span nbText size="xs" weight="bold" class="uppercase">On Air</span>
        </span>
      </div>
    </div>
    <div nbHalftone shape="rectangle" [rows]="3" [columns]="13"
         [size]="8" [gapX]="28" [gapY]="27"
         class="absolute left-6 top-6 -z-10"></div>
  </div>

  <!-- Audio player (waveform asset) -->
  <div nbSection padding="lg">
    <img src="/podcast-card/timeline.png" alt="Episode player" class="w-full" />
  </div>

  <!-- Footer actions -->
  <div nbSection padding="lg">
    <div nbCluster gap="md" justify="between">
      <button nbButton tone="lavender" size="xl" radius="md" class="flex-1">
        <span nbText size="3xl" weight="black" transform="uppercase" tracking="wide">
          Listen Now
        </span>
        <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md"
              icon="/podcast-card/arrow.svg"></span>
      </button>
      <button nbIconButton shape="square" size="xl" radius="md" tone="background"
              icon="/podcast-card/bookmark.svg" aria-label="Save episode"></button>
    </div>
  </div>

  <!-- Overflowing decorations -->
  <nb-sticker shape="star" tone="lavender" [rotate]="10">
    <nb-sticker-face />
  </nb-sticker>
  <nb-sticker shape="splat" tone="pink" decorative [rotate]="-12"></nb-sticker>
</div>
</div>`;
}
