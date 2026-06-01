import { Directive, computed, inject, input } from '@angular/core';

import { nbToneVars, type NbToneToken } from '../../tokens/tone';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Composed into primitives via
 * `hostDirectives`. Writes the namespaced tone variables `--nb-<ns>-bg`,
 * `--nb-<ns>-fg`, and `--nb-<ns>-border-color` from a shared tone resolver.
 */
@Directive({
  selector: '[nbToneCapability]',
  host: {
    '[style]': 'styleVars()',
    '[attr.data-tone]': 'resolved()',
  },
})
export class NbToneCapability {
  private readonly namespace = inject(NB_STYLE_NAMESPACE);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly tone = input<NbToneToken | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.tone() ?? this.defaults.tone ?? 'default',
  );

  protected readonly styleVars = computed(() => {
    const ns = this.namespace;
    const vars = nbToneVars(this.resolved());

    return {
      [`--nb-${ns}-bg`]: vars.bg,
      [`--nb-${ns}-fg`]: vars.fg,
      [`--nb-${ns}-border-color`]: vars.borderColor,
    };
  });
}
