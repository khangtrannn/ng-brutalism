import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbBadge } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-badge-preview',
  imports: [NbBadge, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <span nbBadge>Default</span>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgePreview {
  protected readonly defaultExampleCode = `<span nbBadge>Default</span>`;
}
