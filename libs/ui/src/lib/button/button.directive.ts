import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import type { NbButtonSize, NbButtonVariant } from './button.types';

@Directive({
  selector: 'button[nbButton], a[nbButton]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-full-width]': 'fullWidth() ? "" : null',
  },
})
export class NbButton {
  readonly variant = input<NbButtonVariant>('default');
  readonly size = input<NbButtonSize>('default');
  readonly fullWidth = input(false);

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center justify-center whitespace-nowrap select-none',
      'gap-2',
      'font-bold rounded-nb',
      'transition-all duration-150 ease-out',
      '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-border) focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none',
      this.variantClass(),
      this.sizeClass(),
      this.fullWidth() && 'w-full'
    )
  );

  private variantClass(): string {
    const variant = this.variant();
    const base = 'border-2 border-(--nb-border)';

    const map: Record<NbButtonVariant, string> = {
      default: `${base} bg-white text-(--nb-main-foreground) shadow-nb hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none`,
      neutral: `${base} bg-white text-(--nb-foreground) shadow-nb hover:translate-x-(--nb-shadow-offset-x) hover:translate-y-(--nb-shadow-offset-y) hover:shadow-none`,
      noShadow: `${base} bg-white text-(--nb-main-foreground)`,
      reverse: `${base} bg-white text-(--nb-main-foreground) hover:-translate-x-(--nb-reverse-shadow-offset-x) hover:-translate-y-(--nb-reverse-shadow-offset-y) hover:shadow-nb`,
    };

    return map[variant];
  }

  private sizeClass(): string {
    const map: Record<NbButtonSize, string> = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-9 px-3 text-sm',
      lg: 'h-11 px-8 text-sm',
      icon: 'size-10',
    };

    return map[this.size()];
  }
}
