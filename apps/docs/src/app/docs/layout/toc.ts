import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
  signal,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface TocHeading {
  readonly id: string;
  readonly text: string;
  readonly level: number;
}

@Component({
  selector: 'nb-docs-toc',
  standalone: true,
  template: `
    <nav class="toc" aria-label="On this page">
      <p class="toc__header">On this page</p>

      @if (headings().length === 0) {
        <p class="toc__empty">No headings yet</p>
      }

      @for (heading of headings(); track heading.id) {
        <a
          [href]="'#' + heading.id"
          class="toc__link"
          [class.toc__link--sub]="heading.level === 3"
        >
          <span class="toc__marker" aria-hidden="true"></span>
          <span class="toc__text">{{ heading.text }}</span>
        </a>
      }
    </nav>
  `,
  styles: `
    .toc {
      width: 100%;
    }

    .toc__header {
      display: inline-block;
      margin-bottom: 1rem;
      padding: 0.3rem 0.7rem;
      border: 3px solid var(--nb-border);
      background: var(--nb-yellow);
      box-shadow: 3px 3px 0 0 var(--nb-shadow);
      font-family: var(--font-display);
      font-size: 0.7rem;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      transform: rotate(-2deg);
    }

    .toc__empty {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: rgba(0, 0, 0, 0.5);
    }

    .toc__link {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.35rem 0.5rem;
      border: 2px solid transparent;
      font-family: var(--font-sans);
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.75);
      transition: transform 120ms, background-color 120ms;
    }

    .toc__link:hover {
      color: #000;
      background: var(--nb-secondary-background);
      transform: translateX(2px);
    }

    .toc__link--sub {
      padding-left: 1.25rem;
      font-size: 0.78rem;
      font-weight: 500;
      opacity: 0.85;
    }

    .toc__marker {
      flex-shrink: 0;
      width: 6px;
      height: 14px;
      border: 2px solid var(--nb-border);
      background: transparent;
    }

    .toc__link.active,
    .toc__link:focus-visible {
      border-color: var(--nb-border);
      background: var(--nb-mint);
      color: #000;
      box-shadow: 3px 3px 0 0 var(--nb-shadow);
      font-weight: 800;
      outline: none;
    }

    .toc__link.active .toc__marker {
      background: var(--nb-border);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDocsToc implements AfterViewInit {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly headings = signal<readonly TocHeading[]>([]);

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.scanHeadings();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        queueMicrotask(() => this.scanHeadings());
      });
  }

  private scanHeadings(): void {
    const contentEl = this.document.querySelector('[data-docs-content]');

    if (!contentEl) {
      this.headings.set([]);
      return;
    }

    const nodes = contentEl.querySelectorAll<HTMLElement>(
      '[data-docs-heading]'
    );

    this.headings.set(
      Array.from(nodes)
        .map((el) => {
          const id = el.id || this.slugify(el.textContent || '');

          if (!el.id && id) {
            el.id = id;
          }

          return {
            id,
            text: el.textContent?.trim() || '',
            level: el.tagName === 'H2' ? 2 : 3,
          };
        })
        .filter((heading) => heading.id && heading.text)
    );
  }

  private slugify(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, '-');
  }
}
