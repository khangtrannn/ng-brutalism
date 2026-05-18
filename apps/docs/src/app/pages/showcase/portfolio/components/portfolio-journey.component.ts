import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import type { TimelineEntry } from '../portfolio.types';

@Component({
  selector: 'docs-portfolio-journey',
  standalone: true,
  imports: [],
  template: `
    <section
      id="journey"
      class="portfolio-grid-section relative bg-white p-2 py-8 dark:bg-black sm:p-4 sm:py-12 md:p-6 md:py-16 lg:p-8"
    >
      <div class="portfolio-grid-bg absolute inset-0"></div>
      <div class="portfolio-radial absolute inset-0 dark:bg-black"></div>
      <div class="relative z-10 mx-auto max-w-full px-2 sm:px-5">
        <div class="portfolio-section-title mb-4 sm:mb-6 md:mb-10">
          <h2
            class="text-center font-heading text-xl font-black text-black dark:text-[#eeefe9] sm:text-2xl md:text-4xl lg:text-5xl"
          >
            My Journey Through Time &amp; Space
            <span aria-hidden="true">🗺️</span>
          </h2>
        </div>

        <div
          class="relative h-[400px] overflow-hidden rounded-md border-2 border-black bg-[#dbeafe] shadow-[4px_4px_0px_0px_#000] dark:border-black dark:bg-[#212121] dark:shadow-[4px_4px_0px_0px_#555] sm:h-[500px] sm:border-4 sm:shadow-[8px_8px_0px_0px_#000] md:h-[600px] lg:h-[700px] xl:h-[750px]"
        >
          <div class="portfolio-map absolute inset-0"></div>

          <aside
            class="absolute left-0 top-0 z-20 flex h-full w-full flex-col overflow-hidden border-r-2 border-black bg-white/95 backdrop-blur-md dark:bg-[#212121]/95 sm:w-[380px] sm:border-r-4 md:w-[420px]"
          >
            <div
              class="flex flex-none items-center justify-between border-b-2 border-black bg-white p-3 dark:bg-[#212121] sm:border-b-4 sm:p-4"
            >
              <h3
                class="text-lg font-black text-black dark:text-white sm:text-xl"
              >
                Journey Timeline
              </h3>
            </div>

            <div class="relative flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
              <div
                class="absolute bottom-6 left-7 top-6 w-1 bg-black dark:bg-white sm:left-9"
              ></div>
              @for (entry of timeline(); track entry.id; let index = $index) {
              <button
                class="relative w-full cursor-pointer rounded-md border-l-4 border-transparent py-3 pl-10 pr-2 text-left transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 sm:py-4 sm:pl-14 sm:pr-4 md:pl-16"
                type="button"
                [class.bg-yellow-100]="activeJourney() === index"
                [class.dark:bg-gray-700]="activeJourney() === index"
                (click)="activeJourneyChanged.emit(index)"
              >
                <span
                  class="absolute left-4 top-1/2 z-10 h-2 w-2 -translate-y-1/2 rounded-full bg-black dark:bg-white sm:left-6"
                ></span>
                <span class="block text-base font-black sm:text-lg md:text-xl">
                  {{ entry.title }}
                </span>
                <span
                  class="block font-mono text-xs font-bold text-gray-600 dark:text-gray-400 sm:text-sm"
                >
                  {{ entry.date }}
                </span>
                <span
                  class="mt-1.5 block text-sm leading-relaxed sm:mt-2 sm:text-base"
                >
                  {{ entry.description }}
                </span>
                <span
                  class="mt-2 flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 sm:mt-3 sm:text-sm"
                >
                  <span aria-hidden="true">📍</span>{{ entry.locationName }}
                </span>
              </button>
              }
            </div>
          </aside>

          <div
            class="absolute right-4 top-4 z-10 max-w-[200px] rounded-md border-2 border-black bg-white/80 p-2 px-3 text-xs font-medium text-black shadow-md backdrop-blur-sm dark:bg-black/80 dark:text-white sm:max-w-xs sm:text-sm md:right-20 lg:right-24"
          >
            Click markers or timeline items to explore!
          </div>

          @for (entry of timeline(); track entry.id; let index = $index) {
          <button
            class="portfolio-marker"
            type="button"
            [style.left.%]="entry.x"
            [style.top.%]="entry.y"
            [class.is-active]="activeJourney() === index"
            (click)="activeJourneyChanged.emit(index)"
            [attr.aria-label]="'Show ' + entry.popupTitle"
          >
            <span></span>
          </button>
          }

          <div
            class="portfolio-popup"
            [style.left.%]="activeEntry().x"
            [style.top.%]="activeEntry().y"
          >
            <h3>{{ activeEntry().popupTitle }}</h3>
            <p>{{ activeEntry().popupDescription }}</p>
          </div>

          <div
            class="absolute bottom-2 right-2 z-10 flex flex-col gap-1.5 sm:bottom-4 sm:right-4 sm:gap-2 lg:top-4"
          >
            <button
              class="portfolio-map-control"
              type="button"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              class="portfolio-map-control"
              type="button"
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              class="portfolio-map-control text-base"
              type="button"
              aria-label="Reset map"
            >
              ⌂
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioJourneyComponent {
  readonly activeJourney = input(0);
  readonly timeline = input.required<TimelineEntry[]>();
  readonly activeJourneyChanged = output<number>();

  protected activeEntry(): TimelineEntry {
    return this.timeline()[this.activeJourney()];
  }
}
