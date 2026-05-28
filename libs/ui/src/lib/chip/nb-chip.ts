import { Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbChipTone = 'default' | 'ink' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'accent' | 'success' | 'warning' | 'danger';

@Directive({
  selector: 'span[nbChip]',
  host: {
    '[class]': 'classes()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-nb-chip]': '""',
  },
})
export class NbChip {
  readonly tone = input<NbChipTone>('default');

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center gap-1.5',
      'border-2 border-(--nb-border)',
      'bg-[var(--nb-chip-bg,var(--nb-surface))] text-[var(--nb-chip-fg,var(--nb-foreground))]',
      'rounded-[var(--nb-chip-radius,0px)] shadow-[var(--nb-chip-shadow,2px_2px_0_0_var(--nb-shadow))]',
      'px-2.5 py-0.5 text-xs font-bold',
      '[&_svg]:size-[var(--nb-chip-icon-size,0.75rem)] [&_svg]:shrink-0',
      this.toneClass()
    )
  );

  private toneClass(): string {
    const map: Record<NbChipTone, string> = {
      default: '',
      ink: '[--nb-chip-bg:#1a1a1a] [--nb-chip-fg:#ffffff]',
      yellow: '[--nb-chip-bg:#ffd24a]',
      pink: '[--nb-chip-bg:#ff7eb6]',
      mint: '[--nb-chip-bg:#99e8c8]',
      lavender: '[--nb-chip-bg:#b8a4ff]',
      accent: '[--nb-chip-bg:var(--nb-accent)] [--nb-chip-fg:var(--nb-accent-foreground)]',
      success: '[--nb-chip-bg:var(--nb-success)] [--nb-chip-fg:var(--nb-success-foreground)]',
      warning: '[--nb-chip-bg:var(--nb-warning)] [--nb-chip-fg:var(--nb-warning-foreground)]',
      danger: '[--nb-chip-bg:var(--nb-danger)] [--nb-chip-fg:var(--nb-danger-foreground)]',
    };
    return map[this.tone()];
  }
}

@Directive({
  selector: '[nbChipGroup]',
  host: {
    class: 'flex flex-wrap gap-2',
    '[attr.data-nb-chip-group]': '""',
  },
})
export class NbChipGroup {}
