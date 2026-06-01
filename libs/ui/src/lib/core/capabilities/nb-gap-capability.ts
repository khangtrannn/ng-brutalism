import { Directive, computed, inject, input } from '@angular/core';

import { nbSpacingValue, type NbSpacing } from '../../tokens/spacing';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Writes `--nb-<ns>-gap` for
 * layout primitives (nbStack / nbCluster / nbSplit).
 */
@Directive({
  selector: '[nbGapCapability]',
  host: {
    '[style]': 'styleVars()',
    '[attr.data-gap]': 'resolved()',
  },
})
export class NbGapCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly gap = input<NbSpacing | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.gap() ?? this.defaults.gap ?? 'md',
  );

  protected readonly styleVars = computed(() => ({
    [`--nb-${this.namespace}-gap`]: nbSpacingValue(this.resolved()),
  }));
}
