import { ChangeDetectionStrategy, Component, Directive, computed, input } from '@angular/core';

import { nbClass } from '../core/class';

export type NbChipTone = 'default' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'accent' | 'success' | 'warning' | 'danger';

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
      'bg-(--nb-chip-bg) text-(--nb-chip-fg)',
      '[--nb-chip-bg:var(--nb-surface)]',
      '[--nb-chip-fg:var(--nb-foreground)]',
      'px-2.5 py-0.5 text-xs font-bold',
      'shadow-[2px_2px_0_0_var(--nb-shadow)]',
      '[&_svg]:size-3 [&_svg]:shrink-0',
      this.toneClass()
    )
  );

  private toneClass(): string {
    const map: Record<NbChipTone, string> = {
      default: '',
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

@Component({
  selector: 'nb-chip-group',
  template: `<ng-content />`,
  host: {
    '[class]': '"flex flex-wrap gap-2"',
    '[attr.data-nb-chip-group]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChipGroup {}
