import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbAvatar, NbAvatarGroup } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-avatar-group-no-overflow',
  imports: [NbAvatar, NbAvatarGroup, DocsExample],
  template: `
    <section id="no-overflow">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Without overflow
      </h2>
      <docs-example [code]="noOverflowCode">
        <div class="p-4">
          <nb-avatar-group>
            <nb-avatar alt="Alice">A</nb-avatar>
            <nb-avatar alt="Bob">B</nb-avatar>
            <nb-avatar alt="Carol">C</nb-avatar>
            <nb-avatar alt="Dave">D</nb-avatar>
          </nb-avatar-group>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarGroupNoOverflow {
  protected readonly noOverflowCode = `<nb-avatar-group>
  <nb-avatar alt="Alice">A</nb-avatar>
  <nb-avatar alt="Bob">B</nb-avatar>
  <nb-avatar alt="Carol">C</nb-avatar>
  <nb-avatar alt="Dave">D</nb-avatar>
</nb-avatar-group>`;
}
