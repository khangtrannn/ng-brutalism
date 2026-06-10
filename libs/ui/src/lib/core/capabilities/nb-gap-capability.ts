import { Directive, computed, input } from '@angular/core';

import { nbSpacingValue, type NbSpacing } from '../../tokens/spacing';

/**
 * INTERNAL capability — not part of the public API. Composed into layout
 * primitives via `hostDirectives`. Owns the gap style end to end: resolves
 * `gap` to a literal value and writes it onto the host `[style.gap]`.
 *
 * Consumers that need the explicit gap for local anatomy, such as separator
 * offsets, can inject this capability and read `value`. An unset input writes
 * nothing, letting the primitive's CSS read its public gap hook fallback.
 */
@Directive({
  selector: '[nbGapCapability]',
  host: {
    '[style.gap]': 'value()',
  },
})
export class NbGapCapability {
  readonly gap = input<NbSpacing | undefined>(undefined);

  readonly value = computed(() => {
    const gap = this.gap();
    return gap ? nbSpacingValue(gap) : null;
  });
}
