import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbChip, NbChipGroup } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-chip-tones',
  imports: [DocsExample, NbChip, NbChipGroup],
  template: `
    <section id="tones">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
      <docs-example [code]="tonesExampleCode">
        <div nbChipGroup class="p-4">
          <span nbChip>default</span>
          <span nbChip tone="ink">ink</span>
          <span nbChip tone="yellow">yellow</span>
          <span nbChip tone="pink">pink</span>
          <span nbChip tone="mint">mint</span>
          <span nbChip tone="lavender">lavender</span>
          <span nbChip tone="accent">accent</span>
          <span nbChip tone="success">success</span>
          <span nbChip tone="warning">warning</span>
          <span nbChip tone="danger">danger</span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipTones {
  protected readonly tonesExampleCode = `<div nbChipGroup>
  <span nbChip>default</span>
  <span nbChip tone="ink">ink</span>
  <span nbChip tone="yellow">yellow</span>
  <span nbChip tone="pink">pink</span>
  <span nbChip tone="mint">mint</span>
  <span nbChip tone="lavender">lavender</span>
  <span nbChip tone="accent">accent</span>
  <span nbChip tone="success">success</span>
  <span nbChip tone="warning">warning</span>
  <span nbChip tone="danger">danger</span>
</div>`;
}
