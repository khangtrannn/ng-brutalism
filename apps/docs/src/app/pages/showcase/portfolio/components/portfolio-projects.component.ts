import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Project } from '../portfolio.types';

@Component({
  selector: 'docs-portfolio-projects',
  standalone: true,
  imports: [],
  template: `
    <section
      id="projects"
      class="portfolio-grid-section relative bg-white p-3 py-8 dark:bg-black sm:p-5 sm:py-12 md:p-8 md:py-16"
    >
      <div class="portfolio-grid-bg absolute inset-0"></div>
      <div class="portfolio-radial absolute inset-0 dark:bg-black"></div>
      <div class="relative z-10 mx-auto max-w-full px-2 sm:px-5">
        <div class="portfolio-section-title mb-6 sm:mb-10">
          <h2
            class="text-center font-heading text-2xl font-black text-black dark:text-[#eeefe9] sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Projects I've Worked On <span aria-hidden="true">🚀</span>
          </h2>
        </div>

        <div
          class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          @for (project of projects(); track project.title) {
          <article class="portfolio-project-card group">
            <div
              class="relative mb-3 h-36 w-full overflow-hidden rounded-lg sm:mb-4 sm:h-44 md:h-48"
            >
              <img
                class="h-full w-full object-cover transition-transform group-hover:scale-110"
                [src]="assetPath() + '/' + project.image"
                [alt]="project.title"
              />
            </div>

            <h3 class="mb-2 text-xl font-bold sm:text-2xl">
              {{ project.title }}
            </h3>
            <p
              class="mb-3 text-sm text-black dark:text-[#eeefe9] sm:mb-4 sm:text-base"
            >
              {{ project.description }}
            </p>

            <div class="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
              @for (tech of project.tech; track tech) {
              <span
                class="border-2 border-black bg-yellow-300 px-2 py-0.5 text-xs font-semibold text-black sm:px-3 sm:py-1 sm:text-sm"
              >
                {{ tech }}
              </span>
              }
            </div>

            <div class="flex flex-wrap gap-2 sm:gap-4">
              <a
                class="portfolio-project-link bg-blue-400"
                [href]="project.github"
                [attr.target]="isPlaceholderLink(project.github) ? null : '_blank'"
                rel="noreferrer"
                [attr.aria-disabled]="isPlaceholderLink(project.github)"
                (click)="onProjectLinkClick($event, project.github)"
              >
                <span aria-hidden="true">⌘</span> Code
              </a>
              <a
                class="portfolio-project-link bg-green-400"
                [href]="project.live"
                [attr.target]="isPlaceholderLink(project.live) ? null : '_blank'"
                rel="noreferrer"
                [attr.aria-disabled]="isPlaceholderLink(project.live)"
                (click)="onProjectLinkClick($event, project.live)"
              >
                <span aria-hidden="true">↗</span> Live Demo
              </a>
            </div>
          </article>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioProjectsComponent {
  readonly assetPath = input.required<string>();
  readonly projects = input.required<Project[]>();

  protected isPlaceholderLink(url: string): boolean {
    return url === '#';
  }

  protected onProjectLinkClick(event: MouseEvent, url: string): void {
    if (this.isPlaceholderLink(url)) {
      event.preventDefault();
    }
  }
}
