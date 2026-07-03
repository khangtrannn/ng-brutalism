import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import type { NbTone } from '../tokens/tone';

export type NbRatingTone = NbTone;

@Component({
  selector: 'nb-rating',
  template: `
    @for (i of stars(); track i) {
      <span
        data-slot="rating-star"
        [attr.data-filled]="i <= filled() ? '' : null"
      >{{ i <= filled() ? '★' : '☆' }}</span>
    }
    @if (count() !== undefined) {
      <span data-slot="rating-count">({{ count() }})</span>
    }
  `,
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.role]': '"img"',
    '[attr.data-nb-rating]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRating {
  readonly value = input<number>(0);
  readonly max = input<number>(5);
  readonly count = input<number | undefined>(undefined);

  protected readonly stars = computed(() =>
    Array.from({ length: this.max() }, (_, i) => i + 1)
  );

  protected readonly filled = computed(() =>
    Math.round(Math.min(Math.max(this.value(), 0), this.max()))
  );

  protected readonly ariaLabel = computed(
    () => `${this.value()} out of ${this.max()} stars`
  );
}
