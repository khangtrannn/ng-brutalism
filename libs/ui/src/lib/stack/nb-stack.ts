import { Directive, computed, input } from '@angular/core';

import { nbGapFallback } from '../core/capabilities';
import { nbSpacingValue, type NbSpacing } from '../tokens/spacing';

export type NbStackGap = NbSpacing;

export type NbStackAlign = 'stretch' | 'start' | 'center' | 'end';

export type NbStackJustify = 'start' | 'center' | 'end' | 'between';

export type NbStackSeparator = 'none' | 'solid' | 'dashed' | 'thick';

@Directive({
  selector: '[nbStack]',
  host: {
    '[attr.data-nb-stack]': '""',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-separator]': 'separator()',
    '[style.gap]': 'gapStyle()',
    '[style.--nb-stack-separator-gap]': 'separatorGapStyle()',
  },
})
export class NbStack {
  readonly align = input<NbStackAlign>('stretch');
  readonly justify = input<NbStackJustify>('start');
  readonly separator = input<NbStackSeparator>('none');
  // Gap feeds both the flex gap and the separator anatomy var, so it is
  // resolved locally rather than via a host-painting capability.
  readonly gap = input<NbSpacing | undefined>(undefined);

  protected readonly gapStyle = computed(() => {
    const gap = this.gap();
    return gap ? nbSpacingValue(gap) : null;
  });

  // Component-local anatomy var: the separator's top padding stands in for the
  // flex gap, so the border sits mid-gap. It mirrors an explicit gap input when
  // present, otherwise the public `--nb-stack-gap` hook chain.
  protected readonly separatorGapStyle = computed(() =>
    this.separator() === 'none'
      ? null
      : (this.gapStyle() ?? nbGapFallback('stack', 'md')),
  );
}
