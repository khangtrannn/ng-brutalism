import { Directive, computed, input } from '@angular/core';

export type NbSeparatorOrientation = 'horizontal' | 'vertical';
export type NbSeparatorVariant = 'solid' | 'dashed' | 'thick';

const THICKNESS: Record<NbSeparatorVariant, string> = {
  solid: '2px',
  dashed: '2px',
  thick: '4px',
};

@Directive({
  selector: 'hr[nbSeparator]',
  host: {
    '[attr.data-nb-separator]': '""',
    '[attr.aria-orientation]': 'orientation()',
    '[style.margin]': '"0"',
    '[style.border-top]': 'isHorizontal() ? borderLine() : "none"',
    '[style.border-bottom]': '"none"',
    '[style.border-left]': 'isVertical() ? borderLine() : "none"',
    '[style.border-right]': '"none"',
    '[style.width]': 'isVertical() ? "0" : "100%"',
    '[style.height]': 'isVertical() ? "auto" : "0"',
    '[style.align-self]': 'isVertical() ? "stretch" : "auto"',
  },
})
export class NbSeparator {
  readonly orientation = input<NbSeparatorOrientation>('horizontal');
  readonly variant = input<NbSeparatorVariant>('solid');

  protected readonly isHorizontal = computed(() => this.orientation() === 'horizontal');
  protected readonly isVertical = computed(() => this.orientation() === 'vertical');

  protected readonly borderLine = computed(() => {
    const v = this.variant();
    const thickness = `var(--nb-separator-thickness, ${THICKNESS[v]})`;
    const style = v === 'dashed' ? 'dashed' : 'solid';
    return `${thickness} ${style} var(--nb-separator-color, var(--nb-border))`;
  });
}
