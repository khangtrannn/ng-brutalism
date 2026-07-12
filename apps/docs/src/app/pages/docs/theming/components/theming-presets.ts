import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-theming-presets',
  imports: [DocsCodeBlock],
  template: `
    <section id="presets">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Built-in presets
      </h2>
      <p class="mb-5 font-medium">
        Two alternative theme sheets ship alongside the default palette. Import
        one <strong>after</strong>
        <code class="font-mono">@ng-brutalism/ui/theme.css</code> (or after
        <code class="font-mono">styles.css</code>, which already includes it) so
        its overrides win the cascade.
      </p>
      <docs-code-block title="src/styles.css" [code]="presetImportCode" />

      <div class="mt-5 grid gap-4 sm:grid-cols-2">
        <div
          class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-lg font-black uppercase">
            theme-mono.css
          </h3>
          <p class="mt-2 text-sm font-medium">
            Ink-only rebrand - every accent and tone collapses to a grayscale
            ramp, no hue anywhere. Proves the token contract doesn't assume
            color.
          </p>
        </div>
        <div
          class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <h3 class="font-heading text-lg font-black uppercase">
            theme-soft.css
          </h3>
          <p class="mt-2 text-sm font-medium">
            Softened palette - muted pastels and a warmer neutral base, same
            brutalist borders and shadows underneath.
          </p>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingPresets {
  protected readonly presetImportCode = `@import "tailwindcss";
@import '@ng-brutalism/ui/styles.css';
@import '@ng-brutalism/ui/theme-mono.css';`;
}
