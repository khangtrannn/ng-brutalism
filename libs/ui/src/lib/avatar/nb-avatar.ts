import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { nbClass } from '../core/class';

@Component({
  selector: 'nb-avatar',
  standalone: true,
  template: `
    @if (src()) {
    <img [src]="src()" [alt]="alt()" class="h-full w-full object-cover" />
    } @else {
    <ng-content />
    }
  `,
  host: {
    '[class]': 'classes',
    '[attr.data-slot]': '"avatar"',
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'alt()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAvatar {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string>('');

  protected readonly classes = nbClass(
    '[--nb-avatar-bg:var(--nb-secondary-background)]',
    '[--nb-avatar-fg:var(--nb-foreground)]',
    '[--nb-avatar-border:var(--nb-border)]',
    '[--nb-avatar-radius:9999px]',
    '[--nb-avatar-shadow:2px_2px_0_0_var(--nb-shadow)]',
    'relative inline-flex h-10 w-10 shrink-0 overflow-hidden',
    'rounded-(--nb-avatar-radius) border-2 border-(--nb-avatar-border)',
    'bg-(--nb-avatar-bg) text-(--nb-avatar-fg)',
    'shadow-[var(--nb-avatar-shadow)]',
    'font-bold text-sm items-center justify-center'
  );
}
