import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { highlightCode, type HighlightLanguage } from './syntax-highlighter';

type DocsCodeBlockVariant = 'standalone' | 'embedded';

function inferLanguage(title: string, code: string): HighlightLanguage {
  const normalizedTitle = title.trim().toLowerCase();
  const trimmedCode = code.trimStart();

  if (
    normalizedTitle === 'import' ||
    normalizedTitle.endsWith('.ts') ||
    normalizedTitle === 'component' ||
    trimmedCode.startsWith('import ')
  ) {
    return 'typescript';
  }

  if (normalizedTitle === 'install' || trimmedCode.startsWith('pnpm ')) {
    return 'bash';
  }

  return 'angular-html';
}

@Component({
  selector: 'docs-code-block',
  standalone: true,
  host: {
    class: 'block',
  },
  template: `
    <div
      class="bg-[#2e3440] text-[#eceff4]"
      [class.border-4]="variant() === 'standalone'"
      [class.border-(--nb-border)]="variant() === 'standalone'"
      [class.shadow-[8px_8px_0_0_var(--nb-shadow)]]="variant() === 'standalone'"
    >
      <div class="relative bg-[#2e3440]">
        <div
          class="flex h-11 items-center gap-2 border-b-2 border-[#4c566a] bg-[#3b4252] px-4 text-xs font-black tracking-[0.12em] text-[#d8dee9] uppercase"
          style="font-family: var(--font-mono);"
        >
          <span class="inline-block size-2.5 rounded-full bg-(--nb-pink) border border-white/40"></span>
          <span class="inline-block size-2.5 rounded-full bg-(--nb-yellow) border border-white/40"></span>
          <span class="inline-block size-2.5 rounded-full bg-(--nb-mint) border border-white/40"></span>
          <span class="ml-2">{{ title() }}</span>
        </div>

        <button
          type="button"
          class="absolute top-14 right-3 z-10 inline-flex items-center gap-2 border-2 border-black bg-(--nb-yellow) px-3.5 py-1.5 text-xs font-black tracking-[0.15em] text-black uppercase shadow-[3px_3px_0_0_#fff] transition-transform hover:-translate-y-0.5 hover:-rotate-2 focus-visible:outline-(--nb-focus-ring) focus-visible:outline-offset-(--nb-focus-ring-offset)"
          style="font-family: var(--font-display);"
          (click)="copy()"
        >
          <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">
            <rect x="5" y="5" width="9" height="9" />
            <path d="M2 11V2h9v2" />
            <line x1="7" y1="8.5" x2="12" y2="8.5" />
            <line x1="7" y1="10.5" x2="12" y2="10.5" />
          </svg>
          {{ copied() ? 'Copied' : 'Copy' }}
        </button>

        <div
          class="docs-code-block-pre relative overflow-hidden"
          [style.max-height.rem]="isCollapsible() && !expanded() ? maxLines() * 1 + 3.25 : null"
        >
          @if (highlightedHtml(); as html) {
            <div class="docs-code-block-shiki" [innerHTML]="html"></div>
          } @else {
            <pre
              class="m-0 whitespace-pre-wrap bg-[#2e3440] pl-16 pr-24 pt-6 pb-7 text-xs text-[#eceff4]"
              style="font-family: var(--font-mono); line-height: 1rem; overflow-wrap: anywhere; word-break: break-word;"
            ><code>{{ code() }}</code></pre>
          }
        </div>

        @if (isCollapsible()) {
          <div
            class="flex items-center justify-between gap-4 border-t-2 border-[#4c566a] bg-[#3b4252] px-4 py-3"
          >
            <div class="flex items-center gap-3 text-xs text-[#d8dee9]" style="font-family: var(--font-mono);">
              <span
                class="inline-flex size-8 shrink-0 items-center justify-center border-2 border-black bg-(--nb-lavender) text-black"
                aria-hidden="true"
              >
                <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" />
                  <line x1="8" y1="7" x2="8" y2="11.5" stroke-linecap="round" />
                  <circle cx="8" cy="4.6" r="0.85" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span>Click '{{ expanded() ? 'Show less' : 'Show more' }}' to view {{ expanded() ? 'a condensed view' : 'additional details' }}.</span>
            </div>

            <button
              type="button"
              class="inline-flex items-center gap-2.5 border-2 border-black bg-(--nb-mint) px-4 py-2 text-xs font-black tracking-[0.15em] text-black uppercase shadow-[3px_3px_0_0_#fff] transition-transform hover:-translate-y-0.5 hover:rotate-1 focus-visible:outline-(--nb-focus-ring) focus-visible:outline-offset-(--nb-focus-ring-offset)"
              style="font-family: var(--font-display);"
              (click)="toggle()"
            >
              <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <rect x="2" y="2" width="12" height="12" stroke-dasharray="2 2" />
                <line x1="8" y1="5.5" x2="8" y2="10.5" stroke-linecap="round" />
                @if (!expanded()) {
                  <line x1="5.5" y1="8" x2="10.5" y2="8" stroke-linecap="round" />
                }
              </svg>
              {{ expanded() ? 'Show less' : 'Show more' }}
              <svg viewBox="0 0 12 12" class="size-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                @if (expanded()) {
                  <path d="M2 8L6 4l4 4" />
                } @else {
                  <path d="M2 4l4 4 4-4" />
                }
              </svg>
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .docs-code-block-shiki ::ng-deep pre.shiki {
        margin: 0;
        padding: 1.5rem 6rem 1.75rem 0;
        background-color: #2e3440 !important;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        line-height: 1.25rem;
        overflow: hidden;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      .docs-code-block-shiki ::ng-deep pre.shiki code {
        counter-reset: line;
        display: block;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      .docs-code-block-shiki ::ng-deep pre.shiki .line {
        display: block;
        padding-left: 4.25rem;
        position: relative;
        min-height: 1rem;
        line-height: 1.25rem;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      .docs-code-block-shiki ::ng-deep pre.shiki .line + .line {
        margin-top: -0.75rem;
      }

      .docs-code-block-shiki ::ng-deep pre.shiki .line::before {
        counter-increment: line;
        content: counter(line);
        position: absolute;
        left: 0;
        width: 3rem;
        padding-right: 1rem;
        text-align: right;
        color: #4c566a;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsCodeBlock {
  readonly title = input('Code');
  readonly code = input.required<string>();
  readonly variant = input<DocsCodeBlockVariant>('standalone');
  readonly language = input<HighlightLanguage | null>(null);
  readonly maxLines = input(18);

  protected readonly copied = signal(false);
  protected readonly expanded = signal(false);
  protected readonly highlightedHtml = signal<SafeHtml | null>(null);
  protected readonly resolvedLanguage = computed(
    () => this.language() ?? inferLanguage(this.title(), this.code()),
  );
  protected readonly isCollapsible = computed(
    () => this.code().split('\n').length > this.maxLines(),
  );

  private readonly sanitizer = inject(DomSanitizer);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    effect(
      () => {
        const code = this.code();
        const lang = this.resolvedLanguage();
        if (!this.isBrowser) return;
        void highlightCode(code, lang).then((html) => {
          this.highlightedHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
        });
      },
      { allowSignalWrites: true },
    );
  }

  copy(): void {
    void navigator.clipboard.writeText(this.code());
    this.copied.set(true);

    window.setTimeout(() => this.copied.set(false), 1400);
  }

  toggle(): void {
    this.expanded.update((value) => !value);
  }
}
