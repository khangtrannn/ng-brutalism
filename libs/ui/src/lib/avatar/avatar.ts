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
export class NbAvatarComponent {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string>('');

  protected readonly classes = nbClass(
    'relative inline-flex h-10 w-10 shrink-0 overflow-hidden',
    'rounded-full border-2 border-(--nb-border)',
    'bg-(--nb-secondary-background) text-(--nb-foreground)',
    'shadow-[2px_2px_0_0_var(--nb-shadow)]',
    'font-bold text-sm items-center justify-center'
  );
}
