import { Directive, computed, input } from '@angular/core';

import { nbSpacingValue, type NbSpacing } from '../../tokens/spacing';

/**
 * INTERNAL capability — not part of the public API. Composed into primitives via
 * `hostDirectives`. Resolves `gap` to a literal value only — it writes no CSS.
 * The primitive maps `value` onto the real `[style.gap]` (`null` removes the
 * inline style, letting the primitive's CSS read the public
 * `--nb-<namespace>-gap` hook with its library default).
 */
@Directive({
  selector: '[nbGapCapability]',
  host: {
    '[attr.data-gap]': 'gap() ?? null',
  },
})
export class NbGapCapability {
  readonly gap = input<NbSpacing | undefined>(undefined);

  readonly value = computed(() => {
    const gap = this.gap();
    return gap ? nbSpacingValue(gap) : null;
  });
}
