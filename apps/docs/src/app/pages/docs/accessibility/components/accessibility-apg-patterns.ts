import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-accessibility-apg-patterns',
  imports: [RouterLink],
  template: `
    <section id="apg-patterns">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        APG patterns by component
      </h2>
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
                Component
              </th>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
                APG pattern
              </th>
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                Keyboard coverage
              </th>
            </tr>
          </thead>
          <tbody class="font-medium">
            <tr class="border-b-2 border-(--nb-border)">
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                <a routerLink="/components/select" class="underline"
                  >Select</a
                >
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                Listbox
              </td>
              <td class="px-4 py-3">
                Home/End, typeahead, Tab-closes, Escape-on-trigger,
                disabled-but-reachable
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                <a routerLink="/components/accordion" class="underline"
                  >Accordion</a
                >
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                Accordion
              </td>
              <td class="px-4 py-3">
                Up/Down/Home/End between headers, skips disabled items
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                <a routerLink="/components/dialog" class="underline"
                  >Dialog</a
                >
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                Dialog (modal)
              </td>
              <td class="px-4 py-3">
                Focus trap via native
                <code class="font-mono">&lt;dialog&gt;</code>, Escape/backdrop
                close
              </td>
            </tr>
            <tr class="last:border-b-0">
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                <a routerLink="/components/icon" class="underline">Icon</a>
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                Image / decorative graphic
              </td>
              <td class="px-4 py-3">
                No explicit default -
                <code class="font-mono">decorative</code> or
                <code class="font-mono">label</code> is required
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-4 text-sm opacity-70">
        Every other component page states its pattern (or "static content" for
        non-interactive primitives) and status in its own Accessibility
        section.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessibilityApgPatterns {}
