import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbLabel, NbSelect, NbSelectOption } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-select-with-label',
  imports: [NbLabel, NbSelect, NbSelectOption, DocsExample],
  template: `
    <section id="with-label">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        With Label
      </h2>
      <docs-example [code]="withLabelExampleCode">
        <div class="grid w-80 gap-2">
          <label nbLabel id="plan-label">Plan</label>
          <nb-select placeholder="Select a plan" aria-labelledby="plan-label">
            <nb-select-option value="starter" label="Starter"
              >Starter</nb-select-option
            >
            <nb-select-option value="team" label="Team"
              >Team</nb-select-option
            >
            <nb-select-option value="enterprise" label="Enterprise">
              Enterprise
            </nb-select-option>
          </nb-select>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWithLabel {
  protected readonly withLabelExampleCode = `<div class="grid w-80 gap-2">
  <label nbLabel id="plan-label">Plan</label>
  <nb-select placeholder="Select a plan" aria-labelledby="plan-label">
    <nb-select-option value="starter" label="Starter">Starter</nb-select-option>
    <nb-select-option value="team" label="Team">Team</nb-select-option>
    <nb-select-option value="enterprise" label="Enterprise">Enterprise</nb-select-option>
  </nb-select>
</div>`;
}
