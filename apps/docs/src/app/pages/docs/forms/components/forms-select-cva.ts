import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout } from '@ng-brutalism/ui';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-forms-select-cva',
  imports: [DocsCodeBlock, NbCallout],
  template: `
    <section id="select-forms">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Select with forms
      </h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">nb-select</code> is a custom popup listbox, not
        a native form element, so instead of a
        <code class="font-mono">ControlValueAccessor</code> it exposes a plain
        model and a small set of good-citizen inputs/outputs:
      </p>
      <ul class="mb-4 list-disc space-y-1 pl-6 font-medium">
        <li>
          <code class="font-mono">value</code> - a
          <code class="font-mono">model()</code>, so
          <code class="font-mono">[(value)]</code> is a plain two-way binding
          with no forms system involved.
        </li>
        <li>
          <code class="font-mono">touch</code> - an output emitted on any
          open-to-closed transition (including the outside-click close path),
          for callers that need to mark their own control touched.
        </li>
        <li>
          <code class="font-mono">invalid</code> and
          <code class="font-mono">required</code> inputs reflect straight to
          <code class="font-mono">aria-invalid</code>/<code class="font-mono"
            >aria-required</code
          >. Nested inside <code class="font-mono">nb-field</code>, either
          source can mark the select invalid/required.
        </li>
      </ul>
      <docs-code-block title="Plain binding" [code]="selectExampleCode" />
      <div nbCallout tone="cream" size="sm" class="mt-4">
        <p class="normal-case">
          Because <code class="font-mono">value</code>,
          <code class="font-mono">disabled</code>,
          <code class="font-mono">touch</code>,
          <code class="font-mono">invalid</code>, and
          <code class="font-mono">required</code> match Angular signal forms'
          <code class="font-mono">FormValueControl</code> contract,
          <code class="font-mono">nb-select</code> binds directly to a
          signal-forms field on Angular 22 - no adapter needed. This is the
          native, headline path; signal forms is stable
          (<code class="font-mono">@publicApi</code>) as of Angular 22.
        </p>
      </div>
      <docs-code-block title="Signal forms" [code]="signalFormsExampleCode" />
      <h3 class="mt-8 mb-3 text-xl font-bold">Classic forms via forms-compat</h3>
      <p class="mb-4 font-medium">
        Angular has no built-in bridge that lets
        <code class="font-mono">formControlName</code> or
        <code class="font-mono">ngModel</code> drive a custom signal-forms
        control directly - binding either straight to
        <code class="font-mono">nb-select</code> fails with
        <code class="font-mono">NG01203: No value accessor</code>. Import the
        <code class="font-mono">&#64;ng-brutalism/ui/forms-compat</code> secondary
        entry point to get a real
        <code class="font-mono">ControlValueAccessor</code> bridge - value,
        <code class="font-mono">setDisabledState</code>, and
        <code class="font-mono">invalid && (touched || submitted)</code> status
        timing all wired up. It also ships a matching
        <code class="font-mono">nb-field</code> bridge that content-queries the
        classic control and drives
        <code class="font-mono">nb-field-error</code> visibility automatically -
        no explicit <code class="font-mono">[invalid]</code> binding needed,
        and it works for native controls too (<code class="font-mono"
          >nbInput</code
        >, <code class="font-mono">nbTextarea</code>, ...). Only components
        that import <code class="font-mono">forms-compat</code> pay for the
        <code class="font-mono">&#64;angular/forms</code> dependency - it stays an
        optional peer.
      </p>
      <docs-code-block
        title="Reactive forms via formControlName"
        [code]="formsCompatReactiveExampleCode"
      />
      <docs-code-block
        title="Template-driven forms via ngModel"
        [code]="formsCompatNgModelExampleCode"
      />
      <p class="mt-4 mb-4 font-medium">
        Prefer to stay on signal forms inside an existing
        <code class="font-mono">FormGroup</code>? Angular 22's
        <code class="font-mono">SignalFormControl</code> (from
        <code class="font-mono">&#64;angular/forms/signals/compat</code>) is
        still a valid alternative to the <code class="font-mono"
          >forms-compat</code
        >
        bridge: it joins the group unchanged and binds with
        <code class="font-mono">[formField]="ctrl.fieldTree"</code> instead of
        <code class="font-mono">formControlName</code>.
      </p>
      <docs-code-block
        title="Reactive forms via SignalFormControl"
        [code]="reactiveMixExampleCode"
      />
      <p class="mt-4 text-sm opacity-70">
        Full contract coverage - value, touch, invalid/required, the
        field-precedence merge, and both signal-forms interop recipes above -
        lives in <code class="font-mono">select-forms.spec.ts</code>; keyboard
        completion in <code class="font-mono">select-keyboard.spec.ts</code>.
        The <code class="font-mono">forms-compat</code> bridge specs live
        alongside it in
        <code class="font-mono">nb-select-control-bridge.spec.ts</code> and
        <code class="font-mono">nb-field-control-bridge.spec.ts</code>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsSelectCva {
  protected readonly selectExampleCode = `<nb-select [(value)]="country" placeholder="Select a country">
  <nb-select-option value="us" label="United States" />
  <nb-select-option value="ca" label="Canada" />
</nb-select>`;

  protected readonly signalFormsExampleCode = `const orderForm = form(signal({ country: 'us' }));

// template
<nb-select [formField]="orderForm.country" placeholder="Select a country">
  <nb-select-option value="us" label="United States" />
  <nb-select-option value="ca" label="Canada" />
</nb-select>`;

  protected readonly formsCompatReactiveExampleCode = `import { NbFieldControlBridge, NbSelectControlBridge } from '@ng-brutalism/ui/forms-compat';

readonly checkout = new FormGroup({
  country: new FormControl('us', { validators: Validators.required }),
});

// template
<form [formGroup]="checkout">
  <nb-field>
    <nb-select formControlName="country" placeholder="Select a country">
      <nb-select-option value="us" label="United States" />
      <nb-select-option value="ca" label="Canada" />
    </nb-select>
    <p nbFieldError>Country is required</p>
  </nb-field>
</form>`;

  protected readonly formsCompatNgModelExampleCode = `import { NbFieldControlBridge, NbSelectControlBridge } from '@ng-brutalism/ui/forms-compat';

country: string | null = 'us';

// template
<nb-select [(ngModel)]="country" placeholder="Select a country">
  <nb-select-option value="us" label="United States" />
  <nb-select-option value="ca" label="Canada" />
</nb-select>`;

  protected readonly reactiveMixExampleCode = `import { SignalFormControl } from '@angular/forms/signals/compat';
import { required } from '@angular/forms/signals';

readonly plan = new SignalFormControl<string | null>('starter', (p) => required(p));
readonly checkout = new FormGroup({
  name: new FormControl('Ada'),
  plan: this.plan,
});

// template
<form [formGroup]="checkout">
  <input nbInput formControlName="name" />
  <nb-select [formField]="plan.fieldTree" placeholder="Select a plan">
    <nb-select-option value="starter" label="Starter" />
    <nb-select-option value="team" label="Team" />
  </nb-select>
</form>`;
}
