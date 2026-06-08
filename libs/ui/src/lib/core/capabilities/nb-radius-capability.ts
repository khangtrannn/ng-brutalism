import { Directive, computed, input } from '@angular/core';

import { nbRadiusValue, type NbRadius } from '../../tokens/radius';

/**
 * INTERNAL capability — not part of the public API. Composed into surface
 * primitives via `hostDirectives`. Owns the radius style end to end: resolves
 * `radius` to a literal geometry value and writes it onto the host
 * `[style.border-radius]`. An unset input writes nothing, letting the
 * primitive's CSS read the public `--nb-<namespace>-radius` hook with its
 * library default.
 *
 * Consumers that need the resolved value for an inner element or a derived
 * style must NOT compose this — they call `nbRadiusValue` directly.
 */
@Directive({
  selector: '[nbRadiusCapability]',
  host: {
    '[style.border-radius]': 'value()',
  },
})
export class NbRadiusCapability {
  readonly radius = input<NbRadius | undefined>(undefined);

  protected readonly value = computed(() => {
    const radius = this.radius();
    return radius ? nbRadiusValue(radius) : null;
  });
}
