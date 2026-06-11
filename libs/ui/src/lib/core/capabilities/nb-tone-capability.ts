import { Directive, input } from '@angular/core';

import type { NbTone } from '../../tokens/tone';

/**
 * INTERNAL capability — not part of the public API. Composed into primitives
 * via `hostDirectives`. Tone is semantic state: CSS maps `data-nb-tone` to the
 * shared internal tone slots and components consume those slots with fallbacks.
 */
@Directive({
  selector: '[nbToneCapability]',
  host: {
    '[attr.data-nb-tone]': 'tone() ?? null',
  },
})
export class NbToneCapability {
  readonly tone = input<NbTone | undefined>(undefined);
}
