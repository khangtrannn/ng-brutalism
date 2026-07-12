import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-field-api',
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
                nb-field
              </td>
              <td class="px-4 py-3">
                Context host. Generates
                <code class="font-mono">controlId</code> and computed
                <code class="font-mono">describedBy</code>/
                <code class="font-mono">invalid</code>/<code class="font-mono"
                  >required</code
                >
                from the projected <code class="font-mono">NgControl</code>.
                Reflects <code class="font-mono">[data-invalid]</code> on
                itself.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nbFieldDescription
              </td>
              <td class="px-4 py-3">
                Directive for the hint/description element. Generates an id and
                is always included in
                <code class="font-mono">aria-describedby</code>.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border) last:border-b-0">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                nbFieldError
              </td>
              <td class="px-4 py-3">
                Directive for the error message element. Hidden via
                <code class="font-mono">[hidden]</code> until the control is
                invalid; its id joins
                <code class="font-mono">aria-describedby</code>
                at the same moment.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldApi {}
