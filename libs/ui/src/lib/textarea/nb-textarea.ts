import { Directive, computed, inject, input } from '@angular/core';

import { nbBorderWidthValue, type NbBorderStrength } from '../tokens/border';
import { nbToneVars, type NbTone } from '../tokens/tone';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbTextareaSize } from './textarea.types';

@Directive({
  selector: 'textarea[nbTextarea]',
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[style.background-color]': 'backgroundStyle()',
    '[style.border-color]': 'borderColorStyle()',
    '[style.border-width]': 'borderWidthStyle()',
    '[style.--nb-textarea-focus-ring-color]': 'borderColorStyle()',
  },
})
export class NbTextarea {
  readonly size = input<NbTextareaSize>('md');
  // Conditional application (group merging) means the textarea resolves
  // tone/border itself rather than composing the host-painting capabilities.
  readonly tone = input<NbTone | undefined>(undefined);
  readonly border = input<NbBorderStrength | undefined>(undefined);

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });
  protected readonly borderColorStyle = computed(
    () => this.toneVars()?.borderColor ?? null,
  );

  protected readonly backgroundStyle = computed(() =>
    this.isInGroup ? 'transparent' : (this.toneVars()?.bg ?? null),
  );
  protected readonly borderWidthStyle = computed(() => {
    if (this.isInGroup) {
      return '0';
    }
    const border = this.border();
    return border ? nbBorderWidthValue(border) : null;
  });
}
