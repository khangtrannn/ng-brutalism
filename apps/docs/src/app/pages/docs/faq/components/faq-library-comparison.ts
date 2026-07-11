import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-faq-library-comparison',
  imports: [RouterLink],
  template: `
    <section id="library-comparison">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        How is it different from Angular Material, PrimeNG, or other Angular
        UI libraries?
      </h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div
          class="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-xl font-black uppercase">
            Different visual job
          </h3>
          <p class="mt-2 text-sm font-medium">
            Many Angular UI libraries are designed to support a wide range of
            product styles. Ng Brutalism starts from a narrower design
            promise: neo-brutalist components that look opinionated on day
            one.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-xl font-black uppercase">
            Different customization model
          </h3>
          <p class="mt-2 text-sm font-medium">
            The library leans on CSS tokens and Tailwind utilities rather than
            a large theme abstraction. You tune borders, shadows, colors, and
            local component accents close to the markup.
          </p>
        </div>
      </div>
      <p class="mt-5 text-base font-medium">
        Some Angular libraries focus on unstyled or lightly styled primitives.
        Ng Brutalism takes a more visual-first approach: the brutalist look
        ships with the primitives, then CSS tokens and Tailwind utilities let
        you tune it from there. See the
        <a routerLink="/docs/comparison" class="underline">Comparison</a>
        page for when that tradeoff - and when it doesn't - fits your project.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqLibraryComparison {}
