import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-installation-theming',
  imports: [DocsCodeBlock, RouterLink],
  template: `
    <section id="theming">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Theming</h2>
      <p class="mb-5 text-base font-medium">
        Theming is CSS-only: redefine the
        <code class="font-mono text-sm">--nb-*</code>
        custom properties in your own stylesheet, after the library's
        <code class="font-mono text-sm">theme.css</code> import.
        <code class="font-mono text-sm">provideNgBrutalism()</code> registers
        library providers and takes no theme config. See
        <a routerLink="/docs/theming" class="underline"
          >Dark Mode & Theming</a
        >
        for the built-in presets and dark-mode status.
      </p>
      <docs-code-block title="app.config.ts" [code]="providerCode" />
      <docs-code-block title="src/styles.css" [code]="themeOverrideCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationTheming {
  protected readonly providerCode = `import { ApplicationConfig } from '@angular/core';
import { provideNgBrutalism } from '@ng-brutalism/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideNgBrutalism()],
};`;

  protected readonly themeOverrideCode = `@import "tailwindcss";
@import '@ng-brutalism/ui/styles.css';

:root {
  --nb-radius: 0px;
  --nb-border-width: 3px;
}`;
}
