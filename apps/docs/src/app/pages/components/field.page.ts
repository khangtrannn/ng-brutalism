import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NbCallout,
  NbField,
  NbFieldDescription,
  NbFieldError,
  NbInput,
  NbLabel,
  NbStack,
} from '@ng-brutalism/ui';

import { DocsCodeBlock, DocsExample, DocsSourceTile, DocsStatusBadge, DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-field-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    DocsStatusBadge,
    DocsTokens,
    NbCallout,
    NbField,
    NbFieldDescription,
    NbFieldError,
    NbInput,
    NbLabel,
    NbStack,
    ReactiveFormsModule,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Field</p>
          <h1>Field</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            An accessibility-wiring primitive, not a visual one. Wrap a
            label, a control (<code class="font-mono">nbInput</code>,
            <code class="font-mono">nb-select</code>,
            <code class="font-mono">nbTextarea</code>...), an optional
            description, and an optional error message in
            <code class="font-mono">nb-field</code> and it generates ids and
            links them all together - label
            <code class="font-mono">for</code>/<code class="font-mono">id</code>,
            <code class="font-mono">aria-describedby</code>,
            <code class="font-mono">aria-invalid</code>, and
            <code class="font-mono">aria-required</code> - automatically,
            reading state straight off the bound <code class="font-mono">NgControl</code>.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <docs-status-badge status="stable" />
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">FORM</span>
            <span class="nb-stat-tile__label">Reactive Forms</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">A11Y</span>
            <span class="nb-stat-tile__label">Id wiring</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/field"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <nb-field class="flex max-w-sm flex-col gap-2">
            <label nbLabel>Email</label>
            <input nbInput type="email" [formControl]="emailControl" />
            <p nbFieldDescription class="text-sm opacity-70">
              We'll never share your email.
            </p>
            <p nbFieldError class="text-sm font-bold text-(--nb-danger)">
              Email is required.
            </p>
          </nb-field>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Bind a <code class="font-mono">FormControl</code> (or
          <code class="font-mono">formControlName</code>) to any control
          inside <code class="font-mono">nb-field</code> - the field reads
          the control's touched/dirty/invalid/required status straight off
          it, no separate error-state input to keep in sync.
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="invalid-state">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Invalid state</h2>
        <p class="mb-4 font-medium">
          <code class="font-mono">nb-field-error</code> stays hidden until
          the control is both touched and invalid - so validation errors
          never appear before the user has had a chance to interact with the
          field.
        </p>
        <docs-example [code]="invalidExampleCode">
          <nb-field class="flex max-w-sm flex-col gap-2">
            <label nbLabel>Username</label>
            <input nbInput [formControl]="invalidControl" />
            <p nbFieldError class="text-sm font-bold text-(--nb-danger)">
              Username is required.
            </p>
          </nb-field>
        </docs-example>
      </section>

      <docs-tokens component="field" />

      <section id="accessibility">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Accessibility</h2>
        <p class="mb-4 font-medium">
          <code class="font-mono">nb-field</code> is not itself an
          interactive widget, so it has no APG pattern of its own - it
          implements the underlying
          <a
            href="https://www.w3.org/WAI/tutorials/forms/notifications/"
            target="_blank"
            rel="noreferrer"
            class="underline"
            >accessible name/description association</a
          >
          every form-control APG pattern depends on.
        </p>
        <div nbStack gap="md" class="mb-6">
          <div nbCallout tone="mint" size="sm">
            <strong>Label linking</strong> - <code class="font-mono">nbLabel</code>
            reads <code class="font-mono">nb-field</code>'s generated
            <code class="font-mono">controlId</code> and sets
            <code class="font-mono">for</code> automatically; the control gets a
            matching <code class="font-mono">id</code> unless you supply one.
          </div>
          <div nbCallout tone="yellow" size="sm">
            <strong>Description + error linking</strong> - the description's id is
            in <code class="font-mono">aria-describedby</code> immediately;
            the error's id is appended only once the control is both touched
            and invalid, and <code class="font-mono">aria-invalid</code>
            flips at the same moment.
          </div>
          <div nbCallout tone="pink" size="sm">
            <strong>Required</strong> - <code class="font-mono">aria-required</code>
            is derived from a <code class="font-mono">Validators.required</code>
            (or equivalent) validator on the bound control, so it can't drift
            from the real validation rules.
          </div>
        </div>
        <p class="text-sm opacity-70">
          Verified with <code class="font-mono">vitest-axe</code> in both the
          valid and touched+invalid states -
          see <code class="font-mono">nb-field.spec.ts</code>.
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
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                  Part
                </th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  nb-field
                </td>
                <td class="px-4 py-3">
                  Context host. Generates <code class="font-mono">controlId</code>
                  and computed <code class="font-mono">describedBy</code>/
                  <code class="font-mono">invalid</code>/<code class="font-mono">required</code>
                  from the projected <code class="font-mono">NgControl</code>. Reflects
                  <code class="font-mono">[data-invalid]</code> on itself.
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  nbFieldDescription
                </td>
                <td class="px-4 py-3">
                  Directive for the hint/description element. Generates an id
                  and is always included in <code class="font-mono">aria-describedby</code>.
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border) last:border-b-0">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  nbFieldError
                </td>
                <td class="px-4 py-3">
                  Directive for the error message element. Hidden via
                  <code class="font-mono">[hidden]</code> until the control is
                  invalid; its id joins <code class="font-mono">aria-describedby</code>
                  at the same moment.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FieldPage {
  protected readonly emailControl = new FormControl('', {
    nonNullable: true,
    validators: Validators.required,
  });

  protected readonly invalidControl = new FormControl('', {
    nonNullable: true,
    validators: Validators.required,
  });

  protected readonly importCode = `import { NbField, NbFieldDescription, NbFieldError } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-field class="flex flex-col gap-2">
  <label nbLabel>Email</label>
  <input nbInput type="email" [formControl]="emailControl" />
  <p nbFieldDescription>We'll never share your email.</p>
  <p nbFieldError>Email is required.</p>
</nb-field>`;

  protected readonly invalidExampleCode = `<nb-field class="flex flex-col gap-2">
  <label nbLabel>Username</label>
  <input nbInput [formControl]="invalidControl" />
  <p nbFieldError>Username is required.</p>
</nb-field>`;
}
