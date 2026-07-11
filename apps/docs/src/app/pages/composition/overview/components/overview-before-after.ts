import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-overview-before-after',
  imports: [NbStack, DocsCodeBlock],
  template: `
    <section id="before-after" nbStack gap="md" class="scroll-mt-32 w-full">
      <h2 data-docs-heading class="text-2xl font-bold">Before / after</h2>
      <p class="text-base font-medium">
        The same brutalist card - one written with raw Tailwind classes, one
        with composition primitives.
      </p>
      <div nbStack class="w-full" gap="2xl" align="start">
        <div nbStack gap="xs" class="w-full">
          <p class="font-mono text-xs font-bold uppercase opacity-70">
            Before - class soup
          </p>
          <docs-code-block title="HTML" [code]="beforeCode" />
        </div>
        <div nbStack class="w-full" gap="xs">
          <p class="font-mono text-xs font-bold uppercase opacity-70">
            After - composition
          </p>
          <docs-code-block title="Template" [code]="afterCode" />
        </div>
      </div>
      <p class="text-base font-bold">Less class soup. More composition.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionOverviewBeforeAfter {
  protected readonly beforeCode = `<div
  class="rounded-2xl border-4 border-black
         bg-yellow-300 p-6
         shadow-[8px_8px_0_#000]"
>
  <div
    class="flex items-center justify-between
           border-b-4 border-black pb-4"
  >
    <h2>Launch card</h2>
    <span>v0.2.0</span>
  </div>

  <div class="py-4">
    <p>Lots of repeated class decisions.</p>
  </div>
</div>`;

  protected readonly afterCode = `<article nbSurface tone="yellow" radius="xl"
         shadow="hard" clip>
  <header nbSection padding="lg" divider="bottom"
          layout="between" align="center">
    <h2 nbTitle>Launch card</h2>
    <span nbChip tone="pink">v0.2.0</span>
  </header>

  <div nbSection padding="lg">
    <p nbText>Same structure, clearer composition.</p>
  </div>
</article>`;
}
