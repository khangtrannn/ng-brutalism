import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTitle } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-title-custom-wave',
  imports: [NbTitle, DocsExample],
  template: `
    <section id="custom-wave">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Custom Wave
      </h2>
      <docs-example [code]="customWaveExampleCode">
        <h3
          nbTitle
          class="font-mono text-3xl font-black leading-tight"
          style="--nb-title-wave-color: #ff5d8f; --nb-title-wave-width: 12rem; --nb-title-wave-height: 0.75rem;"
        >
          Sharp editorial heading
        </h3>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCustomWave {
  protected readonly customWaveExampleCode = `<h3
  nbTitle
  class="font-mono text-3xl font-black leading-tight"
  style="--nb-title-wave-color: #ff5d8f; --nb-title-wave-width: 12rem; --nb-title-wave-height: 0.75rem;"
>
  Sharp editorial heading
</h3>`;
}
