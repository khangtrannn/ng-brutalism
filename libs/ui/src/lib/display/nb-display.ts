import { Directive, computed, input } from '@angular/core';

export type NbDisplaySize = 'sm' | 'default' | 'lg' | 'xl';

const SIZE_MAP: Record<NbDisplaySize, string> = {
  sm: '2rem',
  default: '3rem',
  lg: '3.75rem',
  xl: '5rem',
};

@Directive({
  selector: 'h1[nbDisplay], h2[nbDisplay]',
  host: {
    class: 'font-black tracking-tight leading-none',
    '[style.font-size]': 'fontSize()',
    '[style.color]': '"var(--nb-display-color, currentColor)"',
    '[attr.data-nb-display]': '""',
  },
})
export class NbDisplay {
  readonly size = input<NbDisplaySize>('default');

  protected readonly fontSize = computed(
    () => `var(--nb-display-size, ${SIZE_MAP[this.size()]})`
  );
}
