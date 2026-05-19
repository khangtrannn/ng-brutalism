import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

import { DocsCodeBlock } from './docs-code-block';

type DocsExampleTab = 'preview' | 'code';

@Component({
    selector: 'docs-example',
    imports: [DocsCodeBlock],
    template: `
    <div class="docs-example border-4 border-(--nb-border) bg-white shadow-[8px_8px_0_0_var(--nb-shadow)]">
      <div
        class="flex items-center border-b-4 border-(--nb-border) bg-white"
      >
        <button
          type="button"
          class="docs-example__tab"
          [class.is-active]="activeTab() === 'preview'"
          (click)="activeTab.set('preview')"
        >
          <span class="docs-example__dot" aria-hidden="true"></span>
          Preview
        </button>
        <button
          type="button"
          class="docs-example__tab docs-example__tab--code"
          [class.is-active]="activeTab() === 'code'"
          (click)="activeTab.set('code')"
        >
          <span class="docs-example__dot" aria-hidden="true"></span>
          Code
        </button>
      </div>

      <div>
        @if (activeTab() === 'preview') {
          <div
            class="docs-preview-grid flex min-h-[240px] items-center justify-center px-5 py-10 sm:px-10 sm:py-20"
          >
            <ng-content />
          </div>
        } @else {
          <docs-code-block variant="embedded" [code]="code()" />
        }
      </div>
    </div>
  `,
    styles: [
        `
      .docs-example__tab {
        display: inline-flex;
        flex: 1 1 0;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        height: 3rem;
        border-right: 3px solid var(--nb-border);
        background: var(--nb-paper);
        font-family: var(--font-display);
        font-size: 0.95rem;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        transition: background-color 120ms;
      }

      .docs-example__tab--code {
        border-right: none;
      }

      .docs-example__tab.is-active {
        background: var(--nb-yellow);
      }

      .docs-example__tab--code.is-active {
        background: var(--nb-pink);
        color: #fff;
      }

      .docs-example__dot {
        display: inline-block;
        width: 9px;
        height: 9px;
        border: 2px solid var(--nb-border);
        background: transparent;
      }

      .docs-example__tab.is-active .docs-example__dot {
        background: var(--nb-border);
      }

      .docs-preview-grid {
        background-color: var(--nb-paper);
        background-image:
          linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
        background-size: 24px 24px, 24px 24px;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocsExample {
  readonly code = input.required<string>();
  protected readonly activeTab = signal<DocsExampleTab>('preview');
}
