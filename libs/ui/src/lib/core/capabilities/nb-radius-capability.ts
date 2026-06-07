import { Directive, computed, inject, input } from '@angular/core';

import { nbRadiusValue, type NbRadius } from '../../tokens/radius';
import { NB_STYLE_DEFAULTS } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Composed into primitives via
 * `hostDirectives`. Resolves `radius` to a literal geometry value only — it
 * writes no CSS. The primitive maps `value` onto the real `[style.border-radius]`
 * (`null` removes the inline style, letting the primitive's CSS read the public
 * `--nb-<namespace>-radius` hook with its library default).
 */
@Directive({
  selector: '[nbRadiusCapability]',
  host: {
    '[attr.data-radius]': 'resolved()',
  },
})
export class NbRadiusCapability {
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly radius = input<NbRadius | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.radius() ?? this.defaults.radius ?? 'md',
  );

  readonly value = computed(() => {
    const radius = this.radius();

    return radius ? nbRadiusValue(radius) : null;
  });
}
