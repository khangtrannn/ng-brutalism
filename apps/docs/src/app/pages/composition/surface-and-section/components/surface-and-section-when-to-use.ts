import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-composition-surface-section-when-to-use',
  template: `
    <section id="when-to-use" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        When to use Surface & Section
      </h2>
      <div
        class="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]"
      >
        <div
          class="border-b border-white/20 px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white/60"
        >
          Reach for this pattern when…
        </div>
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
export class CompositionSurfaceSectionWhenToUse {
  protected readonly whenToUse = [
    'You need a card, panel, docs example, callout shell, dashboard widget, or recipe card',
    'The UI has distinct header, body, and footer zones',
    'You want dividers to feel intentional rather than manually applied',
    'You want the outer shape (radius, shadow, border) defined in one place',
  ];
}
