import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCallout,
  NbChip,
  NbCluster,
  NbDisplay,
  NbSection,
  NbStack,
  NbSurface,
  type NbSectionAlign,
  type NbSectionBorder,
  type NbSectionBorderStyle,
  type NbSectionLayout,
  type NbSectionPadding,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

interface SectionPaddingDemo {
  readonly value: NbSectionPadding;
  readonly label: string;
}

interface SectionBorderDemo {
  readonly value: NbSectionBorder;
  readonly label: string;
  readonly hint: string;
}

interface SectionBorderStyleDemo {
  readonly value: NbSectionBorderStyle;
  readonly label: string;
}

interface SectionLayoutDemo {
  readonly value: NbSectionLayout;
  readonly align: NbSectionAlign;
  readonly label: string;
  readonly hint: string;
}

@Component({
  selector: 'docs-section-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    NbButton,
    NbCallout,
    NbChip,
    NbCluster,
    NbDisplay,
    NbSection,
    NbStack,
    NbSurface,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Section</p>
          <h1>Section</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code class="font-mono">nbSection</code> for the internal regions
            of a card — headers, body blocks, and footers. It replaces ad-hoc
            <code class="font-mono">border-t-2 px-6 py-6</code> wrappers with a
            small declarative primitive for padding, border side, and inline
            layout.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">6</span>
            <span class="nb-stat-tile__label">Paddings</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">8</span>
            <span class="nb-stat-tile__label">Border sides</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Layouts</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/section"
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
            clip
            class="w-full max-w-xl"
          >
            <div
              nbSection
              border="bottom"
              padding="lg"
              layout="between"
              align="center"
            >
              <div nbStack gap="xs">
                <span class="font-mono text-xs font-black uppercase">
                  Project
                </span>
                <h2 nbDisplay class="mb-0! [--nb-display-size:2rem]">
                  Alpha Launch
                </h2>
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
              border="top"
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

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Add <code class="font-mono">nbSection</code> to the wrapper around any
          region inside a surface or card. Pair it with
          <code class="font-mono">padding</code>,
          <code class="font-mono">border</code>, and
          <code class="font-mono">layout</code> to compose headers, content, and
          footers without ad-hoc utility classes.
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="paddings">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Paddings</h2>
        <p class="mb-4 font-medium">
          Padding is the most common knob. Inline layouts (headers, footers,
          toolbars) usually take <code class="font-mono">md</code> to
          <code class="font-mono">lg</code>; hero rows take
          <code class="font-mono">xl</code>.
        </p>
        <docs-example [code]="paddingsExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            @for (padding of paddings; track padding.value) {
              <div nbSurface tone="white" shadow="sm">
                <div
                  class="border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2 font-mono text-xs font-black uppercase"
                >
                  padding {{ padding.label }}
                </div>
                <div nbSection [padding]="padding.value">
                  <div
                    class="grid h-12 place-items-center border-2 border-(--nb-border) bg-(--nb-yellow) font-mono text-xs font-black uppercase"
                  >
                    content
                  </div>
                </div>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="borders">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Borders</h2>
        <p class="mb-4 font-medium">
          Sections share <code class="font-mono">--nb-border</code> and
          <code class="font-mono">--nb-border-width</code> with the rest of the
          system, so a single side never goes out of sync. Use
          <code class="font-mono">block</code> or
          <code class="font-mono">inline</code> for two sides;
          <code class="font-mono">all</code> for a fully outlined region.
        </p>
        <docs-example [code]="bordersExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            @for (border of borders; track border.value) {
              <div nbSurface tone="cream" shadow="sm">
                <div
                  class="border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2 font-mono text-xs font-black uppercase"
                >
                  border {{ border.label }}
                </div>
                <div class="p-4">
                  <div nbSection padding="md" [border]="border.value">
                    <div
                      class="grid h-12 place-items-center border-2 border-(--nb-border) bg-(--nb-mint) px-3 font-mono text-xs font-black uppercase"
                    >
                      {{ border.hint }}
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="border-styles">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Border styles
        </h2>
        <docs-example [code]="borderStylesExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-3">
            @for (style of borderStyles; track style.value) {
              <div nbSurface tone="white" shadow="sm">
                <div
                  class="border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2 font-mono text-xs font-black uppercase"
                >
                  {{ style.label }}
                </div>
                <div class="p-4">
                  <div
                    nbSection
                    padding="md"
                    border="all"
                    [borderStyle]="style.value"
                  >
                    <div
                      class="grid h-12 place-items-center border-2 border-(--nb-border) bg-(--nb-lavender) px-3 font-mono text-xs font-black uppercase"
                    >
                      {{ style.label }} edge
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="layouts">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Layouts</h2>
        <p class="mb-4 font-medium">
          <code class="font-mono">layout="default"</code> keeps block flow.
          <code class="font-mono">layout="center"</code> and
          <code class="font-mono">layout="between"</code> switch to flex with
          sensible justify defaults — pair with
          <code class="font-mono">align</code> for cross-axis control.
        </p>
        <docs-example [code]="layoutsExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4">
            @for (layout of layouts; track layout.value) {
              <div nbSurface tone="white" shadow="sm">
                <div
                  class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2"
                >
                  <span class="font-mono text-xs font-black uppercase">
                    layout {{ layout.label }}
                  </span>
                  <span class="font-mono text-xs font-medium">
                    {{ layout.hint }}
                  </span>
                </div>
                <div
                  nbSection
                  padding="md"
                  [layout]="layout.value"
                  [align]="layout.align"
                  class="bg-(--nb-cream)"
                >
                  <span
                    class="border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-2 font-mono text-xs font-black uppercase"
                  >
                    Lead
                  </span>
                  <span
                    class="border-2 border-(--nb-border) bg-(--nb-pink) px-3 py-2 font-mono text-xs font-black text-white uppercase"
                  >
                    Trail
                  </span>
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
        <p class="mb-4 font-medium">
          Section pairs naturally with Surface (the outer shell) and Stack /
          Cluster (the inner rhythm). The mental model is:
          <code class="font-mono">Surface</code> owns the card,
          <code class="font-mono">Section</code> owns each region inside it.
        </p>
        <docs-example [code]="compositionExampleCode">
          <div
            nbSurface
            tone="white"
            shadow="hard"
            radius="lg"
            clip
            class="w-full max-w-2xl"
          >
            <div
              nbSection
              padding="lg"
              border="bottom"
              layout="between"
              align="center"
              class="bg-(--nb-cream)"
            >
              <div nbStack gap="xs">
                <span class="font-mono text-xs font-black uppercase">
                  Pro plan
                </span>
                <h2 nbDisplay class="mb-0! [--nb-display-size:2rem]">
                  Design Sprint
                </h2>
              </div>
              <span nbChip tone="lavender">Annual</span>
            </div>

            <div nbSection padding="lg">
              <div nbStack gap="md">
                <p class="max-w-lg font-medium">
                  Three weeks of guided sessions, live critiques, and a final
                  brutalist showcase. Bring your most ambitious card layout —
                  we'll ship it together.
                </p>
                <div nbCluster gap="sm">
                  <span nbChip tone="mint">12 seats</span>
                  <span nbChip tone="yellow">Cohort starts Jun 3</span>
                </div>
              </div>
            </div>

            <div
              nbSection
              border="top"
              padding="lg"
              layout="between"
              align="center"
            >
              <div nbCallout tone="yellow" shadow="hard">$799</div>
              <button nbButton>Enroll</button>
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
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                  Input
                </th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                  Type
                </th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">
                  Default
                </th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  padding
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'md'
                </td>
                <td class="px-4 py-3">Inner padding for the section.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  border
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'none' | 'top' | 'right' | 'bottom' | 'left' | 'block' |
                  'inline' | 'all'
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'none'
                </td>
                <td class="px-4 py-3">
                  Which side(s) render a border. Uses
                  <code class="font-mono">--nb-border</code> and
                  <code class="font-mono">--nb-border-width</code>.
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  borderStyle
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'solid' | 'dashed' | 'dotted'
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'solid'
                </td>
                <td class="px-4 py-3">
                  Stroke style applied to the active border side(s).
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  layout
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'default' | 'center' | 'between'
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'default'
                </td>
                <td class="px-4 py-3">
                  <code class="font-mono">default</code> keeps block flow,
                  <code class="font-mono">center</code> and
                  <code class="font-mono">between</code> switch to flex with the
                  matching justify.
                </td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  align
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'stretch' | 'start' | 'center' | 'end'
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  'stretch'
                </td>
                <td class="px-4 py-3">
                  Cross-axis alignment; only applies when
                  <code class="font-mono">layout</code> is
                  <code class="font-mono">center</code> or
                  <code class="font-mono">between</code>.
                </td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  flush
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  boolean
                </td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">
                  false
                </td>
                <td class="px-4 py-3">
                  Pulls the section out to its parent's edges via negative
                  inline margins. Escape hatch for advanced card layouts.
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
export default class SectionPage {
  protected readonly importCode = `import { NbSection } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbSurface tone="cream" shadow="hard" radius="lg" clip>
  <div nbSection border="bottom" padding="lg" layout="between" align="center">
    <h2 nbDisplay>Alpha Launch</h2>
    <span nbChip tone="mint">Active</span>
  </div>

  <div nbSection padding="lg">
    <p>Section owns the inner regions of a card.</p>
  </div>

  <div nbSection border="top" padding="lg" layout="between" align="center">
    <span>12 collaborators</span>
    <button nbButton>Open project</button>
  </div>
</div>`;

  protected readonly paddingsExampleCode = `<div nbSection padding="none">...</div>
<div nbSection padding="xs">...</div>
<div nbSection padding="sm">...</div>
<div nbSection padding="md">...</div>
<div nbSection padding="lg">...</div>
<div nbSection padding="xl">...</div>`;

  protected readonly bordersExampleCode = `<div nbSection border="top">...</div>
<div nbSection border="right">...</div>
<div nbSection border="bottom">...</div>
<div nbSection border="left">...</div>
<div nbSection border="block">...</div>
<div nbSection border="inline">...</div>
<div nbSection border="all">...</div>`;

  protected readonly borderStylesExampleCode = `<div nbSection border="all" borderStyle="solid">...</div>
<div nbSection border="all" borderStyle="dashed">...</div>
<div nbSection border="all" borderStyle="dotted">...</div>`;

  protected readonly layoutsExampleCode = `<div nbSection layout="default">...</div>
<div nbSection layout="center" align="center">...</div>
<div nbSection layout="between" align="center">...</div>`;

  protected readonly compositionExampleCode = `<div nbSurface tone="white" shadow="hard" radius="lg" clip>
  <div nbSection padding="lg" border="bottom" layout="between" align="center">
    <h2 nbDisplay>Design Sprint</h2>
    <span nbChip tone="lavender">Annual</span>
  </div>

  <div nbSection padding="lg">
    <p>Three weeks of guided sessions and a final brutalist showcase.</p>
  </div>

  <div nbSection border="top" padding="lg" layout="between" align="center">
    <div nbCallout tone="yellow" shadow="hard">$799</div>
    <button nbButton>Enroll</button>
  </div>
</div>`;

  protected readonly paddings = [
    { value: 'none', label: 'none' },
    { value: 'xs', label: 'xs' },
    { value: 'sm', label: 'sm' },
    { value: 'md', label: 'md' },
    { value: 'lg', label: 'lg' },
    { value: 'xl', label: 'xl' },
  ] satisfies readonly SectionPaddingDemo[];

  protected readonly borders = [
    { value: 'top', label: 'top', hint: 'line above' },
    { value: 'right', label: 'right', hint: 'line on the right' },
    { value: 'bottom', label: 'bottom', hint: 'line below' },
    { value: 'left', label: 'left', hint: 'line on the left' },
    { value: 'block', label: 'block', hint: 'top + bottom' },
    { value: 'inline', label: 'inline', hint: 'left + right' },
    { value: 'all', label: 'all', hint: 'fully outlined' },
  ] satisfies readonly SectionBorderDemo[];

  protected readonly borderStyles = [
    { value: 'solid', label: 'solid' },
    { value: 'dashed', label: 'dashed' },
    { value: 'dotted', label: 'dotted' },
  ] satisfies readonly SectionBorderStyleDemo[];

  protected readonly layouts = [
    {
      value: 'default',
      align: 'stretch',
      label: 'default',
      hint: 'block flow',
    },
    {
      value: 'center',
      align: 'center',
      label: 'center',
      hint: 'flex, justify-content: center',
    },
    {
      value: 'between',
      align: 'center',
      label: 'between',
      hint: 'flex, justify-content: space-between',
    },
  ] satisfies readonly SectionLayoutDemo[];
}
