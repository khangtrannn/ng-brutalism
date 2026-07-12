import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-field-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Bind a <code class="font-mono">FormControl</code> (or
        <code class="font-mono">formControlName</code>) to any control inside
        <code class="font-mono">nb-field</code> - the field reads the control's
        touched/dirty/invalid/required status straight off it, no separate
        error-state input to keep in sync.
      </p>
      <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldUsage {
  protected readonly importCode = `import { NbField, NbFieldDescription, NbFieldError } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-field class="flex flex-col gap-2">
  <label nbLabel>Email</label>
  <input nbInput type="email" [formControl]="emailControl" />
  <p nbFieldDescription>We'll never share your email.</p>
  <p nbFieldError>Email is required.</p>
</nb-field>`;
}
