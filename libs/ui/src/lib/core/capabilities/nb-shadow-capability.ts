import { Directive, computed, inject, input } from '@angular/core';

import { nbShadowValue, type NbShadow } from '../../tokens/shadow';
import { NB_STYLE_DEFAULTS } from './nb-style-tokens';

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
    '[attr.data-shadow]': 'resolved()',
  },
})
export class NbShadowCapability {
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly shadow = input<NbShadow | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.shadow() ?? this.defaults.shadow ?? 'default',
  );

  readonly value = computed(() => {
    const shadow = this.shadow();
    return shadow ? nbShadowValue(shadow) : null;
  });
}
