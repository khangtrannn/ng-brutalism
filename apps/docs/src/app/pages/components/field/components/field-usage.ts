import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-field-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Use explicit <code class="font-mono">invalid</code> and
        <code class="font-mono">required</code> inputs in the core package. Add
        <code class="font-mono">NbFieldControlBridge</code> from
        <code class="font-mono">&#64;ng-brutalism/ui/forms-compat</code> when
        you want <code class="font-mono">nb-field</code> to read classic Angular
        form state automatically.
      </p>
      <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
      <docs-code-block
        class="block mb-5"
        title="Forms compat import"
        [code]="formsCompatImportCode"
      />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldUsage {
  protected readonly importCode = `import { NbField, NbFieldDescription, NbFieldError } from '@ng-brutalism/ui';`;

  protected readonly formsCompatImportCode = `import { NbFieldControlBridge } from '@ng-brutalism/ui/forms-compat';`;

  protected readonly defaultExampleCode = `<nb-field class="flex flex-col gap-2">
  <label nbLabel>Email</label>
  <input nbInput type="email" [formControl]="emailControl" />
  <p nbFieldDescription>We'll never share your email.</p>
  <p nbFieldError>Email is required.</p>
</nb-field>`;
}
