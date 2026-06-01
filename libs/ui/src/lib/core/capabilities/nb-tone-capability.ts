import { Directive, computed, inject, input } from '@angular/core';

import { nbToneVars, type NbToneToken } from '../../tokens/tone';
import { NB_STYLE_DEFAULTS, NB_STYLE_NAMESPACE } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Composed into primitives via
 * `hostDirectives`. Defaults and scoped public tokens flow through low
 * specificity marker CSS; explicit inputs write final inline color properties.
 */
@Directive({
  selector: '[nbToneCapability]',
  host: {
    class: 'nb-tone',
    '[style.--_nb-tone-bg-default]': 'toneBgDefaultVar()',
    '[style.--_nb-tone-fg-default]': 'toneFgDefaultVar()',
    '[style.--_nb-tone-border-color-default]': 'toneBorderColorDefaultVar()',
    '[style.--_nb-tone-bg-token]': 'toneBgTokenVar()',
    '[style.--_nb-tone-fg-token]': 'toneFgTokenVar()',
    '[style.--_nb-tone-border-color-token]': 'toneBorderColorTokenVar()',
    '[style.background-color]': 'toneInputBgStyle()',
    '[style.color]': 'toneInputFgStyle()',
    '[style.border-color]': 'toneInputBorderColorStyle()',
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

  private readonly defaultVars = computed(() =>
    nbToneVars(this.defaults.tone ?? 'default'),
  );
  private readonly inputVars = computed(() => {
    const tone = this.tone();

    return tone ? nbToneVars(tone) : null;
  });

  protected readonly toneBgDefaultVar = computed(() => this.defaultVars().bg);
  protected readonly toneFgDefaultVar = computed(() => this.defaultVars().fg);
  protected readonly toneBorderColorDefaultVar = computed(
    () => this.defaultVars().borderColor,
  );

  protected readonly toneBgTokenVar = computed(
    () => `var(--nb-${this.namespace}-bg, var(--_nb-tone-bg-default))`,
  );
  protected readonly toneFgTokenVar = computed(
    () => `var(--nb-${this.namespace}-fg, var(--_nb-tone-fg-default))`,
  );
  protected readonly toneBorderColorTokenVar = computed(
    () =>
      `var(--nb-${this.namespace}-border-color, var(--_nb-tone-border-color-default))`,
  );

  protected readonly toneInputBgStyle = computed(
    () => this.inputVars()?.bg ?? null,
  );
  protected readonly toneInputFgStyle = computed(
    () => this.inputVars()?.fg ?? null,
  );
  protected readonly toneInputBorderColorStyle = computed(
    () => this.inputVars()?.borderColor ?? null,
  );
}
