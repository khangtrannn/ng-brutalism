import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbButtonTrailingIcon, NbIcon, NbText } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-button-cta',
  imports: [NbButton, NbButtonTrailingIcon, NbIcon, NbText, DocsExample],
  template: `
    <section id="cta">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">CTA</h2>
      <p class="mb-4 max-w-3xl font-medium">
        Button provides default typography for normal actions. For expressive
        button labels, compose <code class="font-mono">nbText</code> inside
        <code class="font-mono">nbButton</code>.
      </p>
      <docs-example [code]="ctaExampleCode">
        <button nbButton tone="lavender" size="xl" radius="md">
          <span
            nbText
            size="xl"
            weight="black"
            transform="uppercase"
            tracking="wide"
          >
            Apply Now
          </span>
          <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md">
            <span
              nbIcon
              src="/tokyo-city-escape/nb-arrow-right.svg"
              size="sm"
              decorative
            ></span>
          </span>
        </button>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCta {
  protected readonly ctaExampleCode = `<button nbButton tone="lavender" size="xl" radius="md">
  <span nbText size="xl" weight="black" transform="uppercase" tracking="wide">
    Apply Now
  </span>
  <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md">
    <span nbIcon src="/icons/arrow-right.svg" size="sm" decorative></span>
  </span>
</button>`;
}
