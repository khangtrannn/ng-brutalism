import { Directive, computed, input } from '@angular/core';

import { nbBorderWidthValue, type NbBorderStrength } from '../../tokens/border';

/**
 * INTERNAL capability — not part of the public API. Composed into surface
 * primitives via `hostDirectives`. Owns the border-width style end to end:
 * resolves `border` to a literal width and writes it onto the host
 * `[style.border-width]`. An unset input writes nothing, letting the
 * primitive's CSS read the public `--nb-<namespace>-border-width` hook with its
 * library default. Border color is owned by the tone capability.
 *
 * Consumers that need the resolved width for an inner element or a derived
 * style must NOT compose this — they call `nbBorderWidthValue` directly.
 */
@Directive({
  selector: '[nbBorderCapability]',
  host: {
    '[style.border-width]': 'width()',
  },
})
export class NbBorderCapability {
  readonly border = input<NbBorderStrength | undefined>(undefined);

  protected readonly width = computed(() => {
    const border = this.border();
    return border ? nbBorderWidthValue(border) : null;
  });
}
