import { Directive, computed, inject, input } from '@angular/core';

import { nbPaddingValue, type NbPadding } from '../../tokens/padding';
import { NB_STYLE_DEFAULTS } from './nb-style-tokens';

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
    '[attr.data-padding]': 'resolved()',
  },
})
export class NbPaddingCapability {
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly padding = input<NbPadding | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.padding() ?? this.defaults.padding ?? 'md',
  );

  readonly value = computed(() => {
    const padding = this.padding();
    return padding ? nbPaddingValue(padding) : null;
  });
}
