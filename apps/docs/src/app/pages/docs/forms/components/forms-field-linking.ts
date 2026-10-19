import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-forms-field-linking',
  imports: [DocsCodeBlock, RouterLink],
  template: `
    <section id="field-linking">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Labels, descriptions, and errors
      </h2>
      <p class="mb-4 font-medium">
        Wrap a label, control, description, and error message in
        <code class="font-mono">nb-field</code> and every id/
        <code class="font-mono">aria-describedby</code>/
        <code class="font-mono">aria-invalid</code> link is generated for you.
        With reactive or template-driven forms, import
        <code class="font-mono">NbFieldControlBridge</code> from
        <code class="font-mono">&#64;ng-brutalism/ui/forms-compat</code> to
        mirror invalid/required state from the nested control - see the
        <a routerLink="/components/field" class="underline">Field</a>
        component page for the full API.
      </p>
      <docs-code-block
        class="block mb-5"
        title="Forms compat import"
        [code]="formsCompatImportCode"
      />
      <docs-code-block title="Template" [code]="fieldExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsFieldLinking {
  protected readonly formsCompatImportCode = `import { NbFieldControlBridge } from '@ng-brutalism/ui/forms-compat';`;

  protected readonly fieldExampleCode = `<nb-field class="flex flex-col gap-2">
  <label nbLabel>Email</label>
  <input nbInput type="email" formControlName="email" />
  <p nbFieldDescription>We'll never share your email.</p>
  <p nbFieldError>Email is required.</p>
</nb-field>`;
}
