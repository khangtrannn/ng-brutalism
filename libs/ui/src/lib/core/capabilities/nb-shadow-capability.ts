import { Directive, computed, inject, input } from '@angular/core';

import { nbShadowValue, type NbShadow } from '../../tokens/shadow';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Defaults and scoped public
 * tokens flow through marker CSS; explicit inputs write the final property.
 */
@Directive({
  selector: '[nbShadowCapability]',
  host: {
    class: 'nb-shadow',
    '[style.--_nb-shadow-default]': 'shadowDefaultVar()',
    '[style.--nb-shadow-token]': 'shadowTokenVar()',
    '[style.box-shadow]': 'shadowInputStyle()',
    '[attr.data-shadow]': 'resolved()',
  },
})
export class NbShadowCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly shadow = input<NbShadow | undefined>(undefined);

  private readonly fallback = computed(() => this.defaults.shadow ?? 'default');
  protected readonly resolved = computed(() => this.shadow() ?? this.fallback());

  protected readonly shadowDefaultVar = computed(() =>
    nbShadowValue(this.fallback()),
  );
  protected readonly shadowTokenVar = computed(
    () => `var(--nb-${this.namespace}-shadow, var(--_nb-shadow-default))`,
  );
  protected readonly shadowInputStyle = computed(() => {
    const shadow = this.shadow();

    return shadow ? nbShadowValue(shadow) : null;
  });
}
