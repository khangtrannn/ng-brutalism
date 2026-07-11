import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbInputGroup,
  NbInputPrefix,
  NbLabel,
  NbSelect,
  NbSelectOption,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';
import { DocsSelectTagIcon } from '../select.icons';

@Component({
  selector: 'docs-select-with-prefix',
  imports: [
    NbInputGroup,
    NbInputPrefix,
    NbLabel,
    NbSelect,
    NbSelectOption,
    DocsExample,
    DocsSelectTagIcon,
  ],
  template: `
    <section id="with-prefix">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        With Prefix
      </h2>
      <docs-example [code]="withPrefixExampleCode">
        <div class="w-90">
          <label nbLabel id="subject-label" class="mb-2 block">Subject</label>
          <nb-input-group>
            <span nbInputPrefix>
              <docs-select-tag-icon class="size-5" />
            </span>
            <nb-select
              placeholder="What is this regarding?"
              aria-labelledby="subject-label"
            >
              <nb-select-option value="general" label="General Inquiry"
                >General Inquiry</nb-select-option
              >
              <nb-select-option value="project" label="Project Proposal"
                >Project Proposal</nb-select-option
              >
              <nb-select-option value="bug" label="Bug Report"
                >Bug Report</nb-select-option
              >
              <nb-select-option value="other" label="Other"
                >Other</nb-select-option
              >
            </nb-select>
          </nb-input-group>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWithPrefix {
  protected readonly withPrefixExampleCode = `<div class="w-90">
  <label nbLabel id="subject-label" class="mb-2 block">Subject</label>
  <nb-input-group>
    <span nbInputPrefix>
      <docs-select-tag-icon class="size-5" />
    </span>
    <nb-select placeholder="What is this regarding?" aria-labelledby="subject-label">
      <nb-select-option value="general" label="General Inquiry">General Inquiry</nb-select-option>
      <nb-select-option value="project" label="Project Proposal">Project Proposal</nb-select-option>
      <nb-select-option value="bug" label="Bug Report">Bug Report</nb-select-option>
      <nb-select-option value="other" label="Other">Other</nb-select-option>
    </nb-select>
  </nb-input-group>
</div>`;
}
