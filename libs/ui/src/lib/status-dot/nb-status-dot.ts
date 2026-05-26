import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbStatusDotState = 'online' | 'offline' | 'live';

@Directive({
  selector: 'span[nbStatusDot]',
  host: {
    '[class]': 'classes()',
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.data-state]': 'state()',
    '[attr.data-nb-status-dot]': '""',
  },
})
export class NbStatusDot {
  readonly state = input<NbStatusDotState>('online');

  protected readonly classes = computed(() =>
    nbClass(
      'inline-block shrink-0 rounded-full border-2 border-(--nb-border)',
      'w-(--nb-status-dot-size,10px) h-(--nb-status-dot-size,10px)',
      this.stateClass()
    )
  );

  protected readonly ariaLabel = computed(() => `Status: ${this.state()}`);

  private stateClass(): string {
    const map: Record<NbStatusDotState, string> = {
      online: 'bg-(--nb-success)',
      offline: 'bg-(--nb-secondary-background)',
      live: 'bg-(--nb-danger) animate-pulse',
    };
    return map[this.state()];
  }
}
