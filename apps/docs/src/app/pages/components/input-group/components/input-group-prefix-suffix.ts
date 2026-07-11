import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbInput,
  NbInputGroup,
  NbInputPrefix,
  NbInputSuffix,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-input-group-prefix-suffix',
  imports: [NbInput, NbInputGroup, NbInputPrefix, NbInputSuffix, DocsExample],
  template: `
    <section id="prefix-suffix">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Prefix and Suffix
      </h2>
      <docs-example [code]="prefixSuffixExampleCode">
        <nb-input-group class="max-w-96">
          <span nbInputPrefix>$</span>
          <input nbInput type="number" placeholder="Amount" />
          <span nbInputSuffix>USD</span>
        </nb-input-group>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupPrefixSuffix {
  protected readonly prefixSuffixExampleCode = `<nb-input-group class="max-w-96">
  <span nbInputPrefix>$</span>
  <input nbInput type="number" placeholder="Amount" />
  <span nbInputSuffix>USD</span>
</nb-input-group>`;
}
