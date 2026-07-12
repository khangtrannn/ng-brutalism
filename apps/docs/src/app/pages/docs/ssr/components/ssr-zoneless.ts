import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-ssr-zoneless',
  template: `
    <section id="zoneless">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Zoneless</h2>
      <p class="font-medium">
        Every component is built on signals and
        <code class="font-mono">ChangeDetectionStrategy.OnPush</code>, with no
        reliance on <code class="font-mono">zone.js</code> patching for state
        updates to be picked up. This docs site itself runs zoneless,
        prerendered with Analog and Angular's SSR/hydration pipeline.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SsrZoneless {}
