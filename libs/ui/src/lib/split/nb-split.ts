import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbSplitRatio = '1:1' | '2:1' | '3:1' | '1:2' | '1:3';

export type NbSplitGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type NbSplitPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type NbSplitCollapse = 'none' | 'sm' | 'md' | 'lg';

export type NbSplitAlign = 'start' | 'center' | 'end' | 'stretch';

@Directive({
  selector: '[nbSplit]',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-split]': '""',
    '[attr.data-ratio]': 'ratio()',
    '[attr.data-gap]': 'gap()',
    '[attr.data-padding]': 'padding()',
    '[attr.data-collapse]': 'collapse()',
    '[attr.data-align]': 'align()',
  },
})
export class NbSplit {
  readonly ratio = input<NbSplitRatio>('1:1');
  readonly gap = input<NbSplitGap>('lg');
  readonly padding = input<NbSplitPadding>('none');
  readonly collapse = input<NbSplitCollapse>('md');
  readonly align = input<NbSplitAlign>('stretch');

  protected readonly classes = computed(() =>
    nbClass(
      'grid min-w-0',
      'gap-[var(--nb-split-gap)]',
      'p-[var(--nb-split-padding)]',
      this.gapClass(),
      this.paddingClass(),
      this.alignClass(),
      this.ratioClass(),
      this.collapseClass()
    )
  );

  private gapClass(): string {
    const map: Record<NbSplitGap, string> = {
      none: '[--nb-split-gap:0px]',
      xs: '[--nb-split-gap:0.25rem]',
      sm: '[--nb-split-gap:0.5rem]',
      md: '[--nb-split-gap:0.75rem]',
      lg: '[--nb-split-gap:1rem]',
      xl: '[--nb-split-gap:1.5rem]',
      '2xl': '[--nb-split-gap:2rem]',
    };

    return map[this.gap()];
  }

  private paddingClass(): string {
    const map: Record<NbSplitPadding, string> = {
      none: '[--nb-split-padding:0px]',
      sm: '[--nb-split-padding:0.75rem]',
      md: '[--nb-split-padding:1rem]',
      lg: '[--nb-split-padding:1.5rem]',
      xl: '[--nb-split-padding:2rem]',
    };

    return map[this.padding()];
  }

  private alignClass(): string {
    const map: Record<NbSplitAlign, string> = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };

    return map[this.align()];
  }

  private ratioClass(): string {
    const map: Record<NbSplitRatio, string> = {
      '1:1': '[--nb-split-columns:minmax(0,1fr)_minmax(0,1fr)]',
      '2:1': '[--nb-split-columns:minmax(0,2fr)_minmax(0,1fr)]',
      '3:1': '[--nb-split-columns:minmax(0,3fr)_minmax(0,1fr)]',
      '1:2': '[--nb-split-columns:minmax(0,1fr)_minmax(0,2fr)]',
      '1:3': '[--nb-split-columns:minmax(0,1fr)_minmax(0,3fr)]',
    };

    return map[this.ratio()];
  }

  private collapseClass(): string {
    const map: Record<NbSplitCollapse, string> = {
      none: 'grid-cols-[var(--nb-split-columns)]',
      sm: 'grid-cols-1 sm:grid-cols-[var(--nb-split-columns)]',
      md: 'grid-cols-1 md:grid-cols-[var(--nb-split-columns)]',
      lg: 'grid-cols-1 lg:grid-cols-[var(--nb-split-columns)]',
    };

    return map[this.collapse()];
  }
}
