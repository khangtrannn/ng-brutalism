import { Directive, computed, inject, input } from '@angular/core';

import { nbRadiusValue, type NbRadius } from '../../tokens/radius';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Defaults and scoped public
 * tokens flow through marker CSS; explicit inputs write the final property.
 */
@Directive({
  selector: '[nbRadiusCapability]',
  host: {
    class: 'nb-radius',
    '[style.--_nb-radius-default]': 'radiusDefaultVar()',
    '[style.--nb-radius-token]': 'radiusTokenVar()',
    '[style.border-radius]': 'radiusInputStyle()',
    '[attr.data-radius]': 'resolved()',
  },
})
export class NbRadiusCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly radius = input<NbRadius | undefined>(undefined);

  private readonly fallback = computed(() => this.defaults.radius ?? 'md');
  protected readonly resolved = computed(() => this.radius() ?? this.fallback());

  protected readonly radiusDefaultVar = computed(() => {
    const radius = this.fallback();

    return radius === 'md' ? 'var(--nb-radius)' : nbRadiusValue(radius);
  });
  protected readonly radiusTokenVar = computed(
    () => `var(--nb-${this.namespace}-radius, var(--_nb-radius-default))`,
  );
  protected readonly radiusInputStyle = computed(() => {
    const radius = this.radius();

    return radius ? nbRadiusValue(radius) : null;
  });
}
