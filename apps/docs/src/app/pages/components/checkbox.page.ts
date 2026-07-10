import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbCheckbox, NbLabel } from '@ng-brutalism/ui';

import { DocsCodeBlock, DocsExample, DocsSourceTile, DocsStatusBadge, DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
    selector: 'docs-checkbox-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsSourceTile,
        DocsStatusBadge,
        DocsTokens,
        NbCheckbox,
        NbLabel,
        RouterLink,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Checkbox</p>
          <h1>Checkbox</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist Angular Checkbox component. A control that
            allows the user to toggle between checked and not checked in the
            brutalist style with strong focus states.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <docs-status-badge status="stable" />
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Sizes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">FORM</span>
            <span class="nb-stat-tile__label">Native</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">A11y</span>
            <span class="nb-stat-tile__label">Label sync</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/checkbox"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <input type="checkbox" nbCheckbox />
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="sizes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
        <docs-example [code]="sizesExampleCode">
          <div class="flex items-center gap-4">
            <input type="checkbox" nbCheckbox size="sm" />
            <input type="checkbox" nbCheckbox />
            <input type="checkbox" nbCheckbox size="lg" />
          </div>
        </docs-example>
      </section>

      <section id="disabled">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Disabled</h2>
        <docs-example [code]="disabledExampleCode">
          <div class="flex items-center gap-4">
            <input type="checkbox" nbCheckbox disabled />
            <input type="checkbox" nbCheckbox disabled checked />
          </div>
        </docs-example>
      </section>

      <section id="with-label">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">With Label</h2>
        <docs-example [code]="withLabelExampleCode">
          <div class="flex items-center gap-2">
            <input type="checkbox" nbCheckbox id="terms" />
            <label nbLabel for="terms">Accept terms and conditions</label>
          </div>
        </docs-example>
      </section>

      <docs-tokens component="checkbox" />

      <section id="accessibility">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Accessibility</h2>
        <p class="font-medium">
          <strong>APG pattern:</strong>
          <a
            href="https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"
            target="_blank"
            rel="noreferrer"
            class="underline"
            >Checkbox</a
          >
          · <strong>Status:</strong> Stable. Renders a real
          <code class="font-mono">&lt;input type="checkbox"&gt;</code>, so
          checked state, keyboard toggling with Space, and
          <code class="font-mono">formControlName</code>/
          <code class="font-mono">[(ngModel)]</code> binding all come from
          the browser and Angular's built-in
          <code class="font-mono">DefaultValueAccessor</code> - no custom
          ARIA state to keep in sync. Pair it with
          <code class="font-mono">nbLabel</code> (or wrap both in
          <a routerLink="/components/field" class="underline">nb-field</a>) so the
          checkbox has an accessible name.
        </p>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
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
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Default
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  size
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'md' | 'sm' | 'lg'
                </td>
                <td class="px-4 py-3 font-mono text-sm">'md'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CheckboxPage {
  protected readonly defaultExampleCode = `<input type="checkbox" nbCheckbox />`;

  protected readonly importCode = `import { NbCheckbox } from '@ng-brutalism/ui';`;

  protected readonly sizesExampleCode = `<div class="flex items-center gap-4">
  <input type="checkbox" nbCheckbox size="sm" />
  <input type="checkbox" nbCheckbox />
  <input type="checkbox" nbCheckbox size="lg" />
</div>`;

  protected readonly disabledExampleCode = `<div class="flex items-center gap-4">
  <input type="checkbox" nbCheckbox disabled />
  <input type="checkbox" nbCheckbox disabled checked />
</div>`;

  protected readonly withLabelExampleCode = `<div class="flex items-center gap-2">
  <input type="checkbox" nbCheckbox id="terms" />
  <label nbLabel for="terms">Accept terms and conditions</label>
</div>`;
}
