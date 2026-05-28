import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import ProfileCardExample from './examples/profile-card';

@Component({
  selector: 'docs-recipe-profile-card-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, ProfileCardExample, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Recipe</p>
          <h1>Profile Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A portfolio-style profile card with availability badge, skill chips, social
            links, and a primary call to action. Composed entirely from v0.2.0 primitives.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">8</span>
            <span class="nb-stat-tile__label">Primitives</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">100%</span>
            <span class="nb-stat-tile__label">Fidelity</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/profile-card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="templateCode">
          <recipe-profile-card />
        </docs-example>
      </section>

      <section id="code">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Code</h2>
        <p class="mb-4 text-sm font-medium">
          Structural template. See the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/apps/docs/src/app/pages/recipes/examples/profile-card"
            target="_blank"
            rel="noreferrer"
            >example source</a
          >
          for the full implementation including styles and inline SVGs.
        </p>
        <docs-code-block class="block mb-5" title="Imports" [code]="importCode" />
        <docs-code-block title="Template" [code]="templateCode" />
      </section>

      <section id="primitives">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Primitives used</h2>
        <ul class="space-y-2 text-base font-medium">
          @for (item of primitives; track item.path) {
            <li class="flex items-center gap-2">
              <span class="inline-block size-2 border-2 border-(--nb-border) bg-(--nb-yellow)" aria-hidden="true"></span>
              <a class="underline" [routerLink]="item.path">{{ item.name }}</a>
              <span class="text-sm font-normal opacity-80">— {{ item.role }}</span>
            </li>
          }
        </ul>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProfileCardRecipePage {
  protected readonly primitives = [
    { name: 'NbDisplay', path: '/components/display', role: 'mega name title' },
    { name: 'NbChip', path: '/components/chip', role: 'OPEN TO WORK + skill tags' },
    { name: 'NbStatusDot', path: '/components/status-dot', role: 'online availability' },
    { name: 'NbSeparator', path: '/components/separator', role: 'yellow accent bar' },
    { name: 'NbHalftone', path: '/components/halftone', role: 'dot grid accent' },
    { name: 'NbIconButton', path: '/components/icon-button', role: 'social links' },
    { name: 'NbButton', path: '/components/button', role: 'view profile CTA' },
    { name: 'NbSticker', path: '/components/sticker', role: 'layered corner sticker' },
  ];

  protected readonly importCode = `import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbChipGroup,
  NbDisplay,
  NbHalftone,
  NbIconButton,
  NbSeparator,
  NbStatusDot,
  NbSticker,
} from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<article class="profile-card">
  <div class="profile-card__sticker" aria-hidden="true">
    <nb-sticker shape="burst" tone="pink" [rotate]="20">★</nb-sticker>
    <nb-sticker shape="stamp" tone="pink" [rotate]="8"></nb-sticker>
    <nb-sticker shape="stamp" tone="default" [rotate]="-4">
      <span class="profile-card__stamp-circle"></span>
    </nb-sticker>
  </div>

  <div class="profile-card__top">
    <div class="profile-card__portrait">
      <!-- portrait illustration -->
    </div>

    <div class="profile-card__intro">
      <span nbChip tone="mint">
        <span nbStatusDot state="online" aria-hidden="true"></span>
        OPEN TO WORK
      </span>

      <h1 nbDisplay size="lg">NORA<br />CHEN</h1>
    </div>
  </div>

  <div class="profile-card__role-row">
    <div class="profile-card__role-stack">
      <hr nbSeparator variant="thick" class="profile-card__rule" />
      <p>Product Designer</p>
    </div>
    <nb-halftone position="bottom-right" [rows]="5" [cols]="5" [size]="4" [gap]="4" />
  </div>

  <div nbChipGroup>
    <span nbChip tone="lavender">UX</span>
    <span nbChip>DESIGN SYSTEMS</span>
    <span nbChip tone="pink">FIGMA</span>
  </div>

  <p>Designing intuitive, accessible, and delightful experiences that make an impact.</p>

  <div class="profile-card__actions">
    <div class="profile-card__socials">
      <button nbIconButton type="button" size="sm" aria-label="LinkedIn"><!-- icon --></button>
      <button nbIconButton type="button" size="sm" aria-label="Twitter"><!-- icon --></button>
      <button nbIconButton type="button" size="sm" aria-label="Email"><!-- icon --></button>
    </div>

    <button nbButton type="button">
      VIEW PROFILE
      <span nbButtonTrailingIcon><!-- arrow icon in dark circle --></span>
    </button>
  </div>
</article>`;
}
