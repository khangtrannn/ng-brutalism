import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSelect, NbSelectOption } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';
import {
  DocsSelectBriefcaseIcon,
  DocsSelectBuildingIcon,
  DocsSelectClockIcon,
  DocsSelectGlobeIcon,
} from '../select.icons';

@Component({
  selector: 'docs-select-preview',
  imports: [
    NbSelect,
    NbSelectOption,
    DocsExample,
    DocsSelectBriefcaseIcon,
    DocsSelectBuildingIcon,
    DocsSelectClockIcon,
    DocsSelectGlobeIcon,
  ],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="w-80">
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
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPreview {
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
