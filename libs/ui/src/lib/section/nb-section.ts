import { Directive, booleanAttribute, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbSectionPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type NbSectionBorder =
  | 'none'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'block'
  | 'inline'
  | 'all';

export type NbSectionBorderStyle = 'solid' | 'dashed' | 'dotted';

export type NbSectionLayout = 'default' | 'center' | 'between';

export type NbSectionAlign = 'stretch' | 'start' | 'center' | 'end';

@Directive({
  selector: '[nbSection]',
  exportAs: 'nbSection',
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-section]': '""',
    '[attr.data-padding]': 'padding()',
    '[attr.data-border]': 'border()',
    '[attr.data-border-style]': 'borderStyle()',
    '[attr.data-layout]': 'layout()',
    '[attr.data-align]': 'align()',
    '[attr.data-flush]': 'flush() ? "" : null',
  },
})
export class NbSection {
  readonly padding = input<NbSectionPadding>('md');
  readonly border = input<NbSectionBorder>('none');
  readonly borderStyle = input<NbSectionBorderStyle>('solid');
  readonly layout = input<NbSectionLayout>('default');
  readonly align = input<NbSectionAlign>('stretch');
  readonly flush = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(() =>
    nbClass(
      'box-border min-w-0',
      'p-[var(--nb-section-padding)]',
      this.paddingClass(),
      this.layoutClass(),
      this.alignClass(),
      this.borderClass(),
      this.flush() && 'mx-[calc(var(--nb-section-padding)*-1)]'
    )
  );

  private paddingClass(): string {
    const map: Record<NbSectionPadding, string> = {
      none: '[--nb-section-padding:0px]',
      xs: '[--nb-section-padding:0.5rem]',
      sm: '[--nb-section-padding:0.75rem]',
      md: '[--nb-section-padding:1rem]',
      lg: '[--nb-section-padding:1.5rem]',
      xl: '[--nb-section-padding:2rem]',
    };

    return map[this.padding()];
  }

  private layoutClass(): string {
    const map: Record<NbSectionLayout, string> = {
      default: 'block',
      center: 'flex justify-center gap-[var(--nb-spacing-md,1rem)]',
      between: 'flex justify-between gap-[var(--nb-spacing-md,1rem)]',
    };

    return map[this.layout()];
  }

  private alignClass(): string {
    if (this.layout() === 'default') {
      return '';
    }

    const map: Record<NbSectionAlign, string> = {
      stretch: 'items-stretch',
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    };

    return map[this.align()];
  }

  private borderClass(): string {
    const side = this.border();

    if (side === 'none') {
      return '';
    }

    const style = this.borderStyleClass();

    const widthMap: Record<Exclude<NbSectionBorder, 'none'>, string> = {
      top: 'border-t-(length:--nb-border-width)',
      right: 'border-r-(length:--nb-border-width)',
      bottom: 'border-b-(length:--nb-border-width)',
      left: 'border-l-(length:--nb-border-width)',
      block: 'border-y-(length:--nb-border-width)',
      inline: 'border-x-(length:--nb-border-width)',
      all: 'border-(length:--nb-border-width)',
    };

    return nbClass(widthMap[side], 'border-(--nb-border)', style);
  }

  private borderStyleClass(): string {
    const map: Record<NbSectionBorderStyle, string> = {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    };

    return map[this.borderStyle()];
  }
}
