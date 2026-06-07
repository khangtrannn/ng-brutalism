import { Directive, computed, inject, input } from '@angular/core';

import { nbBorderWidthValue, type NbBorderStrength } from '../../tokens/border';
import { NB_STYLE_DEFAULTS } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Composed into primitives via
 * `hostDirectives`. Resolves `border` to a literal width value only — it
 * writes no CSS. The primitive maps `width` onto the real `[style.border-width]`
 * (`null` removes the inline style, letting the primitive's CSS read the public
 * `--nb-<namespace>-border-width` hook with its library default). Border color
 * is owned by the tone capability.
 */
@Directive({
  selector: '[nbBorderCapability]',
  host: {
    '[attr.data-border]': 'resolved()',
  },
})
export class NbBorderCapability {
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly border = input<NbBorderStrength | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.border() ?? this.defaults.border ?? 'default',
  );

  readonly width = computed(() => {
    const border = this.border();
    return border ? nbBorderWidthValue(border) : null;
  });
}
