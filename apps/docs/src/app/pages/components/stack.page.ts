import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbDisplay,
  NbMediaItem,
  NbStack,
  NbSurface,
  type NbStackAlign,
  type NbStackDivider,
  type NbStackGap,
  type NbStackJustify,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

interface StackGapDemo {
  readonly value: NbStackGap;
  readonly label: string;
}

interface StackAlignDemo {
  readonly value: NbStackAlign;
  readonly label: string;
}

interface StackJustifyDemo {
  readonly value: NbStackJustify;
  readonly label: string;
}

interface StackDividerDemo {
  readonly value: NbStackDivider;
  readonly label: string;
}

@Component({
  selector: 'docs-stack-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    NbButton,
    NbDisplay,
    NbMediaItem,
    NbStack,
    NbSurface,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Stack</p>
          <h1>Stack</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code class="font-mono">nbStack</code> whenever children should
            flow vertically with consistent spacing. It turns raw
            <code class="font-mono">flex flex-col gap-*</code> layout
            boilerplate into a small declarative primitive for vertical rhythm.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">7</span>
            <span class="nb-stat-tile__label">Gaps</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Alignments</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">Dividers</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/stack"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div nbStack gap="lg" class="max-w-md p-4">
            <h2 nbDisplay>Build loud.</h2>

            <p class="text-base font-medium">
              Stack gives you brutalist vertical rhythm without repeating flex
              and gap classes everywhere.
            </p>

            <button nbButton>Stay sharp</button>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Add <code class="font-mono">nbStack</code> to the parent that owns the
          vertical flow. Use <code class="font-mono">gap</code> for rhythm,
          <code class="font-mono">align</code> for cross-axis alignment, and
          <code class="font-mono">justify</code> when the stack has a fixed
          height.
        </p>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="gaps">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Gaps</h2>
        <docs-example [code]="gapsExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            @for (gap of gaps; track gap.value) {
            <div nbSurface shadow="sm" class="p-4">
              <div nbStack [gap]="gap.value">
                <span class="font-mono text-xs font-black uppercase">{{
                  gap.label
                }}</span>
                <span
                  class="h-8 border-2 border-(--nb-border) bg-(--nb-yellow)"
                ></span>
                <span
                  class="h-8 border-2 border-(--nb-border) bg-(--nb-mint)"
                ></span>
                <span
                  class="h-8 border-2 border-(--nb-border) bg-(--nb-pink)"
                ></span>
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
            <div nbSurface tone="cream" shadow="sm" class="p-4">
              <div nbStack gap="sm" [align]="align.value">
                <span class="font-mono text-xs font-black uppercase">{{
                  align.label
                }}</span>
                <span
                  class="w-18 border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-2 text-center font-black"
                  >A</span
                >
                <span
                  class="w-28 border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-2 text-center font-black"
                  >B</span
                >
              </div>
            </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="justification">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold text-black!">
          Justification
        </h2>
        <docs-example [code]="justificationExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            @for (justify of justifications; track justify.value) {
            <div nbSurface tone="white" shadow="sm" class="h-56 p-4">
              <div
                nbStack
                gap="sm"
                align="start"
                [justify]="justify.value"
                class="h-full"
              >
                <span class="font-mono text-xs font-black uppercase">{{
                  justify.label
                }}</span>
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-2 font-black"
                  >One</span
                >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-blue) px-3 py-2 font-black"
                  >Two</span
                >
              </div>
            </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="dividers">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Dividers
        </h2>
        <p class="mb-4 font-medium">
          Use <code class="font-mono">divider</code> for simple separated lists.
          The divider padding follows the stack gap.
        </p>
        <docs-example [code]="dividerExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
            @for (divider of dividers; track divider.value) {
            <div nbSurface tone="yellow" radius="lg" shadow="hard" class="p-4">
              <div nbStack gap="md" [divider]="divider.value">
                <nb-media-item
                  icon="/tokyo-city-escape/central-locations.png"
                  title="Central Locations"
                />
                <nb-media-item
                  icon="/tokyo-city-escape/guided-experiences.png"
                  title="Guided Experiences"
                />
                <nb-media-item
                  icon="/tokyo-city-escape/24-7-support.png"
                  title="24/7 Support"
                />
              </div>
            </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="responsive">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Responsive Gap
        </h2>
        <p class="mb-4 font-medium">
          Stack keeps the API focused. For breakpoint changes, override the CSS
          variable with Tailwind arbitrary properties.
        </p>
        <docs-code-block [code]="responsiveExampleCode" />
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-180 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Input
                </th>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Type
                </th>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Default
                </th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  gap
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'md'
                </td>
                <td class="px-4 py-3">
                  Vertical spacing between stack children.
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  align
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'stretch' | 'start' | 'center' | 'end'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'stretch'
                </td>
                <td class="px-4 py-3">
                  Cross-axis alignment for the stack children.
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  justify
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'start' | 'center' | 'end' | 'between'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'start'
                </td>
                <td class="px-4 py-3">
                  Main-axis distribution when the stack has extra height.
                </td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  divider
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'none' | 'solid' | 'dashed'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'none'
                </td>
                <td class="px-4 py-3">
                  Optional border between adjacent children.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StackPage {
  protected readonly importCode = `import { NbStack } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbStack gap="lg">
  <h2 nbDisplay>Build loud.</h2>

  <p>
    Stack gives you brutalist vertical rhythm without repeating flex and gap
    classes everywhere.
  </p>

  <button nbButton>Stay sharp</button>
</div>`;

  protected readonly gapsExampleCode = `<div nbStack gap="none">...</div>
<div nbStack gap="xs">...</div>
<div nbStack gap="sm">...</div>
<div nbStack gap="md">...</div>
<div nbStack gap="lg">...</div>
<div nbStack gap="xl">...</div>
<div nbStack gap="2xl">...</div>`;

  protected readonly alignmentExampleCode = `<div nbStack gap="sm" align="stretch">...</div>
<div nbStack gap="sm" align="start">...</div>
<div nbStack gap="sm" align="center">...</div>
<div nbStack gap="sm" align="end">...</div>`;

  protected readonly justificationExampleCode = `<div nbStack justify="start" class="h-56">...</div>
<div nbStack justify="center" class="h-56">...</div>
<div nbStack justify="end" class="h-56">...</div>
<div nbStack justify="between" class="h-56">...</div>`;

  protected readonly dividerExampleCode = `<div nbStack gap="md" divider="dashed">
  <nb-media-item icon="/icons/location.svg" title="Central Locations" />
  <nb-media-item icon="/icons/camera.svg" title="Guided Experiences" />
  <nb-media-item icon="/icons/support.svg" title="24/7 Support" />
</div>`;

  protected readonly responsiveExampleCode = `<div
  nbStack
  gap="md"
  class="md:[--nb-stack-gap:1.5rem]"
>
  ...
</div>`;

  protected readonly gaps = [
    { value: 'none', label: 'none' },
    { value: 'xs', label: 'xs' },
    { value: 'sm', label: 'sm' },
    { value: 'md', label: 'md' },
    { value: 'lg', label: 'lg' },
    { value: 'xl', label: 'xl' },
    { value: '2xl', label: '2xl' },
  ] satisfies readonly StackGapDemo[];

  protected readonly alignments = [
    { value: 'stretch', label: 'stretch' },
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
  ] satisfies readonly StackAlignDemo[];

  protected readonly justifications = [
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
    { value: 'between', label: 'between' },
  ] satisfies readonly StackJustifyDemo[];

  protected readonly dividers = [
    { value: 'solid', label: 'solid' },
    { value: 'dashed', label: 'dashed' },
  ] satisfies readonly StackDividerDemo[];
}
