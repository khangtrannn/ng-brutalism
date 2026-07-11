import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-introduction-why',
  template: `
    <section id="why">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Why it stands out
      </h2>
      <div class="grid gap-4 md:grid-cols-3">
        <div
          class="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-xl font-black uppercase">
            Angular first
          </h3>
          <p class="mt-2 text-sm font-medium">
            Built as Angular primitives with directive APIs, signal-friendly
            internals, and native interaction patterns that fit modern Angular
            apps.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-xl font-black uppercase">
            Loud by default
          </h3>
          <p class="mt-2 text-sm font-medium">
            Chunky borders, offset shadows, punchy color, and compact motion
            make interfaces feel instantly brutalist.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-(--nb-pink) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-xl font-black uppercase">
            Easy to bend
          </h3>
          <p class="mt-2 text-sm font-medium">
            CSS custom properties and Tailwind utilities keep theme overrides
            local, visible, and predictable.
          </p>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionWhy {}
