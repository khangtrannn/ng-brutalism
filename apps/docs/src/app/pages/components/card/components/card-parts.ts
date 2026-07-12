import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-card-parts',
  template: `
    <section id="parts">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sub-parts</h2>
      <p class="mb-4 text-sm font-medium">
        The card component is composed of 7 sub-parts that can be used
        independently.
      </p>

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
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                Description
              </th>
            </tr>
          </thead>
          <tbody class="font-medium">
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-card
              </td>
              <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                Root container with border, shadow, and background
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-card-header
              </td>
              <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                Top section for title and description content
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-card-title
              </td>
              <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                Heading text inside the header
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-card-description
              </td>
              <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                Subtitle or description text inside the header
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-card-actions
              </td>
              <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                Action row for one or more card-level commands
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-card-content
              </td>
              <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                Main body area
              </td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-card-footer
              </td>
              <td class="px-4 py-3 text-sm">
                Bottom section for metadata, summaries, and supporting layout
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardParts {}
