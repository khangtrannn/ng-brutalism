import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'nb-avatar-group',
  exportAs: 'nbAvatarGroup',
  template: `
    <ng-content />
    @if (overflow() > 0) {
    <span
      data-slot="avatar-group-overflow"
      [attr.aria-label]="overflow() + ' more'"
      >+{{ overflow() }}</span
    >
    }
  `,
  host: {
    '[attr.data-nb-avatar-group]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAvatarGroup {
  readonly overflow = input<number>(0);
}
