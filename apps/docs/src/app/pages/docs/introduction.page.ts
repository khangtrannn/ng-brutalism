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
        <div class="max-w-6xl">
          <div>
            <p>Getting Started</p>

            <div
              class="mt-4 grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(200px,300px)] md:items-center lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]"
            >
              <h1 class="max-w-4xl">Build loud. Stay sharp.</h1>

              <div
                class="relative isolate mx-auto flex aspect-square w-full max-w-[240px] items-center justify-center border-4 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[8px_8px_0_0_var(--nb-shadow)] sm:max-w-[280px] md:mx-0 md:max-w-[300px] md:justify-self-end lg:max-w-[320px] lg:p-6"
                aria-label="Angular mascot preview"
              >
                <div
                  class="absolute -top-5 right-2 z-30 border-3 border-(--nb-border) px-3 py-1 font-mono text-xs font-black uppercase text-white shadow-[4px_4px_0_0_var(--nb-shadow)] sm:right-3"
                  style="background: linear-gradient(135deg, #ff31d9 0%, #dd0031 48%, #7c3aed 100%)"
                >
                  Angular
                </div>
                <div
                  class="absolute bottom-4 left-4 z-20 h-7 w-7 rotate-[-10deg] border-3 border-(--nb-border) bg-(--nb-pink) shadow-[4px_4px_0_0_var(--nb-shadow)] sm:bottom-6 sm:left-5 sm:h-8 sm:w-8"
                  aria-hidden="true"
                ></div>
                <div
                  class="absolute -top-2 left-7 z-20 h-6 w-16 rotate-[8deg] border-3 border-(--nb-border) bg-white shadow-[3px_3px_0_0_var(--nb-shadow)] sm:left-9"
                  aria-hidden="true"
                ></div>
                <img
                  class="relative z-10 block w-full max-w-[170px] drop-shadow-[8px_8px_0_rgba(0,0,0,0.18)] sm:max-w-[205px] md:max-w-[220px] lg:max-w-[235px]"
                  src="/angular-mascot.gif"
                  width="488"
                  height="488"
                  alt="Animated Angular mascot"
                />
              </div>
            </div>

            <p class="mt-8 max-w-4xl text-base font-medium sm:text-lg">
              ng-brutalism is a set of standalone Angular UI primitives for
              products that want chunky borders, crisp shadows, playful color,
              and reliable accessibility without giving up developer ergonomics.
            </p>

            <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                class="w-full justify-center sm:w-auto"
                nbButton
                routerLink="/docs/installation"
              >
                Get installed
              </a>
              <a
                class="w-full justify-center sm:w-auto"
                nbButton
                variant="neutral"
                routerLink="/components/button"
                style="--nb-button-bg: #fff"
              >
                Browse components
              </a>
            </div>
          </div>
        </div>

        <div class="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">21</span>
            <span class="nb-stat-tile__label">Angular-ready</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">A11Y</span>
            <span class="nb-stat-tile__label">Focus states</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">CSS</span>
            <span class="nb-stat-tile__label">Token driven</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--lavender">
            <span class="nb-stat-tile__value">0</span>
            <span class="nb-stat-tile__label">Global setup pain</span>
          </div>
        </div>
      </header>

      <section id="why">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Why use it
        </h2>
        <div class="grid gap-4 md:grid-cols-3">
          <div
            class="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">
              Standalone first
            </h3>
            <p class="mt-2 text-sm font-medium">
              Import only the primitives you need directly into Angular
              components, routes, and examples.
            </p>
          </div>
          <div
            class="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">
              Opinionated look
            </h3>
            <p class="mt-2 text-sm font-medium">
              Borders, hard shadows, compact motion, and high-contrast focus
              states come baked in.
            </p>
          </div>
          <div
            class="border-3 border-(--nb-border) bg-(--nb-pink) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-xl font-black uppercase">
              Easy to bend
            </h3>
            <p class="mt-2 text-sm font-medium">
              CSS custom properties and Tailwind utilities make theme overrides
              feel local and predictable.
            </p>
          </div>
        </div>
      </section>

      <section id="quick-start">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Quick start
        </h2>
        <p class="mb-5 text-base font-medium">
          Install the package, import the styles once, then bring standalone
          components into the Angular files that use them.
        </p>
        <docs-code-block title="Component" [code]="quickStartCode" />
      </section>

      <section id="components">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Start exploring
        </h2>
        <p class="mb-5 text-base font-medium">
          Jump into the component docs or keep going through setup. The sidebar
          has the full catalog when you are ready to mix primitives together.
        </p>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--yellow"
            routerLink="/docs/installation"
          >
            <span class="nb-stat-tile__value">Install</span>
            <span class="nb-stat-tile__label">Package and styles</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--mint"
            routerLink="/components/card"
          >
            <span class="nb-stat-tile__value">Card</span>
            <span class="nb-stat-tile__label">Composable layout</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--pink"
            routerLink="/components/dialog"
          >
            <span class="nb-stat-tile__value">Dialog</span>
            <span class="nb-stat-tile__label">Native modal</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--lavender"
            routerLink="/components/accordion"
          >
            <span class="nb-stat-tile__value">Accordion</span>
            <span class="nb-stat-tile__label">Expandable content</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--blue"
            routerLink="/components/button"
          >
            <span class="nb-stat-tile__value">Button</span>
            <span class="nb-stat-tile__label">Core action</span>
          </a>
          <a
            class="nb-stat-tile nb-stat-tile--interactive"
            routerLink="/components/input"
          >
            <span class="nb-stat-tile__value">Input</span>
            <span class="nb-stat-tile__label">Forms and fields</span>
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
          own components when you want the same class ergonomics the library
          uses internally.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IntroductionPageComponent {
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
export class ShipButtonComponent {}`;
}
