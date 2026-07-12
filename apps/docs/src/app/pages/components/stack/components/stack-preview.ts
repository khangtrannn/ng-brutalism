import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbDisplay, NbStack } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-stack-preview',
  imports: [NbButton, NbDisplay, NbStack, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div nbStack gap="lg" class="max-w-md p-4">
          <h2 nbDisplay>Build loud.</h2>

          <p class="text-base font-medium">
            Stack gives you brutalist vertical rhythm without repeating flex and
            gap classes everywhere.
          </p>

          <button nbButton>Stay sharp</button>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackPreview {
  protected readonly defaultExampleCode = `<div nbStack gap="lg">
  <h2 nbDisplay>Build loud.</h2>

  <p>
    Stack gives you brutalist vertical rhythm without repeating flex and gap
    classes everywhere.
  </p>

  <button nbButton>Stay sharp</button>
</div>`;
}
