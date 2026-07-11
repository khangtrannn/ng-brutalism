import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-button-api',
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
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
              >
                tone
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                NbTone
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'primary'
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
              >
                shadow
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'sm' | 'md' | 'hard' | 'heavy'
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'md'
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
              >
                press
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'push' | 'reverse' | 'none'
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'push'
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
              >
                size
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'sm' | 'md' | 'lg' | 'xl'
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'md'
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
              >
                border
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'thin' | 'md' | 'strong' | 'thick'
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'md'
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
              >
                radius
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'md'
              </td>
            </tr>
            <tr>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                fullWidth
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

      <h3 class="mt-8 mb-4 text-xl font-black">Trailing icon API</h3>
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
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
              >
                size
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'sm' | 'md' | 'lg'
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                undefined
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
              >
                shape
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'square' | 'circle'
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                undefined
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
              >
                tone
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'default' | 'inverse' | 'current'
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                undefined
              </td>
            </tr>
            <tr>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
              >
                push
              </td>
              <td
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'end'
              </td>
              <td
                class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none'
              </td>
            </tr>
            <tr>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">icon</td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                string
              </td>
              <td class="px-4 py-3 font-mono text-sm">undefined</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonApi {}
