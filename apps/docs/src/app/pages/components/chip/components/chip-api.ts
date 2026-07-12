import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-chip-api',
  template: `
    <section id="api">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
      <p class="mb-4 font-bold">NbChip</p>
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
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                tone
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'surface' | 'background' | 'ink' | 'yellow' | 'pink' | 'mint' |
                'lavender' | 'accent' | 'success' | 'warning' | 'danger'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'surface'
              </td>
              <td class="px-4 py-3">Background color tone.</td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                size
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'sm' | 'md' | 'lg' | 'xl'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'md'
              </td>
              <td class="px-4 py-3">Inner padding scale.</td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                radius
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'sm' | 'md' | 'lg' | 'full'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none'
              </td>
              <td class="px-4 py-3">Corner radius scale.</td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                shadow
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'sm' | 'md' | 'hard'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'sm'
              </td>
              <td class="px-4 py-3">Drop shadow scale.</td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                icon
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                string
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                -
              </td>
              <td class="px-4 py-3">
                URL of a leading SVG icon, tinted to the chip's foreground via
                nbIcon mask mode.
              </td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                iconSize
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'xs' | 'sm' | 'md' | 'lg' | 'xl'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'sm'
              </td>
              <td class="px-4 py-3">
                Size of the <code class="font-mono">icon</code> input's icon.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="mt-6 mb-4 font-bold">NbChipGroup</p>
      <p class="font-medium">
        Wrapper directive with
        <code class="font-mono">flex flex-wrap gap-2</code>. No inputs - use
        Tailwind or inline styles to override spacing.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipApi {}
