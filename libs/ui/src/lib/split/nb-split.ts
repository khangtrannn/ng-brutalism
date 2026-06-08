import { Directive, computed, input } from '@angular/core';

import { nbGapFallback } from '../core/capabilities';
import { nbPaddingValue, type NbPadding } from '../tokens/padding';
import { nbSpacingValue, type NbSpacing } from '../tokens/spacing';

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

export type NbSplitAlign = 'start' | 'center' | 'end' | 'stretch';

export type NbSplitSeparator = 'none' | 'solid' | 'dashed' | 'thick';

@Directive({
  selector: '[nbSplit]',
  host: {
    '[attr.data-nb-split]': '""',
    '[attr.data-ratio]': 'ratio()',
    '[attr.data-collapse]': 'collapse()',
    '[attr.data-align]': 'align()',
    '[attr.data-separator]': 'separator()',
    '[style.--nb-split-separator-gap]': 'separatorGapStyle()',
    '[style.gap]': 'gapStyle()',
    '[style.padding]': 'paddingStyle()',
  },
})
export class NbSplit {
  readonly ratio = input<NbSplitRatio>('1:1');
  readonly collapse = input<NbSplitCollapse>('md');
  readonly align = input<NbSplitAlign>('stretch');
  readonly separator = input<NbSplitSeparator>('none');
  // Gap feeds both the flex gap and the separator anatomy var, so gap/padding
  // are resolved locally rather than via host-painting capabilities.
  readonly gap = input<NbSpacing | undefined>(undefined);
  readonly padding = input<NbPadding | undefined>(undefined);

  protected readonly gapStyle = computed(() => {
    const gap = this.gap();
    return gap ? nbSpacingValue(gap) : null;
  });
  protected readonly paddingStyle = computed(() => {
    const padding = this.padding();
    return padding ? nbPaddingValue(padding) : null;
  });

  // Component-local anatomy var: the separator's `::after` line is centered in
  // the gap. It mirrors an explicit gap input when present, otherwise the
  // public `--nb-split-gap` hook chain.
  protected readonly separatorGapStyle = computed(() =>
    this.separator() === 'none'
      ? null
      : (this.gapStyle() ?? nbGapFallback('split', 'lg')),
  );
}
