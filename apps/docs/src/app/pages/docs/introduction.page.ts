import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbButton } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';

@Component({
  selector: 'docs-introduction-page',
  imports: [DocsCodeBlock, NbButton, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div
          class="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(180px,240px)] md:items-center xl:grid-cols-[minmax(0,1fr)_minmax(220px,300px)]"
        >
          <div class="min-w-0">
            <p class="eyebrow">Getting Started</p>
            <h1 class="max-w-3xl text-[clamp(2.35rem,7vw,4.5rem)] md:text-[clamp(2.6rem,5.2vw,4.5rem)] xl:text-[clamp(3.5rem,5vw,4.5rem)]">
              <span class="block">Build loud.</span>
              <span class="block">Stay sharp.</span>
            </h1>
          </div>

          <div
            class="relative isolate mx-auto flex aspect-square w-full max-w-[220px] items-center justify-center border-4 border-(--nb-border) bg-(--nb-yellow) p-4 shadow-[8px_8px_0_0_var(--nb-shadow)] sm:max-w-[260px] sm:p-5 md:mx-0 md:max-w-[240px] md:justify-self-end xl:max-w-[300px] xl:p-6"
            aria-label="Angular mascot preview"
          >
            <div
              class="absolute -top-4 right-2 z-30 border-3 border-(--nb-border) px-3 py-1 font-mono text-xs font-black uppercase text-white shadow-[4px_4px_0_0_var(--nb-shadow)] sm:right-3"
              style="background: linear-gradient(135deg, #ff31d9 0%, #dd0031 48%, #7c3aed 100%)"
            >
              Angular
            </div>
            <div
              class="absolute bottom-4 left-4 z-20 h-7 w-7 rotate-[-10deg] border-3 border-(--nb-border) bg-(--nb-pink) shadow-[4px_4px_0_0_var(--nb-shadow)] sm:bottom-6 sm:left-5 sm:h-8 sm:w-8"
              aria-hidden="true"
            ></div>
            <div
              class="absolute -top-4 left-7 z-20 h-6 w-16 rotate-[8deg] border-3 border-(--nb-border) bg-white shadow-[3px_3px_0_0_var(--nb-shadow)] sm:left-9"
              aria-hidden="true"
            ></div>
            <img
              class="relative z-10 block w-full max-w-[155px] drop-shadow-[8px_8px_0_rgba(0,0,0,0.18)] sm:max-w-[190px] md:max-w-[170px] xl:max-w-[220px]"
              src="/angular-mascot.gif"
              width="488"
              height="488"
              alt="Animated Angular mascot"
            />
          </div>
        </div>

        <p class="mt-8 max-w-4xl text-base font-medium sm:text-lg">
          &#64;ng-brutalism/ui gives modern Angular apps a token-driven
          component system with directive-first APIs, keyboard-ready
          interactions, hard-edged visuals, and Tailwind v4 ergonomics from the
          first import.
        </p>

        <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            class="w-full justify-center sm:w-auto"
            nbButton
            routerLink="/docs/installation"
          >
            Start building
          </a>
          <a
            class="w-full justify-center sm:w-auto"
            nbButton
            variant="neutral"
            routerLink="/components/button"
            style="--nb-button-bg: #fff"
          >
            See components
          </a>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">NG</span>
            <span class="nb-stat-tile__label">Angular native</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">A11Y</span>
            <span class="nb-stat-tile__label">Keyboard ready</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">CSS</span>
            <span class="nb-stat-tile__label">Token powered</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--lavender">
            <span class="nb-stat-tile__value">Z</span>
            <span class="nb-stat-tile__label">Zoneless friendly</span>
          </div>
        </div>
      </header>

      <section id="why">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Why it stands out
        </h2>
        <div class="grid gap-4 md:grid-cols-3">
          <div
            class="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">
              Angular first
            </h3>
            <p class="mt-2 text-sm font-medium">
              Built as Angular primitives with directive APIs, signal-friendly
              internals, and native interaction patterns that fit modern Angular
              apps.
            </p>
          </div>
          <div
            class="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">
              Loud by default
            </h3>
            <p class="mt-2 text-sm font-medium">
              Chunky borders, offset shadows, punchy color, and compact motion
              make interfaces feel instantly brutalist.
            </p>
          </div>
          <div
            class="border-3 border-(--nb-border) bg-(--nb-pink) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">
              Easy to bend
            </h3>
            <p class="mt-2 text-sm font-medium">
              CSS custom properties and Tailwind utilities keep theme overrides
              local, visible, and predictable.
            </p>
          </div>
        </div>
      </section>

      <section id="quick-start">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Quick start
        </h2>
        <p class="mb-5 text-base font-medium">
          Install the package, import the stylesheet once, then pull each
          primitive into the Angular component that actually uses it.
        </p>
        <docs-code-block title="Component" [code]="quickStartCode" />
      </section>

      <section id="components">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Start exploring
        </h2>
        <p class="mb-5 text-base font-medium">
          Jump straight into the pieces that shape the most visible moments:
          setup, layout, overlays, actions, and forms.
        </p>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--yellow"
            routerLink="/docs/installation"
          >
            <span class="nb-stat-tile__value">Install</span>
            <span class="nb-stat-tile__label">Package, styles, tokens</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--mint"
            routerLink="/components/card"
          >
            <span class="nb-stat-tile__value">Card</span>
            <span class="nb-stat-tile__label">Bold content blocks</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--pink"
            routerLink="/components/dialog"
          >
            <span class="nb-stat-tile__value">Dialog</span>
            <span class="nb-stat-tile__label">Native modal flow</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--lavender"
            routerLink="/components/accordion"
          >
            <span class="nb-stat-tile__value">Accordion</span>
            <span class="nb-stat-tile__label">Dense disclosure</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--peach"
            routerLink="/components/button"
          >
            <span class="nb-stat-tile__value">Button</span>
            <span class="nb-stat-tile__label">High-impact actions</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive"
            routerLink="/components/input"
          >
            <span class="nb-stat-tile__value">Input</span>
            <span class="nb-stat-tile__label">Sharp form fields</span>
          </a>
        </div>
      </section>

      <section id="utilities">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Utility included
        </h2>
        <p class="mb-5 text-base font-medium">
          <code class="font-mono text-sm">nbClass</code> is exported from
          <code class="font-mono text-sm">&#64;ng-brutalism/ui</code> and merges
          conditional class arrays with
          <code class="font-mono text-sm">clsx</code> plus
          <code class="font-mono text-sm">tailwind-merge</code>. Use it in your
          own components when you want the same conditional styling ergonomics
          the library uses internally.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IntroductionPage {
  protected readonly quickStartCode = `import { Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-ship-button',
  imports: [NbButton],
  template: \`
    <button nbButton type="button">
      Ship the thing
    </button>
  \`,
})
export class ShipButton {}`;
}
