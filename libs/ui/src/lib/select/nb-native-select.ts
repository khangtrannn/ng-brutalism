import { Directive, computed, inject, input } from '@angular/core';

import { nbBorderWidthValue, type NbBorderStrength } from '../tokens/border';
import { nbToneVars, type NbTone } from '../tokens/tone';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';

@Directive({
  selector: 'select[nbSelect]',
  host: {
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[style.background-color]': 'backgroundStyle()',
    '[style.color]': 'foregroundStyle()',
    '[style.border-color]': 'borderColorStyle()',
    '[style.border-width]': 'borderWidthStyle()',
    '[style.--nb-select-focus-ring-color]': 'borderColorStyle()',
  },
})
export class NbNativeSelect {
  // Conditional application (group merging) means the select resolves
  // tone/border itself rather than composing the host-painting capabilities.
  readonly tone = input<NbTone | undefined>(undefined);
  readonly border = input<NbBorderStrength | undefined>(undefined);

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });
  protected readonly foregroundStyle = computed(
    () => this.toneVars()?.fg ?? null,
  );
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
