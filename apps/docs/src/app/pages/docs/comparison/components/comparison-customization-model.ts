import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-comparison-customization-model',
  imports: [RouterLink],
  template: `
    <section id="customization-model">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        A different customization model
      </h2>
      <p class="font-medium">
        Where many Angular libraries centralize theming in a large TypeScript
        config or theme object, ng-brutalism resolves every scalar visual
        property to a single public
        <code class="font-mono">--nb-*</code> CSS variable - inputs and CSS
        overrides write the same slot. See
        <a routerLink="/docs/customization" class="underline"
          >Customization</a
        >
        for the full model, or
        <a routerLink="/docs/without-tailwind" class="underline"
          >Without Tailwind</a
        >
        if Tailwind itself isn't part of your stack.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonCustomizationModel {}
