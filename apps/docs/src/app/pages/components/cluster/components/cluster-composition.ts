import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCluster, NbMediaItem, NbMediaItemTitle } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-cluster-composition',
  imports: [DocsExample, NbCluster, NbMediaItem, NbMediaItemTitle],
  template: `
    <section id="composition">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Composition
      </h2>
      <docs-example [code]="compositionExampleCode">
        <div
          nbCluster
          gap="xl"
          align="center"
          separator="dashed"
          class="p-4 [--nb-media-item-title-size:12px]"
        >
          <nb-media-item icon="/tokyo-city-escape/central-locations.png">
            <span nbMediaItemTitle>Central<br />Locations</span>
          </nb-media-item>
          <nb-media-item icon="/tokyo-city-escape/guided-experiences.png">
            <span nbMediaItemTitle>Guided<br />Experiences</span>
          </nb-media-item>
          <nb-media-item icon="/tokyo-city-escape/24-7-support.png">
            <span nbMediaItemTitle>24/7<br />Support</span>
          </nb-media-item>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterComposition {
  protected readonly compositionExampleCode = `<div nbCluster gap="lg" align="center" separator="dashed">
  <nb-media-item icon="/icons/location.png">
    <span nbMediaItemTitle>Central<br />Locations</span>
  </nb-media-item>
  <nb-media-item icon="/icons/support.png">
    <span nbMediaItemTitle>24/7<br />Support</span>
  </nb-media-item>
</div>`;
}
