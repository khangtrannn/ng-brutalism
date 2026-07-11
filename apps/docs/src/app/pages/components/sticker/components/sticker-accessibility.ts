import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-sticker-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong> N/A - Sticker is a decorative SVG
        callout graphic, not an interactive widget.
        <strong>Status:</strong> Stable.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickerAccessibility {}
