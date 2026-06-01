import { Directive, computed, inject, input } from '@angular/core';

import { nbShadowValue, type NbShadow } from '../../tokens/shadow';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Writes `--nb-<ns>-shadow`.
 */
@Directive({
  selector: '[nbShadowCapability]',
  host: {
    '[style]': 'styleVars()',
    '[attr.data-shadow]': 'resolved()',
  },
})
export class NbShadowCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly shadow = input<NbShadow | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.shadow() ?? this.defaults.shadow ?? 'default',
  );

  protected readonly styleVars = computed(() => ({
    [`--nb-${this.namespace}-shadow`]: nbShadowValue(this.resolved()),
  }));
}
