import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';
import type { NbBadgeVariant } from './badge.types';

@Directive({
  selector: 'span[nbBadge]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.data-variant]': 'variant()',
  },
})
export class NbBadge {
  readonly variant = input<NbBadgeVariant>('default');

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center rounded-nb border-2 border-(--nb-border)',
      'px-2.5 py-0.5 text-xs font-bold',
      'shadow-[2px_2px_0_0_var(--nb-shadow)]',
      this.variantClass()
    )
  );

  private variantClass(): string {
    const map: Record<NbBadgeVariant, string> = {
      default: 'bg-white text-(--nb-foreground)',
      secondary: 'bg-(--nb-accent) text-(--nb-accent-foreground)',
      success: 'bg-(--nb-success) text-(--nb-success-foreground)',
      warning: 'bg-(--nb-warning) text-(--nb-warning-foreground)',
      destructive: 'bg-(--nb-danger) text-(--nb-danger-foreground)',
    };

    return map[this.variant()];
  }
}
