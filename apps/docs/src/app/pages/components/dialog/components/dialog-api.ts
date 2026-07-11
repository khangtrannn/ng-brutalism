import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-dialog-api',
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
                Part
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
                nb-dialog
              </td>
              <td class="px-4 py-3">
                Root component. Renders the native
                <code class="font-mono">&lt;dialog&gt;</code> modal. Exposes
                <code class="font-mono">open()</code> and
                <code class="font-mono">close()</code> for
                <code class="font-mono">viewChild</code> access. The
                <code class="font-mono">dismissible</code> input (default
                <code class="font-mono">true</code>) controls whether clicking
                the backdrop closes the dialog.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                [nbDialogTitle]
              </td>
              <td class="px-4 py-3">
                Directive applied to a heading element. Styles the dialog
                title.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                [nbDialogDescription]
              </td>
              <td class="px-4 py-3">
                Directive for muted supporting text below the title.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-dialog-content
              </td>
              <td class="px-4 py-3">
                Scrollable body section with top and bottom borders.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nb-dialog-actions
              </td>
              <td class="px-4 py-3">
                Footer section with right-aligned action buttons.
              </td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                [nbDialogClose]
              </td>
              <td class="px-4 py-3">
                Directive that closes the dialog on click.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogApi {}
