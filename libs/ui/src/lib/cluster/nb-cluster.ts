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
    '[class]': 'classes()',
    '[attr.data-nb-cluster]': '""',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-wrap]': 'wrap()',
    '[attr.data-separator]': 'separator()',
  },
})
export class NbCluster {
  readonly align = input<NbClusterAlign>('center');
  readonly justify = input<NbClusterJustify>('start');
  readonly wrap = input<NbClusterWrap>('wrap');
  readonly separator = input<NbClusterSeparator>('none');

  protected readonly classes = computed(() =>
    nbClass(
      'flex min-w-0',
      this.gapClass(),
      this.alignClass(),
      this.justifyClass(),
      this.wrapClass(),
      this.separatorClass()
    )
  );

  private gapClass(): string {
    // With a separator, gap collapses on the inline axis (the separator owns
    // the inline spacing) and survives only on the block axis for wrapped rows.
    if (this.separator() !== 'none') {
      return 'gap-x-0';
    }

    return '';
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

  private separatorClass(): string {
    const separator = this.separator();
    if (separator === 'none') return '';

    return nbClass(separatorBaseClass, separatorStyleClass[separator]);
  }
}

// Written as module-level constants so Tailwind's static scanner emits the classes.
const separatorBaseClass = nbClass(
  '[--nb-cluster-separator-gap:calc(var(--nb-gap-token,var(--_nb-gap-default))*0.5)]',
  '[--nb-cluster-separator-color:var(--nb-border)]',
  '[&>*+*]:[margin-inline-start:var(--nb-cluster-separator-gap)]',
  '[&>*+*]:[padding-inline-start:var(--nb-cluster-separator-gap)]',
  '[&>*+*]:[border-inline-start-color:var(--nb-cluster-separator-color)]'
);

const separatorStyleClass: Record<Exclude<NbClusterSeparator, 'none'>, string> = {
  solid: nbClass(
    '[--nb-cluster-separator-thickness:2px]',
    '[&>*+*]:[border-inline-start-width:var(--nb-cluster-separator-thickness)]',
    '[&>*+*]:[border-inline-start-style:solid]'
  ),
  dashed: nbClass(
    '[--nb-cluster-separator-thickness:2px]',
    '[&>*+*]:[border-inline-start-width:var(--nb-cluster-separator-thickness)]',
    '[&>*+*]:[border-inline-start-style:dashed]'
  ),
  thick: nbClass(
    '[--nb-cluster-separator-thickness:4px]',
    '[&>*+*]:[border-inline-start-width:var(--nb-cluster-separator-thickness)]',
    '[&>*+*]:[border-inline-start-style:solid]'
  ),
};
