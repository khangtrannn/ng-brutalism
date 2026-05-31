import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'nb-avatar-group',
  template: `
    <ng-content />
    @if (overflow() > 0) {
      <span
        class="relative inline-flex h-10 w-10 shrink-0 items-center justify-center
               rounded-full border-2 border-(--nb-border) bg-(--nb-surface)
               font-bold text-xs shadow-[2px_2px_0_0_var(--nb-shadow)]"
        [attr.aria-label]="overflow() + ' more'"
      >+{{ overflow() }}</span>
    }
  `,
  host: {
    '[class]': '"flex items-center [&>*]:-ml-3 [&>*:first-child]:ml-0"',
    '[attr.data-nb-avatar-group]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAvatarGroup {
  readonly overflow = input<number>(0);
}
