import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-button-tones',
  imports: [NbButton, DocsExample],
  template: `
    <section id="tones">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
      <docs-example [code]="tonesExampleCode">
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button nbButton>Default</button>
          <button nbButton tone="background">Background</button>
          <button nbButton tone="primary">Primary</button>
          <button nbButton tone="secondary">Secondary</button>
          <button nbButton tone="accent">Accent</button>
          <button nbButton tone="danger">Danger</button>
          <button nbButton tone="success">Success</button>
          <button nbButton tone="warning">Warning</button>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonTones {
  protected readonly tonesExampleCode = `<div class="flex flex-wrap items-center justify-center gap-3">
  <button nbButton>Default</button>
  <button nbButton tone="background">Background</button>
  <button nbButton tone="primary">Primary</button>
  <button nbButton tone="secondary">Secondary</button>
  <button nbButton tone="accent">Accent</button>
  <button nbButton tone="danger">Danger</button>
  <button nbButton tone="success">Success</button>
  <button nbButton tone="warning">Warning</button>
</div>`;
}
