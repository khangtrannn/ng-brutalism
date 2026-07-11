import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbSelect, NbSelectOption } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';
import { DocsSelectGlobeIcon, DocsSelectLocationIcon } from '../select.icons';

@Component({
  selector: 'docs-select-with-icon',
  imports: [
    NbSelect,
    NbSelectOption,
    DocsExample,
    DocsSelectGlobeIcon,
    DocsSelectLocationIcon,
  ],
  template: `
    <section id="with-icon">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Option Content
      </h2>
      <docs-example [code]="withIconExampleCode">
        <div class="w-80">
          <nb-select placeholder="Select location" [value]="'worldwide'">
            <nb-select-option label="Select location">
              <docs-select-location-icon />
              Select location
            </nb-select-option>
            <nb-select-option value="worldwide" label="Worldwide">
              <docs-select-globe-icon />
              Worldwide
            </nb-select-option>
            <nb-select-option value="north-america" label="North America">
              <docs-select-globe-icon />
              North America
            </nb-select-option>
            <nb-select-option value="europe" label="Europe">
              <docs-select-globe-icon />
              Europe
            </nb-select-option>
            <nb-select-option value="asia-pacific" label="Asia Pacific">
              <docs-select-globe-icon />
              Asia Pacific
            </nb-select-option>
            <nb-select-option value="south-america" label="South America">
              <docs-select-globe-icon />
              South America
            </nb-select-option>
            <nb-select-option value="africa" label="Africa">
              <docs-select-globe-icon />
              Africa
            </nb-select-option>
          </nb-select>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWithIcon {
  protected readonly withIconExampleCode = `<div class="w-80">
  <nb-select placeholder="Select location" [value]="'worldwide'">
    <nb-select-option label="Select location">
      <docs-select-location-icon />
      Select location
    </nb-select-option>
    <nb-select-option value="worldwide" label="Worldwide">
      <docs-select-globe-icon />
      Worldwide
    </nb-select-option>
    <nb-select-option value="north-america" label="North America">
      <docs-select-globe-icon />
      North America
    </nb-select-option>
    <nb-select-option value="europe" label="Europe">
      <docs-select-globe-icon />
      Europe
    </nb-select-option>
    <nb-select-option value="asia-pacific" label="Asia Pacific">
      <docs-select-globe-icon />
      Asia Pacific
    </nb-select-option>
    <nb-select-option value="south-america" label="South America">
      <docs-select-globe-icon />
      South America
    </nb-select-option>
    <nb-select-option value="africa" label="Africa">
      <docs-select-globe-icon />
      Africa
    </nb-select-option>
  </nb-select>
</div>`;
}
