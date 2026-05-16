import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'neo-image-card',
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
      <div [class]="captionClasses()" data-slot="image-card-caption">
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
    'flex flex-col overflow-hidden',
    'rounded-nb border-2 border-(--nb-border)',
    'bg-(--nb-background) text-(--nb-foreground)',
    'shadow-nb font-medium'
  );

  protected readonly imageClasses = computed(() =>
    nbClass(
      'block w-full h-auto',
      this.caption() && 'border-b-2 border-(--nb-border)'
    )
  );

  protected readonly captionClasses = computed(() =>
    nbClass('px-6 py-4 text-center font-bold text-base')
  );
}
