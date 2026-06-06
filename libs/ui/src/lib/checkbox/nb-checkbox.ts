import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import { nbToneVars, type NbToneToken } from '../tokens/tone';
import type { NbCheckboxSize } from './checkbox.types';

@Directive({
  selector: 'input[nbCheckbox]',
  host: {
    '[class]': 'classes()',
    '[attr.data-size]': 'size()',
    '[attr.data-tone]': 'tone()',
    '[style.--nb-checkbox-bg]': 'checkboxBg()',
    '[style.--nb-checkbox-fg]': 'checkboxFg()',
  },
})
export class NbCheckbox {
  readonly size = input<NbCheckboxSize>('md');
  readonly tone = input<NbToneToken>('primary');

  protected readonly checkboxBg = computed(() => nbToneVars(this.tone()).bg);
  protected readonly checkboxFg = computed(() => nbToneVars(this.tone()).fg);

  protected readonly classes = computed(() =>
    nbClass(
      '[--nb-checkbox-radius:0]',
      'peer grid shrink-0 cursor-pointer appearance-none place-content-center',
      'rounded-(--nb-checkbox-radius) outline-2 outline-(--nb-border) ring-offset-white',
      'checked:bg-(--nb-checkbox-bg) checked:text-(--nb-checkbox-fg)',
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
