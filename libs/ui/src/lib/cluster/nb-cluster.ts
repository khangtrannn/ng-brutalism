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

export type NbClusterDivider = 'none' | 'solid' | 'dashed' | 'thick';

@Directive({
  selector: '[nbCluster]',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-cluster]': '""',
    '[attr.data-gap]': 'gap()',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-wrap]': 'wrap()',
    '[attr.data-divider]': 'divider()',
  },
})
export class NbCluster {
  readonly gap = input<NbClusterGap>('md');
  readonly align = input<NbClusterAlign>('center');
  readonly justify = input<NbClusterJustify>('start');
  readonly wrap = input<NbClusterWrap>('wrap');
  readonly divider = input<NbClusterDivider>('none');

  protected readonly classes = computed(() =>
    nbClass(
      'flex min-w-0',
      this.gapClass(),
      this.alignClass(),
      this.justifyClass(),
      this.wrapClass(),
      this.dividerClass()
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

    if (this.divider() !== 'none') {
      return nbClass(map[this.gap()], 'gap-y-[var(--nb-cluster-gap)]', 'gap-x-0');
    }

    return nbClass(map[this.gap()], 'gap-[var(--nb-cluster-gap)]');
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

  private dividerClass(): string {
    const divider = this.divider();
    if (divider === 'none') return '';

    return nbClass(dividerBaseClass, dividerStyleClass[divider]);
  }
}

// Written as module-level constants so Tailwind's static scanner emits the classes.
const dividerBaseClass = nbClass(
  '[&>*+*]:[padding-inline-start:var(--nb-cluster-gap)]',
  '[&>*+*]:[border-inline-start-color:var(--nb-border)]'
);

const dividerStyleClass: Record<Exclude<NbClusterDivider, 'none'>, string> = {
  solid: nbClass(
    '[&>*+*]:[border-inline-start-width:2px]',
    '[&>*+*]:[border-inline-start-style:solid]'
  ),
  dashed: nbClass(
    '[&>*+*]:[border-inline-start-width:2px]',
    '[&>*+*]:[border-inline-start-style:dashed]'
  ),
  thick: nbClass(
    '[&>*+*]:[border-inline-start-width:4px]',
    '[&>*+*]:[border-inline-start-style:solid]'
  ),
};
