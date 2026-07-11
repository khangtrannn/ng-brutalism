import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-composition-stack-cluster-when-each',
  template: `
    <section id="when-each" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        When to use each
      </h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <div
          class="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-xl font-black uppercase">nbStack</h3>
          <p class="mt-2 text-sm font-medium">
            Vertical flow with consistent gap. Use for page sections, form
            groups, card content, lists, and anywhere content stacks
            top-to-bottom.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-(--nb-pink) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-xl font-black uppercase">nbCluster</h3>
          <p class="mt-2 text-sm font-medium">
            Horizontal flow that wraps to multiple lines. Use for actions,
            chips, toolbar rows, tags, badges, and any group of inline items.
          </p>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionStackClusterWhenEach {}
