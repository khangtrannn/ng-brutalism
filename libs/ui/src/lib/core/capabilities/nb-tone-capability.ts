import { Directive, computed, input } from '@angular/core';

import { nbToneVars, type NbToneToken } from '../../tokens/tone';

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
    '[attr.data-tone]': 'tone() ?? null',
  },
})
export class NbToneCapability {
  readonly tone = input<NbToneToken | undefined>(undefined);

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });
  readonly background = computed(() => this.toneVars()?.bg ?? null);
  readonly foreground = computed(() => this.toneVars()?.fg ?? null);
  readonly borderColor = computed(() => this.toneVars()?.borderColor ?? null);
}
