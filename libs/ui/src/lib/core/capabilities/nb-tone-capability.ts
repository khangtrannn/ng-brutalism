import { Directive, input } from '@angular/core';

import type { NbTone } from '@ng-brutalism/ui/tokens';

@Directive({
  selector: '[nbToneCapability]',
  host: {
    '[attr.data-nb-tone]': 'tone() ?? null',
  },
})
export class NbToneCapability {
  readonly tone = input<NbTone | undefined>(undefined);
}
