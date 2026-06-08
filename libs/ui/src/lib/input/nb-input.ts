import { Directive, computed, inject, input } from '@angular/core';

import { nbBorderWidthValue, type NbBorderStrength } from '../tokens/border';
import { nbToneVars, type NbToneToken } from '../tokens/tone';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbInputSize } from './input.types';

@Directive({
  selector: 'input[nbInput]',
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[style.background-color]': 'backgroundStyle()',
    '[style.border-color]': 'borderColorStyle()',
    '[style.border-width]': 'borderWidthStyle()',
    '[style.--nb-input-focus-ring-color]': 'borderColorStyle()',
  },
})
export class NbInput {
  readonly size = input<NbInputSize>('md');
  // Conditional application (group merging) means the input resolves tone/border
  // itself rather than composing the host-painting capabilities.
  readonly tone = input<NbToneToken | undefined>(undefined);
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

  // Inputs inside a group are visually merged into the group's surface — no
  // border or background of their own.
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
