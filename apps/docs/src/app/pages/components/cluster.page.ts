import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbChip,
  NbCluster,
  NbDisplay,
  NbMediaItem,
  NbMediaItemTitle,
  NbSurface,
  type NbClusterAlign,
  type NbClusterDivider,
  type NbClusterGap,
  type NbClusterJustify,
  type NbClusterWrap,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

interface ClusterGapDemo {
  readonly value: NbClusterGap;
  readonly label: string;
}

interface ClusterAlignDemo {
  readonly value: NbClusterAlign;
  readonly label: string;
}

interface ClusterJustifyDemo {
  readonly value: NbClusterJustify;
  readonly label: string;
}

interface ClusterWrapDemo {
  readonly value: NbClusterWrap;
  readonly label: string;
}

interface ClusterDividerDemo {
  readonly value: NbClusterDivider;
  readonly label: string;
}

@Component({
  selector: 'docs-cluster-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    NbButton,
    NbChip,
    NbCluster,
    NbDisplay,
    NbMediaItem,
    NbMediaItemTitle,
    NbSurface,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Cluster</p>
          <h1>Cluster</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code class="font-mono">nbCluster</code> whenever children
            should flow horizontally, align together, and wrap cleanly on
            smaller screens. It is the inline composition pair to
            <code class="font-mono">nbStack</code>.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">7</span>
            <span class="nb-stat-tile__label">Gaps</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">5</span>
            <span class="nb-stat-tile__label">Alignments</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">Wrap</span>
            <span class="nb-stat-tile__label">Default</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--lavender">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Dividers</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/cluster"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div
            nbCluster
            gap="2xl"
            align="center"
            justify="center"
            class="w-full max-w-4xl p-2 text-center"
          >
            <div class="flex shrink-0 flex-col items-center gap-4">
              <div
                class="grid size-24 place-items-center border-3 border-(--nb-border) bg-(--nb-yellow) font-display text-3xl font-black shadow-[7px_7px_0_0_var(--nb-shadow)] sm:size-28 sm:text-4xl"
              >
                NB
              </div>

              <button nbButton size="lg" class="w-36">Ship it</button>
            </div>

            <div class="min-w-0 flex-1 basis-80">
              <div nbCluster gap="sm" justify="center" class="mb-4">
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-1 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]"
                  >Logo</span
                >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-1 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]"
                  >Actions</span
                >
                <span
                  class="border-2 border-(--nb-border) bg-(--nb-pink) px-3 py-1 font-mono text-xs font-black uppercase text-white shadow-[3px_3px_0_0_var(--nb-shadow)]"
                  >Badges</span
                >
              </div>

              <h2
                nbDisplay
                class="mb-3! [--nb-display-size:2.75rem] sm:[--nb-display-size:3.75rem]"
              >
                Cluster loud.
              </h2>
              <p class="mx-auto max-w-2xl text-lg font-bold leading-tight sm:text-xl">
                Inline rhythm for logos, actions, badges, and feature rows.
              </p>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Add <code class="font-mono">nbCluster</code> to the parent that owns
          the inline group. Use <code class="font-mono">gap</code> for spacing,
          <code class="font-mono">align</code> for cross-axis alignment,
          <code class="font-mono">justify</code> for distribution, and
          <code class="font-mono">wrap</code> when a row should stay on one line.
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="gaps">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Gaps</h2>
        <docs-example [code]="gapsExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            @for (gap of gaps; track gap.value) {
              <div nbSurface shadow="sm" class="p-4">
                <div nbCluster [gap]="gap.value">
                  <span class="font-mono text-xs font-black uppercase">{{
                    gap.label
                  }}</span>
                  <span
                    class="size-10 border-2 border-(--nb-border) bg-(--nb-yellow)"
                  ></span>
                  <span
                    class="size-10 border-2 border-(--nb-border) bg-(--nb-mint)"
                  ></span>
                  <span
                    class="size-10 border-2 border-(--nb-border) bg-(--nb-pink)"
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
                <div nbCluster gap="sm" [align]="align.value">
                  <span class="font-mono text-xs font-black uppercase">{{
                    align.label
                  }}</span>
                  <span
                    class="border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-2 font-black"
                    >Small</span
                  >
                  <span
                    class="border-2 border-(--nb-border) bg-(--nb-mint) px-4 py-5 font-black"
                    >Tall</span
                  >
                </div>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="justification">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Justification
        </h2>
        <docs-example [code]="justificationExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            @for (justify of justifications; track justify.value) {
              <div nbSurface tone="white" shadow="sm" class="p-4">
                <div
                  nbCluster
                  gap="sm"
                  [justify]="justify.value"
                  class="min-h-24"
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

      <section id="wrapping">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Wrapping
        </h2>
        <p class="mb-4 font-medium">
          Cluster wraps by default so chunky buttons, chips, badges, and media
          items can survive narrow layouts. Switch to
          <code class="font-mono">wrap="nowrap"</code> for compact controls that
          must stay in a single row.
        </p>
        <docs-example [code]="wrappingExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
            @for (wrap of wraps; track wrap.value) {
              <div nbSurface tone="yellow" shadow="sm" class="max-w-88 p-4">
                <div nbCluster gap="md" [wrap]="wrap.value">
                  <span class="font-mono text-xs font-black uppercase">{{
                    wrap.label
                  }}</span>
                  <button nbButton size="sm">Flight</button>
                  <button nbButton size="sm" variant="secondary">Hotel</button>
                  <button nbButton size="sm">Top pick</button>
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
          Use <code class="font-mono">divider</code> to render inline separators
          between cluster children. When a divider is active, gap is collapsed to
          <code class="font-mono">gap-x-0</code> and children receive
          <code class="font-mono">padding-inline-start</code> from
          <code class="font-mono">--nb-cluster-gap</code>. Best for
          single-line clusters — wrapping rows may keep their divider regardless
          of position.
        </p>
        <docs-example [code]="dividersExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4">
            @for (d of dividers; track d.value) {
              @if (d.value !== 'none') {
                <div nbSurface tone="cream" shadow="sm" class="p-4">
                  <div nbCluster gap="lg" align="center" [divider]="d.value"
                       class="[--nb-media-item-title-size:12px]">
                    <nb-media-item icon="/tokyo-city-escape/central-locations.png">
                      <span nbMediaItemTitle>Central<br />Locations</span>
                    </nb-media-item>
                    <nb-media-item icon="/tokyo-city-escape/guided-experiences.png">
                      <span nbMediaItemTitle>Guided<br />Experiences</span>
                    </nb-media-item>
                    <nb-media-item icon="/tokyo-city-escape/24-7-support.png">
                      <span nbMediaItemTitle>24/7<br />Support</span>
                    </nb-media-item>
                  </div>
                  <p class="mt-3 font-mono text-xs font-black uppercase opacity-50">divider="{{ d.label }}"</p>
                </div>
              }
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
            nbCluster
            gap="lg"
            align="center"
            divider="dashed"
            class="p-4 [--nb-media-item-title-size:12px]"
          >
            <nb-media-item icon="/tokyo-city-escape/central-locations.png">
              <span nbMediaItemTitle>Central<br />Locations</span>
            </nb-media-item>
            <nb-media-item icon="/tokyo-city-escape/guided-experiences.png">
              <span nbMediaItemTitle>Guided<br />Experiences</span>
            </nb-media-item>
            <nb-media-item icon="/tokyo-city-escape/24-7-support.png">
              <span nbMediaItemTitle>24/7<br />Support</span>
            </nb-media-item>
          </div>
        </docs-example>
      </section>

      <section id="responsive">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Responsive Gap
        </h2>
        <p class="mb-4 font-medium">
          Cluster keeps the API focused. For breakpoint changes, override the
          CSS variable with Tailwind arbitrary properties.
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
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Input</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Type</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">gap</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'md'</td>
                <td class="px-4 py-3">Horizontal and wrapped-row spacing between cluster children.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">align</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'start' | 'center' | 'end' | 'baseline' | 'stretch'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'center'</td>
                <td class="px-4 py-3">Cross-axis alignment for the inline group.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">justify</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'start' | 'center' | 'end' | 'between'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'start'</td>
                <td class="px-4 py-3">Main-axis distribution when the cluster has extra width.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">wrap</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'wrap' | 'nowrap'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'wrap'</td>
                <td class="px-4 py-3">Controls whether children can wrap onto additional rows.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">divider</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'solid' | 'dashed' | 'thick'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none'</td>
                <td class="px-4 py-3">Inline-start border between each child. When active, <code class="font-mono">gap-x</code> is collapsed and spacing comes from <code class="font-mono">padding-inline-start</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClusterPage {
  protected readonly importCode = `import { NbCluster } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbCluster gap="2xl" align="center" justify="center">
  <div>
    <div>NB</div>
    <button nbButton size="lg">Ship it</button>
  </div>

  <div>
    <div nbCluster gap="sm" justify="center">
      <span>Logo</span>
      <span>Actions</span>
      <span>Badges</span>
    </div>

    <h2 nbDisplay>Cluster loud.</h2>
    <p>Inline rhythm for logos, actions, badges, and feature rows.</p>
  </div>
</div>`;

  protected readonly gapsExampleCode = `<div nbCluster gap="none">...</div>
<div nbCluster gap="xs">...</div>
<div nbCluster gap="sm">...</div>
<div nbCluster gap="md">...</div>
<div nbCluster gap="lg">...</div>
<div nbCluster gap="xl">...</div>
<div nbCluster gap="2xl">...</div>`;

  protected readonly alignmentExampleCode = `<div nbCluster align="start">...</div>
<div nbCluster align="center">...</div>
<div nbCluster align="end">...</div>
<div nbCluster align="baseline">...</div>
<div nbCluster align="stretch">...</div>`;

  protected readonly justificationExampleCode = `<div nbCluster justify="start">...</div>
<div nbCluster justify="center">...</div>
<div nbCluster justify="end">...</div>
<div nbCluster justify="between">...</div>`;

  protected readonly wrappingExampleCode = `<div nbCluster gap="md">
  ...
</div>

<div nbCluster gap="md" wrap="nowrap">
  ...
</div>`;

  protected readonly dividersExampleCode = `<div nbCluster gap="lg" align="center" divider="dashed">
  <nb-media-item icon="/icons/location.png">
    <span nbMediaItemTitle>Central<br />Locations</span>
  </nb-media-item>
  <nb-media-item icon="/icons/guide.png">
    <span nbMediaItemTitle>Guided<br />Experiences</span>
  </nb-media-item>
  <nb-media-item icon="/icons/support.png">
    <span nbMediaItemTitle>24/7<br />Support</span>
  </nb-media-item>
</div>`;

  protected readonly compositionExampleCode = `<div nbCluster gap="lg" align="center" divider="dashed">
  <nb-media-item icon="/icons/location.png">
    <span nbMediaItemTitle>Central<br />Locations</span>
  </nb-media-item>
  <nb-media-item icon="/icons/support.png">
    <span nbMediaItemTitle>24/7<br />Support</span>
  </nb-media-item>
</div>`;

  protected readonly responsiveExampleCode = `<div
  nbCluster
  gap="md"
  class="md:[--nb-cluster-gap:1.5rem]"
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
  ] satisfies readonly ClusterGapDemo[];

  protected readonly alignments = [
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
    { value: 'baseline', label: 'baseline' },
    { value: 'stretch', label: 'stretch' },
  ] satisfies readonly ClusterAlignDemo[];

  protected readonly justifications = [
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
    { value: 'between', label: 'between' },
  ] satisfies readonly ClusterJustifyDemo[];

  protected readonly wraps = [
    { value: 'wrap', label: 'wrap' },
    { value: 'nowrap', label: 'nowrap' },
  ] satisfies readonly ClusterWrapDemo[];

  protected readonly dividers = [
    { value: 'none', label: 'none' },
    { value: 'solid', label: 'solid' },
    { value: 'dashed', label: 'dashed' },
    { value: 'thick', label: 'thick' },
  ] satisfies readonly ClusterDividerDemo[];
}
