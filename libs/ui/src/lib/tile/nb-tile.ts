import { ChangeDetectionStrategy, Component } from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-tile',
  template: `
    <span data-slot="tile-icon" class="shrink-0">
      <ng-content select="[slot=icon]" />
    </span>
    <span class="flex flex-col gap-1 min-w-0">
      <span data-slot="tile-title" class="text-sm font-black leading-tight tracking-tight">
        <ng-content select="[slot=title]" />
      </span>
      <span data-slot="tile-description" class="text-xs font-medium text-(--nb-tile-description-fg) leading-snug">
        <ng-content select="[slot=description]" />
      </span>
    </span>
  `,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"tile"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTile {
  protected readonly classes = nbClass(
    '[--nb-tile-bg:var(--nb-background)]',
    '[--nb-tile-border:var(--nb-border)]',
    '[--nb-tile-radius:var(--nb-radius)]',
    '[--nb-tile-shadow:2px_2px_0_var(--nb-shadow)]',
    '[--nb-tile-description-fg:var(--nb-foreground)]',
    'flex items-center gap-3 p-3',
    'bg-(--nb-tile-bg)',
    'border-2 border-(--nb-tile-border)',
    'rounded-(--nb-tile-radius)',
    'shadow-[var(--nb-tile-shadow)]',
    'transition-transform duration-100',
    'hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--nb-shadow)]',
    'active:translate-y-0.5 active:shadow-[1px_1px_0_var(--nb-shadow)]'
  );
}
