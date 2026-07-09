import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'nb-stat',
  exportAs: 'nbStat',
  template: `
    <ng-content select="[slot=icon]" />
    <span data-slot="stat-body">
      <span data-slot="stat-value">
        {{ value() }}
      </span>
      <span data-slot="stat-label">
        {{ label() }}
      </span>
    </span>
  `,
  host: {
    'data-slot': 'stat',
    '[attr.data-direction]': 'direction()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbStat {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
  readonly direction = input<'row' | 'column'>('column');
}
