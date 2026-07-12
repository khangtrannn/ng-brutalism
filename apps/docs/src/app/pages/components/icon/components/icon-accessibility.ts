import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout, NbIcon, NbStack } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-icon-accessibility',
  imports: [NbCallout, NbIcon, NbStack, DocsExample],
  template: `
    <section id="accessibility">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Accessibility
      </h2>
      <p class="mb-4 font-medium">
        Icons must be explicitly marked as decorative or meaningful. There is no
        silent default - always provide either
        <code class="font-mono">decorative</code> or
        <code class="font-mono">label</code>. Avoid rendering a bare visual icon
        with neither.
      </p>
      <div nbStack gap="md" class="mb-6">
        <div nbCallout tone="mint" size="sm">
          <strong>Decorative icon</strong> - adds no meaning; hidden from screen
          readers. Use <code class="font-mono">decorative</code>.
        </div>
        <div nbCallout tone="yellow" size="sm">
          <strong>Meaningful icon</strong> - communicates information; needs a
          label. Use <code class="font-mono">label="..."</code>.
        </div>
      </div>
      <docs-example [code]="a11yCode">
        <div class="flex flex-wrap items-center gap-8 p-6">
          <div class="flex flex-col items-center gap-2">
            <span
              nbIcon
              src="/tokyo-city-escape/nb-star-fill.svg"
              size="lg"
              tone="warning"
              decorative
            ></span>
            <span class="font-mono text-xs font-bold opacity-50"
              >decorative</span
            >
            <span class="font-mono text-xs opacity-40">aria-hidden="true"</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <span
              nbIcon
              src="/tokyo-city-escape/nb-star-fill.svg"
              size="lg"
              tone="warning"
              label="Top rated"
            ></span>
            <span class="font-mono text-xs font-bold opacity-50"
              >label="Top rated"</span
            >
            <span class="font-mono text-xs opacity-40">role="img"</span>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconAccessibility {
  protected readonly a11yCode = `<span nbIcon src="/icons/star.svg" size="lg" tone="warning" decorative></span>

<span nbIcon src="/icons/star.svg" size="lg" tone="warning" label="Top rated"></span>

<span nbIcon src="/icons/star.svg" size="lg" tone="warning"></span>`;
}
