import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { DocsNavbarExternalLinkIcon } from './navbar.icons';

@Component({
    selector: 'nb-docs-navbar',
    imports: [RouterLink, DocsNavbarExternalLinkIcon],
    template: `
    <nav
      class="docs-navbar fixed top-3 right-3 left-3 z-50 border-4 border-(--nb-border) bg-(--nb-paper) shadow-[8px_8px_0_0_var(--nb-shadow)]"
      [class.docs-navbar--scrolled]="scrolled()"
      aria-label="Main navigation"
    >
      <div class="flex min-h-20 items-center justify-between gap-5 px-4 py-3 sm:px-6">
        <a
          routerLink="/docs/introduction"
          class="brand group flex items-center gap-3 font-bold"
          aria-label="Ng Neo Brutalism home"
        >
          <img
            class="h-14 w-14 border-4 border-(--nb-border) bg-(--nb-yellow) object-contain shadow-[4px_4px_0_0_var(--nb-shadow)] transition-transform group-hover:-rotate-6"
            src="/logo.png"
            alt=""
            width="56"
            height="56"
            aria-hidden="true"
          />
          <span class="hidden sm:flex flex-col leading-none">
            <span class="brand-title">NG·BRUTALISM</span>
            <span class="brand-sub">angular ui kit</span>
          </span>
        </a>

        <div
          class="hidden flex-1 items-center justify-center gap-3 text-base font-black tracking-normal uppercase lg:flex"
        >
          <a
            class="nav-link"
            routerLink="/docs/introduction"
            [class.nav-link-active]="activeSection() === 'docs'"
          >
            Docs
          </a>
          <a
            class="nav-link"
            routerLink="/components/accordion"
            [class.nav-link-active]="activeSection() === 'components'"
          >
            Components
          </a>
          <a
            class="nav-link"
            routerLink="/showcase/portfolio"
            [class.nav-link-active]="activeSection() === 'showcase'"
          >
            Showcase
          </a>
        </div>

        <div class="flex items-center gap-3">
          <span
            class="hidden md:inline-flex h-10 items-center border-3 border-(--nb-border) bg-(--nb-mint) px-3 text-xs font-black tracking-wider uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]"
            style="font-family: var(--font-mono);"
          >
            v0.1.0 · PRE-1.0
          </span>

          <a
            class="cta inline-flex h-12 items-center gap-2 border-4 border-(--nb-border) bg-(--nb-hot) px-5 text-base font-black tracking-normal text-white uppercase shadow-[5px_5px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5 hover:-rotate-1"
            href="https://github.com/khangtrannn/ng-brutalism"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <docs-navbar-external-link-icon class="size-4" />
          </a>
        </div>
      </div>
    </nav>
  `,
    host: { '(window:scroll)': 'updateScrollState()' },
    styles: `
    .docs-navbar {
      transition: top 160ms ease;
    }

    .docs-navbar--scrolled {
      top: 1px;
    }

    .brand-title {
      font-family: var(--font-display);
      font-size: 1.05rem;
      letter-spacing: 0;
    }

    .brand-sub {
      margin-top: 2px;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.65);
    }

    .nav-link {
      display: inline-flex;
      min-height: 2.5rem;
      align-items: center;
      border: 3px solid transparent;
      padding: 0 0.9rem;
      font-family: var(--font-display);
      line-height: 1;
      transition: transform 120ms, background-color 120ms;
    }

    .nav-link:hover:not(.nav-link-active) {
      background: var(--nb-secondary-background);
      transform: translateY(-1px);
    }

    .nav-link-active {
      border-color: var(--nb-border);
      background: var(--nb-yellow);
      box-shadow: 3px 3px 0 0 var(--nb-shadow);
      transform: rotate(-1deg);
    }

    .nav-link-active:hover {
      transform: rotate(-1deg) translateY(-1px);
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NbDocsNavbar {
  private readonly router = inject(Router);
  protected readonly scrolled = signal(false);

  private readonly currentPath = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => this.normalizePath(e.urlAfterRedirects)),
    ),
    { initialValue: this.normalizePath(this.router.url) },
  );

  protected readonly activeSection = computed(() => {
    const path = this.currentPath();

    if (path.startsWith('/components')) {
      return 'components';
    }

    if (path.startsWith('/showcase')) {
      return 'showcase';
    }

    return 'docs';
  });

  protected updateScrollState(): void {
    this.scrolled.set(window.scrollY > 0);
  }

  private normalizePath(url: string): string {
    return url.split(/[?#]/, 1)[0] || '/';
  }
}
