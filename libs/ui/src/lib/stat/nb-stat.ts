import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-stat',
  template: `
    <ng-content select="[slot=icon]" />
    <span class="flex flex-col gap-0.5">
      <span class="text-[length:var(--nb-stat-value-size)] font-black leading-none tracking-tight">
        {{ value() }}
      </span>
      <span class="text-[length:var(--nb-stat-label-size)] font-bold text-(--nb-stat-label-fg) uppercase tracking-wide">
        {{ label() }}
      </span>
    </span>
  `,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': '"stat"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbStat {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
  readonly direction = input<'row' | 'column'>('column');

  protected readonly classes = computed(() =>
    nbClass(
      '[--nb-stat-value-size:1.5rem]',
      '[--nb-stat-label-size:0.625rem]',
      '[--nb-stat-label-fg:var(--nb-foreground)]',
      'inline-flex items-center gap-2',
      this.direction() === 'row' ? 'flex-row' : 'flex-col'
    )
  );
}
