import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-input-group-api',
  template: `
    <section id="api">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>

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
                Selector
              </th>
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
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                Default
              </th>
            </tr>
          </thead>
          <tbody class="font-medium">
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-input-group
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">-</td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                -
              </td>
              <td class="px-4 py-3 font-mono text-sm">-</td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                [nbInputPrefix]
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">align</td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'center' | 'stretch'
              </td>
              <td class="px-4 py-3 font-mono text-sm">'center'</td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                [nbInputSuffix]
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">align</td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'center' | 'stretch'
              </td>
              <td class="px-4 py-3 font-mono text-sm">'center'</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupApi {}
