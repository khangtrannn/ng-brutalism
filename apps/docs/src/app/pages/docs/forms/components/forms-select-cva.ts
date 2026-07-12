import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-forms-select-cva',
  imports: [DocsCodeBlock],
  template: `
    <section id="select-cva">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">NbSelect</h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">nb-select</code> is a custom popup listbox, not
        a native form element, so it implements
        <code class="font-mono">ControlValueAccessor</code> directly:
      </p>
      <ul class="mb-4 list-disc space-y-1 pl-6 font-medium">
        <li>
          <code class="font-mono">writeValue</code> reflects the control's value
          into the selected option.
        </li>
        <li>
          <code class="font-mono">onTouched</code> fires on any open-to-closed
          transition - including the outside-click close path, not just an
          explicit selection. <code class="font-mono">onChange</code> fires only
          when an option is actually selected.
        </li>
        <li>
          <code class="font-mono">setDisabledState</code> merges with the
          <code class="font-mono">disabled</code> input rather than fighting it
          - either source can disable the control.
        </li>
        <li>
          <code class="font-mono">aria-invalid</code>/<code class="font-mono"
            >aria-required</code
          >
          reflect straight off the bound
          <code class="font-mono">NgControl</code>.
        </li>
      </ul>
      <docs-code-block title="Template" [code]="selectExampleCode" />
      <p class="mt-4 text-sm opacity-70">
        Full round-trip coverage - value, touched, dirty, disabled - lives in
        <code class="font-mono">select-forms.spec.ts</code>; keyboard completion
        in <code class="font-mono">select-keyboard.spec.ts</code>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsSelectCva {
  protected readonly selectExampleCode = `<nb-select formControlName="country" placeholder="Select a country">
  <nb-select-option value="us" label="United States" />
  <nb-select-option value="ca" label="Canada" />
</nb-select>`;
}
