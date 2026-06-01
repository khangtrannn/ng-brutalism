import { Directive, computed, inject, input } from '@angular/core';

import { nbRadiusValue, type NbRadius } from '../../tokens/radius';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Writes `--nb-<ns>-radius`.
 */
@Directive({
  selector: '[nbRadiusCapability]',
  host: {
    '[style]': 'styleVars()',
    '[attr.data-radius]': 'resolved()',
  },
})
export class NbRadiusCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly radius = input<NbRadius | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.radius() ?? this.defaults.radius ?? 'md',
  );

  protected readonly styleVars = computed(() => ({
    [`--nb-${this.namespace}-radius`]: nbRadiusValue(this.resolved()),
  }));
}
