import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-button-anchor-usage',
  imports: [NbButton, DocsExample],
  template: `
    <section id="anchor-usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Anchor usage
      </h2>
      <docs-example [code]="anchorExampleCode">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a
            nbButton
            href="https://angular.dev"
            target="_blank"
            rel="noreferrer"
          >
            Angular Docs
          </a>

          <a
            nbButton
            href="https://github.com/khangtrannn/ng-brutalism"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo
          </a>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonAnchorUsage {
  protected readonly anchorExampleCode = `<div class="flex flex-wrap items-center justify-center gap-4">
  <a nbButton href="https://angular.dev" target="_blank" rel="noreferrer">
    Angular Docs
  </a>

  <a
    nbButton
    href="https://github.com/khangtrannn/ng-brutalism"
    target="_blank"
    rel="noreferrer"
  >
    GitHub Repo
  </a>
</div>`;
}
