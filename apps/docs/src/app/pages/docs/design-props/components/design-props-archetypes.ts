import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-design-props-archetypes',
  template: `
    <section id="archetypes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        The 5 archetypes
      </h2>
      <p class="mb-5 text-base font-medium">
        Every primitive falls into one of five shapes. Knowing a component's
        archetype tells you which of the 7 categories above it will actually
        expose.
      </p>

      <div class="grid gap-4 sm:grid-cols-2">
        <div
          class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-lg font-black uppercase">
            Surface / box
          </h3>
          <p class="mt-2 text-sm font-medium">
            tone + radius + shadow + border.
            <code class="font-mono">card</code>,
            <code class="font-mono">surface</code>,
            <code class="font-mono">callout</code>,
            <code class="font-mono">media-frame</code>,
            <code class="font-mono">image-card</code>,
            <code class="font-mono">dialog</code>.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-lg font-black uppercase">Layout</h3>
          <p class="mt-2 text-sm font-medium">
            Spacing only, no visual props.
            <code class="font-mono">stack</code>,
            <code class="font-mono">cluster</code>,
            <code class="font-mono">split</code>.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-lg font-black uppercase">
            Interactive
          </h3>
          <p class="mt-2 text-sm font-medium">
            tone + size + radius + shadow + border.
            <code class="font-mono">button</code>,
            <code class="font-mono">icon-button</code>,
            <code class="font-mono">input</code>,
            <code class="font-mono">textarea</code>,
            <code class="font-mono">select</code>,
            <code class="font-mono">checkbox</code>,
            <code class="font-mono">chip</code>.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-lg font-black uppercase">Text</h3>
          <p class="mt-2 text-sm font-medium">
            Typography only. <code class="font-mono">text</code>,
            <code class="font-mono">display</code>.
            <code class="font-mono">title</code> and
            <code class="font-mono">label</code> are structural markers with
            no visual props.
          </p>
        </div>
        <div nbCard tone="surface" class="p-5 sm:col-span-2">
          <h3 class="font-heading text-lg font-black uppercase">
            Indicator / leaf
          </h3>
          <p class="mt-2 text-sm font-medium">
            Exempt by design, usually tone-only -
            <code class="font-mono">badge</code>,
            <code class="font-mono">avatar</code>,
            <code class="font-mono">status-dot</code>,
            <code class="font-mono">progress</code>,
            <code class="font-mono">rating</code>,
            <code class="font-mono">separator</code>. A small prop surface
            here is deliberate, not a gap.
          </p>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignPropsArchetypes {}
