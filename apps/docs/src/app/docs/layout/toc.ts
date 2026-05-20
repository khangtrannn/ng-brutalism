import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface TocHeading {
  readonly id: string;
  readonly text: string;
  readonly level: number;
}

function extractHeadings(contentEl: Element): readonly TocHeading[] {
  const overview = contentEl.querySelector<HTMLElement>('header#overview');
  const marked = contentEl.querySelectorAll<HTMLElement>('[data-docs-heading]');
  const nodes = [...(overview ? [overview] : []), ...Array.from(marked)];

  const seen = new Set<string>();
  const out: TocHeading[] = [];

  nodes.forEach((el) => {
    const id = el.id || el.closest<HTMLElement>('section[id]')?.id;
    const text = el === overview ? 'Overview' : el.textContent?.trim() || '';

    if (!id || !text || seen.has(id)) {
      return;
    }

    seen.add(id);
    out.push({
      id,
      text,
      level: el.tagName === 'H3' ? 3 : 2,
    });
  });

  return out;
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
        <div
          class="toc__item"
          [class.toc__item--sub]="heading.level === 3"
        >
          <span class="toc__marker" aria-hidden="true"></span>
          <span class="toc__text">{{ heading.text }}</span>
        </div>
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

    .toc__item {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.35rem 0.5rem;
      border: 2px solid transparent;
      font-family: var(--font-sans);
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.75);
    }

    .toc__item--sub {
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDocsToc {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly headings = signal<readonly TocHeading[]>([]);

  constructor() {
    afterNextRender(() => this.scan());

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => queueMicrotask(() => this.scan()));
  }

  private scan(): void {
    const contentEl = this.document.querySelector('[data-docs-content]');
    this.headings.set(contentEl ? extractHeadings(contentEl) : []);
  }
}
