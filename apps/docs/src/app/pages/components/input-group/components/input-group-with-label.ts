import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbInput,
  NbInputGroup,
  NbInputPrefix,
  NbLabel,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-group-with-label',
  imports: [NbInput, NbInputGroup, NbInputPrefix, NbLabel, DocsExample],
  template: `
    <section id="with-label">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        With Label
      </h2>
      <docs-example [code]="withLabelExampleCode">
        <div class="grid w-full max-w-96 gap-2">
          <label nbLabel for="profile-url">Profile URL</label>
          <nb-input-group>
            <span nbInputPrefix class="text-[0.8rem]">https</span>
            <input nbInput id="profile-url" placeholder="example.com" />
          </nb-input-group>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupWithLabel {
  protected readonly withLabelExampleCode = `<div class="grid w-full max-w-96 gap-2">
  <label nbLabel for="profile-url">Profile URL</label>
  <nb-input-group>
    <span nbInputPrefix class="text-[0.8rem]">https</span>
    <input nbInput id="profile-url" placeholder="example.com" />
  </nb-input-group>
</div>`;
}
