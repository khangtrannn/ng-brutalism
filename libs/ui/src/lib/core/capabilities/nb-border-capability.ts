import { Directive, computed, inject, input } from '@angular/core';

import { nbBorderWidthValue, type NbBorderStrength } from '../../tokens/border';
import {
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  nbCapabilityVars,
} from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Writes the cascade-aware
 * `--nb-<ns>-border-width` (only on explicit input) and
 * `--nb-<ns>-border-width-default`; border color is owned by the tone capability.
 */
@Directive({
  selector: '[nbBorderCapability]',
  host: {
    '[style]': 'styleVars()',
    '[attr.data-border]': 'resolved()',
  },
})
export class NbBorderCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly border = input<NbBorderStrength | undefined>(undefined);

  private readonly fallback = computed(() => this.defaults.border ?? 'default');
  protected readonly resolved = computed(() => this.border() ?? this.fallback());

  protected readonly styleVars = computed(() =>
    nbCapabilityVars(
      this.namespace,
      'border-width',
      nbBorderWidthValue,
      this.border(),
      this.fallback(),
    ),
  );
}
