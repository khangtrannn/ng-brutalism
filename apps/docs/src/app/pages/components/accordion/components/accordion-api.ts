import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-accordion-api',
  template: `
    <section id="api">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
      <h3 class="mt-6 mb-3 text-xl font-bold">Accordion</h3>
      <div
        tabindex="0"
        class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-nb"
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
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                Default
              </th>
            </tr>
          </thead>
          <tbody class="font-medium">
            <tr>
              <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3">
                type
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'single' | 'multiple'
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'single'
              </td>
            </tr>
            <tr>
              <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3">
                collapsible
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                boolean
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                false
              </td>
            </tr>
            <tr>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">value</td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                string | string[] | null
              </td>
              <td class="px-4 py-3 font-mono text-sm">null</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mt-8 mb-3 text-xl font-bold">Accordion Item</h3>
      <div
        tabindex="0"
        class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-nb"
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
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                Default
              </th>
            </tr>
          </thead>
          <tbody class="font-medium">
            <tr>
              <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3">
                value
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                string
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                generated
              </td>
            </tr>
            <tr>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                disabled
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                boolean
              </td>
              <td class="px-4 py-3 font-mono text-sm">false</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mt-8 mb-3 text-xl font-bold">Selectors</h3>
      <div
        tabindex="0"
        class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-nb"
      >
        <table class="w-full min-w-160 border-collapse text-left">
          <thead class="bg-nb-secondary text-nb-secondary-fg">
            <tr>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
                Selector
              </th>
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                Description
              </th>
            </tr>
          </thead>
          <tbody class="font-medium">
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-accordion-trigger
              </td>
              <td class="px-4 py-3">
                Toggles its parent item open or closed. Supports optional
                <code class="font-mono">tone</code>.
              </td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-accordion-content
              </td>
              <td class="px-4 py-3">
                Collapsible body region for an item. Has no inputs.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionApi {}
