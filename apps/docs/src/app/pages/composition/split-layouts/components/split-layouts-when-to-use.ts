import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-composition-split-layouts-when-to-use',
  template: `
    <section id="when-to-use" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        When to use Split
      </h2>
      <div
        class="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]"
      >
        @for (use of whenToUse; track use) {
          <div
            class="flex gap-3 border-b border-white/10 px-5 py-3 last:border-none"
          >
            <span
              class="mt-1.5 inline-block h-2 w-2 shrink-0 border-2 border-(--nb-yellow) bg-(--nb-yellow)"
              aria-hidden="true"
            ></span>
            <span class="text-sm font-medium">{{ use }}</span>
          </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSplitLayoutsWhenToUse {
  protected readonly whenToUse = [
    'Hero layout with a wide main area and a narrower sidebar or aside',
    'Media/content pairs - image on one side, description on the other',
    'Pricing sections with features on the left and a highlighted card on the right',
    'Profile cards with an avatar panel and identity/details panel',
    'Any layout where two sibling regions need proportional width',
  ];
}
