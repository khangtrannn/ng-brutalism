import { Directive, computed, inject, input } from '@angular/core';

import { nbPaddingValue, type NbPadding } from '../../tokens/padding';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Writes `--nb-<ns>-padding`.
 * Use only on primitives that own uniform container padding.
 */
@Directive({
  selector: '[nbPaddingCapability]',
  host: {
    '[style]': 'styleVars()',
    '[attr.data-padding]': 'resolved()',
  },
})
export class NbPaddingCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly padding = input<NbPadding | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.padding() ?? this.defaults.padding ?? 'md',
  );

  protected readonly styleVars = computed(() => ({
    [`--nb-${this.namespace}-padding`]: nbPaddingValue(this.resolved()),
  }));
}
