import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  effect,
} from '@angular/core';
import { NbButton, NbMarquee, NbMarqueeItem, NbTitle } from '@ng-brutalism/ui';
import { ContactUsDialog } from '../../../components/examples/contact-us-dialog';
import {
  DocsPortfolioGithubIcon,
  DocsPortfolioLinkedinIcon,
} from './portfolio-hero.icons';

import type { Skill } from '../portfolio.types';

@Component({
    selector: 'docs-portfolio-hero',
    imports: [
        NbButton,
        NbMarquee,
        NbMarqueeItem,
        NbTitle,
        ContactUsDialog,
        DocsPortfolioGithubIcon,
        DocsPortfolioLinkedinIcon,
    ],
    template: `
    <section
      id="home"
      class="portfolio-grid-section relative flex h-screen max-h-[900px] min-h-[500px] w-full scroll-mt-6 flex-col items-center justify-center overflow-hidden bg-white pb-14 dark:bg-black sm:min-h-[600px] sm:pb-16 md:pb-20"
    >
      <div class="portfolio-grid-bg absolute inset-0"></div>
      <div class="portfolio-radial absolute inset-0 dark:bg-black"></div>

      <div
        class="relative z-10 mx-auto flex flex-1 flex-col items-center justify-between px-3 py-2 text-left sm:px-5 sm:py-4 md:py-8 lg:flex-row lg:py-4"
      >
        <div
          class="order-2 flex w-full flex-col items-center lg:order-1 lg:w-1/2 lg:items-start lg:pl-8"
        >
          <p
            class="relative z-10 text-xl font-bold text-[#2b55ff] dark:text-[#4b6fff] sm:text-2xl md:text-3xl"
            aria-live="polite"
          >
            {{ displayedGreeting() }}<span class="animate-pulse">|</span>
          </p>

          <h1
            class="mt-2 text-center font-heading text-xl font-black leading-tight sm:mt-3 sm:text-2xl md:mt-5 md:text-3xl lg:text-left lg:text-5xl"
          >
            I'm Khang Tran. <span aria-hidden="true">👋</span>
          </h1>

          <p
            class="my-3 max-w-2xl text-center text-sm font-normal leading-relaxed sm:my-5 sm:text-base md:my-6 md:text-lg lg:my-8 lg:max-w-xl lg:text-left lg:text-xl"
          >
            I'm a Software Engineer based in
            <span
              nbTitle
              class="inline-block font-bold"
              style="--nb-title-wave-color: #ff5d8f; --nb-title-wave-width: 100%; --nb-title-wave-height: 0.35rem; --nb-title-wave-gap: -0.5rem;"
              >Vietnam</span
            >
            with a deep passion for
            <span
              nbTitle
              class="inline-block font-bold"
              style="--nb-title-wave-color: #a78bfa; --nb-title-wave-width: 100%; --nb-title-wave-height: 0.35rem; --nb-title-wave-gap: -0.5rem;"
              >Angular</span
            >. I focus on building modern web applications, exploring open-source, and turning ideas into polished products.
          </p>

          <div
            class="mb-4 flex w-full flex-col items-center lg:items-start sm:mb-5 md:mb-6"
          >
            <div class="mb-4 flex sm:mb-5 md:mb-6">
              <a
                class="portfolio-social"
                href="https://github.com/khangtrannn"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <docs-portfolio-github-icon class="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </a>
              <a
                class="portfolio-social"
                href="https://www.linkedin.com/in/khangtrann/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <docs-portfolio-linkedin-icon class="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </a>
            </div>
            <contact-us-dialog #contact>
              <button
                nbButton
                (click)="contact.open()"
                style="--nb-button-bg: #76fbd9;"
                class="h-10 font-heading text-base text-black transition-all hover:scale-[1.02] active:scale-[0.98] md:h-12 md:text-lg lg:h-14 lg:text-xl"
              >
                Get in Touch!
              </button>
            </contact-us-dialog>
          </div>
        </div>

        <div
          class="order-1 mt-2 flex w-full justify-center lg:order-2 lg:mt-0 lg:w-1/2 lg:justify-end"
        >
          <img
            class="h-auto w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[450px]"
            [src]="assetPath() + '/khang.png'"
            alt="Khang Tran"
          />
        </div>
      </div>

      <div class="absolute bottom-0 left-0 z-0 w-full">
        <nb-marquee
          class="block bg-white py-2 font-base dark:bg-[#212121] sm:py-3 lg:py-5"
          duration="18s"
        >
          @for (skill of skills(); track skill.text) {
          <nb-marquee-item>
            <span class="mx-4 flex items-center sm:mx-6 lg:mx-8">
              <img
                class="portfolio-skill-icon mr-2 sm:mr-3"
                [src]="
                  'https://cdn.simpleicons.org/' +
                  skill.iconSlug +
                  '/' +
                  (isDark() ? 'ffffff' : '000000')
                "
                [alt]="skill.iconLabel + ' logo'"
                loading="lazy"
              />
              <span class="font-heading text-lg sm:text-xl lg:text-2xl">
                {{ skill.text }}
              </span>
            </span>
          </nb-marquee-item>
          }
        </nb-marquee>
      </div>
    </section>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioHero {
  readonly assetPath = input.required<string>();
  readonly greeting = input.required<string>();
  readonly isDark = input(false);
  readonly skills = input.required<Skill[]>();

  private readonly charIndex = signal(0);
  protected readonly displayedGreeting = computed(() => {
    const text = this.greeting();
    return text.slice(0, this.charIndex());
  });

  constructor() {
    effect(
      () => {
        const fullText = this.greeting();
        this.charIndex.set(0);

        let currentIndex = 0;
        const interval = setInterval(() => {
          currentIndex++;
          if (currentIndex <= fullText.length) {
            this.charIndex.set(currentIndex);
          } else {
            clearInterval(interval);
          }
        }, 100);
      },
      { allowSignalWrites: true }
    );
  }
}
