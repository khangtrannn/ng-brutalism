import { Directive, computed, input } from '@angular/core';

import { nbGapStyleTransform } from '../core/input-transforms';
import type {
  NbLayoutAlign,
  NbLayoutJustify,
  NbLayoutSeparator,
} from '../tokens/layout';
import type { NbSpacing } from '../tokens/spacing';

export type NbStackGap = NbSpacing;

export type NbStackAlign = NbLayoutAlign;

export type NbStackJustify = NbLayoutJustify;

export type NbStackSeparator = NbLayoutSeparator;

@Directive({
  selector: '[nbStack]',
  host: {
    '[attr.data-nb-stack]': '""',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-separator]': 'separator()',
    '[style.--nb-stack-gap]': 'gap()',
    '[style.--nb-stack-separator-gap]': 'separatorGapStyle()',
  },
})
export class NbStack {
  readonly align = input<NbStackAlign>('stretch');
  readonly justify = input<NbStackJustify>('start');
  readonly separator = input<NbStackSeparator>('none');
  readonly gap = input(null, {
    transform: nbGapStyleTransform,
  });

  protected readonly separatorGapStyle = computed(() =>
    this.separator() === 'none' ? null : this.gap()
  );
}
