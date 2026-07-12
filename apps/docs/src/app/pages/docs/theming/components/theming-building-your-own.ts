import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-theming-building-your-own',
  imports: [DocsCodeBlock],
  template: `
    <section id="building-your-own">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Building your own
      </h2>
      <p class="mb-4 font-medium">
        A preset is nothing more than a <code class="font-mono">:root</code>
        block redefining the base palette and semantic colors from
        <code class="font-mono">theme.css</code> - the same mechanism covered in
        <code class="font-mono">--nb-*</code> variables described in the
        <a href="/docs/customization" class="underline">Customization</a>
        guide, just applied at the whole-app scope instead of one component.
      </p>
      <docs-code-block title="src/styles.css" [code]="customThemeCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingBuildingYourOwn {
  protected readonly customThemeCode = `@import "tailwindcss";
@import '@ng-brutalism/ui/styles.css';

:root {
  --nb-primary: #0ea5e9;
  --nb-primary-foreground: #ffffff;
  --nb-yellow: #fde047;
  --nb-border: #0f172a;
}`;
}
