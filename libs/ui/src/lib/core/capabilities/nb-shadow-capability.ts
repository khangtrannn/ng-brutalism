import { Directive, computed, inject, input } from '@angular/core';

import { nbShadowValue, type NbShadow } from '../../tokens/shadow';
import {
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  nbCapabilityVars,
} from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Writes the cascade-aware
 * `--nb-<ns>-shadow` (only on explicit input) and `--nb-<ns>-shadow-default`.
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

  private readonly fallback = computed(() => this.defaults.shadow ?? 'default');
  protected readonly resolved = computed(() => this.shadow() ?? this.fallback());

  protected readonly styleVars = computed(() =>
    nbCapabilityVars(
      this.namespace,
      'shadow',
      nbShadowValue,
      this.shadow(),
      this.fallback(),
    ),
  );
}
