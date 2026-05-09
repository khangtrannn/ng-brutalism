import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbButton } from '@ng-neo-brutalism/ui';

@Component({
  selector: 'docs-home',
  standalone: true,
  imports: [NbButton, RouterLink],
  template: `
    <article>
      <header class="mb-8">
        <p class="mb-2 text-sm font-bold uppercase tracking-wide">
          Ng Neo Brutalism
        </p>
        <h1>Components</h1>
        <p class="mt-0 max-w-2xl text-base font-medium sm:text-lg">
          Angular 18 standalone UI primitives with hard borders, offset shadows,
          and strong keyboard focus states.
        </p>
      </header>

      <div class="flex flex-wrap gap-4">
        <a nbButton variant="neutral" routerLink="/components/accordion">
          Accordion
        </a>

        <a nbButton variant="neutral" routerLink="/components/button">
          Button
        </a>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {}
