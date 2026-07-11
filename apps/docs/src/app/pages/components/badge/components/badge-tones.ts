import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbBadge } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-badge-tones',
  imports: [NbBadge, DocsExample],
  template: `
    <section id="tones">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
      <docs-example [code]="variantsExampleCode">
        <div class="flex flex-wrap items-center gap-3">
          <span nbBadge>Default</span>
          <span nbBadge tone="accent">Accent</span>
          <span nbBadge tone="success">Success</span>
          <span nbBadge tone="warning">Warning</span>
          <span nbBadge tone="danger">Danger</span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeTones {
  protected readonly variantsExampleCode = `<div class="flex flex-wrap items-center gap-3">
  <span nbBadge>Default</span>
  <span nbBadge tone="accent">Accent</span>
  <span nbBadge tone="success">Success</span>
  <span nbBadge tone="warning">Warning</span>
  <span nbBadge tone="danger">Danger</span>
</div>`;
}
