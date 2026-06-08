import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import { nbToneVars, type NbToneToken } from '../tokens/tone';
import type { NbCheckboxSize } from './checkbox.types';

@Directive({
  selector: 'input[nbCheckbox]',
  host: {
    '[class]': 'classes()',
    '[attr.data-size]': 'size()',
    '[attr.data-tone]': "tone() ?? 'primary'",
    '[style.--nb-checkbox-bg]': 'checkboxBg()',
    '[style.--nb-checkbox-fg]': 'checkboxFg()',
  },
})
export class NbCheckbox {
  readonly size = input<NbCheckboxSize>('md');
  readonly tone = input<NbToneToken | undefined>(undefined);

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });

  protected readonly checkboxBg = computed(() => this.toneVars()?.bg ?? null);
  protected readonly checkboxFg = computed(() => this.toneVars()?.fg ?? null);

  protected readonly classes = computed(() =>
    nbClass(
      '[--nb-checkbox-radius:0]',
      'peer grid shrink-0 cursor-pointer appearance-none place-content-center',
      'rounded-(--nb-checkbox-radius) outline-2 outline-(--nb-border) ring-offset-white',
      'checked:bg-[var(--nb-checkbox-bg,var(--nb-primary))] checked:text-[var(--nb-checkbox-fg,var(--nb-primary-foreground))]',
      'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      this.sizeClass()
    )
  );

  private sizeClass(): string {
    const map: Record<NbCheckboxSize, string> = {
      md: 'size-4',
      sm: 'size-3.5',
      lg: 'size-5',
    };
    return map[this.size()];
  }
}
