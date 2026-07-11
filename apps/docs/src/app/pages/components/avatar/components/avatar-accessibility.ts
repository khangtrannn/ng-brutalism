import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-avatar-accessibility',
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="font-medium">
        <strong>APG pattern:</strong> N/A - Avatar is static, presentational
        content that renders a user's image or initials fallback, not an
        interactive widget. <strong>Status:</strong> Stable.
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarAccessibility {}
