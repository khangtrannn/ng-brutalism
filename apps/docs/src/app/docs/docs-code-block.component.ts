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
      [class.shadow-[6px_6px_0_0_var(--nb-shadow)]]="variant() === 'standalone'"
    >
      <div class="relative bg-black">
        <div
          class="flex h-10 items-center gap-2 border-b-2 border-white/15 bg-black px-4 text-xs font-black tracking-[0.12em] text-white/70 uppercase"
        >
          <span class="inline-block size-2 bg-white/70"></span>
          {{ title() }}
        </div>

        <button
          type="button"
          class="absolute top-12 right-3 z-10 border-2 border-white bg-black px-3 py-1 text-xs font-black tracking-wider text-white uppercase transition-colors hover:bg-white hover:text-black focus-visible:outline-(--nb-focus-ring) focus-visible:outline-offset-(--nb-focus-ring-offset)"
          (click)="copy()"
        >
          {{ copied() ? 'Copied' : 'Copy' }}
        </button>

        <pre
          class="m-0 overflow-x-auto whitespace-pre-wrap break-words bg-black pb-8 pl-5 pr-24 pt-6 text-xs leading-6"
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
