import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  componentTokens,
  sharedTokens,
  type DocsToken,
  type DocsTokenComponent,
} from './docs-tokens.generated';

@Component({
  selector: 'docs-tokens',
  template: `
    <section id="customization">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Customization</h2>
      <p class="mb-5 text-base font-medium">
        Override these CSS variables on <code>:root</code>, a wrapper, or the
        component element. More local values win, so per-instance styling can
        sit directly on the element.
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
                Token
              </th>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
                Default
              </th>
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                Used for
              </th>
            </tr>
          </thead>
          <tbody class="font-medium">
            @for (token of tokens(); track token.name) {
            <tr class="border-b-2 border-(--nb-border) last:border-b-0">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                {{ token.name }}
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                {{ token.defaultValue }}
              </td>
              <td class="px-4 py-3">
                {{ token.usage }}
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsTokens {
  readonly component = input.required<DocsTokenComponent>();

  protected tokens(): DocsToken[] {
    if (this.component() === 'theme') {
      return [...sharedTokens, ...componentTokens.theme];
    }

    return [...componentTokens[this.component()], ...sharedTokens];
  }
}
