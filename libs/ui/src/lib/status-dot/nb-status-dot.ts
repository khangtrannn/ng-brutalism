import {
  Directive,
  computed,
  inject,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbRadiusCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';

export type NbStatusDotState = 'online' | 'offline' | 'live';

export type NbStatusDotSize = 'xs' | 'sm' | 'md' | 'lg';

const STATUS_DOT_SIZE_MAP: Record<NbStatusDotSize, string> = {
  xs: '8px',
  sm: '10px',
  md: '12px',
  lg: '16px',
};

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
    '[class]': 'classes()',
    '[style.--nb-status-dot-size]': 'sizeVar()',
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.data-state]': 'state()',
    '[attr.data-size]': 'size()',
    '[attr.data-nb-status-dot]': '""',
    '[style.border-radius]': 'radiusStyle()',
  },
})
export class NbStatusDot {
  readonly state = input<NbStatusDotState>('online');
  readonly size = input<NbStatusDotSize>('md');

  private readonly radius = inject(NbRadiusCapability);

  protected readonly radiusStyle = computed(() => this.radius.value());

  protected readonly classes = computed(() =>
    nbClass(
      'inline-block shrink-0 rounded-full border-2 border-(--nb-border)',
      'w-(--nb-status-dot-size) h-(--nb-status-dot-size)',
      this.stateClass()
    )
  );

  protected readonly ariaLabel = computed(() => `Status: ${this.state()}`);

  protected readonly sizeVar = computed(() =>
    STATUS_DOT_SIZE_MAP[this.size()]
  );

  private stateClass(): string {
    const map: Record<NbStatusDotState, string> = {
      online: 'bg-(--nb-success)',
      offline: 'bg-(--nb-secondary-background)',
      live: 'bg-(--nb-danger) animate-pulse',
    };
    return map[this.state()];
  }
}
