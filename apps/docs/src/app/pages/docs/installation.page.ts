import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
    selector: 'docs-installation-page',
    imports: [DocsCodeBlock, DocsTokens],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Getting Started</p>
          <h1>Installation</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Add the UI package to an Angular app, wire up the optional provider,
            and import standalone components directly where you use them.
          </p>
        </div>
      </header>

      <section id="prerequisites">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Prerequisites</h2>
        <p class="mb-2 text-base font-medium">
          Components are composed from Tailwind utilities applied through
          <code class="font-mono text-sm">nbClass</code>. The library expects
          your app to have <strong>Tailwind CSS v4</strong> configured and
          scanning your project source. Without it the host classes will not
          resolve and components will render unstyled.
        </p>
      </section>

      <section id="package">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Package</h2>
        <docs-code-block title="Install" [code]="installCode" />
      </section>

      <section id="styles">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Styles</h2>
        <p class="mb-5 text-base font-medium">
          Import the bundled stylesheet once at your app's entry (e.g.
          <code class="font-mono text-sm">src/styles.css</code>). Theme tokens
          live in a separate sheet you can import or override.
        </p>
        <docs-code-block title="src/styles.css" [code]="stylesCode" />
      </section>

      <section id="provider">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Provider (optional)</h2>
        <p class="mb-5 text-base font-medium">
          The provider is only needed if you want to override theme tokens from
          Angular config. The simpler alternative is to redefine the CSS custom
          properties in your own stylesheet.
        </p>
        <docs-code-block title="app.config.ts" [code]="providerCode" />
      </section>

      <docs-tokens component="theme" />

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block title="Component" [code]="usageCode" />
      </section>
    </article>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class InstallationPageComponent {
  protected readonly installCode = `pnpm add @ng-brutalism/ui`;

  protected readonly stylesCode = `@import '@ng-brutalism/ui/styles.css';
@import '@ng-brutalism/ui/theme.css';`;

  protected readonly providerCode = `import { ApplicationConfig } from '@angular/core';
import { provideNgBrutalism } from '@ng-brutalism/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgBrutalism({
      theme: {
        radius: '0px',
        borderWidth: '3px',
      },
    }),
  ],
};`;

  protected readonly usageCode = `import { Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NbButton],
  template: \`<button nbButton variant="neutral" style="--nb-button-bg: #fff">Ship it</button>\`,
})
export class ExampleComponent {}`;
}
