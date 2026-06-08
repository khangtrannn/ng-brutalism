import { Directive, computed, input } from '@angular/core';

import { nbPaddingValue, type NbPadding } from '../../tokens/padding';

/**
 * INTERNAL capability — not part of the public API. Composed into surface
 * primitives via `hostDirectives`. Owns the padding style end to end: resolves
 * `padding` to a literal value and writes it onto the host `[style.padding]`.
 * An unset input writes nothing, letting the primitive's CSS read the public
 * `--nb-<namespace>-padding` hook with its library default.
 *
 * Consumers that need the resolved value for a derived style (e.g. a negative
 * margin) must NOT compose this — they call `nbPaddingValue` directly.
 */
@Directive({
  selector: '[nbPaddingCapability]',
  host: {
    '[style.padding]': 'value()',
  },
})
export class NbPaddingCapability {
  readonly padding = input<NbPadding | undefined>(undefined);

  protected readonly value = computed(() => {
    const padding = this.padding();
    return padding ? nbPaddingValue(padding) : null;
  });
}
