import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbButton } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../docs/docs-code-block';
import { NbDocsNavbar } from '../docs/layout/navbar';

@Component({
  selector: 'docs-home-page',
  imports: [DocsCodeBlock, NbButton, NbDocsNavbar, RouterLink],
  template: `
    <div class="relative min-h-screen overflow-x-clip">
      <span
        aria-hidden="true"
        class="pointer-events-none fixed top-40 left-2 hidden h-14 w-14 rotate-12 border-4 border-(--nb-border) bg-(--nb-pink) shadow-[5px_5px_0_0_var(--nb-shadow)] xl:block"
      ></span>
      <span
        aria-hidden="true"
        class="pointer-events-none fixed bottom-12 right-4 hidden h-10 w-10 -rotate-12 rounded-full border-4 border-(--nb-border) bg-(--nb-lavender) shadow-[4px_4px_0_0_var(--nb-shadow)] xl:block"
      ></span>

      <nb-docs-navbar />

      <main class="docs-grid-bg pt-32 pb-16">
        <div class="mx-auto w-full max-w-6xl px-5 lg:px-8">
          <article>
            <header id="hero" class="mb-12 scroll-mt-32">
              <div
                class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(380px,480px)]"
              >
                <div class="min-w-0">
                  <p
                    class="mb-3 inline-block border-3 border-(--nb-border) bg-(--nb-lavender) px-3 py-1 font-mono text-xs font-bold tracking-[0.08em] uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]"
                  >
                    Ng Brutalism
                  </p>
                  <h1
                    class="max-w-5xl font-heading text-5xl leading-[0.92] font-black tracking-normal text-balance uppercase sm:text-6xl md:text-7xl xl:text-8xl"
                    aria-label="The neo-brutalism UI library for Angular"
                  >
                    <span class="block">The neo-</span>
                    <span class="block">brutalism UI</span>
                    <span class="mt-2 flex flex-wrap items-center gap-3 sm:mt-3 sm:gap-4">
                      <span class="block">library for</span>
                      <span
                        class="inline-block rotate-[-1deg] border-4 border-(--nb-border) bg-(--nb-yellow) px-3 py-1 shadow-[7px_7px_0_0_var(--nb-shadow)]"
                      >
                        Angular
                      </span>
                    </span>
                  </h1>

                  <p class="mt-7 max-w-3xl text-base font-bold sm:text-lg">
                    Ng Brutalism is the neo-brutalist Angular UI library — a
                    token-driven set of brutalist Angular components with
                    signals, zoneless-friendly change detection, and Tailwind v4
                    ergonomics. Hard borders, offset shadows, punchy colors,
                    and keyboard-ready interactions from the first import.
                  </p>

                  <div
                    class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                  >
                    <a
                      class="w-full justify-center sm:w-auto"
                      nbButton
                      routerLink="/docs/installation"
                    >
                      Install
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
                    <a
                      class="w-full justify-center sm:w-auto"
                      nbButton
                      variant="neutral"
                      href="https://github.com/khangtrannn/ng-brutalism"
                      target="_blank"
                      rel="noreferrer"
                      style="--nb-button-bg: #fff"
                    >
                      GitHub
                    </a>
                  </div>

                  <div class="mt-8 flex flex-wrap items-center gap-3">
                    <div class="nb-stat-tile nb-stat-tile--yellow">
                      <span class="nb-stat-tile__value">15</span>
                      <span class="nb-stat-tile__label">Components</span>
                    </div>
                    <div class="nb-stat-tile nb-stat-tile--mint">
                      <span class="nb-stat-tile__value">NG</span>
                      <span class="nb-stat-tile__label">Modern Angular</span>
                    </div>
                    <div class="nb-stat-tile nb-stat-tile--pink">
                      <span class="nb-stat-tile__value">TW4</span>
                      <span class="nb-stat-tile__label">Tailwind v4 tokens</span>
                    </div>
                    <div class="nb-stat-tile nb-stat-tile--lavender">
                      <span class="nb-stat-tile__value">MIT</span>
                      <span class="nb-stat-tile__label">Open source</span>
                    </div>
                  </div>
                </div>

                <div
                  class="relative isolate mx-auto flex aspect-[1.05] w-full max-w-[340px] items-center justify-center border-4 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[10px_10px_0_0_var(--nb-shadow)] sm:max-w-[390px] sm:p-7 lg:mx-0 lg:justify-self-end xl:max-w-[460px]"
                  aria-label="Angular mascot preview"
                >
                  <div
                    class="absolute -top-5 right-5 z-30 border-4 border-(--nb-border) px-5 py-2 font-heading text-lg font-black text-white uppercase shadow-[6px_6px_0_0_var(--nb-shadow)] sm:right-7 sm:text-xl"
                    style="background: linear-gradient(135deg, #ff31d9 0%, #dd0031 48%, #7c3aed 100%)"
                  >
                    Angular
                  </div>
                  <div
                    class="absolute -top-4 left-10 z-20 h-9 w-24 rotate-[7deg] border-4 border-(--nb-border) bg-white shadow-[4px_4px_0_0_var(--nb-shadow)]"
                    aria-hidden="true"
                  ></div>
                  <div
                    class="absolute -bottom-4 left-7 z-20 h-12 w-12 rotate-[-11deg] border-4 border-(--nb-border) bg-(--nb-pink) shadow-[5px_5px_0_0_var(--nb-shadow)] sm:h-14 sm:w-14"
                    aria-hidden="true"
                  ></div>
                  <div
                    class="absolute -right-5 bottom-8 z-20 h-10 w-10 rounded-full border-4 border-(--nb-border) bg-(--nb-lavender) shadow-[5px_5px_0_0_var(--nb-shadow)]"
                    aria-hidden="true"
                  ></div>
                  <div
                    class="relative z-10 flex aspect-square w-full items-center justify-center border-0 bg-white shadow-[12px_12px_0_0_rgba(0,0,0,0.18)]"
                  >
                    <img
                      class="block w-full max-w-[230px] sm:max-w-[280px] xl:max-w-[330px]"
                      src="/angular-mascot.gif"
                      width="488"
                      height="488"
                      alt="Animated Angular mascot"
                    />
                  </div>
                </div>
              </div>
            </header>

            <section id="why" class="scroll-mt-32">
              <h2 data-docs-heading class="mt-10 mb-5 text-2xl font-bold">
                Why neo-brutalism for Angular?
              </h2>
              <div class="grid gap-4 md:grid-cols-3">
                <div
                  class="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
                >
                  <h3 class="font-heading text-xl font-black uppercase">
                    Angular native
                  </h3>
                  <p class="mt-2 text-sm font-medium">
                    Built as Angular primitives with directive APIs, signal
                    inputs, and native interaction patterns — not React
                    components ported through a wrapper.
                  </p>
                </div>
                <div
                  class="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
                >
                  <h3 class="font-heading text-xl font-black uppercase">
                    Loud by default
                  </h3>
                  <p class="mt-2 text-sm font-medium">
                    Thick borders, offset shadows, punchy color, and compact
                    motion. Brutalist Angular components that look like they
                    mean it.
                  </p>
                </div>
                <div
                  class="border-3 border-(--nb-border) bg-(--nb-pink) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
                >
                  <h3 class="font-heading text-xl font-black uppercase">
                    Tokens, not magic
                  </h3>
                  <p class="mt-2 text-sm font-medium">
                    CSS custom properties and Tailwind v4 utilities keep theme
                    overrides local, visible, and predictable.
                  </p>
                </div>
              </div>
            </section>

            <section id="install" class="scroll-mt-32">
              <h2 data-docs-heading class="mt-12 mb-5 text-2xl font-bold">
                Install
              </h2>
              <p class="mb-5 text-base font-medium">
                Add the package to your Angular app, import the stylesheet
                once, then pull each primitive into the component that uses it.
              </p>
              <docs-code-block title="Terminal" [code]="installCode" />
            </section>

            <section id="explore" class="scroll-mt-32">
              <h2 data-docs-heading class="mt-12 mb-5 text-2xl font-bold">
                Explore
              </h2>
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
                  routerLink="/components/button"
                >
                  <span class="nb-stat-tile__value">Components</span>
                  <span class="nb-stat-tile__label">15 brutalist primitives</span>
                </a>
                <a
                  class="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--pink"
                  routerLink="/showcase/portfolio"
                >
                  <span class="nb-stat-tile__value">Showcase</span>
                  <span class="nb-stat-tile__label">A full portfolio site</span>
                </a>
              </div>
            </section>
          </article>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  protected readonly installCode = `pnpm add @ng-brutalism/ui
# or
npm install @ng-brutalism/ui`;
}
