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
    '[class]': 'classes()',
    '[attr.data-nb-split]': '""',
    '[attr.data-ratio]': 'ratio()',
    '[attr.data-collapse]': 'collapse()',
    '[attr.data-align]': 'align()',
    '[attr.data-separator]': 'separator()',
  },
})
export class NbSplit {
  readonly ratio = input<NbSplitRatio>('1:1');
  readonly collapse = input<NbSplitCollapse>('md');
  readonly align = input<NbSplitAlign>('stretch');
  readonly separator = input<NbSplitSeparator>('none');

  protected readonly classes = computed(() =>
    nbClass(
      'grid min-w-0',
      'gap-[var(--nb-split-gap)]',
      'p-[var(--nb-split-padding)]',
      this.alignClass(),
      this.ratioClass(),
      this.collapseClass(),
      this.separatorClass()
    )
  );

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
      'fill:auto': '[--nb-split-columns:minmax(0,1fr)_auto]',
      'auto:fill': '[--nb-split-columns:auto_minmax(0,1fr)]',
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

  private separatorClass(): string {
    const separator = this.separator();

    if (separator === 'none') {
      return '';
    }

    return nbClass(
      separatorBaseClass,
      separatorStyleClass[separator],
      separatorVisibilityClass[this.collapse()]
    );
  }
}

// A `::after` pseudo-element on the first column draws the vertical line,
// centered in the gap. These class strings are written out literally (rather
// than assembled at runtime) so Tailwind's static scanner can emit them.
const separatorBaseClass = nbClass(
  '[&>*:first-child]:relative',
  '[&>*:first-child]:after:pointer-events-none',
  '[&>*:first-child]:after:absolute',
  '[&>*:first-child]:after:inset-y-0',
  '[&>*:first-child]:after:[inset-inline-end:calc(var(--nb-split-gap)/-2)]',
  '[&>*:first-child]:after:[border-inline-end-color:var(--nb-border)]',
  '[&>*:first-child]:after:content-[""]'
);

const separatorStyleClass: Record<Exclude<NbSplitSeparator, 'none'>, string> = {
  solid: nbClass(
    '[&>*:first-child]:after:[border-inline-end-width:var(--nb-border-width)]',
    '[&>*:first-child]:after:border-solid'
  ),
  dashed: nbClass(
    '[&>*:first-child]:after:[border-inline-end-width:var(--nb-border-width)]',
    '[&>*:first-child]:after:border-dashed'
  ),
  thick: nbClass(
    '[&>*:first-child]:after:[border-inline-end-width:4px]',
    '[&>*:first-child]:after:border-solid'
  ),
};

// Hide the separator while the split is stacked into a single column, then
// reveal it at the same breakpoint where the columns appear, so the line stays
// in sync with `collapse` (and tracks Tailwind's breakpoint config).
const separatorVisibilityClass: Record<NbSplitCollapse, string> = {
  none: '',
  sm: '[&>*:first-child]:after:hidden sm:[&>*:first-child]:after:block',
  md: '[&>*:first-child]:after:hidden md:[&>*:first-child]:after:block',
  lg: '[&>*:first-child]:after:hidden lg:[&>*:first-child]:after:block',
};
