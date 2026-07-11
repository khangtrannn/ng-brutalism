import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-select-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <docs-code-block
        class="block mb-5"
        title="Import"
        [code]="importCode"
      />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectUsage {
  protected readonly importCode = `import { NbNativeSelect, NbSelect, NbSelectOption } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div class="w-80">
  <nb-select placeholder="Select an option">
    <nb-select-option value="worldwide" label="Worldwide">
      <docs-select-globe-icon />
      Worldwide
    </nb-select-option>
    <nb-select-option value="full-time" label="Full-time">
      <docs-select-briefcase-icon />
      Full-time
    </nb-select-option>
    <nb-select-option value="part-time" label="Part-time">
      <docs-select-clock-icon />
      Part-time
    </nb-select-option>
    <nb-select-option value="remote" label="Remote">
      <docs-select-building-icon />
      Remote
    </nb-select-option>
  </nb-select>
</div>`;
}
