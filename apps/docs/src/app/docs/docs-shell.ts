import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

import { docsNavGroups, findDocsNavItem } from './docs.navigation';

@Component({
  selector: 'docs-shell',
  imports: [RouterLink],
  template: `
    <div
      class="min-h-screen bg-(--nb-background) text-(--nb-foreground)"
    >
      <header
        class="sticky top-0 z-30 border-b-4 border-(--nb-border) bg-nb-surface shadow-[0_5px_0_0_var(--nb-shadow)]"
      >
        <div
          class="mx-auto flex h-[70px] max-w-[1300px] items-center justify-between gap-6 px-5"
        >
          <div class="flex items-center gap-10">
            <a
              routerLink="/docs/introduction"
              class="flex items-center justify-center"
              aria-label="Ng Neo Brutalism home"
            >
              <img
                class="size-8 border-[3px] border-(--nb-border) bg-nb-secondary object-contain p-1 shadow-[2px_2px_0_0_var(--nb-shadow)]"
                src="/logo.png"
                alt=""
                width="32"
                height="32"
                aria-hidden="true"
              />
            </a>

            <nav
              aria-label="Main navigation"
              class="hidden items-center gap-10 text-base font-medium lg:flex"
            >
              <a routerLink="/docs/introduction">Docs</a>
              <a routerLink="/components/accordion">Components</a>
              <a routerLink="/showcase/portfolio">Showcase</a>
            </nav>
          </div>

          <div class="flex items-center gap-4">
            <button
              type="button"
              class="relative flex h-10 shrink-0 items-center gap-2 border-[3px] border-(--nb-border) bg-nb-surface px-3 pr-3 text-base font-bold shadow-[5px_5px_0_0_var(--nb-shadow)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none xl:pr-16"
              aria-label="Search documentation"
            >
              <span class="text-sm">Search</span>
              <span
                class="absolute right-2 top-1 hidden h-7 items-center justify-center border-2 border-(--nb-border) bg-nb-secondary px-1.5 text-xs text-nb-secondary-fg xl:flex"
              >
                ⌘ K
              </span>
            </button>

            <a
              class="flex h-10 items-center justify-center border-[3px] border-(--nb-border) bg-nb-surface px-3 text-base font-bold shadow-[5px_5px_0_0_var(--nb-shadow)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              href="https://github.com/khangtrannn/ng-brutalism"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div
        class="grid min-h-[calc(100vh-70px)] bg-[#dcebff] lg:grid-cols-[250px_minmax(0,1fr)_250px]"
      >
        <aside
          class="sticky top-[70px] hidden h-[calc(100vh-70px)] overflow-y-auto border-r-4 border-(--nb-border) bg-nb-surface lg:block"
        >
          <nav aria-label="Documentation navigation">
            @for (group of navGroups; track group.label) {
            <div
              class="border-b-4 border-(--nb-border) p-4 text-xl font-bold"
            >
              {{ group.label }}
            </div>

            @for (item of group.items; track item.label) { @if (item.path) {
            <a
              [routerLink]="item.path"
              class="block border-b-4 border-(--nb-border) p-4 pl-7 text-lg font-medium text-(--nb-foreground) transition-colors hover:bg-nb-secondary hover:text-nb-secondary-fg"
              [class.bg-nb-secondary]="item.path === activeItem()?.path"
              [class.text-nb-secondary-fg]="item.path === activeItem()?.path"
            >
              {{ item.label }}
            </a>
            } @else {
            <span
              class="block border-b-4 border-(--nb-border) p-4 pl-7 text-lg font-medium text-(--nb-foreground) opacity-[0.85]"
              aria-disabled="true"
            >
              {{ item.label }}
            </span>
            } } }
          </nav>
        </aside>

        <main
          class="min-h-[calc(100vh-70px)] border-r-4 border-(--nb-border) px-5 py-12 sm:py-16 lg:py-20"
        >
          <div
            class="docs-prose mx-auto w-full max-w-[650px] 2xl:max-w-[750px]"
          >
            <ng-content />
          </div>
        </main>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsShell {
  private readonly router = inject(Router);

  protected readonly navGroups = docsNavGroups;

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly activeItem = computed(() =>
    findDocsNavItem(this.currentUrl())
  );
}
