import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-ssr-id-generation',
  imports: [DocsCodeBlock],
  template: `
    <section id="id-generation">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Stable id generation
      </h2>
      <p class="mb-4 font-medium">
        Components that generate ids for ARIA wiring (<code class="font-mono"
          >nb-select</code
        >, <code class="font-mono">nb-field</code> and its description/error
        directives, accordion triggers...) pull a counter from an injectable
        <code class="font-mono">NbIdGenerator</code> rather than a module-level
        variable.
      </p>
      <docs-code-block title="core/id-generator.ts" [code]="idGeneratorCode" />
      <p class="mt-4 font-medium">
        A module-level counter is shared across every request a Node process
        serves - under SSR, that means id
        <code class="font-mono">#47</code> on the server can become id
        <code class="font-mono">#3</code> on a fresh client bootstrap, producing
        a hydration mismatch on any component that reads/writes an id-derived
        attribute. An injectable counter is scoped per Angular injector, so a
        new SSR render and a new client bootstrap each start from zero
        independently - server and client markup always agree.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SsrIdGeneration {
  protected readonly idGeneratorCode = `@Injectable({ providedIn: 'root' })
export class NbIdGenerator {
  private counter = 0;

  next(): number {
    return this.counter++;
  }
}`;
}
