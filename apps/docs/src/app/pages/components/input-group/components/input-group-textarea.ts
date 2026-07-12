import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbInputGroup, NbInputPrefix, NbTextarea } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-group-textarea',
  imports: [NbInputGroup, NbInputPrefix, NbTextarea, DocsExample],
  template: `
    <section id="textarea">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Textarea</h2>
      <docs-example [code]="textareaExampleCode">
        <nb-input-group class="max-w-96">
          <span nbInputPrefix align="stretch">TXT</span>
          <textarea
            nbTextarea
            placeholder="Write a note..."
            rows="4"
          ></textarea>
        </nb-input-group>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupTextarea {
  protected readonly textareaExampleCode = `<nb-input-group class="max-w-96">
  <span nbInputPrefix align="stretch">TXT</span>
  <textarea nbTextarea placeholder="Write a note..." rows="4"></textarea>
</nb-input-group>`;
}
