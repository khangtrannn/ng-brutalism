import { Directive, computed, inject, input } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbBorderCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import type { NbInputSize } from './input.types';

@Directive({
  selector: 'input[nbInput]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'input' },
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
    '[attr.data-size]': 'size()',
    '[style.background-color]': 'backgroundStyle()',
    '[style.border-color]': 'borderColorStyle()',
    '[style.border-width]': 'borderWidthStyle()',
    '[style.--nb-input-focus-ring-color]': 'focusRingColorStyle()',
  },
})
export class NbInput {
  readonly size = input<NbInputSize>('md');

  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;

  private readonly tone = inject(NbToneCapability);
  private readonly border = inject(NbBorderCapability);

  // Inputs inside a group are visually merged into the group's surface — no
  // border or background of their own.
  protected readonly backgroundStyle = computed(() =>
    this.isInGroup ? 'transparent' : this.tone.background(),
  );
  protected readonly borderColorStyle = computed(() => this.tone.borderColor());
  protected readonly borderWidthStyle = computed(() =>
    this.isInGroup ? '0' : this.border.width(),
  );

  protected readonly focusRingColorStyle = computed(() => this.tone.borderColor());

  protected readonly classes = computed(() => {
    const inGroup = this.isInGroup;

    return nbClass(
      '[--nb-input-radius:var(--nb-radius)]',
      '[--nb-input-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]',
      'flex font-medium',
      'placeholder:text-gray-400',
      'file:h-full file:py-0 file:my-0 file:mr-3 file:px-3',
      'file:cursor-pointer file:text-sm file:font-bold',
      'file:bg-(--nb-main) file:text-(--nb-main-foreground)',
      'file:border-0 file:border-r-2 file:border-(--nb-border)',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      inGroup
        ? ['flex-1 min-w-0', 'focus-visible:outline-none']
        : [
            'rounded-(--nb-input-radius)',
            'shadow-[var(--nb-input-shadow)]',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-[var(--nb-input-focus-ring-color,var(--nb-input-border-color,var(--nb-border)))]',
            'focus-visible:ring-offset-2 focus-visible:shadow-none',
          ]
    );
  });
}
