import { Directive, computed, inject, input } from '@angular/core';

import {
  NbGapCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  nbGapFallback,
  type NbStyleDefaults,
} from '../core/capabilities';
import type { NbSpacing } from '../tokens/spacing';

export type NbStackGap = NbSpacing;

export type NbStackAlign = 'stretch' | 'start' | 'center' | 'end';

export type NbStackJustify = 'start' | 'center' | 'end' | 'between';

export type NbStackSeparator = 'none' | 'solid' | 'dashed' | 'thick';

@Directive({
  selector: '[nbStack]',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'stack' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { gap: 'md' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [{ directive: NbGapCapability, inputs: ['gap'] }],
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

  private readonly gap = inject(NbGapCapability);

  protected readonly gapStyle = computed(() => this.gap.value());

  // Component-local anatomy var: the separator's top padding stands in for the
  // flex gap, so the border sits mid-gap. It mirrors an explicit gap input when
  // present, otherwise the public `--nb-stack-gap` hook chain.
  protected readonly separatorGapStyle = computed(() =>
    this.separator() === 'none'
      ? null
      : (this.gap.value() ?? nbGapFallback('stack', 'md')),
  );
}
