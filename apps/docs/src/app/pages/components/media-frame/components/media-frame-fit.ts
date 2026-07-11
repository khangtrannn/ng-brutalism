import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMediaFrame, type NbMediaFrameFit } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface MediaFrameFitDemo {
  readonly value: NbMediaFrameFit;
  readonly label: string;
  readonly description: string;
}

@Component({
  selector: 'docs-media-frame-fit',
  imports: [NbMediaFrame, DocsExample],
  template: `
    <section id="fit">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Fit</h2>
      <docs-example [code]="fitExampleCode">
        <div class="flex flex-col divide-y-2 divide-(--nb-border) p-4">
          @for (fit of fits; track fit.value) {
          <div class="py-5 first:pt-0 last:pb-0">
            <div class="mb-3 flex items-baseline gap-3">
              <span class="font-black uppercase">{{ fit.label }}</span>
              <span class="text-sm font-medium opacity-60">{{
                fit.description
              }}</span>
            </div>
            <div nbMediaFrame ratio="16/9" tone="mint" [fit]="fit.value">
              <img
                src="/assets/images/media-frame-demo.png"
                [alt]="fit.label + ' fit demo'"
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
export class MediaFrameFit {
  protected readonly fitExampleCode = `<div nbMediaFrame ratio="16/9" tone="mint" fit="cover">
  <img src="/..." alt="" />
</div>

<div nbMediaFrame ratio="16/9" tone="mint" fit="contain">
  <img src="/..." alt="" />
</div>

<div nbMediaFrame ratio="16/9" tone="mint" fit="fill">
  <img src="/..." alt="" />
</div>`;

  protected readonly fits = [
    {
      value: 'cover',
      label: 'Cover',
      description: 'Fills the frame and crops to fit - best for hero images',
    },
    {
      value: 'contain',
      label: 'Contain',
      description: 'Shows the full image, may reveal the background tone',
    },
    {
      value: 'fill',
      label: 'Fill',
      description: 'Stretches to fill the exact frame dimensions',
    },
  ] satisfies readonly MediaFrameFitDemo[];
}
