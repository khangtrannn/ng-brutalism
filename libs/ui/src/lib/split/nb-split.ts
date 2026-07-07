import { Directive, computed, input } from '@angular/core';

import {
  nbGapStyleTransform,
  nbPaddingStyleTransform,
} from '../core/input-transforms';
import type {
  NbLayoutAlign,
  NbLayoutSeparator,
  NbPadding,
  NbSpacing,
} from '@ng-brutalism/ui/tokens';
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
  exportAs: 'nbSplit',
  host: {
    '[attr.data-nb-split]': '""',
    '[attr.data-ratio]': 'ratio()',
    '[attr.data-collapse]': 'collapse()',
    '[attr.data-align]': 'align()',
    '[attr.data-separator]': 'separator()',
    '[style.--nb-split-gap]': 'gap()',
    '[style.--nb-split-padding]': 'padding()',
    '[style.--nb-split-separator-gap]': 'separatorGapStyle()',
  },
})
export class NbSplit {
  readonly ratio = input<NbSplitRatio>('1:1');
  readonly collapse = input<NbSplitCollapse>('md');
  readonly align = input<NbSplitAlign>('stretch');
  readonly separator = input<NbSplitSeparator>('none');
  readonly gap = input(null, {
    transform: nbGapStyleTransform,
  });
  readonly padding = input(null, {
    transform: nbPaddingStyleTransform,
  });

  // Component-local anatomy var: the separator's `::after` line is centered in
  // the gap. It mirrors an explicit gap input when present; CSS owns the public
  // hook fallback chain when it is absent.
  protected readonly separatorGapStyle = computed(() =>
    this.separator() === 'none' ? null : this.gap()
  );
}
