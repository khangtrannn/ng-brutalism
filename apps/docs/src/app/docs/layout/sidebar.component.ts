import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { DOC_NAV } from '../nav';

@Component({
  selector: 'nb-docs-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside
      class="docs-sidebar fixed top-28 left-8 hidden h-[calc(100vh-8rem)] w-72 overflow-y-auto border-4 border-(--nb-border) bg-white px-3 py-5 shadow-[6px_6px_0_0_var(--nb-shadow)] lg:block"
      aria-label="Documentation navigation"
    >
      @for (group of nav; track group.label; let first = $first) {
        <section class="sidebar-group" [class.pt-0]="first">
          @if (!first) {
            <div class="sidebar-divider" aria-hidden="true"></div>
          }

          <div class="mb-3 flex items-center justify-between gap-3 px-3">
            <p
              class="text-xs leading-none font-black tracking-[0.12em] text-black/60 uppercase"
            >
              {{ group.label }}
            </p>

            @if (group.label !== 'Getting started') {
              <span
                class="inline-flex h-5 min-w-5 items-center justify-center border-2 border-(--nb-border) bg-(--nb-secondary-background) px-1.5 text-[10px] leading-none font-black"
              >
                {{ group.items.length }}
              </span>
            }
          </div>

          <div class="space-y-1">
            @for (item of group.items; track item.path) {
              <a
                class="sidebar-link"
                [routerLink]="item.path"
                routerLinkActive="is-active"
                [routerLinkActiveOptions]="{ exact: item.path === '/docs' }"
              >
                {{ item.label }}
              </a>
            }
          </div>
        </section>
      }
    </aside>
  `,
  styles: `
    .sidebar-group {
      padding-block: 1rem;
    }

    .sidebar-divider {
      height: 2px;
      margin: 0 0 1.25rem;
      background: var(--nb-border);
    }

    .sidebar-link {
      position: relative;
      z-index: 1;
      display: block;
      border: 2px solid transparent;
      padding: 0.375rem 0.875rem;
      color: var(--nb-foreground);
      font-size: 0.95rem;
      font-weight: 700;
      line-height: 1.4;
      transition: background-color 120ms;
    }

    .sidebar-link:hover {
      background: var(--nb-secondary-background);
    }

    .is-active {
      pointer-events: none;
      border-color: var(--nb-border);
      background-color: var(--nb-main);
      box-shadow: 3px 3px 0 0 var(--nb-shadow);
    }

    .docs-sidebar::-webkit-scrollbar {
      width: 6px;
    }

    .docs-sidebar::-webkit-scrollbar-thumb {
      background: var(--nb-border);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDocsSidebarComponent {
  protected readonly nav = DOC_NAV;
}
