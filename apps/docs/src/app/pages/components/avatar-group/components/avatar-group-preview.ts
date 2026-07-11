import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbAvatar, NbAvatarGroup } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-avatar-group-preview',
  imports: [NbAvatar, NbAvatarGroup, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="p-4">
          <nb-avatar-group [overflow]="142">
            <nb-avatar alt="Alice">A</nb-avatar>
            <nb-avatar alt="Bob">B</nb-avatar>
            <nb-avatar alt="Carol">C</nb-avatar>
          </nb-avatar-group>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarGroupPreview {
  protected readonly defaultExampleCode = `<nb-avatar-group [overflow]="142">
  <nb-avatar alt="Alice">A</nb-avatar>
  <nb-avatar alt="Bob">B</nb-avatar>
  <nb-avatar alt="Carol">C</nb-avatar>
</nb-avatar-group>`;
}
