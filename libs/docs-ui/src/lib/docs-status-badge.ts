import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { NbComponentStatus } from './docs-component-status';

@Component({
  selector: 'docs-status-badge',
  template: `
    <span
      class="nb-stat-tile"
      [class.nb-stat-tile--mint]="status() === 'stable'"
      [class.nb-stat-tile--yellow]="status() === 'preview'"
    >
      <span class="nb-stat-tile__value">{{ label() }}</span>
      <span class="nb-stat-tile__label">Status</span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsStatusBadge {
  readonly status = input.required<NbComponentStatus>();

  protected readonly label = computed(() =>
    this.status() === 'stable' ? 'Stable' : 'Preview'
  );
}
