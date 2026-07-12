import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbIcon } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-icon-modes',
  imports: [NbIcon, DocsExample],
  template: `
    <section id="modes">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Modes</h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">mode="mask"</code> (default) applies the SVG as
        a CSS mask and paints it with the active tone color - ideal for
        monochrome SVG icons that should follow the theme.
        <code class="font-mono">mode="image"</code> renders the asset as a
        background image and preserves its original colors - use this for
        colorful illustrations or PNGs.
      </p>
      <docs-example [code]="modesCode">
        <div class="flex flex-wrap items-center gap-8 p-6">
          <div class="flex flex-col items-center gap-2">
            <span
              nbIcon
              src="/tokyo-city-escape/nb-plane-fill.svg"
              size="xl"
              mode="mask"
              tone="primary"
              decorative
            ></span>
            <span class="font-mono text-xs font-bold opacity-50"
              >mask (default)</span
            >
            <span class="font-mono text-xs opacity-40">painted by tone</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <span
              nbIcon
              src="/tokyo-city-escape/nb-plane-fill.svg"
              size="xl"
              mode="image"
              decorative
            ></span>
            <span class="font-mono text-xs font-bold opacity-50">image</span>
            <span class="font-mono text-xs opacity-40">original colors</span>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconModes {
  protected readonly modesCode = `<span nbIcon src="/icons/plane.svg" size="xl" mode="mask" tone="primary" decorative></span>

<span nbIcon src="/icons/illustrated-plane.png" size="xl" mode="image" decorative></span>`;
}
