import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbImageCard, NbImageCardCaption, NbTitle } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-image-card-preview',
  imports: [NbImageCard, NbImageCardCaption, NbTitle, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <nb-image-card
          class="w-full max-w-sm"
          [image]="previewImage"
          alt="Animated Angular mascot for Ng Brutalism"
        >
          <nb-image-card-caption>
            <span
              nbTitle
              class="inline-block font-mono text-2xl font-black leading-tight"
              style="--nb-title-wave-color: #dd0031; --nb-title-wave-width: 10rem; --nb-title-wave-height: 0.5rem;"
            >
              Angular mascot
            </span>
          </nb-image-card-caption>
        </nb-image-card>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardPreview {
  protected readonly previewImage = '/angular-mascot.gif';

  protected readonly defaultExampleCode = `<nb-image-card
  class="w-full max-w-sm"
  [image]="imageUrl"
  alt="Animated Angular mascot for Ng Brutalism"
>
  <nb-image-card-caption>
    <span
      nbTitle
      class="inline-block font-mono text-2xl font-black leading-tight text-[#dd0031]"
      style="--nb-title-wave-color: #f4c430; --nb-title-wave-width: 10rem; --nb-title-wave-height: 0.5rem;"
    >
      Angular mascot
    </span>
  </nb-image-card-caption>
</nb-image-card>`;
}
