import { Directive, computed, inject, input } from '@angular/core';

import { nbSpacingValue, type NbSpacing } from '../../tokens/spacing';
import { NB_STYLE_DEFAULTS } from './nb-style-tokens';

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
    '[attr.data-gap]': 'resolved()',
  },
})
export class NbGapCapability {
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly gap = input<NbSpacing | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.gap() ?? this.defaults.gap ?? 'md',
  );

  readonly value = computed(() => {
    const gap = this.gap();
    return gap ? nbSpacingValue(gap) : null;
  });
}
