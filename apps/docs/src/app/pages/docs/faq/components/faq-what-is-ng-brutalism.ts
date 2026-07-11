import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-faq-what-is-ng-brutalism',
  template: `
    <section id="what-is-ng-brutalism">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        What is Ng Brutalism?
      </h2>
      <p class="mb-4 text-base font-medium">
        Ng Brutalism is a neo-brutalist Angular UI primitive library and
        composition system published as
        <code class="font-mono text-sm">&#64;ng-brutalism/ui</code>. It gives
        modern Angular apps directive-first primitives - Surface, Section,
        Stack, Cluster, Split, Button, Chip, and more - with hard borders,
        offset shadows, punchy colors, and Tailwind CSS v4 styling ergonomics.
      </p>
      <p class="text-base font-medium">
        Primitives compose together like LEGO. Each owns one job:
        <code class="font-mono text-sm">nbSurface</code> creates the panel,
        <code class="font-mono text-sm">nbSection</code> divides it into
        regions, <code class="font-mono text-sm">nbStack</code> and
        <code class="font-mono text-sm">nbCluster</code> handle vertical and
        horizontal rhythm, and
        <code class="font-mono text-sm">nbSplit</code> builds main-and-aside
        layouts. Layer in actions, forms, media, and emphasis to build any
        product UI.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqWhatIsNgBrutalism {}
