import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-media-frame-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-5 max-w-3xl font-medium">
        Add the directive to the element that owns the frame. Captions,
        labels, badges, and actions belong outside the primitive.
      </p>
      <docs-code-block
        class="block mb-5"
        title="Import"
        [code]="importCode"
      />
      <docs-code-block title="Template" [code]="usageCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaFrameUsage {
  protected readonly importCode = `import { NbMediaFrame } from '@ng-brutalism/ui';`;

  protected readonly usageCode = `<div nbMediaFrame>
  <img src="/..." alt="" />
</div>

<div nbMediaFrame ratio="16/9" tone="lavender">
  <video src="/..." />
</div>

<div nbMediaFrame ratio="1/1" fit="cover">
  <img src="/profile.png" alt="Profile" />
</div>`;
}
