import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbLabel, NbTextarea } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-textarea-with-label',
  imports: [NbLabel, NbTextarea, DocsExample],
  template: `
    <section id="with-label">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        With Label
      </h2>
      <docs-example [code]="withLabelExampleCode">
        <div class="flex flex-col gap-2">
          <label nbLabel for="message">Message</label>
          <textarea
            nbTextarea
            id="message"
            placeholder="Enter your message..."
            class="w-75"
          ></textarea>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaWithLabel {
  protected readonly withLabelExampleCode = `<div class="flex flex-col gap-2">
  <label nbLabel for="message">Message</label>
  <textarea nbTextarea id="message" placeholder="Enter your message..." class="w-75"></textarea>
</div>`;
}
