import { Directive, computed, input } from '@angular/core';

import {
  nbGapStyleTransform,
  nbPaddingStyleTransform,
} from '../core/input-transforms';
import type {
  NbLayoutAlign,
  NbLayoutJustify,
  NbLayoutSeparator,
  NbPadding,
  NbSpacing,
} from '@ng-brutalism/ui/tokens';
export type NbClusterGap = NbSpacing;

export type NbClusterPadding = NbPadding;

export type NbClusterAlign = NbLayoutAlign | 'baseline';

export type NbClusterJustify = NbLayoutJustify;

export type NbClusterWrap = 'wrap' | 'nowrap';

export type NbClusterSeparator = NbLayoutSeparator;

@Directive({
  selector: '[nbCluster]',
  exportAs: 'nbCluster',
  host: {
    '[attr.data-nb-cluster]': '""',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-wrap]': 'wrap()',
    '[attr.data-separator]': 'separator()',
    '[style.--nb-cluster-gap]': 'gap()',
    '[style.--nb-cluster-padding]': 'padding()',
    '[style.column-gap]': 'separatorColumnGapStyle()',
    '[style.--nb-cluster-separator-gap]': 'separatorGapStyle()',
  },
})
export class NbCluster {
  readonly align = input<NbClusterAlign>('center');
  readonly justify = input<NbClusterJustify>('start');
  readonly wrap = input<NbClusterWrap>('wrap');
  readonly separator = input<NbClusterSeparator>('none');
  readonly gap = input(null, {
    transform: nbGapStyleTransform,
  });
  readonly padding = input(null, {
    transform: nbPaddingStyleTransform,
  });

  protected readonly separatorColumnGapStyle = computed(() =>
    this.separator() === 'none' ? null : '0px'
  );

  protected readonly separatorGapStyle = computed(() => {
    const gapStyle = this.gap();
    return this.separator() === 'none' || !gapStyle
      ? null
      : `calc(${gapStyle} * 0.5)`;
  });
}
