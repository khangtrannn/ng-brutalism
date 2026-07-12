import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-select-api',
  template: `
    <section id="api">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>

      <h3 class="mt-6 mb-3 text-xl font-bold">
        <code class="font-mono text-base">&lt;nb-select&gt;</code>
        (<code class="font-mono text-base">NbSelect</code>)
      </h3>
      <div
        tabindex="0"
        class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
      >
        <table class="w-full min-w-160 border-collapse text-left">
          <thead class="bg-nb-secondary text-nb-secondary-fg">
            <tr>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
                Input
              </th>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
                Type
              </th>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
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
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                string
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'Select an option'
              </td>
              <td class="px-4 py-3">Text shown when no option is selected.</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td class="border-r-2 border-(--nb-border) px-4 py-3">value</td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                ModelSignal&lt;NbSelectValue | null&gt;
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                null
              </td>
              <td class="px-4 py-3">Selected value for two-way binding.</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                disabled
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                boolean
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                false
              </td>
              <td class="px-4 py-3">Disables the trigger and all options.</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                aria-label
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                string | null
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                null
              </td>
              <td class="px-4 py-3">Accessible label for the trigger.</td>
            </tr>
            <tr>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                aria-labelledby
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                string | null
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
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
        Directive applied to a native
        <code class="font-mono text-sm">&lt;select&gt;</code> element to give it
        the brutal look without the custom listbox behaviour. Detects when
        nested inside an
        <code class="font-mono text-sm">&lt;nb-input-group&gt;</code>
        and adjusts its border and shadow accordingly. Has no inputs.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectApi {}
