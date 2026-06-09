import { Directive, computed, input } from '@angular/core';

import { nbToneVars, type NbTone } from '../../tokens/tone';

/**
 * INTERNAL capability — not part of the public API. Composed into surface
 * primitives via `hostDirectives`. Owns the tone style end to end: resolves
 * `tone` to literal colors and writes them onto the host
 * (`background`/`color`/`border-color`). An unset input writes nothing, letting
 * the primitive's CSS read the public `--nb-<namespace>-{bg,fg,border-color}`
 * hooks with their library defaults.
 *
 * Consumers that need the resolved colors for an inner element, a conditional,
 * or a derived style must NOT compose this — they call `nbToneVars` directly.
 */
@Directive({
  selector: '[nbToneCapability]',
  host: {
    '[style.background]': 'background()',
    '[style.color]': 'foreground()',
    '[style.border-color]': 'borderColor()',
  },
})
export class NbToneCapability {
  readonly tone = input<NbTone | undefined>(undefined);

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });
  protected readonly background = computed(() => this.toneVars()?.bg ?? null);
  protected readonly foreground = computed(() => this.toneVars()?.fg ?? null);
  protected readonly borderColor = computed(
    () => this.toneVars()?.borderColor ?? null,
  );
}
