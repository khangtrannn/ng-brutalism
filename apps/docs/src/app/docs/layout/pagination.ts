import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { DOC_NAV } from '../nav';

@Component({
    selector: 'nb-docs-pagination',
    imports: [RouterLink],
    template: `
    <div class="pagination">
      @if (prev()) {
        <a class="pagination__card pagination__card--prev" [routerLink]="prev()!.path">
          <span class="pagination__eyebrow">← Previous</span>
          <span class="pagination__title">{{ prev()!.label }}</span>
        </a>
      }

      @if (next()) {
        <a class="pagination__card pagination__card--next" [routerLink]="next()!.path">
          <span class="pagination__eyebrow">Up next →</span>
          <span class="pagination__title">{{ next()!.label }}</span>
        </a>
      }
    </div>
  `,
    styles: `
    .pagination {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
      margin-top: 4rem;
      padding-top: 1.75rem;
      border-top: 3px dashed var(--nb-border);
    }

    @media (min-width: 640px) {
      .pagination {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
    }

    .pagination__card {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      padding: 0.85rem 1.1rem;
      min-width: 0;
      border: 3px solid var(--nb-border);
      background: var(--nb-paper);
      box-shadow: 5px 5px 0 0 var(--nb-shadow);
      transition: transform 120ms, box-shadow 120ms;
    }

    .pagination__card:hover {
      transform: translate(-2px, -2px);
      box-shadow: 7px 7px 0 0 var(--nb-shadow);
    }

    .pagination__card--prev {
      background: var(--nb-mint);
      grid-column: 1;
    }

    .pagination__card--next {
      background: var(--nb-pink);
      text-align: right;
      align-items: flex-end;
      color: #000;
    }

    @media (min-width: 640px) {
      .pagination__card--next {
        grid-column: 2;
      }
    }

    .pagination__eyebrow {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.7);
    }

    .pagination__title {
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: #000;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NbDocsPagination {
  private readonly router = inject(Router);
  private readonly allItems = DOC_NAV.flatMap((group) => group.items);

  private readonly currentPath = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split(/[?#]/, 1)[0] || '/'),
      startWith(this.router.url.split(/[?#]/, 1)[0] || '/')
    ),
    { initialValue: this.router.url.split(/[?#]/, 1)[0] || '/' }
  );

  protected readonly prev = computed(() => {
    const index = this.allItems.findIndex((item) => item.path === this.currentPath());

    return index > 0 ? this.allItems[index - 1] : null;
  });

  protected readonly next = computed(() => {
    const index = this.allItems.findIndex((item) => item.path === this.currentPath());

    return index >= 0 && index < this.allItems.length - 1 ? this.allItems[index + 1] : null;
  });
}
