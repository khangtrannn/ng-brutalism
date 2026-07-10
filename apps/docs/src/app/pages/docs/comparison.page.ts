import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-comparison-page',
  imports: [RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Project</p>
          <h1>Comparison</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Ng Brutalism starts from a narrower design promise than most
            Angular UI libraries - neo-brutalist, opinionated visuals rather
            than a neutral base you theme into your own look. That tradeoff
            is a good fit for some projects and a bad fit for others.
          </p>
        </div>
      </header>

      <section id="when-to-use">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          When it fits
        </h2>
        <ul class="list-disc space-y-2 pl-6 font-medium">
          <li>You want the brutalist look on day one - chunky borders, offset shadows, punchy tones - without hand-rolling it.</li>
          <li>Portfolios, launch pages, side projects, prototypes, or products where a bold visual identity is the point.</li>
          <li>You're comfortable tuning CSS variables and Tailwind utilities close to the markup instead of a large theme-object abstraction.</li>
          <li>You're building with modern Angular (signals, zoneless, standalone) and don't need to support older Angular versions.</li>
        </ul>
      </section>

      <section id="when-not-to-use">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          When it doesn't
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 class="font-heading text-lg font-black uppercase">Neutral, conservative UI</h3>
            <p class="mt-2 text-sm font-medium">
              The brutalist aesthetic is the product, not a skin you remove.
              If you need a visually neutral, low-contrast enterprise look,
              this library fights you the whole way - reach for
              <a href="https://material.angular.dev" target="_blank" rel="noreferrer" class="underline">Angular Material</a>
              or <a href="https://primeng.org" target="_blank" rel="noreferrer" class="underline">PrimeNG</a> instead.
            </p>
          </div>
          <div class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 class="font-heading text-lg font-black uppercase">Broad component coverage</h3>
            <p class="mt-2 text-sm font-medium">
              No data table, date picker, calendar, tree, or virtual-scroll
              primitive yet. If your product leans on those, you'll be
              building them yourself or pairing with another library.
            </p>
          </div>
          <div class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 class="font-heading text-lg font-black uppercase">Unstyled, headless-first</h3>
            <p class="mt-2 text-sm font-medium">
              Components ship visually opinionated by default, not
              class-free primitives you fully restyle. If you want a
              shadcn-style headless base for your own design system, this
              isn't that model.
            </p>
          </div>
          <div class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 class="font-heading text-lg font-black uppercase">Zero breaking-change tolerance</h3>
            <p class="mt-2 text-sm font-medium">
              The library is pre-1.0 - minor versions can still carry
              breaking API changes. See
              <a routerLink="/docs/versioning" class="underline">Versioning &amp; Roadmap</a>
              for the exact v1.0 criteria before betting a large, slow-moving
              codebase on it today.
            </p>
          </div>
        </div>
      </section>

      <section id="customization-model">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          A different customization model
        </h2>
        <p class="font-medium">
          Where many Angular libraries centralize theming in a large
          TypeScript config or theme object, ng-brutalism resolves every
          scalar visual property to a single public
          <code class="font-mono">--nb-*</code> CSS variable - inputs and CSS
          overrides write the same slot. See
          <a routerLink="/docs/customization" class="underline">Customization</a>
          for the full model, or
          <a routerLink="/docs/without-tailwind" class="underline">Without Tailwind</a>
          if Tailwind itself isn't part of your stack.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ComparisonPage {}
