import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbInput, NbInputGroup, NbInputPrefix } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-group-preview',
  imports: [NbInput, NbInputGroup, NbInputPrefix, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <nb-input-group class="max-w-80">
          <span nbInputPrefix>@</span>
          <input nbInput placeholder="username" />
        </nb-input-group>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupPreview {
  protected readonly defaultExampleCode = `<nb-input-group class="max-w-80">
  <span nbInputPrefix>@</span>
  <input nbInput placeholder="username" />
</nb-input-group>`;
}
