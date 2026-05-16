import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

import { DocsCodeBlockComponent } from './docs-code-block.component';

type DocsExampleTab = 'preview' | 'code';

@Component({
  selector: 'docs-example',
  standalone: true,
  imports: [DocsCodeBlockComponent],
  template: `
    <div class="border-4 border-(--nb-border) bg-white shadow-[6px_6px_0_0_var(--nb-shadow)]">
      <div
        class="flex items-center border-b-4 border-(--nb-border) bg-white"
      >
        <button
          type="button"
          class="h-11 flex-1 border-r-2 border-(--nb-border) text-sm font-black uppercase transition-colors sm:text-base"
          [class.bg-[var(--nb-main)]]="activeTab() === 'preview'"
          (click)="activeTab.set('preview')"
        >
          Preview
        </button>
        <button
          type="button"
          class="h-11 flex-1 text-sm font-black uppercase transition-colors sm:text-base"
          [class.bg-[var(--nb-main)]]="activeTab() === 'code'"
          (click)="activeTab.set('code')"
        >
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
      .docs-preview-grid {
        background-color: #ffffff;
        background-image:
          linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
        background-size: 24px 24px, 24px 24px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsExampleComponent {
  readonly code = input.required<string>();
  protected readonly activeTab = signal<DocsExampleTab>('preview');
}
