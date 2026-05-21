import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { DOC_NAV } from '../nav';
import { DocsNavbarCloseIcon } from './navbar.icons';
import { Section, TOP_SECTIONS } from './sections';

const GROUP_COLORS = ['yellow', 'pink', 'mint', 'lavender'] as const;

@Component({
  selector: 'nb-docs-mobile-drawer',
  imports: [RouterLink, RouterLinkActive, DocsNavbarCloseIcon],
  template: `
    @if (open()) {
      <div
        class="fixed inset-0 z-40 bg-black/50 lg:hidden"
        aria-hidden="true"
        (click)="close()"
      ></div>

      <aside
        id="docs-mobile-drawer"
        class="mobile-drawer fixed top-3 right-3 bottom-3 z-50 flex w-[min(20rem,calc(100vw-1.5rem))] flex-col overflow-hidden border-4 border-(--nb-border) bg-(--nb-paper) shadow-[8px_8px_0_0_var(--nb-shadow)] lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Documentation navigation"
      >
        <div
          class="flex items-center justify-between gap-3 border-b-4 border-(--nb-border) bg-(--nb-yellow) px-4 py-3"
        >
          <span class="font-display text-base font-black tracking-wide uppercase">
            Menu
          </span>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center border-3 border-(--nb-border) bg-(--nb-paper) shadow-[3px_3px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5"
            aria-label="Close navigation menu"
            (click)="close()"
          >
            <docs-navbar-close-icon class="size-5" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-4 py-4">
          <section class="mb-5">
            <p
              class="mb-3 inline-block border-3 border-(--nb-border) bg-(--nb-lavender) px-2 py-0.5 font-mono text-[0.65rem] font-black tracking-wider text-white uppercase shadow-[2px_2px_0_0_var(--nb-shadow)]"
            >
              Sections
            </p>
            <div class="flex flex-col gap-2">
              @for (chip of sections; track chip.section) {
                <a
                  class="section-chip"
                  [routerLink]="chip.path"
                  [class.section-chip--active]="activeSection() === chip.section"
                  (click)="close()"
                >
                  {{ chip.label }}
                </a>
              }
            </div>
          </section>

          @for (group of groups; track group.label) {
            <section class="drawer-group" [attr.data-color]="group.color">
              <div class="drawer-group__header">
                <span class="drawer-group__chip">{{ group.label }}</span>
                @if (group.label !== 'Getting started') {
                  <span class="drawer-group__count">{{ group.items.length }}</span>
                }
              </div>

              <div class="space-y-1">
                @for (item of group.items; track item.path) {
                  <a
                    class="drawer-link"
                    [routerLink]="item.path"
                    routerLinkActive="is-active"
                    [routerLinkActiveOptions]="{ exact: item.path === '/docs' }"
                    (click)="close()"
                  >
                    <span class="drawer-link__bullet" aria-hidden="true"></span>
                    {{ item.label }}
                  </a>
                }
              </div>
            </section>
          }
        </div>
      </aside>
    }
  `,
  host: {
    '(document:keydown.escape)': 'close()',
  },
  styles: `
    .mobile-drawer {
      animation: drawer-in 180ms ease-out;
    }

    @keyframes drawer-in {
      from {
        opacity: 0;
        transform: translateX(8px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .section-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.55rem 0.5rem;
      border: 3px solid var(--nb-border);
      background: var(--nb-paper);
      box-shadow: 3px 3px 0 0 var(--nb-shadow);
      font-family: var(--font-display);
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      text-align: center;
      transition: transform 120ms, background-color 120ms;
    }

    .section-chip:hover {
      transform: translate(-1px, -1px);
      box-shadow: 4px 4px 0 0 var(--nb-shadow);
    }

    .section-chip--active {
      background: var(--nb-yellow);
    }

    .drawer-group {
      padding-block: 1rem;
    }

    .drawer-group + .drawer-group {
      margin-top: 0.5rem;
      border-top: 3px dashed var(--nb-border);
    }

    .drawer-group__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      padding-inline: 0.25rem;
    }

    .drawer-group__chip {
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

    .drawer-group[data-color="pink"] .drawer-group__chip {
      background: var(--nb-pink);
      color: #fff;
      transform: rotate(1.5deg);
    }

    .drawer-group[data-color="mint"] .drawer-group__chip {
      background: var(--nb-mint);
      transform: rotate(-1deg);
    }

    .drawer-group[data-color="lavender"] .drawer-group__chip {
      background: var(--nb-lavender);
      color: #fff;
      transform: rotate(2deg);
    }

    .drawer-group__count {
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

    .drawer-link {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 0.55rem;
      border: 2px solid transparent;
      padding: 0.5rem 0.75rem 0.5rem 0.6rem;
      color: var(--nb-foreground);
      font-family: var(--font-sans);
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 1.4;
      transition: background-color 120ms, transform 120ms;
    }

    .drawer-link__bullet {
      display: inline-block;
      width: 8px;
      height: 8px;
      border: 2px solid var(--nb-border);
      background: transparent;
    }

    .drawer-group[data-color="yellow"] .drawer-link:hover .drawer-link__bullet { background: var(--nb-yellow); }
    .drawer-group[data-color="pink"] .drawer-link:hover .drawer-link__bullet { background: var(--nb-pink); }
    .drawer-group[data-color="mint"] .drawer-link:hover .drawer-link__bullet { background: var(--nb-mint); }
    .drawer-group[data-color="lavender"] .drawer-link:hover .drawer-link__bullet { background: var(--nb-lavender); }

    .drawer-link:hover {
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

    .drawer-group[data-color="pink"] .is-active {
      background-color: var(--nb-pink);
      color: #000;
    }

    .drawer-group[data-color="mint"] .is-active {
      background-color: var(--nb-mint);
    }

    .drawer-group[data-color="lavender"] .is-active {
      background-color: var(--nb-lavender);
    }

    .is-active .drawer-link__bullet {
      background: var(--nb-border);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDocsMobileDrawer {
  readonly open = model.required<boolean>();
  readonly activeSection = input.required<Section>();

  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly sections = TOP_SECTIONS;
  protected readonly groups = DOC_NAV.map((group, idx) => ({
    ...group,
    color: GROUP_COLORS[idx % GROUP_COLORS.length],
  }));

  constructor() {
    // Sync drawer open state to body scroll lock (imperative DOM API).
    effect(() => {
      if (!this.isBrowser) return;
      this.document.body.style.overflow = this.open() ? 'hidden' : '';
    });
  }

  protected close(): void {
    if (this.open()) this.open.set(false);
  }
}
