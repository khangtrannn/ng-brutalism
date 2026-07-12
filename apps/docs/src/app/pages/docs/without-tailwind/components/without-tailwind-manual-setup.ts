import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-without-tailwind-manual-setup',
  imports: [DocsCodeBlock, RouterLink],
  template: `
    <section id="manual-setup">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Setup</h2>
      <p class="mb-4 font-medium">
        Skip the <code class="font-mono">ng add</code> schematic - it assumes
        Tailwind because most consumers want it for their <em>own</em> app code,
        not because the library needs it. Follow the
        <a routerLink="/docs/installation" class="underline"
          >manual install steps</a
        >
        from Installation, but import
        <code class="font-mono">@ng-brutalism/ui/styles.css</code> on its own -
        no <code class="font-mono">@import "tailwindcss"</code> line needed:
      </p>
      <docs-code-block title="src/styles.css" [code]="stylesCode" />
      <p class="mt-4 font-medium">
        <code class="font-mono">provideNgBrutalism()</code> still needs to be
        registered - it's unrelated to styling, it wires up library providers
        like <code class="font-mono">NbIdGenerator</code>. If you only use a
        handful of components, importing their individual stylesheets (e.g.
        <code class="font-mono">@ng-brutalism/ui/button.css</code>) instead of
        the full <code class="font-mono">styles.css</code> bundle keeps the CSS
        payload smaller.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutTailwindManualSetup {
  protected readonly stylesCode = `@import '@ng-brutalism/ui/styles.css';`;
}
