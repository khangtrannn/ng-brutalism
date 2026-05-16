import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nb-docs-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav
      class="fixed top-2 right-2 left-2 z-50 border-4 border-(--nb-border) bg-white shadow-[6px_6px_0_0_var(--nb-shadow)]"
      aria-label="Main navigation"
    >
      <div class="flex min-h-20 items-center justify-between gap-5 px-4 py-3 sm:px-6">
        <a
          routerLink="/"
          class="group flex items-center gap-2 font-bold"
          aria-label="Ng Neo Brutalism home"
        >
          <span
            class="flex h-14 min-w-14 items-center justify-center border-4 border-(--nb-border) bg-black px-3 text-4xl leading-none text-white shadow-[4px_4px_0_0_var(--nb-shadow)] transition-transform group-hover:-translate-y-0.5"
          >
            N
          </span>
        </a>

        <div
          class="hidden flex-1 items-center justify-center gap-6 text-base font-black tracking-normal uppercase lg:flex"
        >
          <a class="nav-link nav-link-active" routerLink="/docs">Docs</a>
          <a class="nav-link" routerLink="/docs/button">Components</a>
          <a class="nav-link" routerLink="/docs/styling">Styling</a>
          <a class="nav-link" routerLink="/docs/charts">Charts</a>
          <a class="nav-link" routerLink="/docs/templates">Templates</a>
          <a class="nav-link" routerLink="/docs/showcase">Showcase</a>
        </div>

        <div class="flex items-center gap-3">
          <a
            class="inline-flex h-12 items-center gap-2 border-4 border-(--nb-border) bg-black px-5 text-base font-black tracking-normal text-white uppercase shadow-[4px_4px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5"
            href="https://github.com/khangtrannn/ng-neo-brutalism-workspace"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="square"
              stroke-linejoin="miter"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: `
    .nav-link {
      display: inline-flex;
      min-height: 2.375rem;
      align-items: center;
      border: 2px solid transparent;
      padding: 0 0.875rem;
      line-height: 1;
      transition: background-color 120ms;
    }

    .nav-link:hover {
      background: var(--nb-secondary-background);
    }

    .nav-link-active {
      border-color: var(--nb-border);
      background: var(--nb-main);
      box-shadow: 3px 3px 0 0 var(--nb-shadow);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDocsNavbarComponent {}
