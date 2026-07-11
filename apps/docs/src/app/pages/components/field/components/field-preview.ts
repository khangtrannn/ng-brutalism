import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NbField,
  NbFieldDescription,
  NbFieldError,
  NbInput,
  NbLabel,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-field-preview',
  imports: [
    DocsExample,
    NbField,
    NbFieldDescription,
    NbFieldError,
    NbInput,
    NbLabel,
    ReactiveFormsModule,
  ],
  template: `
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldPreview {
  protected readonly emailControl = new FormControl('', {
    nonNullable: true,
    validators: Validators.required,
  });

  protected readonly defaultExampleCode = `<nb-field class="flex flex-col gap-2">
  <label nbLabel>Email</label>
  <input nbInput type="email" [formControl]="emailControl" />
  <p nbFieldDescription>We'll never share your email.</p>
  <p nbFieldError>Email is required.</p>
</nb-field>`;
}
