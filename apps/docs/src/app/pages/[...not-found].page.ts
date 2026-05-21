import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NbDocsNavbar } from '../docs/layout/navbar';

@Component({
  selector: 'docs-not-found-page',
  imports: [RouterLink, NbDocsNavbar],
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

      <div class="flex pt-32">
        <!-- 404 Sidebar -->
        <aside
          class="fixed top-32 left-8 hidden h-[calc(100vh-9rem)] w-72 overflow-y-auto border-4 border-(--nb-border) bg-(--nb-paper) px-4 py-5 shadow-[8px_8px_0_0_var(--nb-shadow)] lg:block"
          aria-label="404 page navigation"
        >
          <!-- ERROR section -->
          <section>
            <div class="mb-3 flex items-center justify-between gap-3 px-1">
              <span
                class="inline-flex items-center border-3 border-(--nb-border) bg-(--nb-hot) px-[0.65rem] py-1 text-white shadow-[3px_3px_0_0_var(--nb-shadow)]"
                style="font-family:var(--font-display);font-size:0.78rem;font-weight:900;letter-spacing:0.08em;text-transform:uppercase;transform:rotate(-2deg)"
              >ERROR</span>
              <span
                class="inline-flex h-6 min-w-[1.5rem] items-center justify-center border-3 border-(--nb-border) bg-(--nb-paper) px-2 shadow-[2px_2px_0_0_var(--nb-shadow)]"
                style="font-family:var(--font-mono);font-size:0.7rem;font-weight:700"
              >1</span>
            </div>
            <div class="space-y-1">
              <span
                class="flex cursor-default items-center gap-[0.55rem] border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-[0.4rem] shadow-[3px_3px_0_0_var(--nb-shadow)]"
                style="font-family:var(--font-sans);font-size:0.95rem;font-weight:800"
              >
                <span class="h-2 w-2 shrink-0 border-2 border-(--nb-border) bg-(--nb-border)"></span>
                404 Overview
              </span>
            </div>
          </section>

          <div class="my-3 border-t-[3px] border-dashed border-(--nb-border)"></div>

          <!-- QUICK LINKS section -->
          <section>
            <div class="mb-3 flex items-center justify-between gap-3 px-1">
              <span
                class="inline-flex items-center border-3 border-(--nb-border) bg-(--nb-pink) px-[0.65rem] py-1 text-white shadow-[3px_3px_0_0_var(--nb-shadow)]"
                style="font-family:var(--font-display);font-size:0.78rem;font-weight:900;letter-spacing:0.08em;text-transform:uppercase;transform:rotate(1.5deg)"
              >QUICK LINKS</span>
              <span
                class="inline-flex h-6 min-w-[1.5rem] items-center justify-center border-3 border-(--nb-border) bg-(--nb-paper) px-2 shadow-[2px_2px_0_0_var(--nb-shadow)]"
                style="font-family:var(--font-mono);font-size:0.7rem;font-weight:700"
              >4</span>
            </div>
            <div class="space-y-1">
              @for (link of quickLinks; track link.path) {
                <a
                  [routerLink]="link.path"
                  class="flex items-center gap-[0.55rem] border-2 border-transparent px-3 py-[0.4rem] transition-transform hover:translate-x-0.5 hover:bg-(--nb-secondary-background)"
                  style="font-family:var(--font-sans);font-size:0.95rem;font-weight:600;color:var(--nb-foreground)"
                >
                  <span class="h-2 w-2 shrink-0 border-2 border-(--nb-border)"></span>
                  {{ link.label }}
                </a>
              }
            </div>
          </section>

          <!-- TIP card -->
          <div class="mt-4 border-4 border-(--nb-border) bg-(--nb-lavender) p-4 shadow-[4px_4px_0_0_var(--nb-shadow)]">
            <span
              class="mb-2 inline-flex items-center border-3 border-(--nb-border) bg-(--nb-mint) px-2 py-0.5 shadow-[2px_2px_0_0_var(--nb-shadow)]"
              style="font-family:var(--font-mono);font-size:0.7rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase"
            >TIP</span>
            <p class="mb-3 text-sm font-semibold leading-snug" style="font-family:var(--font-sans)">
              Lost? Our search can help you find what you need.
            </p>
            <a
              routerLink="/docs/introduction"
              class="inline-flex items-center border-3 border-(--nb-border) bg-(--nb-paper) px-3 py-2 text-sm font-bold shadow-[3px_3px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5"
              style="font-family:var(--font-sans)"
            >
              Search docs →
            </a>
          </div>
        </aside>

        <!-- Main content -->
        <main class="docs-grid-bg min-h-[calc(100vh-8rem)] flex-1 px-5 py-12 lg:ml-80 lg:mr-52 lg:px-8">
          <div class="mx-auto w-full max-w-3xl">
            <div class="not-found-card relative border-4 border-(--nb-border) bg-(--nb-paper) p-8 shadow-[10px_10px_0_0_var(--nb-shadow)] sm:p-10">

              <div class="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <!-- Eyebrow -->
                  <span
                    class="mb-4 inline-block border-3 border-(--nb-border) bg-(--nb-lavender) px-3 py-1 shadow-[3px_3px_0_0_var(--nb-shadow)]"
                    style="font-family:var(--font-mono);font-size:0.75rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase"
                  >UH OH!</span>

                  <!-- Heading -->
                  <div class="mb-4">
                    <p
                      class="m-0 leading-none uppercase"
                      style="font-family:var(--font-display);font-weight:900;font-size:clamp(5rem,13vw,8.5rem);line-height:0.9;letter-spacing:-0.025em"
                    >404</p>
                    <p
                      class="m-0 uppercase"
                      style="font-family:var(--font-display);font-weight:900;font-size:clamp(2.2rem,6vw,4rem);line-height:0.95;letter-spacing:-0.02em"
                    >PAGE NOT<br>FOUND</p>
                  </div>

                  <!-- Yellow underline decoration -->
                  <div class="mb-6 h-3 w-20 border-3 border-(--nb-border) bg-(--nb-yellow) shadow-[3px_3px_0_0_var(--nb-shadow)]"></div>

                  <!-- Description -->
                  <p class="mb-6 text-base font-semibold leading-relaxed" style="font-family:var(--font-sans)">
                    The page you're looking for<br>
                    took a hard left.<br>
                    Let's get you back to the docs.
                  </p>

                  <!-- Buttons -->
                  <div class="flex flex-wrap gap-3">
                    <a
                      routerLink="/docs/introduction"
                      class="inline-flex items-center border-4 border-(--nb-border) bg-(--nb-yellow) px-5 py-3 font-black uppercase shadow-[5px_5px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5"
                      style="font-family:var(--font-display);font-size:0.9rem"
                    >Back to docs</a>
                    <a
                      routerLink="/"
                      class="inline-flex items-center border-4 border-(--nb-border) bg-(--nb-paper) px-5 py-3 font-black uppercase shadow-[5px_5px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5"
                      style="font-family:var(--font-display);font-size:0.9rem"
                    >Go home</a>
                  </div>
                </div>

                <!-- 404 character image -->
                <div class="hidden md:flex items-center justify-center p-4">
                  <img
                    src="/404.png"
                    alt="404 error character holding a broken link sign"
                    width="300"
                    height="360"
                  />
                </div>
              </div>

              <!-- Stat tiles -->
              <div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div class="nb-stat-tile nb-stat-tile--yellow">
                  <span class="nb-stat-tile__value">NG</span>
                  <span class="nb-stat-tile__label">SHARP UI</span>
                </div>
                <div class="nb-stat-tile nb-stat-tile--mint">
                  <span class="nb-stat-tile__value">A11Y</span>
                  <span class="nb-stat-tile__label">ALWAYS READY</span>
                </div>
                <div
                  class="nb-stat-tile"
                  style="background:var(--nb-hot)"
                >
                  <span class="nb-stat-tile__value" style="color:#fff">404</span>
                  <span class="nb-stat-tile__label" style="color:rgba(255,255,255,0.8)">LINK MISSING</span>
                </div>
                <div class="nb-stat-tile nb-stat-tile--lavender">
                  <span class="nb-stat-tile__value">DOCS</span>
                  <span class="nb-stat-tile__label">BACK ON TRACK</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <!-- Right TOC -->
        <aside
          class="fixed top-32 right-8 hidden h-[calc(100vh-9rem)] w-48 shrink-0 overflow-y-auto border-4 border-(--nb-border) bg-(--nb-paper) p-4 shadow-[8px_8px_0_0_var(--nb-shadow)] lg:block"
          aria-label="On this page"
        >
          <div class="mb-3">
            <span
              class="-rotate-1 inline-flex items-center border-3 border-(--nb-border) bg-(--nb-yellow) px-3 py-1 shadow-[3px_3px_0_0_var(--nb-shadow)]"
              style="font-family:var(--font-display);font-size:0.72rem;font-weight:900;letter-spacing:0.05em;text-transform:uppercase"
            >ON THIS PAGE</span>
          </div>
          <nav class="mt-3" aria-label="Page sections">
            <ul class="space-y-2">
              @for (item of tocItems; track item.label) {
                <li>
                  <a
                    [href]="item.href"
                    class="flex items-center gap-2 text-sm font-semibold leading-snug transition-colors hover:text-(--nb-blue)"
                    style="font-family:var(--font-sans)"
                  >
                    <span class="mt-0.5 h-2 w-2 shrink-0 border-2 border-(--nb-border) bg-(--nb-border)"></span>
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  `,
  styles: `
    .not-found-card::before {
      content: "";
      position: absolute;
      top: -18px;
      right: 28px;
      width: 60px;
      height: 60px;
      background: var(--nb-pink);
      border: 4px solid var(--nb-border);
      transform: rotate(-8deg);
      box-shadow: 4px 4px 0 0 var(--nb-shadow);
      z-index: 0;
    }

    .not-found-card::after {
      content: "";
      position: absolute;
      top: -8px;
      right: 40px;
      width: 28px;
      height: 28px;
      background: var(--nb-mint);
      border: 3px solid var(--nb-border);
      border-radius: 999px;
      transform: rotate(12deg);
      z-index: 1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFoundPage {
  protected readonly quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Getting Started', path: '/docs/introduction' },
    { label: 'Components', path: '/components/accordion' },
    { label: 'Showcase', path: '/showcase/portfolio' },
  ];

  protected readonly tocItems = [
    { label: '404 Overview', href: '#' },
  ];
}
