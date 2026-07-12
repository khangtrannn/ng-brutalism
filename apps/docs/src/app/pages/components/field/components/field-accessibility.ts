import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout, NbStack } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-field-accessibility',
  imports: [NbCallout, NbStack],
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">nb-field</code> is not itself an interactive
        widget, so it has no APG pattern of its own - it implements the
        underlying
        <a
          href="https://www.w3.org/WAI/tutorials/forms/notifications/"
          target="_blank"
          rel="noreferrer"
          class="underline"
          >accessible name/description association</a
        >
        every form-control APG pattern depends on.
      </p>
      <div nbStack gap="md" class="mb-6">
        <div nbCallout tone="mint" size="sm">
          <strong>Label linking</strong> -
          <code class="font-mono">nbLabel</code> reads
          <code class="font-mono">nb-field</code>'s generated
          <code class="font-mono">controlId</code> and sets
          <code class="font-mono">for</code> automatically; the control gets a
          matching <code class="font-mono">id</code> unless you supply one.
        </div>
        <div nbCallout tone="yellow" size="sm">
          <strong>Description + error linking</strong> - the description's id is
          in <code class="font-mono">aria-describedby</code> immediately; the
          error's id is appended only once the control is both touched and
          invalid, and <code class="font-mono">aria-invalid</code>
          flips at the same moment.
        </div>
        <div nbCallout tone="pink" size="sm">
          <strong>Required</strong> -
          <code class="font-mono">aria-required</code> is derived from a
          <code class="font-mono">Validators.required</code>
          (or equivalent) validator on the bound control, so it can't drift from
          the real validation rules.
        </div>
      </div>
      <p class="text-sm opacity-70">
        Verified with <code class="font-mono">vitest-axe</code> in both the
        valid and touched+invalid states - see
        <code class="font-mono">nb-field.spec.ts</code>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldAccessibility {}
