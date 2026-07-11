import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbField, NbFieldError, NbInput, NbLabel } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-field-invalid-state',
  imports: [
    DocsExample,
    NbField,
    NbFieldError,
    NbInput,
    NbLabel,
    ReactiveFormsModule,
  ],
  template: `
    <section id="invalid-state">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Invalid state
      </h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">nb-field-error</code> stays hidden until the
        control is both touched and invalid - so validation errors never
        appear before the user has had a chance to interact with the field.
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldInvalidState {
  protected readonly invalidControl = new FormControl('', {
    nonNullable: true,
    validators: Validators.required,
  });

  protected readonly invalidExampleCode = `<nb-field class="flex flex-col gap-2">
  <label nbLabel>Username</label>
  <input nbInput [formControl]="invalidControl" />
  <p nbFieldError>Username is required.</p>
</nb-field>`;
}
