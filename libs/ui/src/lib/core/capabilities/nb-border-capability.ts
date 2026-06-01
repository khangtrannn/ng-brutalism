import { Directive, computed, inject, input } from '@angular/core';

import { nbBorderWidthValue, type NbBorderStrength } from '../../tokens/border';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Defaults and scoped public
 * tokens flow through marker CSS; explicit inputs write the final property.
 * Border color is owned by the tone capability.
 */
@Directive({
  selector: '[nbBorderCapability]',
  host: {
    class: 'nb-border-width',
    '[style.--_nb-border-width-default]': 'borderWidthDefaultVar()',
    '[style.--nb-border-width-token]': 'borderWidthTokenVar()',
    '[style.border-width]': 'borderWidthInputStyle()',
    '[attr.data-border]': 'resolved()',
  },
})
export class NbBorderCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly border = input<NbBorderStrength | undefined>(undefined);

  private readonly fallback = computed(() => this.defaults.border ?? 'default');
  protected readonly resolved = computed(() => this.border() ?? this.fallback());

  protected readonly borderWidthDefaultVar = computed(() =>
    nbBorderWidthValue(this.fallback()),
  );
  protected readonly borderWidthTokenVar = computed(
    () =>
      `var(--nb-${this.namespace}-border-width, var(--_nb-border-width-default))`,
  );
  protected readonly borderWidthInputStyle = computed(() => {
    const border = this.border();

    return border ? nbBorderWidthValue(border) : null;
  });
}
