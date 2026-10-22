import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-customization-scope',
  imports: [DocsCodeBlock],
  template: `
    <section id="scope">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Choosing a scope
      </h2>
      <p class="mb-4 font-medium">
        Pick the narrowest rule that gets the job done. Component variables
        such as <code class="font-mono">--nb-card-radius</code> apply to the
        element they are set on, so select the component itself; to restyle a
        whole section or the whole app, set the theme token
        (<code class="font-mono">--nb-radius</code>) instead:
      </p>
      <docs-code-block title="Scopes" [code]="scopesCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationScope {
  protected readonly scopesCode = `<nb-card radius="xl">...</nb-card>

.pricing-section nb-card {
  --nb-card-radius: var(--nb-radius-xl);
}

:root {
  --nb-radius: var(--nb-radius-xl);
}`;
}
