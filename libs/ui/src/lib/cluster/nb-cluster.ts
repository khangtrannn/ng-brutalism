import { Directive, computed, inject, input } from '@angular/core';

import { NbGapCapability, NbPaddingCapability } from '../core/capabilities';
import type {
  NbLayoutAlign,
  NbLayoutJustify,
  NbLayoutSeparator,
} from '../tokens/layout';
import type { NbPadding } from '../tokens/padding';
import type { NbSpacing } from '../tokens/spacing';

export type NbClusterGap = NbSpacing;

export type NbClusterPadding = NbPadding;

export type NbClusterAlign = NbLayoutAlign | 'baseline';

export type NbClusterJustify = NbLayoutJustify;

export type NbClusterWrap = 'wrap' | 'nowrap';

export type NbClusterSeparator = NbLayoutSeparator;

@Directive({
  selector: '[nbCluster]',
  hostDirectives: [
    { directive: NbGapCapability, inputs: ['gap'] },
    { directive: NbPaddingCapability, inputs: ['padding'] },
  ],
  host: {
    '[attr.data-nb-cluster]': '""',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-wrap]': 'wrap()',
    '[attr.data-separator]': 'separator()',
    '[style.column-gap]': 'separatorColumnGapStyle()',
    '[style.--nb-cluster-separator-gap]': 'separatorGapStyle()',
  },
})
export class NbCluster {
  readonly align = input<NbClusterAlign>('center');
  readonly justify = input<NbClusterJustify>('start');
  readonly wrap = input<NbClusterWrap>('wrap');
  readonly separator = input<NbClusterSeparator>('none');
  // gap -> NbGapCapability
  // padding -> NbPaddingCapability

  protected readonly separatorColumnGapStyle = computed(() =>
    this.separator() === 'none' ? null : '0px',
  );

  // Component-local anatomy var: the separator owns half the inline spacing on
  // each side. It mirrors an explicit gap input when present; CSS owns the
  // public hook fallback chain when it is absent.
  private readonly gapCapability = inject(NbGapCapability);

  protected readonly separatorGapStyle = computed(() => {
    const gapStyle = this.gapCapability.value();
    return this.separator() === 'none' || !gapStyle
      ? null
      : `calc(${gapStyle} * 0.5)`;
  });
}
