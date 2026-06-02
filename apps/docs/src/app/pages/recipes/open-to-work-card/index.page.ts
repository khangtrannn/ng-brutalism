import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../../docs/docs-code-block';
import { DocsSourceTile } from '../../../docs/docs-source-tile';

import { OpenToWorkCard } from './open-to-work-card';

@Component({
  selector: 'docs-recipe-open-to-work-card-page',
  imports: [DocsCodeBlock, DocsSourceTile, OpenToWorkCard, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Open to Work Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A loud profile card composition for portfolios, hiring pages, and
            creator profiles. Composes surface, media frame, chips, icon
            actions, button, and decorative sticker primitives into a real
            personal profile card — proof that ng-brutalism builds product UI,
            not just isolated demos.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">{{ primitives.length }}</span>
            <span class="nb-stat-tile__label">primitives</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">100%</span>
            <span class="nb-stat-tile__label">Composed</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/open-to-work-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>

        <recipe-open-to-work-card />
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/open-to-work-card"
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
              class="inline-block size-2 border-2 border-(--nb-border) bg-(--nb-mint)"
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
              style="color: var(--nb-mint)"
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
export default class OpenToWorkCardRecipePage {
  protected readonly primitives = [
    {
      name: 'nbSurface',
      path: '/components/surface',
      role: 'bordered card shell',
    },
    {
      name: 'nbSplit',
      path: '/components/split',
      role: 'portrait/identity and socials/CTA two-column layouts',
    },
    {
      name: 'nbStack',
      path: '/components/stack',
      role: 'vertical rhythm for identity and skills/bio',
    },
    {
      name: 'nbCluster',
      path: '/components/cluster',
      role: 'wrapping social icon button row',
    },
    {
      name: 'nbSection',
      path: '/components/section',
      role: 'padded skills/bio and divided footer regions',
    },
    {
      name: 'nbMediaFrame',
      path: '/components/media-frame',
      role: 'pink portrait frame with object-fit cover',
    },
    {
      name: 'nbDisplay',
      path: '/components/display',
      role: 'huge uppercase name heading',
    },
    {
      name: 'nbText',
      path: '/components/text',
      role: 'role label, bio, and CTA label',
    },
    {
      name: 'nbChip',
      path: '/components/chip',
      role: 'open-to-work status and skill tags',
    },
    {
      name: 'nbIconButton',
      path: '/components/icon-button',
      role: 'circular social action buttons',
    },
    {
      name: 'nbButton',
      path: '/components/button',
      role: 'view profile call to action',
    },
    {
      name: 'nbButtonTrailingIcon',
      path: '/components/button',
      role: 'circular arrow affordance inside the CTA',
    },
    {
      name: 'nbSticker',
      path: '/components/sticker',
      role: 'overflowing star decoration with a smiling face',
    },
  ];

  protected readonly layoutBreakdown = [
    {
      primitive: 'nbSurface',
      description:
        'Outer card shell — cream tone, xl radius, hard shadow, and clip.',
    },
    {
      primitive: 'nbSplit',
      description:
        'Two-column layout: portrait frame on the left, identity stack on the right. Also used in the footer for socials vs CTA.',
    },
    {
      primitive: 'nbStack',
      description:
        'Vertical rhythm for name, role label, and skill/bio content.',
    },
    {
      primitive: 'nbCluster',
      description: 'Wrapping row for social icon buttons.',
    },
    {
      primitive: 'nbSection',
      description: 'Padded skill/bio region and divided footer region.',
    },
    {
      primitive: 'nbMediaFrame',
      description: 'Pink portrait frame with object-fit cover ratio.',
    },
    { primitive: 'nbDisplay', description: 'Large uppercase name heading.' },
    {
      primitive: 'nbChip',
      description: 'Open-to-work status badge and skill tags.',
    },
    {
      primitive: 'nbButton',
      description: 'View Profile primary call to action.',
    },
    {
      primitive: 'nbSticker',
      description: 'Overflowing star decoration with a smiling face.',
    },
  ];

  protected readonly importCode = `import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbChipGroup,
  NbCluster,
  NbDisplay,
  NbIconButton,
  NbMediaFrame,
  NbSection,
  NbSplit,
  NbStack,
  NbStatusDot,
  NbSticker,
  NbStickerFace,
  NbSurface,
  NbText,
  NbTypography,
} from '@ng-brutalism/ui';`;

  protected readonly skeletonCode = `<article nbSurface>
  <div nbSplit>
    <div nbMediaFrame>
      ...
    </div>

    <section nbStack>
      ...
    </section>
  </div>

  <section nbSection>
    <div nbStack>
      ...
    </div>
  </section>

  <footer nbSection divider="top">
    <div nbSplit>
      ...
    </div>
  </footer>
</article>`;

  protected readonly templateCode = `<div nbCluster justify="center" padding="xl" class="otw-stage">
<article nbSurface tone="cream" border="strong" shadow="hard" radius="xl"
         class="relative max-w-[860px]">
  <!-- Decorative star sticker overflowing the corner -->
  <nb-sticker shape="star" tone="pink" decorative [rotate]="10"
              class="absolute -top-7 -right-4 z-20">
    <nb-sticker-face />
  </nb-sticker>

  <!-- Top: portrait + identity -->
  <div nbSplit ratio="1:1" gap="xl" padding="lg" collapse="sm" align="start">
    <div nbMediaFrame ratio="3/4" tone="pink" border="strong" radius="lg" shadow="none">
      <img src="/open-to-work/khang-avatar.png" alt="Illustration of Nora Chen" />
    </div>

    <div nbStack gap="none" align="start">
      <span nbChip tone="mint" radius="md" class="font-bold uppercase">
        <span nbStatusDot state="online"></span>
        Open to work
      </span>

      <h1 nbDisplay size="lg" fluid class="mt-8 mb-0 uppercase whitespace-nowrap">Nora<br />Chen</h1>

      <div nbStack gap="xs" align="start">
        <span nbText size="2xl" weight="bold" underline="bar"
              underlineGap="xs" underlineWidth="md"
              style="--nb-underline-color: var(--otw-pink)">
          Product Designer
        </span>
      </div>

      <!-- Decorative dotted grid (docs-local CSS, radial-gradient dots) -->
      <span class="otw-dots block" aria-hidden="true"></span>
    </div>
  </div>

  <!-- Skills + bio -->
  <div nbSection padding="lg">
    <div nbStack gap="lg" align="start">
      <div nbChipGroup gap="sm" radius="sm" shadow="hard"
           transform="uppercase" tracking="wide">
        <span nbChip nbTypography font="display" tone="blue">UX</span>
        <span nbChip nbTypography font="display" tone="lavender">Design Systems</span>
        <span nbChip nbTypography font="display" tone="pink">Figma</span>
      </div>

      <p nbText size="lg" weight="medium" measure="md">
        Designing intuitive, accessible, and delightful experiences that make an impact.
      </p>
    </div>
  </div>

  <!-- Footer: socials + CTA -->
  <div nbSection divider="top" padding="lg">
    <div nbSplit ratio="1:1" gap="lg" collapse="sm" align="center">
      <div nbCluster gap="sm" align="center">
        <button nbIconButton shape="circle" size="lg" shadow="none" tone="mint"
                icon="/open-to-work/linkedin-icon.png" aria-label="Nora Chen on LinkedIn"></button>
        <button nbIconButton shape="circle" size="lg" shadow="none" tone="lavender"
                icon="/open-to-work/twitter-icon.png" aria-label="Nora Chen on Twitter"></button>
        <button nbIconButton shape="circle" size="lg" shadow="none" tone="pink"
                icon="/open-to-work/globe-icon.png" aria-label="Nora Chen personal site"></button>
        <button nbIconButton shape="circle" size="lg" shadow="none" tone="yellow"
                icon="/open-to-work/email-icon.png" aria-label="Email Nora Chen"></button>
      </div>

      <button nbButton tone="yellow" size="xl" radius="md" fullWidth class="sm:w-auto">
        <span nbText size="xl" weight="black" transform="uppercase" tracking="wide">
          View Profile
        </span>
        <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md"
              icon="/open-to-work/arrow-icon.svg"></span>
      </button>
    </div>
  </div>
</article>
</div>`;
}
