import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-design-props-example',
  imports: [DocsCodeBlock, RouterLink],
  template: `
    <section id="example">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Example</h2>
      <p class="mb-4 font-medium">
        An input and a CSS override targeting the same category resolve to the
        same visual result - pick whichever fits the scope of the change. See
        the
        <a routerLink="/docs/customization" class="underline"
          >Customization</a
        >
        guide for how the two interact when both are present.
      </p>
      <docs-code-block title="Input" [code]="inputCode" />
      <docs-code-block title="CSS" [code]="cssCode" class="block mt-5" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignPropsExample {
  protected readonly inputCode = `<nb-card radius="xl">...</nb-card>`;

  protected readonly cssCode = `.pricing-cards {
  --nb-card-radius: var(--nb-radius-xl);
}`;
}
