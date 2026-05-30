import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbCallout,
  NbChip,
  NbDisplay,
  NbStack,
  NbText,
  type NbTextLeading,
  type NbTextMeasure,
  type NbTextSize,
  type NbTextTone,
  type NbTextTracking,
  type NbTextTransform,
  type NbTextWeight,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

interface TextSizeDemo {
  readonly value: NbTextSize;
  readonly label: string;
  readonly px: string;
}

interface TextWeightDemo {
  readonly value: NbTextWeight;
  readonly numeric: string;
}

interface TextToneDemo {
  readonly value: NbTextTone;
}

interface TextTransformDemo {
  readonly value: NbTextTransform;
}

interface TextTrackingDemo {
  readonly value: NbTextTracking;
  readonly em: string;
}

interface TextMeasureDemo {
  readonly value: NbTextMeasure;
  readonly rem: string;
}

interface TextLeadingDemo {
  readonly value: NbTextLeading;
  readonly numeric: string;
}

@Component({
  selector: 'docs-text-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    NbCallout,
    NbChip,
    NbDisplay,
    NbStack,
    NbText,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Text</p>
          <h1>Text</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            <code class="font-mono">nbText</code> is an attribute directive for
            general-purpose typography — body copy, labels, brand names,
            metadata, and captions. It composes cleanly with semantic HTML
            elements and other primitives without creating a wrapper element.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">5</span>
            <span class="nb-stat-tile__label">Sizes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">6</span>
            <span class="nb-stat-tile__label">Weights</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">10</span>
            <span class="nb-stat-tile__label">Tones</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--lavender">
            <span class="nb-stat-tile__value">8</span>
            <span class="nb-stat-tile__label">Inputs</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/text"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="previewCode">
          <div class="p-6 max-w-xl" nbStack gap="md">
            <span nbText size="xl" weight="extrabold">Roam &amp; Go</span>
            <p nbText size="md" weight="medium" tone="muted" measure="md">
              Explore iconic neighborhoods, savor local flavors, and make
              unforgettable memories on every trip.
            </p>
            <span nbText size="sm" weight="bold" transform="uppercase" tracking="wide">
              New release
            </span>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Add <code class="font-mono">nbText</code> to any inline or block
          element. It applies inline styles directly so it never conflicts with
          other attribute directives on the same element.
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="usageCode" />
      </section>

      <section id="sizes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
        <docs-example [code]="sizesCode">
          <div class="p-6 w-full" nbStack gap="md">
            @for (s of sizes; track s.value) {
              <div class="flex items-baseline gap-4">
                <span class="w-10 font-mono text-xs font-bold text-right opacity-50 shrink-0">{{ s.value }}</span>
                <span nbText [size]="s.value" weight="medium">
                  The quick brown fox — {{ s.px }}
                </span>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="weights">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Weights</h2>
        <docs-example [code]="weightsCode">
          <div class="p-6 w-full" nbStack gap="md">
            @for (w of weights; track w.value) {
              <div class="flex items-baseline gap-4">
                <span class="w-20 font-mono text-xs font-bold text-right opacity-50 shrink-0">{{ w.value }}</span>
                <span nbText size="lg" [weight]="w.value">
                  Build loud. Stay sharp.
                </span>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="tones">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
        <p class="mb-4 font-medium">
          Tones map to design tokens so they automatically adapt when the theme
          changes.
        </p>
        <docs-example [code]="tonesCode">
          <div class="p-6 w-full" nbStack gap="sm">
            @for (t of tones; track t.value) {
              <div class="flex items-center gap-4">
                <span class="w-20 font-mono text-xs font-bold text-right opacity-50 shrink-0">{{ t.value }}</span>
                <span nbText size="md" weight="semibold" [tone]="t.value">
                  Neo-Brutalism is intentional.
                </span>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="transform">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Transform
        </h2>
        <docs-example [code]="transformCode">
          <div class="p-6 w-full" nbStack gap="md">
            @for (t of transforms; track t.value) {
              <div class="flex items-baseline gap-4">
                <span class="w-24 font-mono text-xs font-bold text-right opacity-50 shrink-0">{{ t.value }}</span>
                <span nbText size="md" weight="bold" [transform]="t.value">
                  Flight Included — Tokyo City Escape
                </span>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="tracking">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Tracking
        </h2>
        <p class="mb-4 font-medium">
          Letter-spacing. Combine <code class="font-mono">tracking="wide"</code>
          with <code class="font-mono">transform="uppercase"</code> for classic
          brutalist labels.
        </p>
        <docs-example [code]="trackingCode">
          <div class="p-6 w-full" nbStack gap="md">
            @for (t of trackings; track t.value) {
              <div class="flex items-baseline gap-4">
                <span class="w-16 font-mono text-xs font-bold text-right opacity-50 shrink-0">{{ t.value }}</span>
                <span nbText size="md" weight="black" transform="uppercase" [tracking]="t.value">
                  New release
                </span>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="measure">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Measure</h2>
        <p class="mb-4 font-medium">
          <code class="font-mono">measure</code> caps
          <code class="font-mono">max-width</code> for readable line lengths.
          Use it on paragraph text so lines don't stretch too wide on large
          screens.
        </p>
        <docs-example [code]="measureCode">
          <div class="p-6 w-full" nbStack gap="lg">
            @for (m of measures; track m.value) {
              <div nbStack gap="xs">
                <span class="font-mono text-xs font-bold opacity-50">
                  measure="{{ m.value }}" — {{ m.rem }}
                </span>
                <p nbText tone="muted" [measure]="m.value">
                  A token-driven neo-brutalist Angular UI library for expressive
                  product interfaces. Build loud. Stay sharp.
                </p>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="leading">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Leading</h2>
        <p class="mb-4 font-medium">
          Controls line-height. By default,
          <code class="font-mono">nbText</code> picks a sensible line-height for
          the active <code class="font-mono">size</code>. Use
          <code class="font-mono">leading="relaxed"</code> for long-form
          reading.
        </p>
        <docs-example [code]="leadingCode">
          <div class="p-6 w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
            @for (l of leadings; track l.value) {
              <div nbStack gap="xs">
                <span class="font-mono text-xs font-bold opacity-50">
                  leading="{{ l.value }}" — {{ l.numeric }}
                </span>
                <p nbText size="md" measure="sm" [leading]="l.value">
                  Brutalist interfaces work best when layout, typography, and
                  contrast are intentional.
                </p>
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
          Because <code class="font-mono">nbText</code> is a directive it
          composes with other directives on the same element and works naturally
          inside any layout primitive.
        </p>
        <docs-example [code]="compositionCode">
          <div class="p-6 w-full" nbStack gap="lg">
            <div nbStack gap="xs">
              <span nbText size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted">
                Featured deal
              </span>
              <h2 nbDisplay>Build loud.</h2>
            </div>

            <p nbText size="lg" tone="muted" measure="md" leading="relaxed">
              A token-driven neo-brutalist Angular UI library for expressive
              product interfaces.
            </p>

            <div class="flex flex-wrap gap-2">
              <span nbChip tone="mint">
                <span nbText size="sm" weight="black" transform="uppercase" tracking="wide">
                  Flight included
                </span>
              </span>
              <span nbChip tone="lavender">
                <span nbText size="sm" weight="black" transform="uppercase" tracking="wide">
                  Hotel
                </span>
              </span>
            </div>

            <div nbCallout tone="yellow" size="lg" layout="between" shadow="hard">
              <div nbStack gap="none">
                <span nbText size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted">
                  From
                </span>
                <span nbText size="xl" weight="black">$799</span>
              </div>
              <span nbText size="sm" weight="medium">per person</span>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-200 border-collapse text-left">
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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">size</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'md'</td>
                <td class="px-4 py-3">Font size (0.75 rem – 1.25 rem).</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">weight</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'normal'</td>
                <td class="px-4 py-3">Font weight (400 – 900).</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">tone</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default' | 'muted' | 'subtle' | 'inverse' | 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'warning'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default'</td>
                <td class="px-4 py-3">Text color mapped to a design token.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">transform</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'uppercase' | 'lowercase' | 'capitalize'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none'</td>
                <td class="px-4 py-3">CSS text-transform.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">tracking</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'tight' | 'normal' | 'wide' | 'wider'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'normal'</td>
                <td class="px-4 py-3">Letter-spacing (−0.025 em – 0.05 em).</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">measure</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'xs' | 'sm' | 'md' | 'lg'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none'</td>
                <td class="px-4 py-3">max-width cap for readable line lengths (20 rem – 44 rem).</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">leading</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'tight' | 'normal' | 'relaxed'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'normal'</td>
                <td class="px-4 py-3">Line-height override. Defaults to a size-matched value.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">reset</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">boolean</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">true</td>
                <td class="px-4 py-3">Sets margin to 0, removing browser paragraph/heading margins so layout primitives own all spacing.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextPage {
  protected readonly importCode = `import { NbText } from '@ng-brutalism/ui';`;

  protected readonly usageCode = `<!-- Body text -->
<p nbText>
  Build loud interfaces with sharp Angular primitives.
</p>

<!-- Muted description with line-length cap -->
<p nbText tone="muted" measure="md">
  A token-driven neo-brutalist Angular UI library for expressive product interfaces.
</p>

<!-- Brand / name text -->
<span nbText size="xl" weight="extrabold">
  Roam &amp; Go
</span>

<!-- Metadata label -->
<span nbText size="sm" weight="bold" transform="uppercase" tracking="wide">
  New release
</span>

<!-- Long-form article text -->
<p nbText size="lg" leading="relaxed" measure="lg">
  Brutalist interfaces work best when layout, typography, and contrast are intentional.
</p>`;

  protected readonly previewCode = `<span nbText size="xl" weight="extrabold">Roam &amp; Go</span>

<p nbText size="md" weight="medium" tone="muted" measure="md">
  Explore iconic neighborhoods, savor local flavors, and make
  unforgettable memories on every trip.
</p>

<span nbText size="sm" weight="bold" transform="uppercase" tracking="wide">
  New release
</span>`;

  protected readonly sizesCode = `<span nbText size="xs">The quick brown fox — 0.75rem</span>
<span nbText size="sm">The quick brown fox — 0.875rem</span>
<span nbText size="md">The quick brown fox — 1rem</span>
<span nbText size="lg">The quick brown fox — 1.125rem</span>
<span nbText size="xl">The quick brown fox — 1.25rem</span>`;

  protected readonly weightsCode = `<span nbText size="lg" weight="normal">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="medium">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="semibold">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="bold">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="extrabold">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="black">Build loud. Stay sharp.</span>`;

  protected readonly tonesCode = `<span nbText tone="default">Neo-Brutalism is intentional.</span>
<span nbText tone="muted">Neo-Brutalism is intentional.</span>
<span nbText tone="subtle">Neo-Brutalism is intentional.</span>
<span nbText tone="inverse">Neo-Brutalism is intentional.</span>
<span nbText tone="primary">Neo-Brutalism is intentional.</span>
<span nbText tone="secondary">Neo-Brutalism is intentional.</span>
<span nbText tone="accent">Neo-Brutalism is intentional.</span>
<span nbText tone="danger">Neo-Brutalism is intentional.</span>
<span nbText tone="success">Neo-Brutalism is intentional.</span>
<span nbText tone="warning">Neo-Brutalism is intentional.</span>`;

  protected readonly transformCode = `<span nbText weight="bold" transform="none">Flight Included — Tokyo City Escape</span>
<span nbText weight="bold" transform="uppercase">Flight Included — Tokyo City Escape</span>
<span nbText weight="bold" transform="lowercase">Flight Included — Tokyo City Escape</span>
<span nbText weight="bold" transform="capitalize">Flight Included — Tokyo City Escape</span>`;

  protected readonly trackingCode = `<span nbText weight="black" transform="uppercase" tracking="tight">New release</span>
<span nbText weight="black" transform="uppercase" tracking="normal">New release</span>
<span nbText weight="black" transform="uppercase" tracking="wide">New release</span>
<span nbText weight="black" transform="uppercase" tracking="wider">New release</span>`;

  protected readonly measureCode = `<!-- no cap -->
<p nbText measure="none">A token-driven neo-brutalist Angular UI library...</p>

<!-- 20rem -->
<p nbText tone="muted" measure="xs">A token-driven neo-brutalist Angular UI library...</p>

<!-- 28rem -->
<p nbText tone="muted" measure="sm">A token-driven neo-brutalist Angular UI library...</p>

<!-- 36rem -->
<p nbText tone="muted" measure="md">A token-driven neo-brutalist Angular UI library...</p>

<!-- 44rem -->
<p nbText tone="muted" measure="lg">A token-driven neo-brutalist Angular UI library...</p>`;

  protected readonly leadingCode = `<p nbText size="md" measure="sm" leading="none">...</p>
<p nbText size="md" measure="sm" leading="tight">...</p>
<p nbText size="md" measure="sm" leading="normal">...</p>
<p nbText size="md" measure="sm" leading="relaxed">...</p>`;

  protected readonly compositionCode = `<div nbStack gap="lg">
  <div nbStack gap="xs">
    <span nbText size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted">
      Featured deal
    </span>
    <h2 nbDisplay>Build loud.</h2>
  </div>

  <p nbText size="lg" tone="muted" measure="md" leading="relaxed">
    A token-driven neo-brutalist Angular UI library for expressive
    product interfaces.
  </p>

  <div class="flex flex-wrap gap-2">
    <span nbChip tone="mint">
      <span nbText size="sm" weight="black" transform="uppercase" tracking="wide">
        Flight included
      </span>
    </span>
    <span nbChip tone="lavender">
      <span nbText size="sm" weight="black" transform="uppercase" tracking="wide">
        Hotel
      </span>
    </span>
  </div>

  <div nbCallout tone="yellow" size="lg" layout="between" shadow="hard">
    <div nbStack gap="none">
      <span nbText size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted">
        From
      </span>
      <span nbText size="xl" weight="black">$799</span>
    </div>
    <span nbText size="sm" weight="medium">per person</span>
  </div>
</div>`;

  protected readonly sizes = [
    { value: 'xs', label: 'xs', px: '0.75rem / 12px' },
    { value: 'sm', label: 'sm', px: '0.875rem / 14px' },
    { value: 'md', label: 'md', px: '1rem / 16px' },
    { value: 'lg', label: 'lg', px: '1.125rem / 18px' },
    { value: 'xl', label: 'xl', px: '1.25rem / 20px' },
  ] satisfies readonly TextSizeDemo[];

  protected readonly weights = [
    { value: 'normal', numeric: '400' },
    { value: 'medium', numeric: '500' },
    { value: 'semibold', numeric: '600' },
    { value: 'bold', numeric: '700' },
    { value: 'extrabold', numeric: '800' },
    { value: 'black', numeric: '900' },
  ] satisfies readonly TextWeightDemo[];

  protected readonly tones = [
    { value: 'default' },
    { value: 'muted' },
    { value: 'subtle' },
    { value: 'inverse' },
    { value: 'primary' },
    { value: 'secondary' },
    { value: 'accent' },
    { value: 'danger' },
    { value: 'success' },
    { value: 'warning' },
  ] satisfies readonly TextToneDemo[];

  protected readonly transforms = [
    { value: 'none' },
    { value: 'uppercase' },
    { value: 'lowercase' },
    { value: 'capitalize' },
  ] satisfies readonly TextTransformDemo[];

  protected readonly trackings = [
    { value: 'tight', em: '−0.025em' },
    { value: 'normal', em: 'normal' },
    { value: 'wide', em: '0.025em' },
    { value: 'wider', em: '0.05em' },
  ] satisfies readonly TextTrackingDemo[];

  protected readonly measures = [
    { value: 'none', rem: 'no cap' },
    { value: 'xs', rem: '20rem' },
    { value: 'sm', rem: '28rem' },
    { value: 'md', rem: '36rem' },
    { value: 'lg', rem: '44rem' },
  ] satisfies readonly TextMeasureDemo[];

  protected readonly leadings = [
    { value: 'none', numeric: '1' },
    { value: 'tight', numeric: '1.15' },
    { value: 'normal', numeric: 'size-matched' },
    { value: 'relaxed', numeric: '1.65' },
  ] satisfies readonly TextLeadingDemo[];
}
