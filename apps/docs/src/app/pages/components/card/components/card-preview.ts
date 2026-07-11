import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsExample } from '@ng-brutalism/docs-ui';
import JobListingCardExample from '../examples/job-listing-card';

@Component({
  selector: 'docs-card-preview',
  imports: [DocsExample, JobListingCardExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <p class="mb-4 text-sm font-medium">
        The live demo is a styled composition showcase. The Code tab below
        shows the underlying card primitive usage; see the
        <a
          class="underline"
          href="https://github.com/khangtrannn/ng-brutalism/blob/main/apps/docs/src/app/pages/components/card/examples/job-listing-card/job-listing-card.ts"
          target="_blank"
          rel="noreferrer"
          >example source</a
        >
        for the full implementation.
      </p>
      <docs-example [code]="templateCode">
        <docs-job-listing-card />
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPreview {
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
