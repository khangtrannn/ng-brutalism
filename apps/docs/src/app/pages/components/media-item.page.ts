import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbMediaItem,
  NbMediaItemTitle,
  NbSeparator,
  NbSurface,
  type NbMediaItemAlign,
  type NbMediaItemOrientation,
  type NbMediaItemSize,
  type NbMediaItemVariant,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

interface VariantDemo {
  readonly value: NbMediaItemVariant;
  readonly label: string;
  readonly description: string;
}

interface OrientationDemo {
  readonly value: NbMediaItemOrientation;
  readonly label: string;
}

interface SizeDemo {
  readonly value: NbMediaItemSize;
  readonly label: string;
}

interface AlignDemo {
  readonly value: NbMediaItemAlign;
  readonly label: string;
  readonly description: string;
}

@Component({
  selector: 'docs-media-item-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    NbMediaItem,
    NbMediaItemTitle,
    NbSeparator,
    NbSurface,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Media Item</p>
          <h1>Media Item</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code class="font-mono">nb-media-item</code> to pair an icon or
            image with a title and optional description. Covers feature lists,
            event details, product specs, flight info, contact rows, status
            chips, and any layout that anchors text next to a visual.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">15</span>
            <span class="nb-stat-tile__label">Tones</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Variants</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Sizes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--lavender">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">Orientations</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/media-item"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="grid w-full max-w-100 grid-cols-1 gap-6 p-4">

            <!-- YOUR FLIGHT card -->
            <div
              nbSurface
              border="strong"
              layout="stack"
              radius="base"
              shadow="lifted"
              clip
            >
              <div class="border-b-2 border-(--nb-border) bg-(--nb-accent) px-4 py-3 text-(--nb-accent-foreground)">
                <span class="font-heading text-2xl uppercase leading-none">Your Flight</span>
              </div>

              <div class="flex flex-col p-4">
                <nb-media-item
                  variant="plain"
                  class="pb-3"
                  style="--nb-media-item-icon-size: 2.5rem; --nb-media-item-title-size: 3rem; --nb-media-item-title-font-family: var(--font-heading)"
                  icon="/icons/plane.png"
                  iconAlt="Flight"
                  description="Jun 14 &middot; 22:15 &#x2192; 12:45+1"
                >
                  <span nbMediaItemTitle>NYC &#x2192; CDG</span>
                </nb-media-item>

                <div class="flex flex-col gap-2">
                  <hr nbSeparator variant="dashed" />

                  <nb-media-item
                    variant="plain"
                    icon="/icons/ticket.png"
                    iconAlt="Ticket"
                    iconBackground="#ff6aa2"
                    title="Seat 14A"
                    description="Economy &middot; Window"
                  />

                  <hr nbSeparator />

                  <nb-media-item
                    variant="plain"
                    icon="/icons/baggage.png"
                    iconAlt="Baggage"
                    iconBackground="#dcc8ff"
                    title="1 checked bag"
                    description="23 kg max"
                  />
                </div>
              </div>
            </div>

          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Use inputs for icon, title, and description in the common case.
          Project custom content with <code class="font-mono">nb-media-item-icon</code>,
          <code class="font-mono">nb-media-item-title</code>, and
          <code class="font-mono">nb-media-item-description</code> when you need
          custom markup.
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="variants">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Variants</h2>
        <docs-example [code]="variantsExampleCode">
          <div class="flex flex-col divide-y-2 divide-(--nb-border) p-4">
            @for (variant of variants; track variant.value) {
              <div class="py-5 first:pt-0 last:pb-0">
                <div class="mb-3 flex items-baseline gap-3">
                  <span class="font-black uppercase">{{ variant.label }}</span>
                  <span class="text-sm font-medium opacity-60">{{ variant.description }}</span>
                </div>
                <nb-media-item
                  [variant]="variant.value"
                  size="md"
                  tone="yellow"
                  icon="/icons/star.png"
                  iconAlt="Star"
                  title="Premium Access"
                  description="Unlimited features"
                />
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="orientations">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Orientations</h2>
        <docs-example [code]="orientationsExampleCode">
          <div class="flex flex-wrap gap-8 p-4">
            @for (orientation of orientations; track orientation.value) {
              <div class="flex flex-col gap-2">
                <span class="text-xs font-black uppercase opacity-60">{{ orientation.label }}</span>
                <nb-media-item
                  [orientation]="orientation.value"
                  variant="boxed"
                  size="md"
                  tone="lavender"
                  icon="/icons/camera.png"
                  iconAlt="Camera"
                  title="Travel Photos"
                  description="128 shots"
                />
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="with-description">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">With description</h2>
        <p class="mb-4 font-medium">
          Add <code class="font-mono">description</code> for secondary context.
          It renders below the title with reduced opacity and follows the
          component size preset.
        </p>
        <docs-example [code]="withDescriptionCode">
          <div class="flex flex-wrap gap-4 p-4">
            <nb-media-item
              variant="plain"
              size="md"
              icon="/icons/ticket.png"
              iconAlt="Ticket"
              title="Boarding Pass"
            />

            <nb-media-item
              variant="plain"
              size="md"
              icon="/icons/ticket.png"
              iconAlt="Ticket"
              title="Boarding Pass"
              description="Seat 14A · Economy"
            />

            <nb-media-item
              variant="boxed"
              size="md"
              tone="blue"
              icon="/icons/support.png"
              iconAlt="Support"
              title="24/7 Support"
              description="Response within 2h"
            />
          </div>
        </docs-example>
      </section>

      <section id="sizes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
        <docs-example [code]="sizesExampleCode">
          <div class="flex flex-col gap-4 p-4">
            @for (size of sizes; track size.value) {
              <nb-media-item
                variant="boxed"
                [size]="size.value"
                tone="cream"
                icon="/icons/baggage.png"
                iconAlt="Baggage"
                [title]="size.label + ' — Checked Baggage'"
                description="Up to 23kg included"
              />
            }
          </div>
        </docs-example>
      </section>

      <section id="alignment">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Alignment</h2>
        <docs-example [code]="alignmentExampleCode">
          <div class="flex flex-col gap-4 p-4">
            @for (align of alignments; track align.value) {
              <div class="flex flex-col gap-2">
                <span class="text-xs font-black uppercase opacity-60">{{ align.label }} — {{ align.description }}</span>
                <nb-media-item
                  variant="boxed"
                  size="md"
                  tone="yellow"
                  [align]="align.value"
                  icon="/icons/world.png"
                  iconAlt="World"
                  title="Global Network"
                  description="140+ destinations"
                />
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <h3 class="mt-6 mb-3 text-lg font-bold">nb-media-item</h3>
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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">variant</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'plain' | 'boxed' | 'chip'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'plain'</td>
                <td class="px-4 py-3">Visual container style. <code class="font-mono">boxed</code> adds a border and shadow; <code class="font-mono">chip</code> uses a fully-rounded pill shape.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">orientation</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'horizontal' | 'vertical'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'horizontal'</td>
                <td class="px-4 py-3">Controls whether the media and text stack side-by-side or top-to-bottom.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">align</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'start' | 'center' | 'between'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'start'</td>
                <td class="px-4 py-3">Horizontal distribution of children. <code class="font-mono">between</code> stretches the item to full width.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">size</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'sm' | 'md' | 'lg'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'md'</td>
                <td class="px-4 py-3">Sets gap, padding, icon size, and font size together.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">tone</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default' | 'cream' | 'white' | 'black' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'blue' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default'</td>
                <td class="px-4 py-3">Background and foreground color pair applied to <code class="font-mono">boxed</code> and <code class="font-mono">chip</code> variants.</td>
              </tr>
              <tr class="border-t-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">icon</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">undefined</td>
                <td class="px-4 py-3">Image source for the media icon.</td>
              </tr>
              <tr class="border-t-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">iconAlt</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">''</td>
                <td class="px-4 py-3">Accessible alternative text for the input icon.</td>
              </tr>
              <tr class="border-t-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">iconBackground</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">undefined</td>
                <td class="px-4 py-3">Wraps the input icon in a framed surface with the provided fill.</td>
              </tr>
              <tr class="border-t-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">title</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">undefined</td>
                <td class="px-4 py-3">Primary label. Use <code class="font-mono">nbMediaItemTitle</code> for custom title markup.</td>
              </tr>
              <tr class="border-t-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">description</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">undefined</td>
                <td class="px-4 py-3">Secondary label. Use <code class="font-mono">nbMediaItemDescription</code> for custom description markup.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mt-8 mb-3 text-lg font-bold">CSS Tokens</h3>
        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-140 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Token</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-media-item-icon-size</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">Depends on <code class="font-mono">size</code></td>
                <td class="px-4 py-3">Controls projected and input icon dimensions.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-media-item-title-size</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">Depends on <code class="font-mono">size</code></td>
                <td class="px-4 py-3">Controls title text size for input and projected titles.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-media-item-title-font-family</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">var(--font-sans)</td>
                <td class="px-4 py-3">Controls title font family without adding utility classes to the title slot.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">--nb-media-item-description-size</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">Depends on <code class="font-mono">size</code></td>
                <td class="px-4 py-3">Controls secondary label text size.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mt-8 mb-3 text-lg font-bold">Sub-directives</h3>
        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-120 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Directive</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nbMediaItemIcon</td>
                <td class="px-4 py-3">Media slot for an icon or image. Add <code class="font-mono">surface</code> to use the built-in icon frame and <code class="font-mono">background</code> to adjust its fill.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nbMediaItemTitle</td>
                <td class="px-4 py-3">Primary label. Rendered in black font weight with tight leading.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nbMediaItemDescription</td>
                <td class="px-4 py-3">Secondary label below the title. Rendered at 75% size with reduced opacity.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MediaItemPage {
  protected readonly importCode = `import { NbMediaItem, NbMediaItemTitle, NbSeparator, NbSurface } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbSurface border="strong" layout="stack" radius="base" shadow="lifted" clip>
  <div class="border-b-2 border-(--nb-border) bg-(--nb-accent) px-4 py-3 text-(--nb-accent-foreground)">
    <span class="font-heading text-2xl uppercase leading-none">Your Flight</span>
  </div>

  <div class="flex flex-col p-4">
    <nb-media-item
      variant="plain"
      class="pb-3"
      style="--nb-media-item-icon-size: 2.5rem; --nb-media-item-title-size: 3rem; --nb-media-item-title-font-family: var(--font-heading)"
      icon="/icons/plane.png"
      iconAlt="Flight"
      description="Jun 14 · 22:15 → 12:45+1"
    >
      <span nbMediaItemTitle>NYC → CDG</span>
    </nb-media-item>

    <div class="flex flex-col gap-2">
      <hr nbSeparator variant="dashed" />

      <nb-media-item
        variant="plain"
        icon="/icons/ticket.png"
        iconAlt="Ticket"
        iconBackground="#ff6aa2"
        title="Seat 14A"
        description="Economy · Window"
      />

      <hr nbSeparator />

      <nb-media-item
        variant="plain"
        icon="/icons/baggage.png"
        iconAlt="Baggage"
        iconBackground="#dcc8ff"
        title="1 checked bag"
        description="23 kg max"
      />
    </div>
  </div>
</div>`;

  protected readonly variantsExampleCode = `<!-- plain: no container, just layout -->
<nb-media-item
  variant="plain"
  size="md"
  icon="/icons/star.png"
  iconAlt="Star"
  title="Premium Access"
  description="Unlimited features"
/>

<!-- boxed: border + offset shadow -->
<nb-media-item
  variant="boxed"
  size="md"
  tone="yellow"
  icon="/icons/star.png"
  iconAlt="Star"
  title="Premium Access"
  description="Unlimited features"
/>

<!-- chip: fully-rounded pill -->
<nb-media-item
  variant="chip"
  size="md"
  tone="yellow"
  icon="/icons/star.png"
  iconAlt="Star"
  title="Premium Access"
  description="Unlimited features"
/}`;

  protected readonly orientationsExampleCode = `<nb-media-item
  orientation="horizontal"
  variant="boxed"
  size="md"
  tone="lavender"
  icon="/icons/camera.png"
  iconAlt="Camera"
  title="Travel Photos"
  description="128 shots"
/>

<nb-media-item
  orientation="vertical"
  variant="boxed"
  size="md"
  tone="lavender"
  icon="/icons/camera.png"
  iconAlt="Camera"
  title="Travel Photos"
  description="128 shots"
/>`;

  protected readonly withDescriptionCode = `<!-- title only -->
<nb-media-item
  variant="plain"
  size="md"
  icon="/icons/ticket.png"
  iconAlt="Ticket"
  title="Boarding Pass"
/>

<!-- title + description -->
<nb-media-item
  variant="plain"
  size="md"
  icon="/icons/ticket.png"
  iconAlt="Ticket"
  title="Boarding Pass"
  description="Seat 14A · Economy"
/>`;

  protected readonly sizesExampleCode = `<nb-media-item
  variant="boxed"
  size="sm"
  tone="cream"
  icon="/icons/baggage.png"
  iconAlt="Baggage"
  title="SM — Checked Baggage"
  description="Up to 23kg included"
/>

<nb-media-item
  variant="boxed"
  size="md"
  tone="cream"
  icon="/icons/baggage.png"
  iconAlt="Baggage"
  title="MD — Checked Baggage"
  description="Up to 23kg included"
/>

<nb-media-item
  variant="boxed"
  size="lg"
  tone="cream"
  icon="/icons/baggage.png"
  iconAlt="Baggage"
  title="LG — Checked Baggage"
  description="Up to 23kg included"
/>`;

  protected readonly alignmentExampleCode = `<!-- start (default) -->
<nb-media-item
  variant="boxed"
  size="md"
  tone="yellow"
  align="start"
  icon="/icons/world.png"
  iconAlt="World"
  title="Global Network"
  description="140+ destinations"
/>

<!-- center -->
<nb-media-item
  variant="boxed"
  size="md"
  tone="yellow"
  align="center"
  icon="/icons/world.png"
  iconAlt="World"
  title="Global Network"
  description="140+ destinations"
/>

<!-- between: stretches to full width -->
<nb-media-item
  variant="boxed"
  size="md"
  tone="yellow"
  align="between"
  icon="/icons/world.png"
  iconAlt="World"
  title="Global Network"
  description="140+ destinations"
/>`;

  protected readonly variants = [
    { value: 'plain', label: 'Plain', description: 'No container — just gap, icon size, and typography' },
    { value: 'boxed', label: 'Boxed', description: 'Hard border with offset shadow and tone fill' },
    { value: 'chip', label: 'Chip', description: 'Fully-rounded pill — great for status or tags' },
  ] satisfies readonly VariantDemo[];

  protected readonly orientations = [
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'vertical', label: 'Vertical' },
  ] satisfies readonly OrientationDemo[];

  protected readonly sizes = [
    { value: 'sm', label: 'SM' },
    { value: 'md', label: 'MD' },
    { value: 'lg', label: 'LG' },
  ] satisfies readonly SizeDemo[];

  protected readonly alignments = [
    { value: 'start', label: 'Start', description: 'default, left-aligned content' },
    { value: 'center', label: 'Center', description: 'centered content' },
    { value: 'between', label: 'Between', description: 'stretches to full width' },
  ] satisfies readonly AlignDemo[];

}
