import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMediaFrame, type NbMediaFrameRatio } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface MediaFrameRatioDemo {
  readonly value: NbMediaFrameRatio;
  readonly label: string;
  readonly description: string;
}

@Component({
  selector: 'docs-media-frame-ratios',
  imports: [NbMediaFrame, DocsExample],
  template: `
    <section id="ratios">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Ratios</h2>
      <docs-example [code]="ratiosExampleCode">
        <div class="flex flex-col divide-y-2 divide-(--nb-border) p-4">
          @for (ratio of ratios; track ratio.value) {
          <div class="py-5 first:pt-0 last:pb-0">
            <div class="mb-3 flex items-baseline gap-3">
              <span class="font-black uppercase">{{ ratio.label }}</span>
              <span class="text-sm font-medium opacity-60">{{
                ratio.description
              }}</span>
            </div>
            <div
              nbMediaFrame
              [ratio]="ratio.value"
              tone="lavender"
              shadow="hard"
              [class]="ratio.value === 'auto' ? 'min-h-48' : ''"
            >
              <img
                src="/assets/images/media-frame-demo.png"
                [alt]="ratio.label + ' ratio demo'"
              />
            </div>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaFrameRatios {
  protected readonly ratiosExampleCode = `<div nbMediaFrame ratio="1/1" tone="lavender" shadow="hard">
  <img src="/..." alt="Square" />
</div>

<div nbMediaFrame ratio="3/4" tone="lavender" shadow="hard">
  <img src="/..." alt="Portrait" />
</div>

<div nbMediaFrame ratio="16/9" tone="lavender" shadow="hard">
  <img src="/..." alt="Video" />
</div>

<div nbMediaFrame ratio="21/9" tone="lavender" shadow="hard">
  <img src="/..." alt="Cinematic" />
</div>`;

  protected readonly ratios = [
    {
      value: 'auto',
      label: 'Auto',
      description: 'No ratio enforced - content defines the height',
    },
    {
      value: '1/1',
      label: '1 / 1',
      description: 'Square - profiles, avatars, album art',
    },
    {
      value: '3/4',
      label: '3 / 4',
      description: 'Portrait - headshots, covers, vertical art',
    },
    {
      value: '4/3',
      label: '4 / 3',
      description: 'Classic photo - product cards, listings',
    },
    {
      value: '3/2',
      label: '3 / 2',
      description: 'Editorial - standard photography ratio',
    },
    {
      value: '16/9',
      label: '16 / 9',
      description: 'Video - presentations, hero images',
    },
    {
      value: '21/9',
      label: '21 / 9',
      description: 'Cinematic - immersive panoramic banners',
    },
  ] satisfies readonly MediaFrameRatioDemo[];
}
