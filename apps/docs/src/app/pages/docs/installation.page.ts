import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock, DocsTokens } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-installation-page',
  imports: [DocsCodeBlock, DocsTokens, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Getting Started</p>
          <h1>Installation</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Add the UI package to an Angular app with the schematic, or install
            it manually when you want full control over each setup step.
          </p>
        </div>
      </header>

      <section id="prerequisites">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Prerequisites
        </h2>
        <p class="mb-2 text-base font-medium">
          The <code class="font-mono text-sm">ng add</code> schematic sets up
          <strong>Tailwind CSS v4</strong> automatically for Angular CLI apps,
          which is the fastest path if your app already uses Tailwind or you
          don't mind adding it.
          <code class="font-mono text-sm">tailwindcss</code> is an optional
          peer dependency, though - see
          <a routerLink="/docs/without-tailwind" class="underline"
            >Without Tailwind</a
          >
          if you'd rather skip it entirely.
        </p>
      </section>

      <section id="package">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Automatic setup
        </h2>
        <p class="mb-5 text-base font-medium">
          Use the schematic when you want the package, Tailwind CSS v4, PostCSS,
          and global style imports configured for you.
        </p>
        <docs-code-block title="Angular CLI" [code]="schematicInstallCode" />
      </section>

      <section id="manual">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Manual setup
        </h2>
        <p class="mb-5 text-base font-medium">
          Use manual setup when Tailwind is already managed by your app or when
          you want to review each change yourself. Skipping Tailwind
          altogether? Follow
          <a routerLink="/docs/without-tailwind" class="underline"
            >Without Tailwind</a
          >
          instead.
        </p>
        <docs-code-block title="Install" [code]="manualInstallCode" />
      </section>

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

      <docs-tokens component="theme" />

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block title="Component" [code]="usageCode" />
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InstallationPage {
  protected readonly schematicInstallCode = `ng add @ng-brutalism/ui`;

  protected readonly manualInstallCode = `npm install @ng-brutalism/ui
# or
pnpm add @ng-brutalism/ui`;

  protected readonly stylesCode = `@import "tailwindcss";
@import '@ng-brutalism/ui/styles.css';`;

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

  protected readonly usageCode = `import { Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-example',
  imports: [NbButton],
  template: \`<button nbButton tone="background" style="--nb-button-bg: #fff">Ship it</button>\`,
})
export class Example {}`;
}
