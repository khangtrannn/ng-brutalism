import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-media-item-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong> N/A - Media Item is static, presentational
        content pairing an icon or image with a title and description, not an
        interactive widget. <strong>Status:</strong> Stable.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemAccessibility {}
