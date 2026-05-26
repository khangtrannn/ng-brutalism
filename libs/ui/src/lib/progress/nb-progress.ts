import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbProgressTone = 'default' | 'success' | 'warning' | 'danger' | 'accent';

@Component({
  selector: 'nb-progress',
  template: `
    <div
      role="progressbar"
      [attr.aria-valuenow]="clampedValue()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max()"
      [attr.aria-label]="label() || 'Progress'"
      class="relative h-full w-full overflow-hidden"
    >
      <div
        class="h-full transition-all duration-300 ease-out"
        [class]="fillClass()"
        [style.width.%]="percentage()"
      ></div>
    </div>
  `,
  host: {
    '[class]': 'hostClass()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-nb-progress]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbProgress {
  readonly value = input<number>(0);
  readonly max = input<number>(100);
  readonly tone = input<NbProgressTone>('default');
  readonly label = input<string>('');

  protected readonly clampedValue = computed(() =>
    Math.min(Math.max(this.value(), 0), this.max())
  );

  protected readonly percentage = computed(() =>
    (this.clampedValue() / this.max()) * 100
  );

  protected readonly hostClass = computed(() =>
    nbClass(
      'block h-3 w-full overflow-hidden',
      'border-2 border-(--nb-border)',
      'bg-(--nb-secondary-background)',
      'shadow-[var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    )
  );

  protected readonly fillClass = computed(() => {
    const map: Record<NbProgressTone, string> = {
      default: 'bg-(--nb-main)',
      success: 'bg-(--nb-success)',
      warning: 'bg-(--nb-warning)',
      danger: 'bg-(--nb-danger)',
      accent: 'bg-(--nb-accent)',
    };
    return map[this.tone()];
  });
}
