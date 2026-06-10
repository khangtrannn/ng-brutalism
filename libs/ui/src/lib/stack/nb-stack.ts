import { Directive, computed, inject, input } from '@angular/core';

import { NbGapCapability } from '../core/capabilities';
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
  hostDirectives: [{ directive: NbGapCapability, inputs: ['gap'] }],
  host: {
    '[attr.data-nb-stack]': '""',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-separator]': 'separator()',
    '[style.--nb-stack-separator-gap]': 'separatorGapStyle()',
  },
})
export class NbStack {
  readonly align = input<NbStackAlign>('stretch');
  readonly justify = input<NbStackJustify>('start');
  readonly separator = input<NbStackSeparator>('none');
  // gap -> NbGapCapability

  // Component-local anatomy var: the separator's top padding stands in for the
  // flex gap, so the border sits mid-gap. It mirrors an explicit gap input when
  // present; CSS owns the public hook fallback chain when it is absent.
  private readonly gapCapability = inject(NbGapCapability);

  protected readonly separatorGapStyle = computed(() =>
    this.separator() === 'none' ? null : this.gapCapability.value(),
  );
}
