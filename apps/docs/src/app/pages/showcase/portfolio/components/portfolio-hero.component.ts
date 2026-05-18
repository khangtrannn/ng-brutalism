import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NbMarquee, NbMarqueeItem } from '@ng-brutalism/ui';

import type { Skill } from '../portfolio.types';

@Component({
  selector: 'docs-portfolio-hero',
  standalone: true,
  imports: [NbMarquee, NbMarqueeItem],
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
            {{ greeting() }}
          </p>

          <h1
            class="mt-2 text-center font-heading text-xl font-black leading-tight sm:mt-3 sm:text-2xl md:mt-5 md:text-3xl lg:text-left lg:text-5xl"
          >
            I'm Ronit Jadhav. <span aria-hidden="true">👋</span>
          </h1>

          <p
            class="my-3 max-w-2xl text-center text-sm font-normal leading-relaxed sm:my-5 sm:text-base md:my-6 md:text-lg lg:my-8 lg:max-w-xl lg:text-left lg:text-xl"
          >
            Based in Germany, I'm a Geospatial Developer and a Software
            Engineer. I love to work with maps, data, and code. I'm passionate
            about open-source, web technologies, and building cool stuff.
          </p>

          <div
            class="mb-6 flex w-full flex-col items-center lg:items-start md:mb-8"
          >
            <div class="mb-4 flex space-x-4 sm:mb-5 sm:space-x-6 md:mb-6">
              <a
                class="portfolio-social"
                href="https://github.com/ronitjadhav"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                GH
              </a>
              <a
                class="portfolio-social"
                href="https://www.linkedin.com/in/ronitjadhav/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                IN
              </a>
            </div>
          </div>
        </div>

        <div
          class="order-1 mt-2 flex w-full justify-center lg:order-2 lg:mt-0 lg:w-1/2 lg:justify-end"
        >
          <img
            class="h-auto w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[450px]"
            [src]="assetPath() + '/ronit.png'"
            alt="Ronit Jadhav"
          />
        </div>
      </div>

      <div class="absolute bottom-0 left-0 z-0 w-full">
        <nb-marquee
          class="block border-y-2 border-black bg-white py-2 font-base dark:border-[#555] dark:bg-[#212121] sm:py-3 lg:py-5"
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
}
