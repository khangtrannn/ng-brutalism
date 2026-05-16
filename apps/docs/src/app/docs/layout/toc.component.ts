import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
    <nav class="w-44 shrink-0" aria-label="On this page">
      <p class="mb-3 border-b-2 border-(--nb-border) pb-2 text-xs font-black tracking-[0.12em] text-black/60 uppercase">
        On this page
      </p>

      @for (heading of headings(); track heading.id) {
        <a
          [href]="'#' + heading.id"
          class="block border-2 border-transparent px-2 py-1 text-sm font-bold text-black/70 hover:text-black [&.active]:border-(--nb-border) [&.active]:bg-(--nb-main) [&.active]:text-black"
          [class.pl-4]="heading.level === 3"
        >
          {{ heading.text }}
        </a>
      }
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbDocsTocComponent implements AfterViewInit {
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

    const nodes = contentEl.querySelectorAll('h2, h3');

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
