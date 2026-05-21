import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  PLATFORM_ID,
  resource,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  DocsCodeChevronIcon,
  DocsCodeCopyIcon,
  DocsCodeExpandIcon,
  DocsCodeInfoIcon,
} from './docs-code-block.icons';
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
  imports: [
    DocsCodeChevronIcon,
    DocsCodeCopyIcon,
    DocsCodeExpandIcon,
    DocsCodeInfoIcon,
  ],
  host: {
    class: 'block',
  },
  template: `
    <div
      class="bg-black text-white"
      [class.border-4]="variant() === 'standalone'"
      [class.border-(--nb-border)]="variant() === 'standalone'"
      [class.shadow-[8px_8px_0_0_var(--nb-shadow)]]="variant() === 'standalone'"
    >
      <div class="relative bg-black">
        <div
          class="flex h-11 items-center gap-2 border-b-2 border-white/20 bg-black px-4 text-xs font-black tracking-[0.12em] text-white/80 uppercase"
          style="font-family: var(--font-mono);"
        >
          <span class="inline-block size-2.5 rounded-full bg-(--nb-pink) border border-white/40"></span>
          <span class="inline-block size-2.5 rounded-full bg-(--nb-yellow) border border-white/40"></span>
          <span class="inline-block size-2.5 rounded-full bg-(--nb-mint) border border-white/40"></span>
          <span class="ml-2">{{ title() }}</span>
        </div>

        <button
          type="button"
          class="docs-code-copy-button absolute top-14 right-3 z-10 inline-flex items-center gap-2 border-2 border-black bg-(--nb-yellow) px-3.5 py-1.5 text-xs font-black tracking-[0.15em] text-black uppercase shadow-[3px_3px_0_0_#fff] transition-transform hover:-translate-y-0.5 hover:-rotate-2 focus-visible:outline-(--nb-focus-ring) focus-visible:outline-offset-(--nb-focus-ring-offset)"
          style="font-family: var(--font-display);"
          (click)="copy()"
        >
          <docs-code-copy-icon class="size-4" />
          {{ copied() ? 'Copied' : 'Copy' }}
        </button>

        <div
          class="docs-code-block-pre relative"
          [style.max-height.rem]="isCollapsible() && !expanded() ? maxLines() * 1 + 3.25 : null"
        >
          @if (highlightedHtml.value(); as html) {
            <div class="docs-code-block-shiki" [innerHTML]="html"></div>
          } @else {
            <pre
              class="docs-code-block-fallback m-0 bg-black pl-16 pr-24 pt-6 pb-7 text-xs text-white"
              style="font-family: var(--font-mono); line-height: 1rem;"
            ><code>{{ code() }}</code></pre>
          }
        </div>

        @if (isCollapsible()) {
          <div
            class="flex items-center justify-between gap-4 border-t-2 border-white/20 bg-black px-4 py-3"
          >
            <div class="flex items-center gap-3 text-xs text-white/75" style="font-family: var(--font-mono);">
              <span
                class="inline-flex size-8 shrink-0 items-center justify-center border-2 border-black bg-(--nb-lavender) text-black"
                aria-hidden="true"
              >
                <docs-code-info-icon class="size-4" />
              </span>
              <span>Click '{{ expanded() ? 'Show less' : 'Show more' }}' to view {{ expanded() ? 'a condensed view' : 'additional details' }}.</span>
            </div>

            <button
              type="button"
              class="inline-flex items-center gap-2.5 border-2 border-black bg-(--nb-mint) px-4 py-2 text-xs font-black tracking-[0.15em] text-black uppercase shadow-[3px_3px_0_0_#fff] transition-transform hover:-translate-y-0.5 hover:rotate-1 focus-visible:outline-(--nb-focus-ring) focus-visible:outline-offset-(--nb-focus-ring-offset)"
              style="font-family: var(--font-display);"
              (click)="toggle()"
            >
              <docs-code-expand-icon class="size-4" [expanded]="expanded()" />
              {{ expanded() ? 'Show less' : 'Show more' }}
              <docs-code-chevron-icon
                [direction]="expanded() ? 'up' : 'down'"
                class="size-3"
              />
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

      .docs-code-block-pre {
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-color: var(--nb-yellow) #000;
        scrollbar-width: thin;
      }

      .docs-code-block-pre::-webkit-scrollbar {
        height: 0.75rem;
      }

      .docs-code-block-pre::-webkit-scrollbar-track {
        background: #000;
      }

      .docs-code-block-pre::-webkit-scrollbar-thumb {
        background: var(--nb-yellow);
        border: 2px solid #000;
      }

      .docs-code-block-fallback {
        min-width: max-content;
        white-space: pre;
      }

      .docs-code-block-shiki ::ng-deep pre.shiki {
        margin: 0;
        padding: 1.5rem 6rem 1.75rem 0;
        background-color: #000 !important;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        line-height: 1.25rem;
        min-width: max-content;
        overflow: visible;
        white-space: pre;
      }

      .docs-code-block-shiki ::ng-deep pre.shiki code {
        counter-reset: line;
        display: block;
        white-space: pre;
      }

      .docs-code-block-shiki ::ng-deep pre.shiki .line {
        display: block;
        padding-left: 4.25rem;
        position: relative;
        min-height: 1rem;
        line-height: 1.25rem;
        white-space: pre;
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
        color: rgba(255, 255, 255, 0.3);
      }

      @media (max-width: 640px) {
        .docs-code-copy-button {
          display: flex;
          width: max-content;
          position: relative;
          top: auto;
          right: auto;
          margin: 0.75rem 1rem 0;
        }

        .docs-code-block-shiki ::ng-deep pre.shiki {
          padding: 1.25rem 1.25rem 1.5rem 0;
        }

        .docs-code-block-shiki ::ng-deep pre.shiki .line {
          padding-left: 3.25rem;
        }

        .docs-code-block-shiki ::ng-deep pre.shiki .line::before {
          width: 2.25rem;
          padding-right: 0.75rem;
        }

        .docs-code-block-fallback {
          padding: 1.25rem 1.25rem 1.5rem 3.25rem;
        }
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
  protected readonly resolvedLanguage = computed(
    () => this.language() ?? inferLanguage(this.title(), this.code()),
  );
  protected readonly isCollapsible = computed(
    () => this.code().split('\n').length > this.maxLines(),
  );

  private readonly sanitizer = inject(DomSanitizer);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly highlightedHtml = resource({
    params: () => ({ code: this.code(), lang: this.resolvedLanguage() }),
    loader: async ({ params: { code, lang } }) => {
      if (!this.isBrowser) return null;
      const html = await highlightCode(code, lang);
      return this.sanitizer.bypassSecurityTrustHtml(html);
    },
  });

  copy(): void {
    void navigator.clipboard.writeText(this.code());
    this.copied.set(true);

    window.setTimeout(() => this.copied.set(false), 1400);
  }

  toggle(): void {
    this.expanded.update((value) => !value);
  }
}
