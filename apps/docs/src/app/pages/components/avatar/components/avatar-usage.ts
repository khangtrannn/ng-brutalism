import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-avatar-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <docs-code-block
        class="block mb-5"
        title="Import"
        [code]="importCode"
      />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarUsage {
  protected readonly importCode = `import { NbAvatar } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-avatar class="h-20 w-20" src="https://github.com/khangtrannn.png" alt="khangtrannn" />`;
}
