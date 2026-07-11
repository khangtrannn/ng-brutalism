import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStatusDot } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-status-dot-preview',
  imports: [NbStatusDot, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="flex items-center gap-6 p-4">
          <span class="flex items-center gap-2 font-bold">
            <span nbStatusDot state="online"></span> Online
          </span>
          <span class="flex items-center gap-2 font-bold">
            <span nbStatusDot state="offline"></span> Offline
          </span>
          <span class="flex items-center gap-2 font-bold">
            <span nbStatusDot state="live"></span> Live
          </span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusDotPreview {
  protected readonly defaultExampleCode = `<span nbStatusDot state="online"></span>
<span nbStatusDot state="offline"></span>
<span nbStatusDot state="live"></span>`;
}
