import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbChip, NbChipGroup } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-chip-preview',
  imports: [DocsExample, NbChip, NbChipGroup],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div nbChipGroup class="p-4">
          <span nbChip>Angular</span>
          <span nbChip tone="mint">TypeScript</span>
          <span nbChip tone="pink">RxJS</span>
          <span nbChip tone="lavender">Signals</span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipPreview {
  protected readonly defaultExampleCode = `<div nbChipGroup>
  <span nbChip>Angular</span>
  <span nbChip tone="mint">TypeScript</span>
  <span nbChip tone="pink">RxJS</span>
  <span nbChip tone="lavender">Signals</span>
</div>`;
}
