import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCluster, NbMediaFrame } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-media-frame-preview',
  imports: [NbMediaFrame, NbCluster, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="flex flex-col gap-6 p-4">
          <div nbMediaFrame ratio="16/9" tone="lavender" shadow="hard">
            <img
              src="/assets/images/media-frame-demo.png"
              alt="Neo-brutalist media frame landscape"
            />
          </div>
          <div nbCluster justify="center">
            <div
              nbMediaFrame
              ratio="1/1"
              tone="pink"
              radius="full"
              class="w-48"
            >
              <img
                src="/assets/images/media-frame-demo.png"
                alt="Neo-brutalist media frame circle"
              />
            </div>
            <div
              nbMediaFrame
              ratio="1/1"
              tone="mint"
              shadow="hard"
              class="w-48"
            >
              <img
                src="/assets/images/media-frame-demo.png"
                alt="Neo-brutalist media frame square"
              />
            </div>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaFramePreview {
  protected readonly defaultExampleCode = `<div nbMediaFrame ratio="16/9" tone="lavender" shadow="hard">
  <img src="/assets/images/media-frame-demo.png" alt="..." />
</div>

<div nbMediaFrame ratio="1/1" tone="pink" radius="full" class="w-48">
  <img src="/assets/images/media-frame-demo.png" alt="..." />
</div>

<div nbMediaFrame ratio="1/1" tone="mint" shadow="hard" class="w-48">
  <img src="/assets/images/media-frame-demo.png" alt="..." />
</div>`;
}
