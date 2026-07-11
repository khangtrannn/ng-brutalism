import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbIcon } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-icon-preview',
  imports: [NbIcon, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="previewCode">
        <div class="flex flex-wrap items-center gap-6 p-6">
          <span
            nbIcon
            src="/tokyo-city-escape/nb-plane-fill.svg"
            size="xl"
            tone="primary"
            decorative
          ></span>
          <span
            nbIcon
            src="/tokyo-city-escape/nb-star-fill.svg"
            size="lg"
            tone="warning"
            decorative
          ></span>
          <span
            nbIcon
            src="/tokyo-city-escape/nb-hotel-fill.svg"
            size="md"
            tone="default"
            decorative
          ></span>
          <span
            nbIcon
            src="/tokyo-city-escape/nb-arrow-right.svg"
            size="sm"
            tone="muted"
            decorative
          ></span>
          <span
            nbIcon
            src="/tokyo-city-escape/nb-plane-fill.svg"
            size="xs"
            tone="danger"
            decorative
          ></span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPreview {
  protected readonly previewCode = `<span nbIcon src="/icons/plane.svg" size="xl" tone="primary" decorative></span>
<span nbIcon src="/icons/star.svg" size="lg" tone="warning" decorative></span>
<span nbIcon src="/icons/hotel.svg" size="md" tone="default" decorative></span>
<span nbIcon src="/icons/arrow-right.svg" size="sm" tone="muted" decorative></span>
<span nbIcon src="/icons/plane.svg" size="xs" tone="danger" decorative></span>`;
}
