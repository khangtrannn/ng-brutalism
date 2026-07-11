import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-installation-styles',
  imports: [DocsCodeBlock],
  template: `
    <section id="styles">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Styles</h2>
      <p class="mb-5 text-base font-medium">
        For manual setup, import Tailwind and the bundled stylesheet once at
        your app's entry (e.g.
        <code class="font-mono text-sm">src/styles.css</code>). It includes
        the default theme tokens; import
        <code class="font-mono text-sm">@ng-brutalism/ui/theme.css</code>
        directly only when you need the token sheet by itself.
      </p>
      <docs-code-block title="src/styles.css" [code]="stylesCode" />
      <p class="mt-5 text-base font-medium">
        Each component also ships its own stylesheet (e.g.
        <code class="font-mono text-sm">@ng-brutalism/ui/button.css</code>),
        so you can import only the components you use instead of the full
        bundle. The token vocabulary itself - tone, spacing, radius, shadow,
        and the rest - is importable as TypeScript from
        <code class="font-mono text-sm">@ng-brutalism/ui/tokens</code>.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationStyles {
  protected readonly stylesCode = `@import "tailwindcss";
@import '@ng-brutalism/ui/styles.css';`;
}
