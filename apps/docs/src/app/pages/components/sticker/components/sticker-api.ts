import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-sticker-api',
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
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                shape
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'burst' | 'burst-wide' | 'star' | 'splat'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'burst'
              </td>
              <td class="px-4 py-3">Outer SVG shape.</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                tone
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'surface' | 'background' | 'ink' | 'cream' | 'white' | 'black' |
                'yellow' | 'pink' | 'mint' | 'lavender' | 'blue' | 'primary' |
                'secondary' | 'accent' | 'success' | 'warning' | 'danger'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'mint'
              </td>
              <td class="px-4 py-3">Background fill token.</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                decorative
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
              <td class="px-4 py-3">
                Marks purely visual stickers as hidden from assistive tech.
              </td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                rotate
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                number | undefined
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                shape default
              </td>
              <td class="px-4 py-3">Optional CSS rotation in degrees.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerApi {}
