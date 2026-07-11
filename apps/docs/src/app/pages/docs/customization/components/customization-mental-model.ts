import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-customization-mental-model',
  imports: [DocsCodeBlock],
  template: `
    <section id="mental-model">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        The core rule
      </h2>
      <p class="mb-4 font-medium">
        Every customizable scalar (radius, shadow, padding, a color slot...)
        gets exactly one public CSS variable. A design-prop input writes an
        inline value onto that variable; a CSS rule targeting the same
        variable resolves through the normal cascade. Both paths land on the
        identical property - there's nothing input-specific about what an
        input does under the hood.
      </p>
      <docs-code-block title="Component CSS" [code]="cssRuleCode" />
      <p class="mt-5 mb-2 font-medium">
        Setting the input and overriding the CSS variable both resolve to the
        same rendered radius:
      </p>
      <docs-code-block title="Equivalent" [code]="equivalentCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationMentalModel {
  protected readonly cssRuleCode = `[data-nb-callout] {
  border-radius: var(--nb-callout-radius, var(--nb-radius));
}`;

  protected readonly equivalentCode = `<div nbCallout radius="xl">...</div>

<div nbCallout class="marketing-callout">...</div>

.marketing-callout {
  --nb-callout-radius: var(--nb-radius-xl);
}`;
}
