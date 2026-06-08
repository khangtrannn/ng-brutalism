import { Directive, computed, input } from '@angular/core';

import { NbRadiusCapability } from '../core/capabilities';

export type NbStatusDotState = 'online' | 'offline' | 'live';

export type NbStatusDotSize = 'xs' | 'sm' | 'md' | 'lg';

@Directive({
  selector: 'span[nbStatusDot]',
  hostDirectives: [{ directive: NbRadiusCapability, inputs: ['radius'] }],
  host: {
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.data-state]': 'state()',
    '[attr.data-size]': 'size()',
    '[attr.data-nb-status-dot]': '""',
  },
})
export class NbStatusDot {
  readonly state = input<NbStatusDotState>('online');
  readonly size = input<NbStatusDotSize>('md');

  protected readonly ariaLabel = computed(() => `Status: ${this.state()}`);
}
