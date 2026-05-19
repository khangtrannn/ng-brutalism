import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { DOC_NAV } from '../nav';

const GROUP_COLORS = ['yellow', 'pink', 'mint', 'lavender'] as const;

@Component({
    selector: 'nb-docs-sidebar',
    imports: [RouterLink, RouterLinkActive],
    template: `
    <aside
      class="docs-sidebar fixed top-32 left-8 hidden h-[calc(100vh-9rem)] w-72 overflow-y-auto border-4 border-(--nb-border) bg-(--nb-paper) px-4 py-5 shadow-[8px_8px_0_0_var(--nb-shadow)] lg:block"
      aria-label="Documentation navigation"
    >
      @for (group of nav; track group.label; let first = $first; let idx = $index) {
        <section
          class="sidebar-group"
          [class.pt-0]="first"
          [attr.data-color]="groupColor(idx)"
        >
          <div class="sidebar-group__header">
            <span class="sidebar-group__chip">
              {{ group.label }}
            </span>

            @if (group.label !== 'Getting started') {
              <span class="sidebar-group__count">
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
                <span class="sidebar-link__bullet" aria-hidden="true"></span>
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
      padding-block: 1.1rem;
    }

    .sidebar-group + .sidebar-group {
      margin-top: 0.5rem;
      border-top: 3px dashed var(--nb-border);
    }

    .sidebar-group__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 0.85rem;
      padding-inline: 0.25rem;
    }

    .sidebar-group__chip {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.65rem;
      border: 3px solid var(--nb-border);
      background: var(--nb-yellow);
      box-shadow: 3px 3px 0 0 var(--nb-shadow);
      font-family: var(--font-display);
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transform: rotate(-2deg);
    }

    .sidebar-group[data-color="pink"] .sidebar-group__chip {
      background: var(--nb-pink);
      color: #fff;
      transform: rotate(1.5deg);
    }

    .sidebar-group[data-color="mint"] .sidebar-group__chip {
      background: var(--nb-mint);
      transform: rotate(-1deg);
    }

    .sidebar-group[data-color="lavender"] .sidebar-group__chip {
      background: var(--nb-lavender);
      color: #fff;
      transform: rotate(2deg);
    }

    .sidebar-group__count {
      display: inline-flex;
      min-width: 1.5rem;
      height: 1.5rem;
      align-items: center;
      justify-content: center;
      padding: 0 0.45rem;
      border: 3px solid var(--nb-border);
      background: var(--nb-paper);
      box-shadow: 2px 2px 0 0 var(--nb-shadow);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      line-height: 1;
    }

    .sidebar-link {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 0.55rem;
      border: 2px solid transparent;
      padding: 0.4rem 0.75rem 0.4rem 0.6rem;
      color: var(--nb-foreground);
      font-family: var(--font-sans);
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 1.4;
      transition: background-color 120ms, transform 120ms;
    }

    .sidebar-link__bullet {
      display: inline-block;
      width: 8px;
      height: 8px;
      border: 2px solid var(--nb-border);
      background: transparent;
    }

    .sidebar-group[data-color="yellow"] .sidebar-link:hover .sidebar-link__bullet { background: var(--nb-yellow); }
    .sidebar-group[data-color="pink"] .sidebar-link:hover .sidebar-link__bullet { background: var(--nb-pink); }
    .sidebar-group[data-color="mint"] .sidebar-link:hover .sidebar-link__bullet { background: var(--nb-mint); }
    .sidebar-group[data-color="lavender"] .sidebar-link:hover .sidebar-link__bullet { background: var(--nb-lavender); }

    .sidebar-link:hover {
      background: var(--nb-secondary-background);
      transform: translateX(2px);
    }

    .is-active {
      pointer-events: none;
      border-color: var(--nb-border);
      background-color: var(--nb-yellow);
      box-shadow: 3px 3px 0 0 var(--nb-shadow);
      font-weight: 800;
    }

    .sidebar-group[data-color="pink"] .is-active {
      background-color: var(--nb-pink);
      color: #000;
    }

    .sidebar-group[data-color="mint"] .is-active {
      background-color: var(--nb-mint);
    }

    .sidebar-group[data-color="lavender"] .is-active {
      background-color: var(--nb-lavender);
    }

    .is-active .sidebar-link__bullet {
      background: var(--nb-border);
    }

    .docs-sidebar::-webkit-scrollbar {
      width: 6px;
    }

    .docs-sidebar::-webkit-scrollbar-thumb {
      background: var(--nb-border);
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NbDocsSidebar {
  protected readonly nav = DOC_NAV;

  protected groupColor(index: number): (typeof GROUP_COLORS)[number] {
    return GROUP_COLORS[index % GROUP_COLORS.length];
  }
}
