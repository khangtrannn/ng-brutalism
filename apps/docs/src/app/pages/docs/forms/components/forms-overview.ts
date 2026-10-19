import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-forms-overview',
  template: `
    <header id="overview" class="relative mb-10 scroll-mt-32">
      <div class="mb-5">
        <p>Concepts</p>
        <h1>Forms Integration</h1>
        <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          Native-element controls -
          <code class="font-mono">nbInput</code>,
          <code class="font-mono">nbTextarea</code>,
          <code class="font-mono">nbCheckbox</code>, native
          <code class="font-mono">nbSelect</code> - work with every forms system
          for free, since they're directives on real form elements. The one
          custom control, <code class="font-mono">nb-select</code>, is
          model-based instead of a
          <code class="font-mono">ControlValueAccessor</code>: a
          <code class="font-mono">value</code> model plus
          <code class="font-mono">disabled</code>,
          <code class="font-mono">touch</code>,
          <code class="font-mono">invalid</code>, and
          <code class="font-mono">required</code> - the same house contract
          every future custom control (radio group, switch, combobox) will
          follow. The main entry point stays free of an
          <code class="font-mono">&#64;angular/forms</code> dependency; the
          optional <code class="font-mono">&#64;ng-brutalism/ui/forms-compat</code>
          entry point adds a real
          <code class="font-mono">ControlValueAccessor</code> bridge for apps
          on classic reactive or template-driven forms.
        </p>
      </div>
    </header>

    <section id="support-matrix" class="mb-10 scroll-mt-32">
      <h2 data-docs-heading class="mb-4 text-2xl font-bold">Support matrix</h2>
      <p class="mb-4 font-medium">
        The main entry point has no
        <code class="font-mono">&#64;angular/forms</code> dependency - your
        app's forms runtime drives our controls directly, or the optional
        <code class="font-mono">forms-compat</code> entry point bridges
        classic forms in. Angular itself has no bridge that lets
        <code class="font-mono">formControlName</code> or
        <code class="font-mono">ngModel</code> bind directly to a custom
        signal-forms control, so each system pairs with
        <code class="font-mono">nb-select</code> as follows (Angular 22):
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
                Forms system
              </th>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
                nb-select (custom control)
              </th>
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                Native-element directives
              </th>
            </tr>
          </thead>
          <tbody class="font-medium">
            <tr class="border-b-2 border-(--nb-border)">
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                None (standalone)
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                <code class="font-mono">[(value)]</code> two-way binding
              </td>
              <td class="px-4 py-3">Plain value/event bindings</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                Signal forms
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                <code class="font-mono">[formField]</code> - the native path
              </td>
              <td class="px-4 py-3">
                <code class="font-mono">[formField]</code>
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                Reactive forms
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                <code class="font-mono">formControlName</code> /
                <code class="font-mono">formControl</code> via
                <code class="font-mono">forms-compat</code>, or
                <code class="font-mono">SignalFormControl</code> in your
                <code class="font-mono">FormGroup</code> +
                <code class="font-mono">[formField]="ctrl.fieldTree"</code>
              </td>
              <td class="px-4 py-3">
                <code class="font-mono">formControlName</code>
              </td>
            </tr>
            <tr>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                Template-driven
              </td>
              <td class="border-r-2 border-(--nb-border) px-4 py-3">
                <code class="font-mono">[(ngModel)]</code> via
                <code class="font-mono">forms-compat</code>, or manual
                <code class="font-mono">[value]</code> /
                <code class="font-mono">(valueChange)</code> bindings
              </td>
              <td class="px-4 py-3">
                <code class="font-mono">[(ngModel)]</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-4 text-sm opacity-70">
        Every cell in the nb-select column is pinned by specs -
        <code class="font-mono">select-forms.spec.ts</code> for the
        <code class="font-mono">[formField]</code>/<code class="font-mono"
          >SignalFormControl</code
        >
        rows, <code class="font-mono">nb-select-control-bridge.spec.ts</code>
        for the <code class="font-mono">forms-compat</code> rows - so an
        upstream Angular forms change fails our CI before it reaches your app.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsOverview {}
