import { Directive, computed, input } from '@angular/core';

import { nbToneVars, type NbToneToken } from '../tokens/tone';
import type { NbCheckboxSize } from './checkbox.types';

@Directive({
  selector: 'input[nbCheckbox]',
  host: {
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
}
