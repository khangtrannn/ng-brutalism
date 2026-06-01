import { Directive, computed, inject, input } from '@angular/core';

import { nbRadiusValue, type NbRadius } from '../../tokens/radius';
import {
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  nbCapabilityVars,
} from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Writes the cascade-aware
 * `--nb-<ns>-radius` (only on explicit input) and `--nb-<ns>-radius-default`.
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

  private readonly fallback = computed(() => this.defaults.radius ?? 'md');
  protected readonly resolved = computed(() => this.radius() ?? this.fallback());

  protected readonly styleVars = computed(() =>
    nbCapabilityVars(
      this.namespace,
      'radius',
      nbRadiusValue,
      this.radius(),
      this.fallback(),
    ),
  );
}
