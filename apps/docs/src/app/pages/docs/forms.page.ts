import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbCallout } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';

@Component({
  selector: 'docs-forms-page',
  imports: [DocsCodeBlock, NbCallout, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Concepts</p>
          <h1>Forms Integration</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Every ng-brutalism control works with
            <code class="font-mono">formControlName</code> and
            <code class="font-mono">[(ngModel)]</code>. Native-element
            controls get this for free from Angular; the one non-native
            control, <code class="font-mono">nb-select</code>, implements
            <code class="font-mono">ControlValueAccessor</code> explicitly to
            match.
          </p>
        </div>
      </header>

      <section id="native-controls">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Native-element controls
        </h2>
        <p class="mb-4 font-medium">
          <code class="font-mono">nbInput</code>, <code class="font-mono">nbTextarea</code>,
          and <code class="font-mono">nbCheckbox</code> are directives on real
          <code class="font-mono">&lt;input&gt;</code>/<code class="font-mono">&lt;textarea&gt;</code>
          elements, so Angular's own <code class="font-mono">DefaultValueAccessor</code>
          already handles the value/touched/dirty round-trip — no
          ng-brutalism-specific wiring needed there.
        </p>
        <docs-code-block title="Template" [code]="nativeExampleCode" />
      </section>

      <section id="select-cva">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          NbSelect
        </h2>
        <p class="mb-4 font-medium">
          <code class="font-mono">nb-select</code> is a custom popup listbox,
          not a native form element, so it implements
          <code class="font-mono">ControlValueAccessor</code> directly:
        </p>
        <ul class="mb-4 list-disc space-y-1 pl-6 font-medium">
          <li>
            <code class="font-mono">writeValue</code> reflects the control's
            value into the selected option.
          </li>
          <li>
            <code class="font-mono">onChange</code>/<code class="font-mono">onTouched</code>
            fire on close — including the outside-click close path, not just
            an explicit selection.
          </li>
          <li>
            <code class="font-mono">setDisabledState</code> merges with the
            <code class="font-mono">disabled</code> input rather than
            fighting it — either source can disable the control.
          </li>
          <li>
            <code class="font-mono">aria-invalid</code>/<code class="font-mono">aria-required</code>
            reflect straight off the bound <code class="font-mono">NgControl</code>.
          </li>
        </ul>
        <docs-code-block title="Template" [code]="selectExampleCode" />
        <p class="mt-4 text-sm opacity-70">
          Full round-trip coverage — value, touched, dirty, disabled — lives
          in <code class="font-mono">select-forms.spec.ts</code>; keyboard
          completion in <code class="font-mono">select-keyboard.spec.ts</code>.
        </p>
      </section>

      <section id="field-linking">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Labels, descriptions, and errors
        </h2>
        <p class="mb-4 font-medium">
          Wrap a label, control, description, and error message in
          <code class="font-mono">nb-field</code> and every id/
          <code class="font-mono">aria-describedby</code>/
          <code class="font-mono">aria-invalid</code> link is generated for
          you — see the
          <a routerLink="/components/field" class="underline">Field</a>
          component page for the full API.
        </p>
        <docs-code-block title="Template" [code]="fieldExampleCode" />
      </section>

      <section id="validation-states">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Validation states
        </h2>
        <div nbCallout tone="mint" size="sm">
          Invalid styling and <code class="font-mono">nb-field-error</code>
          visibility both gate on <strong>touched OR dirty</strong> — read via
          <code class="font-mono">AbstractControl.events</code>, not just
          <code class="font-mono">statusChanges</code>, so a touched-only
          transition (e.g. blurring an empty required field) is caught
          immediately. Errors never appear before the user has interacted
          with the control.
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormsPage {
  protected readonly nativeExampleCode = `<input nbInput formControlName="email" type="email" />
<textarea nbTextarea formControlName="bio"></textarea>
<input type="checkbox" nbCheckbox formControlName="agree" />`;

  protected readonly selectExampleCode = `<nb-select formControlName="country" placeholder="Select a country">
  <nb-select-option value="us" label="United States" />
  <nb-select-option value="ca" label="Canada" />
</nb-select>`;

  protected readonly fieldExampleCode = `<nb-field class="flex flex-col gap-2">
  <label nbLabel>Email</label>
  <input nbInput type="email" formControlName="email" />
  <p nbFieldDescription>We'll never share your email.</p>
  <p nbFieldError>Email is required.</p>
</nb-field>`;
}
