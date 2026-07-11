import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDisplay } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-display-preview',
  imports: [DocsExample, NbDisplay],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <h2 nbDisplay class="uppercase">SENIOR ANGULAR ENGINEER</h2>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayPreview {
  protected readonly defaultExampleCode = `<h2 nbDisplay class="uppercase">SENIOR ANGULAR ENGINEER</h2>`;
}
