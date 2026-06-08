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
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'cluster' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { gap: 'md', padding: 'none' } satisfies NbStyleDefaults,
    },
  ],
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
    '[style.gap]': 'gapStyle()',
    '[style.padding]': 'paddingStyle()',
  },
})
export class NbCluster {
  readonly align = input<NbClusterAlign>('center');
  readonly justify = input<NbClusterJustify>('start');
  readonly wrap = input<NbClusterWrap>('wrap');
  readonly separator = input<NbClusterSeparator>('none');

  private readonly gap = inject(NbGapCapability);
  private readonly paddingCapability = inject(NbPaddingCapability);

  protected readonly gapStyle = computed(() => this.gap.value());
  protected readonly paddingStyle = computed(() => this.paddingCapability.value());

  protected readonly separatorColumnGapStyle = computed(() =>
    this.separator() === 'none' ? null : '0px',
  );

  // Component-local anatomy var: the separator owns half the inline spacing on
  // each side. It mirrors an explicit gap input when present, otherwise the
  // public `--nb-cluster-gap` hook chain.
  protected readonly separatorGapStyle = computed(() =>
    this.separator() === 'none'
      ? null
      : `calc(${this.gap.value() ?? nbGapFallback('cluster', 'md')} * 0.5)`,
  );
}
