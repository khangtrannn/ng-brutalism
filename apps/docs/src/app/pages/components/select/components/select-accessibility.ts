import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-select-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="mb-4 font-medium">
        <strong>APG pattern:</strong>
        <a
          href="https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
          target="_blank"
          rel="noreferrer"
          class="underline"
          >Listbox</a
        >
        · <strong>Status:</strong> Preview - the popup positions itself via the
        native Popover API rather than a CDK-style overlay, confirmed in a real
        browser to escape an
        <code class="font-mono">overflow:hidden</code>
        ancestor with zero console errors, but the strategy hasn't logged enough
        real-world usage yet to call it Stable.
      </p>

      <div
        tabindex="0"
        class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)] mb-4"
      >
        <table class="w-full min-w-140 border-collapse text-left">
          <thead class="bg-nb-secondary text-nb-secondary-fg">
            <tr>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
                Key
              </th>
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="font-medium">
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                Enter / Space
              </td>
              <td class="px-4 py-3">
                Open the listbox, or select the active option if already open
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                ↑ / ↓
              </td>
              <td class="px-4 py-3">Move the active option</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                Home / End
              </td>
              <td class="px-4 py-3">Jump to the first / last option</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                A–Z
              </td>
              <td class="px-4 py-3">
                Typeahead - jump to the next option starting with that letter
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                Tab
              </td>
              <td class="px-4 py-3">
                Closes the listbox and moves focus on, instead of trapping it
              </td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                Escape
              </td>
              <td class="px-4 py-3">
                Closes the listbox; focus returns to the trigger
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="font-medium">
        Disabled options use
        <code class="font-mono">aria-disabled</code> rather than removing them
        from the tab sequence - they stay reachable by arrow/Home/End/typeahead
        per APG, just not selectable. Bound to an Angular
        <code class="font-mono">NgControl</code>,
        <code class="font-mono">aria-invalid</code> and
        <code class="font-mono">aria-required</code> reflect the control's
        validation state automatically. Verified with
        <code class="font-mono">vitest-axe</code> in both closed and
        open/invalid states - see
        <code class="font-mono">select.spec.ts</code> and
        <code class="font-mono">select-keyboard.spec.ts</code>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAccessibility {}
