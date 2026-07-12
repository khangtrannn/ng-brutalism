import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-forms-validation-states',
  imports: [NbCallout],
  template: `
    <section id="validation-states">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Validation states
      </h2>
      <div nbCallout tone="cream" size="sm">
        <p class="normal-case">
          Invalid styling and
          <code class="font-mono">nb-field-error</code> visibility both gate on
          <strong>touched OR dirty</strong> - read via
          <code class="font-mono">AbstractControl.events</code>, not just
          <code class="font-mono">statusChanges</code>, so a touched-only
          transition (e.g. blurring an empty required field) is caught
          immediately. Errors never appear before the user has interacted with
          the control.
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsValidationStates {}
