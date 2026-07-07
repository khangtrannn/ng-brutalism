import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import type { NbTone } from '@ng-brutalism/ui/tokens';

export type NbProgressTone = NbTone;

@Component({
  selector: 'nb-progress',
  exportAs: 'nbProgress',
  template: `
    <div
      role="progressbar"
      [attr.aria-valuenow]="clampedValue()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max()"
      [attr.aria-label]="label() || 'Progress'"
      data-slot="progress-track"
    >
      <div data-slot="progress-fill" [style.width.%]="percentage()"></div>
    </div>
  `,
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-nb-progress]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbProgress {
  readonly value = input<number>(0);
  readonly max = input<number>(100);
  readonly label = input<string>('');

  protected readonly clampedValue = computed(() =>
    Math.min(Math.max(this.value(), 0), this.max())
  );

  protected readonly percentage = computed(
    () => (this.clampedValue() / this.max()) * 100
  );
}
