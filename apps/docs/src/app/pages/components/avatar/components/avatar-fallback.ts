import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbAvatar } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-avatar-fallback',
  imports: [NbAvatar, DocsExample],
  template: `
    <section id="fallback">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Fallback (Initials)
      </h2>
      <docs-example [code]="fallbackExampleCode">
        <nb-avatar alt="John Doe">JD</nb-avatar>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarFallback {
  protected readonly fallbackExampleCode = `<nb-avatar alt="John Doe">JD</nb-avatar>`;
}
