import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbStackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type NbStackAlign = 'stretch' | 'start' | 'center' | 'end';

export type NbStackJustify = 'start' | 'center' | 'end' | 'between';

export type NbStackDivider = 'none' | 'solid' | 'dashed';

@Directive({
  selector: '[nbStack]',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-stack]': '""',
    '[attr.data-gap]': 'gap()',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-divider]': 'divider()',
  },
})
export class NbStack {
  readonly gap = input<NbStackGap>('md');
  readonly align = input<NbStackAlign>('stretch');
  readonly justify = input<NbStackJustify>('start');
  readonly divider = input<NbStackDivider>('none');

  protected readonly classes = computed(() =>
    nbClass(
      'flex min-w-0 flex-col',
      'gap-[var(--nb-stack-gap)]',
      this.gapClass(),
      this.alignClass(),
      this.justifyClass(),
      this.dividerClass()
    )
  );

  private gapClass(): string {
    const map: Record<NbStackGap, string> = {
      none: '[--nb-stack-gap:0px]',
      xs: '[--nb-stack-gap:0.25rem]',
      sm: '[--nb-stack-gap:0.5rem]',
      md: '[--nb-stack-gap:0.75rem]',
      lg: '[--nb-stack-gap:1rem]',
      xl: '[--nb-stack-gap:1.5rem]',
      '2xl': '[--nb-stack-gap:2rem]',
    };

    return map[this.gap()];
  }

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

  private dividerClass(): string {
    const map: Record<NbStackDivider, string> = {
      none: '',
      solid: nbClass(
        '[&>*+*]:border-t-(length:--nb-border-width)',
        '[&>*+*]:border-t-[var(--nb-border)]',
        '[&>*+*]:pt-[var(--nb-stack-gap)]'
      ),
      dashed: nbClass(
        '[&>*+*]:border-t-(length:--nb-border-width)',
        '[&>*+*]:border-dashed',
        '[&>*+*]:border-t-[var(--nb-border)]',
        '[&>*+*]:pt-[var(--nb-stack-gap)]'
      ),
    };

    return map[this.divider()];
  }
}
