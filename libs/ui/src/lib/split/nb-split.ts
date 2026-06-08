import { Directive, computed, inject, input } from '@angular/core';

import {
  NbGapCapability,
  NbPaddingCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  nbGapFallback,
  type NbStyleDefaults,
} from '../core/capabilities';
import type { NbPadding } from '../tokens/padding';
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

export type NbSplitAlign = 'start' | 'center' | 'end' | 'stretch';

export type NbSplitSeparator = 'none' | 'solid' | 'dashed' | 'thick';

@Directive({
  selector: '[nbSplit]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'split' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { gap: 'lg', padding: 'none' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbGapCapability, inputs: ['gap'] },
    { directive: NbPaddingCapability, inputs: ['padding'] },
  ],
  host: {
    '[attr.data-nb-split]': '""',
    '[attr.data-ratio]': 'ratio()',
    '[attr.data-collapse]': 'collapse()',
    '[attr.data-align]': 'align()',
    '[attr.data-separator]': 'separator()',
    '[style.--nb-split-separator-gap]': 'separatorGapStyle()',
    '[style.gap]': 'gap.value()',
    '[style.padding]': 'paddingCapability.value()',
  },
})
export class NbSplit {
  readonly ratio = input<NbSplitRatio>('1:1');
  readonly collapse = input<NbSplitCollapse>('md');
  readonly align = input<NbSplitAlign>('stretch');
  readonly separator = input<NbSplitSeparator>('none');

  protected readonly gap = inject(NbGapCapability);
  protected readonly paddingCapability = inject(NbPaddingCapability);

  // Component-local anatomy var: the separator's `::after` line is centered in
  // the gap. It mirrors an explicit gap input when present, otherwise the
  // public `--nb-split-gap` hook chain.
  protected readonly separatorGapStyle = computed(() =>
    this.separator() === 'none'
      ? null
      : (this.gap.value() ?? nbGapFallback('split', 'lg')),
  );
}
