import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-comparison-when-not-to-use',
  imports: [RouterLink],
  template: `
    <section id="when-not-to-use">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        When it doesn't
      </h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div
          class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-lg font-black uppercase">
            Neutral, conservative UI
          </h3>
          <p class="mt-2 text-sm font-medium">
            The brutalist aesthetic is the product, not a skin you remove. If
            you need a visually neutral, low-contrast enterprise look, this
            library fights you the whole way - reach for
            <a
              href="https://material.angular.dev"
              target="_blank"
              rel="noreferrer"
              class="underline"
              >Angular Material</a
            >
            or
            <a
              href="https://primeng.org"
              target="_blank"
              rel="noreferrer"
              class="underline"
              >PrimeNG</a
            >
            instead.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-lg font-black uppercase">
            Broad component coverage
          </h3>
          <p class="mt-2 text-sm font-medium">
            No data table, date picker, calendar, tree, or virtual-scroll
            primitive yet. If your product leans on those, you'll be building
            them yourself or pairing with another library.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-lg font-black uppercase">
            Unstyled, headless-first
          </h3>
          <p class="mt-2 text-sm font-medium">
            Components ship visually opinionated by default, not class-free
            primitives you fully restyle. If you want a shadcn-style headless
            base for your own design system, this isn't that model.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-lg font-black uppercase">
            Zero breaking-change tolerance
          </h3>
          <p class="mt-2 text-sm font-medium">
            The library is pre-1.0 - minor versions can still carry breaking
            API changes. See
            <a routerLink="/docs/versioning" class="underline"
              >Versioning &amp; Roadmap</a
            >
            for the exact v1.0 criteria before betting a large, slow-moving
            codebase on it today.
          </p>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonWhenNotToUse {}
