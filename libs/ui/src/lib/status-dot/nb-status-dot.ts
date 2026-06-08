import {
  Directive,
  computed,
  inject,
  input,
} from '@angular/core';

import {
  NbRadiusCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';

export type NbStatusDotState = 'online' | 'offline' | 'live';

export type NbStatusDotSize = 'xs' | 'sm' | 'md' | 'lg';

@Directive({
  selector: 'span[nbStatusDot]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'status-dot' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { radius: 'md' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbRadiusCapability, inputs: ['radius'] },
  ],
  host: {
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.data-state]': 'state()',
    '[attr.data-size]': 'size()',
    '[attr.data-nb-status-dot]': '""',
    '[style.border-radius]': 'radius.value()',
  },
})
export class NbStatusDot {
  readonly state = input<NbStatusDotState>('online');
  readonly size = input<NbStatusDotSize>('md');

  protected readonly radius = inject(NbRadiusCapability);

  protected readonly ariaLabel = computed(() => `Status: ${this.state()}`);
}
