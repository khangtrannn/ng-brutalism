import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbDisplay,
  NbSplit,
  NbStack,
  NbSurface,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-split-preview',
  imports: [NbButton, NbDisplay, NbSplit, NbStack, NbSurface, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div
          nbSurface
          tone="cream"
          shadow="hard"
          radius="lg"
          class="w-full max-w-4xl"
        >
          <div nbSplit ratio="2:1" gap="xl" padding="lg">
            <div nbStack gap="md">
              <span
                class="w-max border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-1 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]"
                >Main</span
              >
              <h2 nbDisplay>Tokyo City Escape</h2>
              <p class="max-w-xl text-base font-medium">
                A flexible content block for descriptions, product stories,
                profile bios, course details, and event summaries.
              </p>
            </div>

            <div nbStack gap="md" align="start">
              <span
                class="border-2 border-(--nb-border) bg-(--nb-yellow) px-4 py-2 font-black shadow-[4px_4px_0_0_var(--nb-shadow)]"
                >$799</span
              >
              <button nbButton>Book Trip</button>
            </div>
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPreview {
  protected readonly defaultExampleCode = `<div nbSplit ratio="2:1" gap="xl" padding="lg">
  <div nbStack gap="md">
    <h2 nbDisplay>Tokyo City Escape</h2>
    <p>Main content</p>
  </div>

  <div nbStack gap="md" align="start">
    <span>$799</span>
    <button nbButton>Book Trip</button>
  </div>
</div>`;
}
