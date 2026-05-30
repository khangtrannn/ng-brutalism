import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../../docs/docs-code-block';
import { DocsSourceTile } from '../../../docs/docs-source-tile';

import { JobCard } from './job-card';

@Component({
  selector: 'docs-recipe-job-card-page',
  imports: [DocsCodeBlock, DocsSourceTile, JobCard, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Job Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A brutalist job-posting card composing the same primitives as the
            travel card — display, sticker, chip, callout, media item, and CTA
            — but in a different domain. Validates that the composition layer is
            truly domain-agnostic.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">11</span>
            <span class="nb-stat-tile__label">Primitives</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">100%</span>
            <span class="nb-stat-tile__label">Composed</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/job-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>

        <recipe-job-card />
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/job-card"
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
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class JobCardRecipePage {
  protected readonly primitives = [
    {
      name: 'NbSurface',
      path: '/components/surface',
      role: 'bordered card shell',
    },
    {
      name: 'NbSplit',
      path: '/components/split',
      role: 'two-column layout with divider',
    },
    {
      name: 'NbStack',
      path: '/components/stack',
      role: 'vertical rhythm for header and meta',
    },
    {
      name: 'NbCluster',
      path: '/components/cluster',
      role: 'logo row and dashed feature group',
    },
    {
      name: 'NbSection',
      path: '/components/section',
      role: 'padded footer with top border',
    },
    {
      name: 'NbDisplay',
      path: '/components/display',
      role: 'job title mega heading',
    },
    {
      name: 'NbText',
      path: '/components/text',
      role: 'company name and description',
    },
    {
      name: 'NbChip',
      path: '/components/chip',
      role: 'remote / full-time / urgent tags',
    },
    {
      name: 'NbCallout',
      path: '/components/callout',
      role: 'salary callout',
    },
    {
      name: 'NbMediaItem',
      path: '/components/media-item',
      role: 'icon + label job requirements',
    },
    {
      name: 'NbButton',
      path: '/components/button',
      role: 'apply now call to action',
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
  NbMediaItem,
  NbMediaItemTitle,
  NbSection,
  NbSplit,
  NbStack,
  NbSticker,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<div nbSurface clip border="strong" shadow="hard" radius="xl">
  <!-- Header: company info + salary + type chips -->
  <div nbSplit ratio="2:1" gap="xl" padding="lg" collapse="md" divider="solid">
    <div nbStack gap="lg">
      <div nbCluster gap="md" align="center">
        <!-- Company logo -->
        <div class="company-logo" aria-hidden="true">...</div>

        <div nbStack gap="xs" align="start">
          <span nbText size="xl" weight="extrabold">Inspectorio</span>
          <span nbText size="sm" tone="muted">Ho Chi Minh City</span>
        </div>
      </div>

      <h1 nbDisplay class="uppercase mb-0!">
        Senior<br />Frontend<br />Engineer
      </h1>

      <p nbText size="md" weight="medium" tone="muted" measure="md">
        Build delightful UI systems and scalable web experiences…
      </p>
    </div>

    <div nbStack gap="lg" align="start">
      <div nbStack gap="sm" align="start">
        <span nbChip tone="mint">Remote</span>
        <span nbChip tone="lavender">Full-time</span>
        <span nbChip tone="pink">Urgent</span>
      </div>
      <div nbCallout tone="yellow" size="xl" shadow="hard">$120K</div>
    </div>
  </div>

  <!-- Footer: requirements + CTA -->
  <div nbSection border="top" padding="lg">
    <div nbSplit ratio="2:1" gap="lg" collapse="md">
      <div nbCluster gap="lg" align="center" divider="dashed"
           class="[--nb-media-item-title-size:12px]">
        <nb-media-item icon="/icons/location.png">
          <span nbMediaItemTitle>HCMC<br />Remote</span>
        </nb-media-item>
        <nb-media-item icon="/icons/star.png">
          <span nbMediaItemTitle>5+<br />Years Exp</span>
        </nb-media-item>
        <nb-media-item icon="/icons/world.png">
          <span nbMediaItemTitle>International<br />Team</span>
        </nb-media-item>
      </div>

      <button nbButton tone="lavender" size="xl" radius="md"
              weight="black" transform="uppercase" tracking="wide">
        Apply Now
        <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md">
          <span nbIcon src="/icons/arrow-right.svg" size="sm" decorative></span>
        </span>
      </button>
    </div>
  </div>
</div>`;
}
