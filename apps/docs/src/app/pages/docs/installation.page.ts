import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
  selector: 'docs-installation-page',
  standalone: true,
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

      <section id="package">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Package</h2>
        <docs-code-block title="Install" [code]="installCode" />
      </section>

      <section id="provider">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Provider</h2>
        <p class="mb-5 text-base font-medium">
          Register the provider once if you want to customize the global theme
          tokens from Angular configuration.
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InstallationPageComponent {
  protected readonly installCode = `pnpm add @ng-brutalism/ui`;

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
