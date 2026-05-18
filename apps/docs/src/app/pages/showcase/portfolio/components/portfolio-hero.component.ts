import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  effect,
  output,
} from '@angular/core';
import { NbMarquee, NbMarqueeItem } from '@ng-brutalism/ui';
import { PortfolioContactDialogComponent } from './portfolio-contact-dialog.component';

import type { Skill } from '../portfolio.types';

@Component({
  selector: 'docs-portfolio-hero',
  standalone: true,
  imports: [NbMarquee, NbMarqueeItem, PortfolioContactDialogComponent],
  template: `
    <section
      id="home"
      class="portfolio-grid-section relative flex h-screen max-h-[900px] min-h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-white pb-14 dark:bg-black sm:min-h-[600px] sm:pb-16 md:pb-20"
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
            I'm a Software Engineer based in Vietnam with a deep passion for
            Angular. I focus on building modern web application, exploring
            open-source, and turning ideas into polished products.
          </p>

          <div
            class="mb-4 flex w-full flex-col items-center lg:items-start sm:mb-5 md:mb-6"
          >
            <div class="mb-4 flex sm:mb-5 md:mb-6">
              <a
                class="portfolio-social"
                href="https://github.com/ronitjadhav"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg
                  class="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              <a
                class="portfolio-social"
                href="https://www.linkedin.com/in/ronitjadhav/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg
                  class="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
                  />
                </svg>
              </a>
            </div>
            <docs-portfolio-contact-dialog
              [sent]="sent()"
              (submitted)="contactSubmitted.emit()"
            />
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioHeroComponent {
  readonly assetPath = input.required<string>();
  readonly greeting = input.required<string>();
  readonly isDark = input(false);
  readonly skills = input.required<Skill[]>();
  readonly sent = input(false);

  readonly contactSubmitted = output<void>();

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
