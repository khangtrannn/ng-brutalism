import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMediaItem, type NbMediaItemOrientation } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface OrientationDemo {
  readonly value: NbMediaItemOrientation;
  readonly label: string;
}

@Component({
  selector: 'docs-media-item-orientations',
  imports: [NbMediaItem, DocsExample],
  template: `
    <section id="orientations">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Orientations
      </h2>
      <docs-example [code]="orientationsExampleCode">
        <div class="flex flex-wrap gap-8 p-4">
          @for (orientation of orientations; track orientation.value) {
          <div class="flex flex-col gap-2">
            <span class="text-xs font-black uppercase opacity-60">{{
              orientation.label
            }}</span>
            <nb-media-item
              [orientation]="orientation.value"
              variant="boxed"
              size="md"
              tone="lavender"
              icon="/icons/camera.png"
              iconAlt="Camera"
              title="Travel Photos"
              description="128 shots"
            />
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemOrientations {
  protected readonly orientationsExampleCode = `<nb-media-item
  orientation="horizontal"
  variant="boxed"
  size="md"
  tone="lavender"
  icon="/icons/camera.png"
  iconAlt="Camera"
  title="Travel Photos"
  description="128 shots"
/>

<nb-media-item
  orientation="vertical"
  variant="boxed"
  size="md"
  tone="lavender"
  icon="/icons/camera.png"
  iconAlt="Camera"
  title="Travel Photos"
  description="128 shots"
/>`;

  protected readonly orientations = [
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'vertical', label: 'Vertical' },
  ] satisfies readonly OrientationDemo[];
}
