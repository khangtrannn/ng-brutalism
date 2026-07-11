import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-faq-overview',
  imports: [NbButton, RouterLink],
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Getting Started</p>
        <h1>FAQ</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Straight answers about Ng Brutalism, the Angular version it targets,
          why it exists, and where it fits compared with other Angular UI
          libraries.
        </p>
      </div>

      <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          class="w-full justify-center sm:w-auto"
          nbButton
          routerLink="/docs/installation"
        >
          Install the library
        </a>
        <a
          class="w-full justify-center sm:w-auto"
          nbButton
          tone="background"
          routerLink="/components/button"
          style="--nb-button-bg: #fff"
        >
          Browse components
        </a>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqOverview {}
