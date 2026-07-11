import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-avatar-group-usage',
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
export class AvatarGroupUsage {
  protected readonly importCode = `import { NbAvatar, NbAvatarGroup } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-avatar-group [overflow]="142">
  <nb-avatar alt="Alice">A</nb-avatar>
  <nb-avatar alt="Bob">B</nb-avatar>
  <nb-avatar alt="Carol">C</nb-avatar>
</nb-avatar-group>`;
}
