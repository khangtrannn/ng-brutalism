import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbNativeSelect } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-select-native-select',
  imports: [NbNativeSelect, DocsExample],
  template: `
    <section id="native-select">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Native Select
      </h2>
      <docs-example [code]="nativeExampleCode">
        <select nbSelect class="w-80" aria-label="Favorite accent">
          <option value="" disabled selected>Favorite accent</option>
          <option value="mint">Mint</option>
          <option value="yellow">Yellow</option>
          <option value="pink">Pink</option>
        </select>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectNativeSelect {
  protected readonly nativeExampleCode = `<select
  nbSelect
  class="w-80"
  aria-label="Favorite accent"
>
  <option value="" disabled selected>Favorite accent</option>
  <option value="mint">Mint</option>
  <option value="yellow">Yellow</option>
  <option value="pink">Pink</option>
</select>`;
}
