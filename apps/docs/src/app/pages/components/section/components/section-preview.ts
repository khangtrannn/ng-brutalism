import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbChip,
  NbDisplay,
  NbSection,
  NbStack,
  NbSurface,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-section-preview',
  imports: [
    NbButton,
    NbChip,
    NbDisplay,
    NbSection,
    NbStack,
    NbSurface,
    DocsExample,
  ],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div
          nbSurface
          tone="cream"
          shadow="hard"
          radius="lg"
          clip
          class="w-full max-w-xl"
        >
          <div
            nbSection
            divider="bottom"
            padding="lg"
            layout="between"
            align="center"
          >
            <div nbStack gap="xs">
              <span class="font-mono text-xs font-black uppercase">
                Project
              </span>
              <h2 nbDisplay class="[--nb-display-size:2rem]">Alpha Launch</h2>
            </div>
            <span nbChip tone="mint">Active</span>
          </div>

          <div nbSection padding="lg">
            <p class="font-medium">
              Section owns the inner regions of a card. Drop headers, body
              blocks, and footers without rewriting padding or border utility
              classes every time.
            </p>
          </div>

          <div
            nbSection
            divider="top"
            padding="lg"
            layout="between"
            align="center"
          >
            <span class="font-mono text-xs font-black uppercase">
              12 collaborators
            </span>
            <button nbButton>Open project</button>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPreview {
  protected readonly defaultExampleCode = `<div nbSurface tone="cream" shadow="hard" radius="lg" clip>
  <div nbSection divider="bottom" padding="lg" layout="between" align="center">
    <h2 nbDisplay>Alpha Launch</h2>
    <span nbChip tone="mint">Active</span>
  </div>

  <div nbSection padding="lg">
    <p>Section owns the inner regions of a card.</p>
  </div>

  <div nbSection divider="top" padding="lg" layout="between" align="center">
    <span>12 collaborators</span>
    <button nbButton>Open project</button>
  </div>
</div>`;
}
