import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-theming-page',
  imports: [DocsCodeBlock, NbCallout],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Concepts</p>
          <h1>Dark Mode &amp; Theming</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Every visual token flows through <code class="font-mono">--nb-*</code>
            CSS variables, so a full rebrand - including the entire 16-tone
            palette - is a stylesheet swap, not a component edit.
          </p>
        </div>
      </header>

      <section id="presets">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Built-in presets
        </h2>
        <p class="mb-5 font-medium">
          Two alternative theme sheets ship alongside the default palette.
          Import one <strong>after</strong>
          <code class="font-mono">@ng-brutalism/ui/theme.css</code> (or after
          <code class="font-mono">styles.css</code>, which already includes
          it) so its overrides win the cascade.
        </p>
        <docs-code-block title="src/styles.css" [code]="presetImportCode" />

        <div class="mt-5 grid gap-4 sm:grid-cols-2">
          <div class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 class="font-heading text-lg font-black uppercase">theme-mono.css</h3>
            <p class="mt-2 text-sm font-medium">
              Ink-only rebrand - every accent and tone collapses to a
              grayscale ramp, no hue anywhere. Proves the token contract
              doesn't assume color.
            </p>
          </div>
          <div class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 class="font-heading text-lg font-black uppercase">theme-soft.css</h3>
            <p class="mt-2 text-sm font-medium">
              Softened palette - muted pastels and a warmer neutral base,
              same brutalist borders and shadows underneath.
            </p>
          </div>
        </div>
      </section>

      <section id="building-your-own">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Building your own
        </h2>
        <p class="mb-4 font-medium">
          A preset is nothing more than a <code class="font-mono">:root</code>
          block redefining the base palette and semantic colors from
          <code class="font-mono">theme.css</code> - the same mechanism
          covered in
          <code class="font-mono">--nb-*</code> variables described in the
          <a href="/docs/customization" class="underline">Customization</a>
          guide, just applied at the whole-app scope instead of one
          component.
        </p>
        <docs-code-block title="src/styles.css" [code]="customThemeCode" />
      </section>

      <section id="dark-mode">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Dark mode
        </h2>
        <div nbCallout tone="warning" size="sm">
          <p class="normal-case">
            <strong>Not shipped yet.</strong> An earlier partial
            <code class="font-mono">.dark</code> stub covering 6 variables was
            removed rather than left half-finished - a token model that only
            re-derives a handful of variables produces a visibly broken dark
            mode, which is worse than no dark mode at all.
          </p>
        </div>
        <p class="mt-4 font-medium">
          A designed dark theme - every tone re-derived, not just the base
          palette - is tracked as future work once the full token surface
          (now complete) makes it a straightforward derivation rather than a
          guess. Until then, use <code class="font-mono">theme-mono.css</code>
          or a custom preset if you need a darker default.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ThemingPage {
  protected readonly presetImportCode = `@import "tailwindcss";
@import '@ng-brutalism/ui/styles.css';
@import '@ng-brutalism/ui/theme-mono.css';`;

  protected readonly customThemeCode = `@import "tailwindcss";
@import '@ng-brutalism/ui/styles.css';

:root {
  --nb-primary: #0ea5e9;
  --nb-primary-foreground: #ffffff;
  --nb-yellow: #fde047;
  --nb-border: #0f172a;
}`;
}
