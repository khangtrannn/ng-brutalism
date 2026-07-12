import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-chip-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipUsage {
  protected readonly importCode = `import { NbChip, NbChipGroup } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbChipGroup>
  <span nbChip>Angular</span>
  <span nbChip tone="mint">TypeScript</span>
  <span nbChip tone="pink">RxJS</span>
  <span nbChip tone="lavender">Signals</span>
</div>`;
}
