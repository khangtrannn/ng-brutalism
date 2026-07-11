import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbCallout } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-without-tailwind-page',
  imports: [DocsCodeBlock, NbCallout, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Concepts</p>
          <h1>Without Tailwind</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            <code class="font-mono">tailwindcss</code> is an optional peer
            dependency. Component styling ships as a static, self-contained CSS
            file - it does not require Tailwind to build or process it.
          </p>
        </div>
      </header>

      <section id="why-optional">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Why it's optional
        </h2>
        <p class="mb-4 font-medium">
          Every component's stylesheet is hand-authored, plain CSS - custom
          properties, native
          <code class="font-mono">@layer</code>, ordinary selectors like
          <code class="font-mono">:where(span[nbBadge])</code>. There is no
          <code class="font-mono">@apply</code>, no Tailwind utility class, and
          no <code class="font-mono">@import "tailwindcss"</code> inside any
          file the library ships.
          <code class="font-mono">@ng-brutalism/ui/styles.css</code>
          is the fully bundled output - importing it is enough for every
          component to render correctly, with zero build-time processing.
        </p>
        <div nbCallout tone="cream" size="sm">
          <p class="normal-case">
            <code class="font-mono">tailwindcss</code> is marked
            <code class="font-mono">optional</code> in the package's
            <code class="font-mono">peerDependenciesMeta</code>, so installing
            without it produces no unmet-peer-dependency warning.
          </p>
        </div>
      </section>

      <section id="manual-setup">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Setup</h2>
        <p class="mb-4 font-medium">
          Skip the <code class="font-mono">ng add</code> schematic - it assumes
          Tailwind because most consumers want it for their <em>own</em> app
          code, not because the library needs it. Follow the
          <a routerLink="/docs/installation" class="underline"
            >manual install steps</a
          >
          from Installation, but import
          <code class="font-mono">@ng-brutalism/ui/styles.css</code> on its
          own - no
          <code class="font-mono">@import "tailwindcss"</code> line needed:
        </p>
        <docs-code-block title="src/styles.css" [code]="stylesCode" />
        <p class="mt-4 font-medium">
          <code class="font-mono">provideNgBrutalism()</code> still needs to be
          registered - it's unrelated to styling, it wires up library providers
          like <code class="font-mono">NbIdGenerator</code>. If you only use a
          handful of components, importing their individual stylesheets (e.g.
          <code class="font-mono">@ng-brutalism/ui/button.css</code>) instead
          of the full <code class="font-mono">styles.css</code> bundle keeps
          the CSS payload smaller.
        </p>
      </section>

      <section id="what-you-lose">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          What you lose
        </h2>
        <p class="font-medium">
          Nothing in the library itself. Component visuals, tones, presets, and
          the CSS-variable customization surface all work identically. The only
          thing you give up is using Tailwind utility classes
          <em>in your own templates</em> - if you want those too, add
          <code class="font-mono">tailwindcss</code> back as a normal dependency
          of your app; it composes fine alongside ng-brutalism's static CSS
          either way.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WithoutTailwindPage {
  protected readonly stylesCode = `@import '@ng-brutalism/ui/styles.css';`;
}
