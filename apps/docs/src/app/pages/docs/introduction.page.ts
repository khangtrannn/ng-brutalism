import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbButton } from '@ng-brutalism/ui';

import JobListingCardExampleComponent from '../components/examples/job-listing-card';

@Component({
    selector: 'docs-introduction-page',
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

      <section id="utilities">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Utilities</h2>
        <p class="mb-5 text-base font-medium">
          <code class="font-mono text-sm">nbClass</code> is exported from
          <code class="font-mono text-sm">&#64;ng-brutalism/ui</code> and merges
          arrays of class strings using
          <code class="font-mono text-sm">clsx</code> +
          <code class="font-mono text-sm">tailwind-merge</code>. Use it inside
          your own components when you want the same conditional-class
          ergonomics the library uses internally.
        </p>
      </section>

      <section id="components">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Highlights</h2>
        <p class="mb-5 text-base font-medium">
          Two of the most-used primitives — see the sidebar for the full
          component list.
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class IntroductionPageComponent {}
