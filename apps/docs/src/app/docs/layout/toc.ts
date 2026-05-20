import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  DOCUMENT,
  inject,
  signal,
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
          [class.active]="activeId() === heading.id"
          [attr.aria-current]="activeId() === heading.id ? 'location' : null"
          (click)="onLinkClick($event, heading.id)"
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
      background: var(--nb-main);
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
  private readonly scrollOffset = 150;

  protected readonly headings = signal<readonly TocHeading[]>([]);
  protected readonly activeId = signal<string | null>(null);

  private headingElements: readonly HTMLElement[] = [];
  private pendingScrollFrame: number | null = null;
  private removeScrollListener: (() => void) | null = null;

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.scanHeadings();
    this.scrollToInitialHash();
    this.updateActiveFromHashOrScroll(false);
    this.listenForScroll();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        queueMicrotask(() => {
          this.scanHeadings();
          this.scrollToInitialHash();
          this.updateActiveFromHashOrScroll(false);
        });
      });

    this.destroyRef.onDestroy(() => {
      this.removeScrollListener?.();

      if (this.pendingScrollFrame !== null) {
        this.window?.cancelAnimationFrame(this.pendingScrollFrame);
      }
    });
  }

  protected onLinkClick(event: MouseEvent, id: string): void {
    event.preventDefault();

    this.updateHash(id, 'push');
    this.activeId.set(id);
    this.scrollToHeading(id, this.prefersReducedMotion() ? 'auto' : 'smooth');
  }

  private scanHeadings(): void {
    const contentEl = this.document.querySelector('[data-docs-content]');

    if (!contentEl) {
      this.headings.set([]);
      this.headingElements = [];
      return;
    }

    const overview = contentEl.querySelector<HTMLElement>('header#overview');
    const markedHeadings = contentEl.querySelectorAll<HTMLElement>(
      '[data-docs-heading]'
    );

    const nodes = [
      ...(overview ? [overview] : []),
      ...Array.from(markedHeadings),
    ];
    const seenIds = new Set<string>();
    const headings: TocHeading[] = [];
    const headingElements: HTMLElement[] = [];

    for (const el of nodes) {
      const id = el.id || el.closest<HTMLElement>('section[id]')?.id;
      const text =
        el === overview ? 'Overview' : el.textContent?.trim() || '';

      if (!id || !text || seenIds.has(id)) {
        continue;
      }

      seenIds.add(id);
      headings.push({
        id,
        text,
        level: el.tagName === 'H3' ? 3 : 2,
      });
      headingElements.push(this.document.getElementById(id) || el);
    }

    this.headings.set(headings);
    this.headingElements = headingElements;
  }

  private listenForScroll(): void {
    const window = this.window;

    if (!window) {
      return;
    }

    const onScroll = () => {
      if (this.pendingScrollFrame !== null) {
        return;
      }

      this.pendingScrollFrame = window.requestAnimationFrame(() => {
        this.pendingScrollFrame = null;
        this.updateActiveFromScroll();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    this.removeScrollListener = () =>
      window.removeEventListener('scroll', onScroll);
  }

  private updateActiveFromHashOrScroll(updateHash: boolean): void {
    const hashId = this.currentHashId();
    const hashExists = hashId
      ? this.headings().some((heading) => heading.id === hashId)
      : false;

    if (hashId && hashExists) {
      this.activeId.set(hashId);
      return;
    }

    this.updateActiveFromScroll(updateHash);
  }

  private updateActiveFromScroll(updateHash = true): void {
    const window = this.window;
    const headings = this.headings();

    if (!window || headings.length === 0) {
      this.activeId.set(null);
      return;
    }

    const activeLine = window.scrollY + this.scrollOffset;
    let active = headings[0]?.id ?? null;

    for (const [index, el] of this.headingElements.entries()) {
      const top = el.getBoundingClientRect().top + window.scrollY;

      if (top <= activeLine) {
        active = headings[index]?.id ?? active;
      } else {
        break;
      }
    }

    if (active && active !== this.activeId()) {
      this.activeId.set(active);

      if (updateHash) {
        this.updateHash(active, 'replace');
      }
    }
  }

  private scrollToInitialHash(): void {
    const id = this.currentHashId();

    if (!id || !this.headings().some((heading) => heading.id === id)) {
      return;
    }

    this.window?.requestAnimationFrame(() => {
      this.scrollToHeading(id, 'auto');
    });
  }

  private scrollToHeading(id: string, behavior: ScrollBehavior): void {
    const window = this.window;
    const target = this.document.getElementById(id);

    if (!window || !target) {
      return;
    }

    const top =
      target.getBoundingClientRect().top + window.scrollY - this.scrollOffset;

    window.scrollTo({ top: Math.max(top, 0), behavior });
  }

  private updateHash(id: string, mode: 'push' | 'replace'): void {
    const window = this.window;

    if (!window || this.currentHashId() === id) {
      return;
    }

    const url = new URL(window.location.href);
    url.hash = id;

    if (mode === 'push') {
      window.history.pushState(null, '', url);
    } else {
      window.history.replaceState(null, '', url);
    }
  }

  private prefersReducedMotion(): boolean {
    return (
      this.window?.matchMedia('(prefers-reduced-motion: reduce)').matches ??
      false
    );
  }

  private currentHashId(): string {
    return decodeURIComponent(this.window?.location.hash.slice(1) ?? '');
  }

  private get window(): Window | null {
    return this.document.defaultView;
  }
}
