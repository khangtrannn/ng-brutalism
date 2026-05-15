import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

type DocsCodeBlockVariant = 'standalone' | 'embedded';

@Component({
  selector: 'docs-code-block',
  standalone: true,
  host: {
    class: 'block',
  },
  template: `
    <div
      class="bg-black text-white"
      [class.border-4]="variant() === 'standalone'"
      [class.border-(--nb-border)]="variant() === 'standalone'"
      [class.shadow-[5px_5px_0_0_var(--nb-shadow)]]="variant() === 'standalone'"
    >
      <div
        class="relative bg-black"
      >
        <button
          type="button"
          class="absolute right-3 top-3 z-10 border-2 border-(--nb-border) bg-nb-secondary px-3 py-1 text-sm font-bold text-nb-secondary-fg shadow-[2px_2px_0_0_var(--nb-shadow)] transition-transform focus-visible:outline-(--nb-focus-ring) focus-visible:outline-offset-(--nb-focus-ring-offset) active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          (click)="copy()"
        >
          {{ copied() ? 'Copied' : 'Copy' }}
        </button>

        <pre
          class="m-0 overflow-x-auto whitespace-pre-wrap break-words pb-8 pl-5 pr-28 pt-10 text-xs leading-6"
        ><code>{{ code() }}</code></pre>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsCodeBlockComponent {
  readonly title = input('Code');
  readonly code = input.required<string>();
  readonly variant = input<DocsCodeBlockVariant>('standalone');
  protected readonly copied = signal(false);

  copy(): void {
    void navigator.clipboard.writeText(this.code());
    this.copied.set(true);

    window.setTimeout(() => this.copied.set(false), 1400);
  }
}
