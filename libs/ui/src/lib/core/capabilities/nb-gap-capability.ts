import { Directive, computed, inject, input } from '@angular/core';

import { nbSpacingValue, type NbSpacing } from '../../tokens/spacing';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Defaults and scoped public
 * tokens flow through marker CSS; explicit inputs write the final property.
 */
@Directive({
  selector: '[nbGapCapability]',
  host: {
    class: 'nb-gap',
    '[style.--_nb-gap-input]': 'gapInputVar()',
    '[style.--_nb-gap-default]': 'gapDefaultVar()',
    '[style.--_nb-gap-resolved]': 'gapResolvedVar()',
    '[style.gap]': 'gapInputStyle()',
    '[attr.data-gap]': 'resolved()',
  },
})
export class NbGapCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly gap = input<NbSpacing | undefined>(undefined);

  private readonly fallback = computed(() => this.defaults.gap ?? 'md');
  protected readonly resolved = computed(() => this.gap() ?? this.fallback());

  protected readonly gapDefaultVar = computed(() =>
    nbSpacingValue(this.fallback()),
  );
  protected readonly gapInputVar = computed(() => {
    const gap = this.gap();

    return gap ? nbSpacingValue(gap) : null;
  });
  protected readonly gapResolvedVar = computed(
    () =>
      `var(--_nb-gap-input, var(--nb-${this.namespace}-gap, var(--_nb-gap-default)))`,
  );
  protected readonly gapInputStyle = computed(() => {
    const gap = this.gap();

    return gap ? nbSpacingValue(gap) : null;
  });
}
