import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbSplit,
  NbSurface,
  type NbSplitGap,
  type NbSplitPadding,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface SplitGapDemo {
  readonly value: NbSplitGap;
  readonly label: string;
}

interface SplitPaddingDemo {
  readonly value: NbSplitPadding;
  readonly label: string;
}

@Component({
  selector: 'docs-split-gaps-padding',
  imports: [NbSplit, NbSurface, DocsExample],
  template: `
    <section id="gaps-padding">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Gaps and Padding
      </h2>
      <docs-example [code]="spacingExampleCode">
        <div class="grid w-full max-w-3xl shrink-0 gap-6">
          <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            @for (gap of gaps; track gap.value) {
            <div nbSurface tone="white" shadow="sm">
              <div nbSplit gap="sm" padding="sm" collapse="none">
                <span class="font-mono text-xs font-black uppercase"
                  >gap {{ gap.label }}</span
                >
                <div nbSplit [gap]="gap.value" collapse="none">
                  <span
                    class="h-9 border-2 border-(--nb-border) bg-(--nb-pink)"
                  ></span>
                  <span
                    class="h-9 border-2 border-(--nb-border) bg-(--nb-blue)"
                  ></span>
                </div>
              </div>
            </div>
            }
          </div>

          <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            @for (padding of paddings; track padding.value) {
            <div nbSurface tone="cream" shadow="sm" class="h-28">
              <div
                nbSplit
                [padding]="padding.value"
                gap="sm"
                collapse="none"
                class="h-full bg-(--nb-cream)"
              >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-background) p-2 font-mono text-xs font-black uppercase"
                  >{{ padding.label }}</span
                >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-mint) p-2 font-black"
                  >Pad</span
                >
              </div>
            </div>
            }
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitGapsPadding {
  protected readonly spacingExampleCode = `<div nbSplit gap="xl" padding="lg">
  <div>Main</div>
  <div>Aside</div>
</div>`;

  protected readonly gaps = [
    { value: 'none', label: 'none' },
    { value: 'xs', label: 'xs' },
    { value: 'sm', label: 'sm' },
    { value: 'md', label: 'md' },
    { value: 'lg', label: 'lg' },
    { value: 'xl', label: 'xl' },
    { value: '2xl', label: '2xl' },
  ] satisfies readonly SplitGapDemo[];

  protected readonly paddings = [
    { value: 'none', label: 'none' },
    { value: 'sm', label: 'sm' },
    { value: 'md', label: 'md' },
    { value: 'lg', label: 'lg' },
    { value: 'xl', label: 'xl' },
  ] satisfies readonly SplitPaddingDemo[];
}
