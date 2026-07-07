import { computed, Directive, input } from '@angular/core';

import {
  nbUnderlineGapValue,
  nbUnderlineWidthValue,
  type NbUnderlineGap,
  type NbUnderlineVariant,
  type NbUnderlineWidth,
} from '@ng-brutalism/ui/tokens';

@Directive({
  selector: '[nbUnderlineCapability]',
  host: {
    '[attr.data-underline]': 'underlineAttr()',
  },
})
export class NbUnderlineCapability {
  readonly underline = input<NbUnderlineVariant>('none');
  readonly underlineGap = input<NbUnderlineGap | undefined>(undefined);
  readonly underlineWidth = input<NbUnderlineWidth | undefined>(undefined);

  protected readonly underlineAttr = computed(() => {
    const u = this.underline();
    return u === 'none' ? null : u;
  });

  readonly gap = computed(() => {
    const gap = this.underlineGap();
    return gap ? nbUnderlineGapValue(gap) : null;
  });

  readonly width = computed(() => {
    const width = this.underlineWidth();
    return width ? nbUnderlineWidthValue(width) : null;
  });
}
