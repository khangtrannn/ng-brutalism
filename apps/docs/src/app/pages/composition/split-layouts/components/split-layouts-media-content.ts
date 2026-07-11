import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbChip,
  NbCluster,
  NbDisplay,
  NbSplit,
  NbStack,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-composition-split-layouts-media-content',
  imports: [
    DocsExample,
    NbSplit,
    NbSurface,
    NbStack,
    NbCluster,
    NbButton,
    NbChip,
    NbText,
    NbDisplay,
  ],
  template: `
    <section id="media-content" class="scroll-mt-32">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Media / content split
      </h2>
      <p class="mb-6 text-base font-medium">
        Equal columns - a media placeholder on the left and rich content on
        the right. Classic recipe card or feature block pattern.
      </p>

      <docs-example [code]="mediaContentCode">
        <section nbSplit ratio="1:1" gap="lg" collapse="md" class="w-full">
          <div
            nbSurface
            tone="cream"
            padding="lg"
            radius="xl"
            shadow="hard"
            border="strong"
          >
            <div
              class="flex aspect-video items-center justify-center border-3 border-(--nb-border) bg-(--nb-mint) text-5xl font-black"
            >
              01
            </div>
          </div>

          <div nbStack gap="md">
            <h2
              nbDisplay
              size="sm"
              underline="bar"
              underlineGap="xs"
              class="inline-flex flex-col items-start"
              style="--nb-underline-width: 45%"
            >
              Recipe card
            </h2>
            <p nbText tone="muted">
              Use split layouts for visual/content compositions. The left
              side holds an image or media frame; the right holds structured
              content.
            </p>
            <div nbCluster gap="xs">
              <span nbChip tone="yellow">30 min</span>
              <span nbChip tone="mint">Easy</span>
              <span nbChip tone="pink">Vegan</span>
            </div>
            <button nbButton tone="black" size="sm">View recipe</button>
          </div>
        </section>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompositionSplitLayoutsMediaContent {
  protected readonly mediaContentCode = `<section nbSplit ratio="1:1" gap="lg" collapse="md">
  <div nbSurface tone="cream" padding="lg" radius="xl"
       shadow="hard" border="strong"
       class="grid aspect-video place-items-center text-5xl font-black">
    01
  </div>

  <div nbStack gap="md">
    <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Recipe card</h2>
    <p nbText tone="muted">
      Use split layouts for visual/content compositions.
    </p>
    <div nbCluster gap="xs">
      <span nbChip tone="yellow">30 min</span>
      <span nbChip tone="mint">Easy</span>
      <span nbChip tone="pink">Vegan</span>
    </div>
    <button nbButton tone="black" size="sm">View recipe</button>
  </div>
</section>`;
}
