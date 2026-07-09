import { Directive, computed, input } from '@angular/core';

import { nbRadiusStyleTransform } from '../core/input-transforms';
import type { NbRadius } from '@ng-brutalism/ui/tokens';

export type NbStatusDotState = 'online' | 'offline' | 'live';

export type NbStatusDotSize = 'xs' | 'sm' | 'md' | 'lg';
export type NbStatusDotRadius = NbRadius;

@Directive({
  selector: 'span[nbStatusDot]',
  exportAs: 'nbStatusDot',
  host: {
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.data-state]': 'state()',
    '[attr.data-size]': 'size()',
    'data-nb-status-dot': '',
    '[style.--nb-status-dot-radius]': 'radius()',
  },
})
export class NbStatusDot {
  readonly state = input<NbStatusDotState>('online');
  readonly size = input<NbStatusDotSize>('md');
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });

  protected readonly ariaLabel = computed(() => `Status: ${this.state()}`);
}
