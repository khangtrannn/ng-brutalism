import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { DOC_NAV } from '../nav';

@Component({
  selector: 'nb-docs-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside
      class="fixed left-0 top-14 hidden h-[calc(100vh-3.5rem)] w-60 overflow-y-auto border-r-2 border-(--nb-border) bg-(--nb-secondary-background) lg:block"
      aria-label="Documentation navigation"
    >
      <div #container class="relative">
        <div
          class="pointer-events-none absolute inset-x-4 border-2 border-(--nb-border) bg-(--nb-main) shadow-[4px_4px_0_0_var(--nb-shadow)]"
          [style.top.px]="indicatorTop()"
          [style.height.px]="indicatorHeight()"
          [style.opacity]="indicatorVisible() ? 1 : 0"
          [style.transition]="transitionStyle()"
        ></div>

        @for (group of nav; track group.label) {
          <div class="px-4 py-3">
            <p class="mb-2 text-xs font-bold uppercase text-gray-500">
              {{ group.label }}
            </p>

            @for (item of group.items; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="is-active"
                [routerLinkActiveOptions]="{ exact: item.path === '/docs' }"
                class="relative z-10 block px-3 py-1.5 text-sm hover:font-bold [&.is-active]:font-bold"
              >
                {{ item.label }}
              </a>
            }
          </div>
        }
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDocsSidebarComponent {
  protected readonly nav = DOC_NAV;

  containerRef = viewChild.required<ElementRef<HTMLElement>>('container')

  private readonly router = inject(Router);

  readonly indicatorTop = signal(0);
  readonly indicatorHeight = signal(32);
  readonly indicatorVisible = signal(false);
  private readonly transitionEnabled = signal(false);

  protected readonly transitionStyle = computed(() =>
    this.transitionEnabled() ? 'top 150ms ease-out, height 150ms ease-out' : 'none',
  );

  constructor() {
    afterNextRender(() => {
      this.positionAtActive();
      requestAnimationFrame(() => this.indicatorVisible.set(true));
    });

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.transitionEnabled.set(true);
        requestAnimationFrame(() => {
          this.positionAtActive();
          setTimeout(() => this.transitionEnabled.set(false), 200);
        });
      });
  }

  private positionAtActive() {
    const container = this.containerRef().nativeElement;
    if (!container) return;
    const active = container.querySelector<HTMLElement>('.is-active');
    if (active) this.moveIndicatorTo(active);
  }

  private moveIndicatorTo(link: HTMLElement) {
    const containerRect = this.containerRef().nativeElement.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    this.indicatorTop.set(linkRect.top - containerRect.top);
    this.indicatorHeight.set(linkRect.height);
  }
}
