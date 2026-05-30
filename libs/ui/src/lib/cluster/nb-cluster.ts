import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbClusterGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type NbClusterAlign =
  | 'start'
  | 'center'
  | 'end'
  | 'baseline'
  | 'stretch';

export type NbClusterJustify = 'start' | 'center' | 'end' | 'between';

export type NbClusterWrap = 'wrap' | 'nowrap';

@Directive({
  selector: '[nbCluster]',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-cluster]': '""',
    '[attr.data-gap]': 'gap()',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-wrap]': 'wrap()',
  },
})
export class NbCluster {
  readonly gap = input<NbClusterGap>('md');
  readonly align = input<NbClusterAlign>('center');
  readonly justify = input<NbClusterJustify>('start');
  readonly wrap = input<NbClusterWrap>('wrap');

  protected readonly classes = computed(() =>
    nbClass(
      'flex min-w-0',
      'gap-[var(--nb-cluster-gap)]',
      this.gapClass(),
      this.alignClass(),
      this.justifyClass(),
      this.wrapClass()
    )
  );

  private gapClass(): string {
    const map: Record<NbClusterGap, string> = {
      none: '[--nb-cluster-gap:0px]',
      xs: '[--nb-cluster-gap:0.25rem]',
      sm: '[--nb-cluster-gap:0.5rem]',
      md: '[--nb-cluster-gap:0.75rem]',
      lg: '[--nb-cluster-gap:1rem]',
      xl: '[--nb-cluster-gap:1.5rem]',
      '2xl': '[--nb-cluster-gap:2rem]',
    };

    return map[this.gap()];
  }

  private alignClass(): string {
    const map: Record<NbClusterAlign, string> = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    };

    return map[this.align()];
  }

  private justifyClass(): string {
    const map: Record<NbClusterJustify, string> = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    };

    return map[this.justify()];
  }

  private wrapClass(): string {
    const map: Record<NbClusterWrap, string> = {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
    };

    return map[this.wrap()];
  }
}
