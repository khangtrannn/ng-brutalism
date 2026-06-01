import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbGapCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
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
    '[class]': 'classes()',
    '[attr.data-nb-stack]': '""',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-separator]': 'separator()',
  },
})
export class NbStack {
  readonly align = input<NbStackAlign>('stretch');
  readonly justify = input<NbStackJustify>('start');
  readonly separator = input<NbStackSeparator>('none');

  protected readonly classes = computed(() =>
    nbClass(
      'flex min-w-0 flex-col',
      'gap-[var(--nb-stack-gap)]',
      this.alignClass(),
      this.justifyClass(),
      this.separatorClass()
    )
  );

  private alignClass(): string {
    const map: Record<NbStackAlign, string> = {
      stretch: 'items-stretch',
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    };

    return map[this.align()];
  }

  private justifyClass(): string {
    const map: Record<NbStackJustify, string> = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    };

    return map[this.justify()];
  }

  private separatorClass(): string {
    const map: Record<NbStackSeparator, string> = {
      none: '',
      solid: nbClass(
        '[&>*+*]:border-t-(length:--nb-border-width)',
        '[&>*+*]:border-solid',
        '[&>*+*]:[border-top-color:var(--nb-border)]',
        '[&>*+*]:pt-[var(--nb-stack-gap)]'
      ),
      dashed: nbClass(
        '[&>*+*]:border-t-(length:--nb-border-width)',
        '[&>*+*]:border-dashed',
        '[&>*+*]:[border-top-color:var(--nb-border)]',
        '[&>*+*]:pt-[var(--nb-stack-gap)]'
      ),
      thick: nbClass(
        '[&>*+*]:border-t-4',
        '[&>*+*]:border-solid',
        '[&>*+*]:[border-top-color:var(--nb-border)]',
        '[&>*+*]:pt-[var(--nb-stack-gap)]'
      ),
    };

    return map[this.separator()];
  }
}
