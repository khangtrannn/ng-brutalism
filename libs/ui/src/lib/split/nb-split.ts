import { Directive, computed, inject, input } from '@angular/core';

import { NbGapCapability } from '../core/capabilities';
import type { NbLayoutAlign, NbLayoutSeparator } from '../tokens/layout';
import { nbPaddingValue, type NbPadding } from '../tokens/padding';
import type { NbSpacing } from '../tokens/spacing';

export type NbSplitRatio =
  | '1:1'
  | '2:1'
  | '3:1'
  | '1:2'
  | '1:3'
  | 'fill:auto'
  | 'auto:fill';

export type NbSplitGap = NbSpacing;

export type NbSplitPadding = NbPadding;

export type NbSplitCollapse = 'none' | 'sm' | 'md' | 'lg';

export type NbSplitAlign = NbLayoutAlign;

export type NbSplitSeparator = NbLayoutSeparator;

@Directive({
  selector: '[nbSplit]',
  hostDirectives: [{ directive: NbGapCapability, inputs: ['gap'] }],
  host: {
    '[attr.data-nb-split]': '""',
    '[attr.data-ratio]': 'ratio()',
    '[attr.data-collapse]': 'collapse()',
    '[attr.data-align]': 'align()',
    '[attr.data-separator]': 'separator()',
    '[style.--nb-split-separator-gap]': 'separatorGapStyle()',
    '[style.padding]': 'paddingStyle()',
  },
})
export class NbSplit {
  readonly ratio = input<NbSplitRatio>('1:1');
  readonly collapse = input<NbSplitCollapse>('md');
  readonly align = input<NbSplitAlign>('stretch');
  readonly separator = input<NbSplitSeparator>('none');
  // gap -> NbGapCapability
  // Padding still feeds the host directly; Section keeps the local pattern
  // because it also derives flush margins.
  readonly padding = input<NbPadding | undefined>(undefined);

  protected readonly paddingStyle = computed(() => {
    const padding = this.padding();
    return padding ? nbPaddingValue(padding) : null;
  });

  // Component-local anatomy var: the separator's `::after` line is centered in
  // the gap. It mirrors an explicit gap input when present; CSS owns the public
  // hook fallback chain when it is absent.
  private readonly gapCapability = inject(NbGapCapability);

  protected readonly separatorGapStyle = computed(() =>
    this.separator() === 'none' ? null : this.gapCapability.value(),
  );
}
