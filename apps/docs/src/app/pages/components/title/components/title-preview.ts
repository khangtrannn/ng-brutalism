import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTitle } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-title-preview',
  imports: [NbTitle, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <h2
          nbTitle
          class="font-mono text-4xl font-black leading-tight uppercase"
        >
          Brutal section title
        </h2>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitlePreview {
  protected readonly defaultExampleCode = `<h2 nbTitle class="font-mono text-4xl font-black leading-tight uppercase">
  Brutal section title
</h2>`;
}
