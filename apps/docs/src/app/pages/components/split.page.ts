import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCluster,
  NbDisplay,
  NbSplit,
  NbStack,
  NbSurface,
  type NbSplitAlign,
  type NbSplitCollapse,
  type NbSplitGap,
  type NbSplitPadding,
  type NbSplitRatio,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

interface SplitRatioDemo {
  readonly value: NbSplitRatio;
  readonly label: string;
}

interface SplitGapDemo {
  readonly value: NbSplitGap;
  readonly label: string;
}

interface SplitPaddingDemo {
  readonly value: NbSplitPadding;
  readonly label: string;
}

interface SplitCollapseDemo {
  readonly value: NbSplitCollapse;
  readonly label: string;
}

interface SplitAlignDemo {
  readonly value: NbSplitAlign;
  readonly label: string;
}

@Component({
  selector: 'docs-split-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    NbButton,
    NbCluster,
    NbDisplay,
    NbSplit,
    NbStack,
    NbSurface,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Split</p>
          <h1>Split</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code class="font-mono">nbSplit</code> for two-column
            main-and-aside compositions. It replaces custom grid column strings
            with ratio, gap, padding, alignment, and responsive collapse inputs.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">5</span>
            <span class="nb-stat-tile__label">Ratios</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Collapse</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">Children</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/split"
          />
        </div>
      </header>

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
                <h2 nbDisplay class="mb-0!">Tokyo City Escape</h2>
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

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Add <code class="font-mono">nbSplit</code> to the parent that owns two
          regions. Use <code class="font-mono">ratio</code> to size the columns
          and <code class="font-mono">collapse</code> to choose when they stack.
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="ratios">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Ratios</h2>
        <docs-example [code]="ratiosExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4">
            @for (ratio of ratios; track ratio.value) {
              <div nbSurface shadow="sm" class="p-3">
                <div nbSplit [ratio]="ratio.value" gap="sm" collapse="none">
                  <span
                    class="border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-4 text-center font-mono text-xs font-black uppercase"
                    >{{ ratio.label }} main</span
                  >
                  <span
                    class="border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-4 text-center font-mono text-xs font-black uppercase"
                    >Aside</span
                  >
                </div>
              </div>
            }
          </div>
        </docs-example>
      </section>

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
                      <span class="h-9 border-2 border-(--nb-border) bg-(--nb-pink)"></span>
                      <span class="h-9 border-2 border-(--nb-border) bg-(--nb-blue)"></span>
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
                    <span class="border-2 border-(--nb-border) bg-(--nb-background) p-2 font-mono text-xs font-black uppercase"
                      >{{ padding.label }}</span
                    >
                    <span class="border-2 border-(--nb-border) bg-(--nb-mint) p-2 font-black"
                      >Pad</span
                    >
                  </div>
                </div>
              }
            </div>
          </div>
        </docs-example>
      </section>

      <section id="collapse">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Collapse
        </h2>
        <p class="mb-4 font-medium">
          Split stacks by default until the <code class="font-mono">md</code>
          breakpoint. Use <code class="font-mono">collapse="none"</code> for a
          permanent two-column split.
        </p>
        <docs-example [code]="collapseExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
            @for (collapse of collapses; track collapse.value) {
              <div nbSurface tone="yellow" shadow="sm" class="p-4">
                <div nbStack gap="sm">
                  <span class="font-mono text-xs font-black uppercase">{{
                    collapse.label
                  }}</span>
                  <div nbSplit gap="sm" [collapse]="collapse.value">
                    <span class="border-2 border-(--nb-border) bg-(--nb-mint) p-3 font-black"
                      >Main</span
                    >
                    <span class="border-2 border-(--nb-border) bg-(--nb-lavender) p-3 font-black"
                      >Aside</span
                    >
                  </div>
                </div>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="alignment">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Alignment
        </h2>
        <docs-example [code]="alignmentExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            @for (align of alignments; track align.value) {
              <div nbSurface tone="white" shadow="sm" class="p-4">
                <div nbSplit gap="sm" [align]="align.value" collapse="none">
                  <span class="min-h-24 border-2 border-(--nb-border) bg-(--nb-yellow) p-3 font-mono text-xs font-black uppercase"
                    >{{ align.label }}</span
                  >
                  <span class="border-2 border-(--nb-border) bg-(--nb-mint) p-3 font-black"
                    >Aside</span
                  >
                </div>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="composition">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Composition
        </h2>
        <docs-example [code]="compositionExampleCode">
          <div
            nbSurface
            tone="cream"
            shadow="hard"
            radius="lg"
            class="w-full max-w-3xl"
          >
            <div nbSplit ratio="2:1" gap="xl" padding="lg" collapse="md">
              <div nbStack gap="lg">
                <div nbCluster gap="sm">
                  <span
                    class="border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-1 font-mono text-xs font-black uppercase"
                    >Course</span
                  >
                  <span
                    class="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-1 font-mono text-xs font-black uppercase"
                    >Intermediate</span
                  >
                </div>

                <div nbStack gap="sm">
                  <h3 class="mb-0 text-3xl font-black">Design Systems Sprint</h3>
                  <p class="max-w-lg font-medium">
                    Stack and Cluster handle local rhythm. Split handles the
                    larger main-and-aside card structure.
                  </p>
                </div>
              </div>

              <div nbStack gap="md" align="start">
                <span class="border-2 border-(--nb-border) bg-(--nb-yellow) px-4 py-2 font-black shadow-[4px_4px_0_0_var(--nb-shadow)]"
                  >12 seats</span
                >
                <button nbButton>Enroll</button>
              </div>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-180 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Input</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Type</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">ratio</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'1:1' | '2:1' | '3:1' | '1:2' | '1:3'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'1:1'</td>
                <td class="px-4 py-3">Column relationship between main and aside content.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">gap</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'lg'</td>
                <td class="px-4 py-3">Spacing between the two split regions.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">padding</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none'</td>
                <td class="px-4 py-3">Inner padding for the split container.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">collapse</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'sm' | 'md' | 'lg'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'md'</td>
                <td class="px-4 py-3">Breakpoint where the layout switches from stacked to two columns.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">align</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'start' | 'center' | 'end' | 'stretch'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'stretch'</td>
                <td class="px-4 py-3">Cross-axis alignment for the two regions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SplitPage {
  protected readonly importCode = `import { NbSplit } from '@ng-brutalism/ui';`;

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

  protected readonly ratiosExampleCode = `<div nbSplit ratio="1:1">...</div>
<div nbSplit ratio="2:1">...</div>
<div nbSplit ratio="3:1">...</div>
<div nbSplit ratio="1:2">...</div>
<div nbSplit ratio="1:3">...</div>`;

  protected readonly spacingExampleCode = `<div nbSplit gap="xl" padding="lg">
  <div>Main</div>
  <div>Aside</div>
</div>`;

  protected readonly collapseExampleCode = `<div nbSplit collapse="none">...</div>
<div nbSplit collapse="sm">...</div>
<div nbSplit collapse="md">...</div>
<div nbSplit collapse="lg">...</div>`;

  protected readonly alignmentExampleCode = `<div nbSplit align="start">...</div>
<div nbSplit align="center">...</div>
<div nbSplit align="end">...</div>
<div nbSplit align="stretch">...</div>`;

  protected readonly compositionExampleCode = `<div nbSplit ratio="2:1" gap="xl" padding="lg" collapse="md">
  <div nbStack gap="lg">
    ...
  </div>

  <div nbStack gap="md" align="start">
    ...
  </div>
</div>`;

  protected readonly ratios = [
    { value: '1:1', label: '1:1' },
    { value: '2:1', label: '2:1' },
    { value: '3:1', label: '3:1' },
    { value: '1:2', label: '1:2' },
    { value: '1:3', label: '1:3' },
  ] satisfies readonly SplitRatioDemo[];

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

  protected readonly collapses = [
    { value: 'none', label: 'none' },
    { value: 'sm', label: 'sm' },
    { value: 'md', label: 'md' },
    { value: 'lg', label: 'lg' },
  ] satisfies readonly SplitCollapseDemo[];

  protected readonly alignments = [
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
    { value: 'stretch', label: 'stretch' },
  ] satisfies readonly SplitAlignDemo[];
}
