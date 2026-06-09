import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { nbToneVars, type NbTone } from '../tokens/tone';

@Component({
  selector: 'nb-progress',
  template: `
    <div
      role="progressbar"
      [attr.aria-valuenow]="clampedValue()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max()"
      [attr.aria-label]="label() || 'Progress'"
      data-slot="progress-track"
    >
      <div
        data-slot="progress-fill"
        [style.background-color]="fillBg()"
        [style.width.%]="percentage()"
      ></div>
    </div>
  `,
  host: {
    '[style.background-color]': '"var(--nb-secondary-background)"',
    '[attr.data-nb-progress]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbProgress {
  readonly value = input<number>(0);
  readonly max = input<number>(100);
  readonly label = input<string>('');
  // The fill color resolves the tone token to a literal at render time (inner
  // element, no CSS fallback chain), so progress owns the tone input directly.
  // The 'primary' default stands in when no tone is set.
  readonly tone = input<NbTone | undefined>(undefined);

  protected readonly clampedValue = computed(() =>
    Math.min(Math.max(this.value(), 0), this.max())
  );

  protected readonly percentage = computed(() =>
    (this.clampedValue() / this.max()) * 100
  );

  protected readonly fillBg = computed(
    () => nbToneVars(this.tone() ?? 'primary').bg,
  );
}
