import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-card-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
      <docs-code-block title="Template" [code]="templateCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardUsage {
  protected readonly importCode = `import {
  NbCard,
  NbCardHeader,
  NbCardTitle,
  NbCardDescription,
  NbCardActions,
  NbCardContent,
  NbCardFooter,
} from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<nb-card>
  <nb-card-header>
    <nb-card-title>Card Title</nb-card-title>
    <nb-card-description>Card Description</nb-card-description>
  </nb-card-header>
  <nb-card-content>
    <p>Card Content</p>
  </nb-card-content>
  <nb-card-actions>
    <button nbButton>Action</button>
  </nb-card-actions>
</nb-card>`;
}
