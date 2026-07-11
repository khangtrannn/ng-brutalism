import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-text-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Add <code class="font-mono">nbText</code> to any inline or block
        element. It applies inline styles directly so it never conflicts with
        other attribute directives on the same element.
      </p>
      <docs-code-block
        class="block mb-5"
        title="Import"
        [code]="importCode"
      />
      <docs-code-block title="Template" [code]="usageCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextUsage {
  protected readonly importCode = `import { NbText } from '@ng-brutalism/ui';`;

  protected readonly usageCode = `<p nbText>
  Build loud interfaces with sharp Angular primitives.
</p>

<p nbText tone="muted" measure="md">
  A token-driven neo-brutalist Angular UI library for expressive product interfaces.
</p>

<span nbText size="xl" weight="extrabold">
  Roam &amp; Go
</span>

<span nbText size="sm" weight="bold" transform="uppercase" tracking="wide">
  New release
</span>

<p nbText size="lg" leading="relaxed" measure="lg">
  Brutalist interfaces work best when layout, typography, and contrast are intentional.
</p>`;
}
