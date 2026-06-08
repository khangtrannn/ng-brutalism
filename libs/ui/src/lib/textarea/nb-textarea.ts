import { Directive, computed, inject, input } from '@angular/core';

import {
  NbBorderCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbTextareaSize } from './textarea.types';

@Directive({
  selector: 'textarea[nbTextarea]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'textarea' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { tone: 'surface', border: 'default' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[style.background-color]': 'backgroundStyle()',
    '[style.border-color]': 'tone.borderColor()',
    '[style.border-width]': 'borderWidthStyle()',
    '[style.--nb-textarea-focus-ring-color]': 'tone.borderColor()',
  },
})
export class NbTextarea {
  readonly size = input<NbTextareaSize>('md');

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;

  protected readonly tone = inject(NbToneCapability);
  private readonly border = inject(NbBorderCapability);

  protected readonly backgroundStyle = computed(() =>
    this.isInGroup ? 'transparent' : this.tone.background(),
  );
  protected readonly borderWidthStyle = computed(() =>
    this.isInGroup ? '0' : this.border.width(),
  );
}
