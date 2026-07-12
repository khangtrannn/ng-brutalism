import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-composition-surface-section-relationship',
  template: `
    <section id="relationship" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        How they relate
      </h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <div
          class="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-xl font-black uppercase">nbSurface</h3>
          <p class="mt-2 text-sm font-medium">
            The outer container. Owns the tone, radius, shadow, and border of
            the whole card shell. Use <code class="font-mono">clip</code> to
            keep inner regions within the surface radius.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-xl font-black uppercase">nbSection</h3>
          <p class="mt-2 text-sm font-medium">
            An inner region. Owns its own padding and optional divider borders.
            Use <code class="font-mono">divider="top"</code> or
            <code class="font-mono">divider="bottom"</code> to structure the
            panel into clear zones. Use
            <code class="font-mono">divider="block"</code> for top + bottom and
            <code class="font-mono">divider="inline"</code> for left + right.
          </p>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSurfaceSectionRelationship {}
