import { Directive, computed, input } from '@angular/core';

import { nbPaddingValue, type NbPadding } from '../../tokens/padding';

/**
 * INTERNAL capability — not part of the public API. Composed into primitives via
 * `hostDirectives`. Resolves `padding` to a literal value only — it writes no
 * CSS. The primitive maps `value` onto the real `[style.padding]` (`null`
 * removes the inline style, letting the primitive's CSS read the public
 * `--nb-<namespace>-padding` hook with its library default).
 */
@Directive({
  selector: '[nbPaddingCapability]',
  host: {
    '[attr.data-padding]': 'padding() ?? null',
  },
})
export class NbPaddingCapability {
  readonly padding = input<NbPadding | undefined>(undefined);

  readonly value = computed(() => {
    const padding = this.padding();
    return padding ? nbPaddingValue(padding) : null;
  });
}
