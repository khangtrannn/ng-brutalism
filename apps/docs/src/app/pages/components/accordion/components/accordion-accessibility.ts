import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-accordion-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="mb-4 font-medium">
        <strong>APG pattern:</strong>
        <a
          href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
          target="_blank"
          rel="noreferrer"
          class="underline"
          >Accordion</a
        >
        · <strong>Status:</strong> Stable.
      </p>

      <div
        tabindex="0"
        class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-nb mb-4"
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
              <td class="px-4 py-3">Toggle the focused trigger's panel</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                ↑ / ↓
              </td>
              <td class="px-4 py-3">
                Move focus between headers, skipping disabled items
              </td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                Home / End
              </td>
              <td class="px-4 py-3">Jump focus to the first / last header</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="font-medium">
        Triggers use real <code class="font-mono">disabled</code> buttons, not
        <code class="font-mono">aria-disabled</code> - a genuinely disabled
        button can't receive focus, so header navigation skips disabled items
        entirely rather than landing on an inert stop. Closed content is bound
        with <code class="font-mono">[inert]</code> so it can't be tabbed into
        or found by find-in-page while collapsed. Verified with
        <code class="font-mono">vitest-axe</code>; keyboard walkthrough in
        <code class="font-mono">nb-accordion-keyboard.spec.ts</code>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionAccessibility {}
