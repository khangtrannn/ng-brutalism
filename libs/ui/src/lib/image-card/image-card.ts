import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-image-card',
  standalone: true,
  template: `
    <img
      [src]="image()"
      [alt]="alt()"
      [class]="imageClasses()"
      loading="lazy"
      decoding="async"
    />
    @if (caption()) {
    <div [class]="captionClasses" data-slot="image-card-caption">
      {{ caption() }}
    </div>
    }
  `,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"image-card"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbImageCardComponent {
  readonly image = input.required<string>();
  readonly alt = input.required<string>();
  readonly caption = input<string>('');

  protected readonly classes = nbClass(
    '[--nb-image-card-bg:var(--nb-background)]',
    '[--nb-image-card-fg:var(--nb-foreground)]',
    '[--nb-image-card-border:var(--nb-border)]',
    '[--nb-image-card-radius:var(--nb-radius)]',
    '[--nb-image-card-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
    'flex flex-col overflow-hidden',
    'rounded-(--nb-image-card-radius) border-2 border-(--nb-image-card-border)',
    'bg-(--nb-image-card-bg) text-(--nb-image-card-fg)',
    'shadow-[var(--nb-image-card-shadow)] font-medium'
  );

  protected readonly imageClasses = computed(() =>
    nbClass(
      'block w-full h-auto',
      this.caption() && 'border-b-2 border-(--nb-image-card-border)'
    )
  );

  protected readonly captionClasses = nbClass(
    'px-6 py-4 text-center font-bold text-base'
  );
}
