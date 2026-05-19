import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbButton } from '@ng-brutalism/ui';

import JobListingCardExampleComponent from '../components/examples/job-listing-card';

@Component({
  selector: 'docs-introduction-page',
  standalone: true,
  imports: [NbButton, RouterLink, JobListingCardExampleComponent],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <p>Getting Started</p>
        <h1>Introduction</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Angular standalone UI primitives with hard borders, offset shadows,
          and strong keyboard focus states.
        </p>
      </header>

      <section id="components">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Components</h2>
        <p class="mb-5 text-base font-medium">
          Start with the core components, then combine them into your own
          brutally useful Angular interfaces.
        </p>

        <div class="flex flex-wrap gap-4">
          <a
            nbButton
            variant="neutral"
            routerLink="/components/accordion"
            style="--nb-button-bg: #fff"
          >
            Accordion
          </a>

          <a
            nbButton
            variant="neutral"
            routerLink="/components/button"
            style="--nb-button-bg: #fff"
          >
            Button
          </a>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IntroductionPageComponent {}
