import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbInputGroup,
  NbInputPrefix,
  NbLabel,
  NbNativeSelect,
  NbSelect,
  NbSelectOption,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsStatusBadge } from '../../docs/docs-status-badge';
import { DocsTokens } from '../../docs/docs-tokens';
import {
  DocsSelectBriefcaseIcon,
  DocsSelectBuildingIcon,
  DocsSelectClockIcon,
  DocsSelectGlobeIcon,
  DocsSelectLocationIcon,
  DocsSelectTagIcon,
} from './select.icons';

@Component({
    selector: 'docs-select-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsSourceTile,
        DocsStatusBadge,
        DocsTokens,
        DocsSelectBriefcaseIcon,
        DocsSelectBuildingIcon,
        DocsSelectClockIcon,
        DocsSelectGlobeIcon,
        DocsSelectLocationIcon,
        DocsSelectTagIcon,
        NbInputGroup,
        NbInputPrefix,
        NbLabel,
        NbNativeSelect,
        NbSelect,
        NbSelectOption,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Select</p>
          <h1>Select</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist Angular Select component. A brutalist custom
            dropdown with projected option content, active states, selected
            checks, and a native select directive for simple forms.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <docs-status-badge status="preview" />
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">1</span>
            <span class="nb-stat-tile__label">Size</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">FORM</span>
            <span class="nb-stat-tile__label">Native</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">A11Y</span>
            <span class="nb-stat-tile__label">Built-in</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/select"
          />
        </div>
      </header>

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

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="with-label">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">With Label</h2>
        <docs-example [code]="withLabelExampleCode">
          <div class="grid w-80 gap-2">
            <label nbLabel id="plan-label">Plan</label>
            <nb-select placeholder="Select a plan" aria-labelledby="plan-label">
              <nb-select-option value="starter" label="Starter">Starter</nb-select-option>
              <nb-select-option value="team" label="Team">Team</nb-select-option>
              <nb-select-option value="enterprise" label="Enterprise">
                Enterprise
              </nb-select-option>
            </nb-select>
          </div>
        </docs-example>
      </section>

      <section id="with-prefix">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">With Prefix</h2>
        <docs-example [code]="withPrefixExampleCode">
          <div class="w-90">
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
          </div>
        </docs-example>
      </section>

      <section id="with-icon">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Option Content</h2>
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

      <section id="disabled">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Disabled</h2>
        <docs-example [code]="disabledExampleCode">
          <div class="w-80">
            <nb-select placeholder="Select an option" disabled>
              <nb-select-option value="one" label="One">One</nb-select-option>
            </nb-select>
          </div>
        </docs-example>
      </section>

      <section id="native-select">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Native Select</h2>
        <docs-example [code]="nativeExampleCode">
          <select
            nbSelect
            class="w-80"
            aria-label="Favorite accent"
          >
            <option value="" disabled selected>Favorite accent</option>
            <option value="mint">Mint</option>
            <option value="yellow">Yellow</option>
            <option value="pink">Pink</option>
          </select>
        </docs-example>
      </section>

      <docs-tokens component="select" />

      <section id="accessibility">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Accessibility</h2>
        <p class="mb-4 font-medium">
          <strong>APG pattern:</strong>
          <a
            href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
            target="_blank"
            rel="noreferrer"
            class="underline"
            >Listbox</a
          >
          · <strong>Status:</strong> Preview — the popup positions itself via
          the native Popover API rather than a CDK-style overlay, confirmed
          in a real browser to escape an <code class="font-mono">overflow:hidden</code>
          ancestor with zero console errors, but the strategy hasn't logged
          enough real-world usage yet to call it Stable.
        </p>

        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)] mb-4"
        >
          <table class="w-full min-w-140 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Key</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Action</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">Enter / Space</td>
                <td class="px-4 py-3">Open the listbox, or select the active option if already open</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">↑ / ↓</td>
                <td class="px-4 py-3">Move the active option</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">Home / End</td>
                <td class="px-4 py-3">Jump to the first / last option</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">A–Z</td>
                <td class="px-4 py-3">Typeahead — jump to the next option starting with that letter</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">Tab</td>
                <td class="px-4 py-3">Closes the listbox and moves focus on, instead of trapping it</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">Escape</td>
                <td class="px-4 py-3">Closes the listbox; focus returns to the trigger</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="font-medium">
          Disabled options use <code class="font-mono">aria-disabled</code>
          rather than removing them from the tab sequence — they stay
          reachable by arrow/Home/End/typeahead per APG, just not
          selectable. Bound to an Angular <code class="font-mono">NgControl</code>,
          <code class="font-mono">aria-invalid</code> and
          <code class="font-mono">aria-required</code> reflect the control's
          validation state automatically. Verified with
          <code class="font-mono">vitest-axe</code> in both closed and
          open/invalid states — see <code class="font-mono">select.spec.ts</code>
          and <code class="font-mono">select-keyboard.spec.ts</code>.
        </p>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <h3 class="mt-6 mb-3 text-xl font-bold">
          <code class="font-mono text-base">&lt;nb-select&gt;</code>
          (<code class="font-mono text-base">NbSelect</code>)
        </h3>
        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-160 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                  Input
                </th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                  Type
                </th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                  Default
                </th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  placeholder
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  string
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'Select an option'
                </td>
                <td class="px-4 py-3">Text shown when no option is selected.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  value
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  ModelSignal&lt;NbSelectValue | null&gt;
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  null
                </td>
                <td class="px-4 py-3">Selected value for two-way binding.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  disabled
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  boolean
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  false
                </td>
                <td class="px-4 py-3">Disables the trigger and all options.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  aria-label
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  string | null
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  null
                </td>
                <td class="px-4 py-3">Accessible label for the trigger.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  aria-labelledby
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  string | null
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  null
                </td>
                <td class="px-4 py-3">ID reference for an external label.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mt-8 mb-3 text-xl font-bold">
          <code class="font-mono text-base">select[nbSelect]</code>
          (<code class="font-mono text-base">NbNativeSelect</code>)
        </h3>
        <p class="text-sm font-medium">
          Directive applied to a native <code class="font-mono text-sm">&lt;select&gt;</code>
          element to give it the brutal look without the custom listbox behaviour.
          Detects when nested inside an <code class="font-mono text-sm">&lt;nb-input-group&gt;</code>
          and adjusts its border and shadow accordingly. Has no inputs.
        </p>
      </section>
    </article>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SelectPage {
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

  protected readonly importCode = `import { NbNativeSelect, NbSelect, NbSelectOption } from '@ng-brutalism/ui';`;

  protected readonly withLabelExampleCode = `<div class="grid w-80 gap-2">
  <label nbLabel id="plan-label">Plan</label>
  <nb-select placeholder="Select a plan" aria-labelledby="plan-label">
    <nb-select-option value="starter" label="Starter">Starter</nb-select-option>
    <nb-select-option value="team" label="Team">Team</nb-select-option>
    <nb-select-option value="enterprise" label="Enterprise">Enterprise</nb-select-option>
  </nb-select>
</div>`;

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

  protected readonly disabledExampleCode = `<div class="w-80">
  <nb-select placeholder="Select an option" disabled>
    <nb-select-option value="one" label="One">One</nb-select-option>
  </nb-select>
</div>`;

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
