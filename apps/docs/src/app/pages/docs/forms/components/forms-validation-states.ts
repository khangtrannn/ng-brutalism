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
          <code class="font-mono">nb-field</code>'s
          <code class="font-mono">invalid</code>/<code class="font-mono"
            >required</code
          >
          are explicit core inputs. When using
          <code class="font-mono">&#64;ng-brutalism/ui/forms-compat</code>, the
          field and custom select bridge use a Material-style default error
          matcher:
          <code class="font-mono">invalid && (touched || submitted)</code>. If
          you stay in the core package, you decide when invalid styling and
          <code class="font-mono">nb-field-error</code> visibility turn on. The
          common pattern, shown throughout these examples, is
          <code class="font-mono"
            >[invalid]="ctrl.invalid && ctrl.touched"</code
          >
          so errors never appear before the user has interacted with the
          control.
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsValidationStates {}
