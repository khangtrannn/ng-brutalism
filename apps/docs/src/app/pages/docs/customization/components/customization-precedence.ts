import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout } from '@ng-brutalism/ui';

@Component({
  selector: 'docs-customization-precedence',
  imports: [NbCallout],
  template: `
    <section id="precedence">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Precedence contract
      </h2>
      <p class="mb-4 font-medium">
        When nothing about a slot has been touched on a given element,
        resolution follows the normal CSS cascade - local rule, then inherited
        rule, then the component's built-in fallback:
      </p>
      <ol class="mb-5 list-decimal space-y-2 pl-6 font-medium">
        <li>
          An input on the element writes the variable
          <strong>inline</strong> - inline styles win over any stylesheet
          rule, including your own, short of
          <code class="font-mono">!important</code>.
        </li>
        <li>
          With no input set, the variable resolves like any other custom
          property: a rule targeting the element wins, otherwise an inherited
          value from an ancestor, otherwise the component's own
          <code class="font-mono">var(--nb-x, fallback)</code> default.
        </li>
        <li>
          <code class="font-mono">!important</code> on a stylesheet rule beats
          an inline input value - the one documented escape hatch, useful when
          a consumer needs to force an override for an accessibility fix
          regardless of what inputs are set upstream.
        </li>
      </ol>
      <div nbCallout tone="cream" size="sm" class="mb-2">
        <p class="normal-case">
          <strong>Don't set both</strong> an input and a same-name CSS
          variable override on the <em>same element</em> - the input's inline
          value always wins there, so the CSS rule silently does nothing. Use
          the input for one-off, per-instance overrides; use a CSS rule when
          you want to restyle every instance under a selector.
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationPrecedence {}
