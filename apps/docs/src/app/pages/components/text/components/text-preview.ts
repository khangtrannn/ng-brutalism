import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbText } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-text-preview',
  imports: [NbStack, NbText, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="previewCode">
        <div class="p-6 max-w-xl" nbStack gap="md">
          <span nbText size="xl" weight="extrabold">Roam &amp; Go</span>
          <p nbText size="md" weight="medium" tone="muted" measure="md">
            Explore iconic neighborhoods, savor local flavors, and make
            unforgettable memories on every trip.
          </p>
          <span
            nbText
            size="sm"
            weight="bold"
            transform="uppercase"
            tracking="wide"
          >
            New release
          </span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextPreview {
  protected readonly previewCode = `<span nbText size="xl" weight="extrabold">Roam &amp; Go</span>

<p nbText size="md" weight="medium" tone="muted" measure="md">
  Explore iconic neighborhoods, savor local flavors, and make
  unforgettable memories on every trip.
</p>

<span nbText size="sm" weight="bold" transform="uppercase" tracking="wide">
  New release
</span>`;
}
