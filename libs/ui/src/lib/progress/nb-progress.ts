import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { nbToneVars } from '../tokens/tone';

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
        [style.background-color]="fillBg()"
        [style.width.%]="percentage()"
      ></div>
    </div>
  `,
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'progress' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { tone: 'primary' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
  ],
  host: {
    '[class]': 'hostClass()',
    '[style.background-color]': '"var(--nb-secondary-background)"',
    '[attr.data-nb-progress]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbProgress {
  readonly value = input<number>(0);
  readonly max = input<number>(100);
  readonly label = input<string>('');

  private readonly capability = inject(NbToneCapability);
  private readonly defaults = inject(NB_STYLE_DEFAULTS);

  protected readonly clampedValue = computed(() =>
    Math.min(Math.max(this.value(), 0), this.max())
  );

  protected readonly percentage = computed(() =>
    (this.clampedValue() / this.max()) * 100
  );

  protected readonly fillBg = computed(() => {
    const tone = this.capability.tone() ?? this.defaults.tone ?? 'primary';
    return nbToneVars(tone).bg;
  });

  protected readonly hostClass = computed(() =>
    nbClass(
      'block h-3 w-full overflow-hidden',
      'border-2 border-(--nb-border)',
      'shadow-[var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    )
  );
}
