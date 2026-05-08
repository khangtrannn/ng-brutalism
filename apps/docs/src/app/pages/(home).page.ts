import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbButton } from '@ng-neo-brutalism/ui';

@Component({
  selector: 'docs-home',
  standalone: true,
  imports: [NbButton, RouterLink],
  template: `
    <main class="mx-auto max-w-5xl p-8">
      <header class="mb-10">
        <p class="mb-2 text-sm font-black uppercase tracking-wide">
          Ng Neo Brutalism
        </p>
        <h1 class="mb-4 text-5xl font-black">Components</h1>
        <p class="max-w-2xl text-lg">
          Angular 18 standalone UI primitives with hard borders, offset shadows,
          and strong keyboard focus states.
        </p>
      </header>

      <a nbButton variant="primary" routerLink="/components/button">
        Button
      </a>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {}
