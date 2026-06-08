import { Directive, computed, input } from '@angular/core';

import { NbPaddingCapability, nbGapFallback } from '../core/capabilities';
import type { NbPadding } from '../tokens/padding';
import { nbSpacingValue, type NbSpacing } from '../tokens/spacing';

export type NbClusterGap = NbSpacing;

export type NbClusterPadding = NbPadding;

export type NbClusterAlign =
  | 'start'
  | 'center'
  | 'end'
  | 'baseline'
  | 'stretch';

export type NbClusterJustify = 'start' | 'center' | 'end' | 'between';

export type NbClusterWrap = 'wrap' | 'nowrap';

export type NbClusterSeparator = 'none' | 'solid' | 'dashed' | 'thick';

@Directive({
  selector: '[nbCluster]',
  hostDirectives: [{ directive: NbPaddingCapability, inputs: ['padding'] }],
  host: {
    '[attr.data-nb-cluster]': '""',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-wrap]': 'wrap()',
    '[attr.data-separator]': 'separator()',
    '[style.column-gap]': 'separatorColumnGapStyle()',
    '[style.--nb-cluster-separator-gap]': 'separatorGapStyle()',
    '[style.gap]': 'gapStyle()',
  },
})
export class NbCluster {
  readonly align = input<NbClusterAlign>('center');
  readonly justify = input<NbClusterJustify>('start');
  readonly wrap = input<NbClusterWrap>('wrap');
  readonly separator = input<NbClusterSeparator>('none');
  // Gap feeds both the flex gap and the separator half-gap calc, so it is
  // resolved locally; padding is paint-only and stays on the painter.
  readonly gap = input<NbSpacing | undefined>(undefined);

  protected readonly gapStyle = computed(() => {
    const gap = this.gap();
    return gap ? nbSpacingValue(gap) : null;
  });

  protected readonly separatorColumnGapStyle = computed(() =>
    this.separator() === 'none' ? null : '0px',
  );

  // Component-local anatomy var: the separator owns half the inline spacing on
  // each side. It mirrors an explicit gap input when present, otherwise the
  // public `--nb-cluster-gap` hook chain.
  protected readonly separatorGapStyle = computed(() =>
    this.separator() === 'none'
      ? null
      : `calc(${this.gapStyle() ?? nbGapFallback('cluster', 'md')} * 0.5)`,
  );
}
