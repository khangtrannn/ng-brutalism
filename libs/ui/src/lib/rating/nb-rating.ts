import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { nbToneVars, type NbToneToken } from '../tokens/tone';

@Component({
  selector: 'nb-rating',
  template: `
    @for (i of stars(); track i) {
      <span
        data-slot="rating-star"
        [attr.data-filled]="i <= filled() ? '' : null"
        [style.color]="i <= filled() ? ratingFilledColor() : null"
      >{{ i <= filled() ? '★' : '☆' }}</span>
    }
    @if (count() !== undefined) {
      <span data-slot="rating-count">({{ count() }})</span>
    }
  `,
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
  // The filled-star color resolves the tone token to a literal at render time
  // (inner element, no CSS fallback chain), so the rating owns the tone input
  // directly. The 'warning' default stands in when no tone is set.
  readonly tone = input<NbToneToken | undefined>(undefined);

  protected readonly stars = computed(() =>
    Array.from({ length: this.max() }, (_, i) => i + 1)
  );

  protected readonly filled = computed(() =>
    Math.round(Math.min(Math.max(this.value(), 0), this.max()))
  );

  protected readonly ariaLabel = computed(
    () => `${this.value()} out of ${this.max()} stars`
  );

  protected readonly ratingFilledColor = computed(
    () => nbToneVars(this.tone() ?? 'warning').bg,
  );
}
