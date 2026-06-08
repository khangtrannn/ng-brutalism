import { Directive, computed, input } from '@angular/core';

import { nbShadowValue, type NbShadow } from '../../tokens/shadow';

/**
 * INTERNAL capability — not part of the public API. Composed into surface
 * primitives via `hostDirectives`. Owns the shadow style end to end: resolves
 * `shadow` to a literal value and writes it onto the host `[style.box-shadow]`.
 * An unset input writes nothing, letting the primitive's CSS read the public
 * `--nb-<namespace>-shadow` hook with its library default.
 *
 * Consumers that need the resolved value for an inner element or a derived
 * style must NOT compose this — they call `nbShadowValue` directly.
 */
@Directive({
  selector: '[nbShadowCapability]',
  host: {
    '[style.box-shadow]': 'value()',
  },
})
export class NbShadowCapability {
  readonly shadow = input<NbShadow | undefined>(undefined);

  protected readonly value = computed(() => {
    const shadow = this.shadow();
    return shadow ? nbShadowValue(shadow) : null;
  });
}
