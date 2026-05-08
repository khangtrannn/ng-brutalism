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
  readonly size = input<NbButtonSize>('md');
  readonly fullWidth = input(false);

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center justify-center select-none',
      'border-nb border-[var(--nb-border)]',
      'font-bold rounded-nb shadow-nb',
      'transition-transform transition-shadow',
      'outline-none',

      // Focus visible only.
      'focus-visible:outline-[var(--nb-focus-ring)]',
      'focus-visible:outline-offset-[var(--nb-focus-ring-offset)]',

      // Pressed neo-brutalist interaction.
      'active:translate-x-[var(--nb-shadow-offset-x)]',
      'active:translate-y-[var(--nb-shadow-offset-y)]',
      'active:shadow-nb-pressed',

      // Native disabled state for button.
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',

      // Optional aria-disabled support for anchor usage.
      'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none',

      this.variantClass(),
      this.sizeClass(),
      this.fullWidth() && 'w-full'
    )
  );

  private variantClass(): string {
    return {
      default: 'bg-nb-surface text-nb-surface-fg',
      primary: 'bg-nb-primary text-nb-primary-fg',
      secondary: 'bg-nb-secondary text-nb-secondary-fg',
      danger: 'bg-nb-danger text-nb-danger-fg',
    }[this.variant()];
  }

  private sizeClass(): string {
    return {
      sm: 'h-nb-sm px-3 text-sm',
      md: 'h-nb-md px-4 text-base',
      lg: 'h-nb-lg px-6 text-lg',
    }[this.size()];
  }
}
