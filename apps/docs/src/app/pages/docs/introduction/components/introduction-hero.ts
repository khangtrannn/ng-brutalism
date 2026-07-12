import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbButton, NbStat, NbSurface } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-introduction-hero',
  imports: [NbButton, NbStat, NbSurface, RouterLink],
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div
        class="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(180px,240px)] md:items-center xl:grid-cols-[minmax(0,1fr)_minmax(220px,300px)]"
      >
        <div class="min-w-0">
          <p class="eyebrow">Getting Started</p>
          <h1
            class="max-w-3xl text-[clamp(2.35rem,7vw,4.5rem)] md:text-[clamp(2.6rem,5.2vw,4.5rem)] xl:text-[clamp(3.5rem,5vw,4.5rem)]"
          >
            <span class="block">Build loud.</span>
            <span class="block">Stay sharp.</span>
          </h1>
        </div>

        <div
          nbSurface
          tone="yellow"
          radius="xl"
          border="thick"
          shadow="heavy"
          class="relative isolate mx-auto flex aspect-square w-full max-w-55 items-center justify-center border-4 border-(--nb-border) bg-(--nb-yellow) p-4 shadow-[8px_8px_0_0_var(--nb-shadow)] sm:max-w-[260px] sm:p-5 md:mx-0 md:max-w-[240px] md:justify-self-end xl:max-w-75 xl:p-6"
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
          <div
            class="relative z-10 flex aspect-square w-full items-center justify-center border-0 bg-white shadow-[12px_12px_0_0_rgba(0,0,0,0.18)]"
          >
            <video
              class="block w-full max-w-[155px] sm:max-w-[190px] md:max-w-[170px] xl:max-w-[220px]"
              width="488"
              height="488"
              autoplay
              loop
              muted
              playsinline
              aria-label="Animated Angular mascot for Ng Brutalism"
            >
              <source src="/angular-mascot.webm" type="video/webm" />
              <source src="/angular-mascot.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <p class="mt-8 max-w-4xl text-base font-medium sm:text-lg">
        &#64;ng-brutalism/ui gives modern Angular apps a token-driven primitive
        composition system with directive-first APIs, keyboard-ready
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
          tone="background"
          routerLink="/components/accordion"
          style="--nb-button-bg: #fff"
        >
          See components
        </a>
      </div>

      <div class="mt-7 flex flex-wrap items-center gap-3">
        <div
          nbSurface
          tone="yellow"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="NG" label="Angular native" />
        </div>
        <div
          nbSurface
          tone="mint"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="A11Y" label="Keyboard ready" />
        </div>
        <div
          nbSurface
          tone="pink"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="CSS" label="Token powered" />
        </div>
        <div
          nbSurface
          tone="lavender"
          border="strong"
          padding="sm"
          layout="stack"
          class="items-start"
        >
          <nb-stat value="Z" label="Zoneless friendly" />
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionHero {}
