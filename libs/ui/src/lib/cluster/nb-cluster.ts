import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbGapCapability,
  NbPaddingCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
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

export type NbClusterDivider = 'none' | 'solid' | 'dashed' | 'thick';

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
    '[class]': 'classes()',
    '[attr.data-nb-cluster]': '""',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-wrap]': 'wrap()',
    '[attr.data-divider]': 'divider()',
  },
})
export class NbCluster {
  readonly align = input<NbClusterAlign>('center');
  readonly justify = input<NbClusterJustify>('start');
  readonly wrap = input<NbClusterWrap>('wrap');
  readonly divider = input<NbClusterDivider>('none');

  protected readonly classes = computed(() =>
    nbClass(
      'flex min-w-0',
      'p-[var(--nb-cluster-padding)]',
      this.gapClass(),
      this.alignClass(),
      this.justifyClass(),
      this.wrapClass(),
      this.dividerClass()
    )
  );

  private gapClass(): string {
    // With a divider, gap collapses on the inline axis (the divider owns the
    // inline spacing) and survives only on the block axis for wrapped rows.
    if (this.divider() !== 'none') {
      return 'gap-y-[var(--nb-cluster-gap)] gap-x-0';
    }

    return 'gap-[var(--nb-cluster-gap)]';
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
  '[--nb-cluster-divider-gap:calc(var(--nb-cluster-gap)*0.5)]',
  '[--nb-cluster-divider-color:var(--nb-border)]',
  '[&>*+*]:[margin-inline-start:var(--nb-cluster-divider-gap)]',
  '[&>*+*]:[padding-inline-start:var(--nb-cluster-divider-gap)]',
  '[&>*+*]:[border-inline-start-color:var(--nb-cluster-divider-color)]'
);

const dividerStyleClass: Record<Exclude<NbClusterDivider, 'none'>, string> = {
  solid: nbClass(
    '[--nb-cluster-divider-thickness:2px]',
    '[&>*+*]:[border-inline-start-width:var(--nb-cluster-divider-thickness)]',
    '[&>*+*]:[border-inline-start-style:solid]'
  ),
  dashed: nbClass(
    '[--nb-cluster-divider-thickness:2px]',
    '[&>*+*]:[border-inline-start-width:var(--nb-cluster-divider-thickness)]',
    '[&>*+*]:[border-inline-start-style:dashed]'
  ),
  thick: nbClass(
    '[--nb-cluster-divider-thickness:4px]',
    '[&>*+*]:[border-inline-start-width:var(--nb-cluster-divider-thickness)]',
    '[&>*+*]:[border-inline-start-style:solid]'
  ),
};
