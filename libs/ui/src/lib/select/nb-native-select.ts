import { Directive, computed, inject } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbBorderCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';

@Directive({
  selector: 'select[nbSelect]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'select' },
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
    '[class]': 'classes()',
    '[style.background-color]': 'backgroundStyle()',
    '[style.color]': 'foregroundStyle()',
    '[style.border-color]': 'borderColorStyle()',
    '[style.border-width]': 'borderWidthStyle()',
    '[style.--nb-select-focus-ring-color]': 'focusRingColorStyle()',
  },
})
export class NbNativeSelect {
  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;

  private readonly tone = inject(NbToneCapability);
  private readonly border = inject(NbBorderCapability);

  protected readonly backgroundStyle = computed(() =>
    this.isInGroup ? 'transparent' : this.tone.background(),
  );
  protected readonly foregroundStyle = computed(() => this.tone.foreground());
  protected readonly borderColorStyle = computed(() => this.tone.borderColor());
  protected readonly borderWidthStyle = computed(() =>
    this.isInGroup ? '0' : this.border.width(),
  );
  protected readonly focusRingColorStyle = computed(() => this.tone.borderColor());

  protected readonly classes = computed(() => {
    const inGroup = this.isInGroup;

    return nbClass(
      '[--nb-select-radius:var(--nb-radius)]',
      'flex font-medium',
      'appearance-none',
      'pr-10',
      'has-[option:disabled:checked]:text-gray-400',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      inGroup
        ? ['flex-1 min-w-0', 'focus-visible:outline-none']
        : [
            'rounded-(--nb-select-radius)',
            'shadow-nb',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nb-select-focus-ring-color,var(--nb-select-border-color,var(--nb-border)))]',
            'focus-visible:ring-offset-2 focus-visible:shadow-none',
          ]
    );
  });
}
