import { Directive, computed, inject, input } from '@angular/core';

import { nbToneVars, type NbToneToken } from '../../tokens/tone';
import { NB_STYLE_DEFAULTS } from './nb-style-tokens';

/**
 * INTERNAL capability — not part of the public API. Composed into primitives via
 * `hostDirectives`. Resolves `tone` to literal color values only — it writes no
 * CSS. The primitive maps `background`/`foreground`/`borderColor` onto the real
 * `[style.background]`/`[style.color]`/`[style.border-color]` properties (`null`
 * removes the inline style, letting the primitive's CSS read the public
 * `--nb-<namespace>-{bg,fg,border-color}` hook with its library default).
 */
@Directive({
  selector: '[nbToneCapability]',
  host: {
    '[attr.data-tone]': 'resolved()',
  },
})
export class NbToneCapability {
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  readonly tone = input<NbToneToken | undefined>(undefined);

  protected readonly resolved = computed(
    () => this.tone() ?? this.defaults.tone ?? 'default',
  );

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });
  readonly background = computed(() => this.toneVars()?.bg ?? null);
  readonly foreground = computed(() => this.toneVars()?.fg ?? null);
  readonly borderColor = computed(() => this.toneVars()?.borderColor ?? null);
}
