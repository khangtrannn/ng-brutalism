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
      'inline-flex items-center rounded-(--nb-badge-radius) border-2 border-(--nb-badge-border)',
      'bg-(--nb-badge-bg) text-(--nb-badge-fg)',
      '[--nb-badge-bg:#fff]',
      '[--nb-badge-fg:var(--nb-foreground)]',
      '[--nb-badge-border:var(--nb-border)]',
      '[--nb-badge-radius:9999px]',
      '[--nb-badge-shadow:2px_2px_0_var(--nb-shadow)]',
      'px-2.5 py-0.5 text-xs font-bold',
      'shadow-[var(--nb-badge-shadow)]',
      this.variantClass()
    )
  );

  private variantClass(): string {
    const map: Record<NbBadgeVariant, string> = {
      default: '',
      secondary:
        '[--nb-badge-bg:var(--nb-accent)] [--nb-badge-fg:var(--nb-accent-foreground)]',
      success:
        '[--nb-badge-bg:var(--nb-success)] [--nb-badge-fg:var(--nb-success-foreground)]',
      warning:
        '[--nb-badge-bg:var(--nb-warning)] [--nb-badge-fg:var(--nb-warning-foreground)]',
      danger:
        '[--nb-badge-bg:var(--nb-danger)] [--nb-badge-fg:var(--nb-danger-foreground)]',
    };

    return map[this.variant()];
  }
}
