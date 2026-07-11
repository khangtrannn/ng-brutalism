import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbImageCard } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-image-card-image-only',
  imports: [NbImageCard, DocsExample],
  template: `
    <section id="image-only">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Image only
      </h2>
      <p class="mb-4 text-sm font-medium">
        When <code class="font-mono">nb-image-card-caption</code> is omitted,
        the caption strip is not rendered.
      </p>
      <docs-example [code]="imageOnlyExampleCode">
        <nb-image-card
          class="w-full max-w-sm"
          [image]="previewImage"
          alt="Animated Angular mascot for Ng Brutalism"
        />
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardImageOnly {
  protected readonly previewImage = '/angular-mascot.gif';

  protected readonly imageOnlyExampleCode = `<nb-image-card
  class="w-full max-w-sm"
  [image]="imageUrl"
  alt="Animated Angular mascot for Ng Brutalism"
/>`;
}
