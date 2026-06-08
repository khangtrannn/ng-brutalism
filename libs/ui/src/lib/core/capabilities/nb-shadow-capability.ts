import { Directive, computed, input } from '@angular/core';

import { nbShadowValue, type NbShadow } from '../../tokens/shadow';

/**
 * INTERNAL capability — not part of the public API. Composed into primitives via
 * `hostDirectives`. Resolves `shadow` to a literal value only — it writes no
 * CSS. The primitive maps `value` onto the real `[style.box-shadow]` (`null`
 * removes the inline style, letting the primitive's CSS read the public
 * `--nb-<namespace>-shadow` hook with its library default).
 */
@Directive({
  selector: '[nbShadowCapability]',
  host: {
    '[attr.data-shadow]': 'shadow() ?? null',
  },
})
export class NbShadowCapability {
  readonly shadow = input<NbShadow | undefined>(undefined);

  readonly value = computed(() => {
    const shadow = this.shadow();
    return shadow ? nbShadowValue(shadow) : null;
  });
}
