import { Directive, computed, inject, input } from '@angular/core';

import { nbPaddingValue, type NbPadding } from '../../tokens/padding';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Defaults and scoped public
 * tokens flow through marker CSS; explicit inputs write the final property.
 */
@Directive({
  selector: '[nbPaddingCapability]',
  host: {
    class: 'nb-padding',
    '[style.--_nb-padding-default]': 'paddingDefaultVar()',
    '[style.--nb-padding-token]': 'paddingTokenVar()',
    '[style.padding]': 'paddingInputStyle()',
    '[attr.data-padding]': 'resolved()',
  },
})
export class NbPaddingCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly padding = input<NbPadding | undefined>(undefined);

  private readonly fallback = computed(() => this.defaults.padding ?? 'md');
  protected readonly resolved = computed(() => this.padding() ?? this.fallback());

  protected readonly paddingDefaultVar = computed(() =>
    nbPaddingValue(this.fallback()),
  );
  protected readonly paddingTokenVar = computed(
    () => `var(--nb-${this.namespace}-padding, var(--_nb-padding-default))`,
  );
  protected readonly paddingInputStyle = computed(() => {
    const padding = this.padding();

    return padding ? nbPaddingValue(padding) : null;
  });
}
