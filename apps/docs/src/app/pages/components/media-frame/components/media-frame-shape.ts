import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbMediaFrame,
  type NbMediaFrameRadius,
  type NbMediaFrameShadow,
  type NbMediaFrameTone,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface MediaFrameShapeDemo {
  readonly label: string;
  readonly description: string;
  readonly radius: NbMediaFrameRadius;
  readonly shadow: NbMediaFrameShadow;
  readonly tone: NbMediaFrameTone;
}

@Component({
  selector: 'docs-media-frame-shape',
  imports: [NbMediaFrame, DocsExample],
  template: `
    <section id="shape">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Shape</h2>
      <docs-example [code]="shapeExampleCode">
        <div class="flex flex-col divide-y-2 divide-(--nb-border) p-4">
          @for (shape of shapes; track shape.label) {
            <div class="py-5 first:pt-0 last:pb-0">
              <div class="mb-3 flex items-baseline gap-3">
                <span class="font-black uppercase">{{ shape.label }}</span>
                <span class="text-sm font-medium opacity-60">{{
                  shape.description
                }}</span>
              </div>
              <div
                nbMediaFrame
                ratio="1/1"
                [tone]="shape.tone"
                [radius]="shape.radius"
                [shadow]="shape.shadow"
                class="w-48"
              >
                <img
                  src="/assets/images/media-frame-demo.png"
                  [alt]="shape.label + ' shape demo'"
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
export class MediaFrameShape {
  protected readonly shapeExampleCode = `<div nbMediaFrame ratio="1/1" tone="yellow" radius="none" shadow="none" class="w-48">
  <img src="/..." alt="Sharp" />
</div>

<div nbMediaFrame ratio="1/1" tone="lavender" radius="lg" shadow="md" class="w-48">
  <img src="/..." alt="Poster" />
</div>

<div nbMediaFrame ratio="1/1" tone="pink" radius="full" shadow="hard" class="w-48">
  <img src="/..." alt="Portrait" />
</div>`;

  protected readonly shapes = [
    {
      label: 'Sharp',
      description: 'Hard edges, no shadow - raw brutalist style',
      radius: 'none',
      shadow: 'none',
      tone: 'yellow',
    },
    {
      label: 'Poster',
      description: 'Rounded corners with a soft offset shadow',
      radius: 'lg',
      shadow: 'md',
      tone: 'lavender',
    },
    {
      label: 'Portrait',
      description: 'Fully circular with a bold brutalist drop shadow',
      radius: 'full',
      shadow: 'hard',
      tone: 'pink',
    },
  ] satisfies readonly MediaFrameShapeDemo[];
}
