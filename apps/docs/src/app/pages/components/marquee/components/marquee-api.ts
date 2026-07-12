import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-marquee-api',
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
                duration
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                string
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                '5s'
              </td>
            </tr>
            <tr>
              <td class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3">
                reverse
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
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                pauseOnHover
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                boolean
              </td>
              <td class="px-4 py-3 font-mono text-sm">true</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeApi {}
