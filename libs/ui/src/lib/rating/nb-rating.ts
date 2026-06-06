import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { nbToneVars } from '../tokens/tone';

@Component({
  selector: 'nb-rating',
  template: `
    @for (i of stars(); track i) {
      <span [class]="i <= filled() ? filledClass : emptyClass">{{ i <= filled() ? '★' : '☆' }}</span>
    }
    @if (count() !== undefined) {
      <span class="text-xs font-bold text-(--nb-rating-empty) ml-0.5">({{ count() }})</span>
    }
  `,
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'rating' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { tone: 'warning' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
  ],
  host: {
    '[class]': 'classes',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.role]': '"img"',
    '[style.background-color]': '"transparent"',
    '[style.--nb-rating-filled]': 'ratingFilledColor()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRating {
  readonly value = input<number>(0);
  readonly max = input<number>(5);
  readonly count = input<number | undefined>(undefined);

  private readonly capability = inject(NbToneCapability);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  protected readonly stars = computed(() =>
    Array.from({ length: this.max() }, (_, i) => i + 1)
  );

  protected readonly filled = computed(() =>
    Math.round(Math.min(Math.max(this.value(), 0), this.max()))
  );

  protected readonly ariaLabel = computed(
    () => `${this.value()} out of ${this.max()} stars`
  );

  protected readonly ratingFilledColor = computed(() => {
    const tone = this.capability.tone() ?? this.defaults.tone ?? 'warning';
    return nbToneVars(tone).bg;
  });

  protected readonly classes = nbClass(
    '[--nb-rating-empty:var(--nb-border)]',
    '[--nb-rating-size:1.25rem]',
    'inline-flex items-center gap-0.5'
  );

  protected readonly filledClass = nbClass(
    'text-(--nb-rating-filled)',
    'text-[length:var(--nb-rating-size)]',
    'leading-none'
  );

  protected readonly emptyClass = nbClass(
    'text-(--nb-rating-empty)',
    'text-[length:var(--nb-rating-size)]',
    'leading-none'
  );
}
