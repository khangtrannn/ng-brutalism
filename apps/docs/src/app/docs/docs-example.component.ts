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
    <div
      class="border-4 border-[var(--nb-border)] bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
    >
      <div class="grid grid-cols-2">
        <button
          type="button"
          class="appearance-none rounded-none border-2 border-[var(--nb-border)] px-4 py-4 text-base font-bold transition-colors focus-visible:outline-[var(--nb-focus-ring)] focus-visible:outline-offset-[var(--nb-focus-ring-offset)]"
          [class.bg-white]="activeTab() !== 'preview'"
          [class.bg-nb-secondary]="activeTab() === 'preview'"
          [class.text-nb-secondary-fg]="activeTab() === 'preview'"
          (click)="activeTab.set('preview')"
        >
          Preview
        </button>
        <button
          type="button"
          class="appearance-none rounded-none border-2 border-[var(--nb-border)] px-4 py-4 text-base font-bold transition-colors focus-visible:outline-[var(--nb-focus-ring)] focus-visible:outline-offset-[var(--nb-focus-ring-offset)]"
          [class.bg-white]="activeTab() !== 'code'"
          [class.bg-nb-secondary]="activeTab() === 'code'"
          [class.text-nb-secondary-fg]="activeTab() === 'code'"
          (click)="activeTab.set('code')"
        >
          Code
        </button>
      </div>

      @if (activeTab() === 'preview') {
      <div
        class="docs-preview-grid flex min-h-[200px] items-center justify-center px-5 py-10 sm:px-10 sm:py-20"
      >
        <ng-content />
      </div>
      } @else {
      <docs-code-block variant="embedded" [code]="code()" />
      }
    </div>
  `,
  styles: [
    `
      .docs-preview-grid {
        border: 2px solid;
        background-color: var(--nb-surface);
        background-image: linear-gradient(
            rgba(128, 128, 128, 0.3) 1px,
            transparent 1px
          ),
          linear-gradient(90deg, rgba(128, 128, 128, 0.3) 1px, transparent 1px);
        background-size: 40px 40px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsExampleComponent {
  readonly code = input.required<string>();
  protected readonly activeTab = signal<DocsExampleTab>('preview');
}
