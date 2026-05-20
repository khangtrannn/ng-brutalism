import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbInputGroup,
  NbInputPrefix,
  NbLabel,
  NbNativeSelect,
  NbSelectComponent,
  NbSelectOption,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsIcon } from '../../docs/icons';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
    selector: 'docs-select-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsIcon,
        DocsSourceTile,
        DocsTokens,
        NbInputGroup,
        NbInputPrefix,
        NbLabel,
        NbNativeSelect,
        NbSelectComponent,
        NbSelectOption,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Select</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Offers a brutal custom dropdown with projected option content,
            active states, selected checks, and a native select directive for
            simple forms.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
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
                <docs-icon name="globe" />
                Worldwide
              </nb-select-option>
              <nb-select-option value="full-time" label="Full-time">
                <docs-icon name="briefcase" />
                Full-time
              </nb-select-option>
              <nb-select-option value="part-time" label="Part-time">
                <docs-icon name="clock" />
                Part-time
              </nb-select-option>
              <nb-select-option value="remote" label="Remote">
                <docs-icon name="building" />
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
                <docs-icon name="tag" class="size-5" />
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
            <nb-select placeholder="Select location" defaultValue="worldwide">
              <nb-select-option label="Select location">
                <docs-icon name="location" />
                Select location
              </nb-select-option>
              <nb-select-option value="worldwide" label="Worldwide">
                <docs-icon name="globe" />
                Worldwide
              </nb-select-option>
              <nb-select-option value="north-america" label="North America">
                <docs-icon name="globe" />
                North America
              </nb-select-option>
              <nb-select-option value="europe" label="Europe">
                <docs-icon name="globe" />
                Europe
              </nb-select-option>
              <nb-select-option value="asia-pacific" label="Asia Pacific">
                <docs-icon name="globe" />
                Asia Pacific
              </nb-select-option>
              <nb-select-option value="south-america" label="South America">
                <docs-icon name="globe" />
                South America
              </nb-select-option>
              <nb-select-option value="africa" label="Africa">
                <docs-icon name="globe" />
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

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <h3 class="mt-6 mb-3 text-xl font-bold">
          <code class="font-mono text-base">&lt;nb-select&gt;</code>
          (<code class="font-mono text-base">NbSelectComponent</code>)
        </h3>
        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
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
                  defaultValue
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  NbSelectValue | null
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  null
                </td>
                <td class="px-4 py-3">Initial selected value for uncontrolled usage.</td>
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
                  defaultOpen
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  boolean
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  false
                </td>
                <td class="px-4 py-3">Initial open state for uncontrolled usage.</td>
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
export default class SelectPageComponent {
  protected readonly defaultExampleCode = `<div class="w-80">
  <nb-select placeholder="Select an option">
    <nb-select-option value="worldwide" label="Worldwide">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18" />
        <path d="M12 3a14 14 0 0 0 0 18" />
      </svg>
      Worldwide
    </nb-select-option>
    <nb-select-option value="full-time" label="Full-time">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8h16v11H4z" />
        <path d="M9 8V5h6v3" />
        <path d="M4 13h16" />
      </svg>
      Full-time
    </nb-select-option>
    <nb-select-option value="part-time" label="Part-time">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6l4 2" />
      </svg>
      Part-time
    </nb-select-option>
    <nb-select-option value="remote" label="Remote">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 21V4h14v17" />
        <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
      </svg>
      Remote
    </nb-select-option>
  </nb-select>
</div>`;

  protected readonly importCode = `import { NbNativeSelect, NbSelectComponent, NbSelectOption } from '@ng-brutalism/ui';`;

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
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <path d="M7 7h.01" />
      </svg>
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
  <nb-select placeholder="Select location" defaultValue="worldwide">
    <nb-select-option label="Select location">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.4" />
      </svg>
      Select location
    </nb-select-option>
    <nb-select-option value="worldwide" label="Worldwide">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18" />
        <path d="M12 3a14 14 0 0 0 0 18" />
      </svg>
      Worldwide
    </nb-select-option>
    <nb-select-option value="north-america" label="North America">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
      </svg>
      North America
    </nb-select-option>
    <nb-select-option value="europe" label="Europe">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
      </svg>
      Europe
    </nb-select-option>
    <nb-select-option value="asia-pacific" label="Asia Pacific">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
      </svg>
      Asia Pacific
    </nb-select-option>
    <nb-select-option value="south-america" label="South America">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
      </svg>
      South America
    </nb-select-option>
    <nb-select-option value="africa" label="Africa">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
      </svg>
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
