import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NbStat, NbSurface } from '@ng-brutalism/ui';

import type { NbComponentStatus } from './docs-component-status';

@Component({
  selector: 'docs-status-badge',
  imports: [NbStat, NbSurface],
  template: `
    <span
      nbSurface
      [tone]="status() === 'stable' ? 'mint' : 'yellow'"
      border="strong"
      padding="sm"
      layout="stack"
      class="items-start"
    >
      <nb-stat [value]="label()" label="Status" />
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
