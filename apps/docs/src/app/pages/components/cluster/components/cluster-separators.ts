import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbCluster,
  NbMediaItem,
  NbMediaItemTitle,
  NbSurface,
  type NbClusterSeparator,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface ClusterSeparatorDemo {
  readonly value: NbClusterSeparator;
  readonly label: string;
}

@Component({
  selector: 'docs-cluster-separators',
  imports: [DocsExample, NbCluster, NbMediaItem, NbMediaItemTitle, NbSurface],
  template: `
    <section id="separators">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Separators
      </h2>
      <p class="mb-4 font-medium">
        Use <code class="font-mono">separator</code> to render inline separators
        between cluster children. When a separator is active, gap is collapsed
        to <code class="font-mono">gap-x-0</code> and children split
        <code class="font-mono">--nb-cluster-gap</code> across separator margin
        and padding.
      </p>
      <div nbSurface tone="yellow" shadow="sm" class="mb-5 p-4 font-medium">
        <strong>Separator note:</strong> cluster separators are best for
        compact, single-row groups like actions, badges, or metadata. When
        content wraps across rows, CSS cannot reliably detect the first item of
        each visual row, so a separator may appear at the start of a wrapped
        line. For heavily wrapping content, prefer
        <code class="font-mono">separator="none"</code> or switch to
        <code class="font-mono">nbStack</code>.
      </div>
      <docs-example [code]="separatorsExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4">
          @for (d of separators; track d.value) {
            @if (d.value !== 'none') {
              <div nbSurface tone="cream" shadow="sm" class="p-4">
                <p
                  class="mb-3 font-mono text-xs font-bold uppercase opacity-50"
                >
                  separator="{{ d.label }}"
                </p>

                <div
                  nbCluster
                  gap="xl"
                  align="center"
                  [separator]="d.value"
                  class="[--nb-media-item-title-size:12px]"
                >
                  <nb-media-item
                    icon="/tokyo-city-escape/central-locations.png"
                  >
                    <span nbMediaItemTitle>Central<br />Locations</span>
                  </nb-media-item>
                  <nb-media-item
                    icon="/tokyo-city-escape/guided-experiences.png"
                  >
                    <span nbMediaItemTitle>Guided<br />Experiences</span>
                  </nb-media-item>
                  <nb-media-item icon="/tokyo-city-escape/24-7-support.png">
                    <span nbMediaItemTitle>24/7<br />Support</span>
                  </nb-media-item>
                </div>
              </div>
            }
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterSeparators {
  protected readonly separatorsExampleCode = `<div nbCluster gap="lg" align="center" separator="dashed">
  <nb-media-item icon="/icons/location.png">
    <span nbMediaItemTitle>Central<br />Locations</span>
  </nb-media-item>
  <nb-media-item icon="/icons/guide.png">
    <span nbMediaItemTitle>Guided<br />Experiences</span>
  </nb-media-item>
  <nb-media-item icon="/icons/support.png">
    <span nbMediaItemTitle>24/7<br />Support</span>
  </nb-media-item>
</div>`;

  protected readonly separators = [
    { value: 'none', label: 'none' },
    { value: 'solid', label: 'solid' },
    { value: 'dashed', label: 'dashed' },
    { value: 'thick', label: 'thick' },
  ] satisfies readonly ClusterSeparatorDemo[];
}
