import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbAvatar } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-avatar-preview',
  imports: [NbAvatar, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <nb-avatar
          class="h-20 w-20"
          src="https://github.com/khangtrannn.png"
          alt="khangtrannn"
        />
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPreview {
  protected readonly defaultExampleCode = `<nb-avatar class="h-20 w-20" src="https://github.com/khangtrannn.png" alt="khangtrannn" />`;
}
