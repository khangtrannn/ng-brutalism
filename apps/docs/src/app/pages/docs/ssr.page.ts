import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-ssr-page',
  imports: [DocsCodeBlock, NbCallout],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Concepts</p>
          <h1>SSR &amp; Hydration</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            ng-brutalism has no browser-only assumptions in its core primitives,
            works under zoneless change detection, and generates ids through an
            injectable counter so server-rendered markup matches the client on
            hydration.
          </p>
        </div>
      </header>

      <section id="id-generation">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Stable id generation
        </h2>
        <p class="mb-4 font-medium">
          Components that generate ids for ARIA wiring (<code class="font-mono"
            >nb-select</code
          >, <code class="font-mono">nb-field</code> and its description/error
          directives, accordion triggers...) pull a counter from an injectable
          <code class="font-mono">NbIdGenerator</code> rather than a
          module-level variable.
        </p>
        <docs-code-block
          title="core/id-generator.ts"
          [code]="idGeneratorCode"
        />
        <p class="mt-4 font-medium">
          A module-level counter is shared across every request a Node process
          serves - under SSR, that means id
          <code class="font-mono">#47</code> on the server can become id
          <code class="font-mono">#3</code> on a fresh client bootstrap,
          producing a hydration mismatch on any component that reads/writes an
          id-derived attribute. An injectable counter is scoped per Angular
          injector, so a new SSR render and a new client bootstrap each start
          from zero independently - server and client markup always agree.
        </p>
      </section>

      <section id="zoneless">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Zoneless
        </h2>
        <p class="font-medium">
          Every component is built on signals and
          <code class="font-mono">ChangeDetectionStrategy.OnPush</code>, with no
          reliance on <code class="font-mono">zone.js</code> patching for state
          updates to be picked up. This docs site itself runs zoneless,
          prerendered with Analog and Angular's SSR/hydration pipeline.
        </p>
      </section>

      <section id="browser-checks">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Browser-only behavior
        </h2>
        <p class="mb-4 font-medium">
          Where a feature genuinely has no server-side equivalent - the native
          <code class="font-mono">&lt;dialog&gt;</code> element's
          <code class="font-mono">showModal()</code>, the select popup's
          Popover-API positioning, clipboard access in code-block copy buttons -
          the browser-dependent call is guarded behind Angular's platform checks
          (<code class="font-mono">isPlatformBrowser</code>) rather than assumed
          to exist.
        </p>
        <div nbCallout tone="mint" size="sm">
          <p class="normal-case">
            If you hit a hydration mismatch that isn't covered here, it's a bug
            - please open an issue with a minimal repro.
          </p>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SsrPage {
  protected readonly idGeneratorCode = `@Injectable({ providedIn: 'root' })
export class NbIdGenerator {
  private counter = 0;

  next(): number {
    return this.counter++;
  }
}`;
}
