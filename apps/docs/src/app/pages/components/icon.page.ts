import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbCallout,
  NbChip,
  NbChipGroup,
  NbIcon,
  NbStack,
  type NbIconSize,
  type NbIconTone,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

interface IconSizeDemo {
  readonly value: NbIconSize;
  readonly px: string;
}

interface IconToneDemo {
  readonly value: NbIconTone;
}

@Component({
  selector: 'docs-icon-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    NbButton,
    NbButtonTrailingIcon,
    NbCallout,
    NbChip,
    NbChipGroup,
    NbIcon,
    NbStack,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Icon</p>
          <h1>Icon</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            <code class="font-mono">nbIcon</code> is an attribute directive that
            renders any SVG asset as a sized, colored, accessible icon. Mask mode
            (default) paints monochrome SVGs with the current color. Image mode
            preserves original colors for illustrated assets. Composable with
            chips, buttons, and any other primitive.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">5</span>
            <span class="nb-stat-tile__label">Sizes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">10</span>
            <span class="nb-stat-tile__label">Tones</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">Modes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--lavender">
            <span class="nb-stat-tile__value">6</span>
            <span class="nb-stat-tile__label">Inputs</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/icon"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="previewCode">
          <div class="flex flex-wrap items-center gap-6 p-6">
            <span nbIcon src="/tokyo-city-escape/nb-plane-fill.svg" size="xl" tone="primary" decorative></span>
            <span nbIcon src="/tokyo-city-escape/nb-star-fill.svg" size="lg" tone="warning" decorative></span>
            <span nbIcon src="/tokyo-city-escape/nb-hotel-fill.svg" size="md" tone="default" decorative></span>
            <span nbIcon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" tone="muted" decorative></span>
            <span nbIcon src="/tokyo-city-escape/nb-plane-fill.svg" size="xs" tone="danger" decorative></span>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Add <code class="font-mono">nbIcon</code> to any
          <code class="font-mono">&lt;span&gt;</code>. Provide a
          <code class="font-mono">src</code> path and mark the icon as
          <code class="font-mono">decorative</code> or give it a
          <code class="font-mono">label</code>.
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="usageCode" />
      </section>

      <section id="sizes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
        <docs-example [code]="sizesCode">
          <div class="flex flex-wrap items-end gap-6 p-6">
            @for (s of sizes; track s.value) {
              <div class="flex flex-col items-center gap-2">
                <span nbIcon src="/tokyo-city-escape/nb-plane-fill.svg" [size]="s.value" decorative></span>
                <span class="font-mono text-xs font-bold opacity-50">{{ s.value }}</span>
                <span class="font-mono text-xs opacity-40">{{ s.px }}</span>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="tones">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
        <p class="mb-4 font-medium">
          Tones map to design tokens and adapt automatically when the theme
          changes. <code class="font-mono">current</code> (default) inherits
          the CSS <code class="font-mono">color</code> of the parent element.
        </p>
        <docs-example [code]="tonesCode">
          <div class="p-6 w-full" nbStack gap="sm">
            @for (t of tones; track t.value) {
              <div class="flex items-center gap-4">
                <span class="w-20 font-mono text-xs font-bold text-right opacity-50 shrink-0">{{ t.value }}</span>
                <span nbIcon src="/tokyo-city-escape/nb-star-fill.svg" size="md" [tone]="t.value" decorative></span>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="modes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Modes</h2>
        <p class="mb-4 font-medium">
          <code class="font-mono">mode="mask"</code> (default) applies the SVG
          as a CSS mask and paints it with the active tone color — ideal for
          monochrome SVG icons that should follow the theme.
          <code class="font-mono">mode="image"</code> renders the asset as a
          background image and preserves its original colors — use this for
          colorful illustrations or PNGs.
        </p>
        <docs-example [code]="modesCode">
          <div class="flex flex-wrap items-center gap-8 p-6">
            <div class="flex flex-col items-center gap-2">
              <span nbIcon src="/tokyo-city-escape/nb-plane-fill.svg" size="xl" mode="mask" tone="primary" decorative></span>
              <span class="font-mono text-xs font-bold opacity-50">mask (default)</span>
              <span class="font-mono text-xs opacity-40">painted by tone</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span nbIcon src="/tokyo-city-escape/nb-plane-fill.svg" size="xl" mode="image" decorative></span>
              <span class="font-mono text-xs font-bold opacity-50">image</span>
              <span class="font-mono text-xs opacity-40">original colors</span>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="accessibility">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Accessibility</h2>
        <p class="mb-4 font-medium">
          Icons must be explicitly marked as decorative or meaningful. There is
          no silent default — you must choose one.
        </p>
        <div nbStack gap="md" class="mb-6">
          <div nbCallout tone="mint" size="sm">
            <strong>Decorative icon</strong> — adds no meaning; hidden from screen readers.
            Use <code class="font-mono">decorative</code>.
          </div>
          <div nbCallout tone="yellow" size="sm">
            <strong>Meaningful icon</strong> — communicates information; needs a label.
            Use <code class="font-mono">label="..."</code>.
          </div>
        </div>
        <docs-example [code]="a11yCode">
          <div class="flex flex-wrap items-center gap-8 p-6">
            <div class="flex flex-col items-center gap-2">
              <span nbIcon src="/tokyo-city-escape/nb-star-fill.svg" size="lg" tone="warning" decorative></span>
              <span class="font-mono text-xs font-bold opacity-50">decorative</span>
              <span class="font-mono text-xs opacity-40">aria-hidden="true"</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span nbIcon src="/tokyo-city-escape/nb-star-fill.svg" size="lg" tone="warning" label="Top rated"></span>
              <span class="font-mono text-xs font-bold opacity-50">label="Top rated"</span>
              <span class="font-mono text-xs opacity-40">role="img"</span>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="composition">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Composition</h2>
        <p class="mb-4 font-medium">
          Because <code class="font-mono">nbIcon</code> is a directive it drops
          into any container without adding a wrapper element.
        </p>
        <docs-example [code]="compositionCode">
          <div class="p-6 w-full" nbStack gap="lg">
            <div nbChipGroup>
              <span nbChip tone="mint">
                <span nbIcon src="/tokyo-city-escape/nb-plane-fill.svg" size="sm" decorative></span>
                Flight included
              </span>
              <span nbChip tone="lavender">
                <span nbIcon src="/tokyo-city-escape/nb-hotel-fill.svg" size="sm" decorative></span>
                Hotel
              </span>
              <span nbChip tone="pink">
                <span nbIcon src="/tokyo-city-escape/nb-star-fill.svg" size="sm" decorative></span>
                Top pick
              </span>
            </div>

            <button
              nbButton
              style="--nb-button-bg: var(--nb-lavender); --nb-button-radius: 0.5rem"
              class="h-12 px-4 font-black tracking-wide uppercase"
            >
              Book Trip
              <span
                nbButtonTrailingIcon
                class="inline-flex size-8 items-center justify-center rounded-full bg-(--nb-foreground) text-(--nb-background)"
              >
                <span nbIcon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" tone="current" decorative></span>
              </span>
            </button>
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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">src</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">required</td>
                <td class="px-4 py-3">Path to the SVG or image asset.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">size</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'md'</td>
                <td class="px-4 py-3">Icon size (0.75 rem – 2 rem).</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">tone</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'current' | 'default' | 'muted' | 'inverse' | 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'warning'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'current'</td>
                <td class="px-4 py-3">Color tone. <code class="font-mono">current</code> inherits the parent CSS color. Only applies in mask mode.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">mode</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'mask' | 'image'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'mask'</td>
                <td class="px-4 py-3">Rendering mode. <code class="font-mono">mask</code> paints the SVG with the tone color. <code class="font-mono">image</code> preserves original asset colors.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">decorative</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">boolean</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">false</td>
                <td class="px-4 py-3">Marks the icon as purely decorative (<code class="font-mono">aria-hidden="true"</code>). Use when the icon adds no information beyond adjacent text.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">label</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string | null</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">null</td>
                <td class="px-4 py-3">Accessible label for meaningful icons. Sets <code class="font-mono">role="img"</code> and <code class="font-mono">aria-label</code>. Ignored when <code class="font-mono">decorative</code> is true.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IconPage {
  protected readonly importCode = `import { NbIcon } from '@ng-brutalism/ui';`;

  protected readonly usageCode = `<!-- Decorative icon (no meaning beyond adjacent text) -->
<span nbIcon src="/icons/plane.svg" size="sm" decorative></span>

<!-- Meaningful standalone icon -->
<span nbIcon src="/icons/warning.svg" size="md" tone="danger" label="Warning"></span>

<!-- Larger, colored icon -->
<span nbIcon src="/icons/star.svg" size="xl" tone="warning" decorative></span>

<!-- Image mode for colorful/illustrated assets -->
<span nbIcon src="/icons/avatar-badge.png" mode="image" size="xl" label="Verified"></span>`;

  protected readonly previewCode = `<span nbIcon src="/icons/plane.svg" size="xl" tone="primary" decorative></span>
<span nbIcon src="/icons/star.svg" size="lg" tone="warning" decorative></span>
<span nbIcon src="/icons/hotel.svg" size="md" tone="default" decorative></span>
<span nbIcon src="/icons/arrow-right.svg" size="sm" tone="muted" decorative></span>
<span nbIcon src="/icons/plane.svg" size="xs" tone="danger" decorative></span>`;

  protected readonly sizesCode = `<span nbIcon src="/icons/plane.svg" size="xs" decorative></span>
<span nbIcon src="/icons/plane.svg" size="sm" decorative></span>
<span nbIcon src="/icons/plane.svg" size="md" decorative></span>
<span nbIcon src="/icons/plane.svg" size="lg" decorative></span>
<span nbIcon src="/icons/plane.svg" size="xl" decorative></span>`;

  protected readonly tonesCode = `<span nbIcon src="/icons/star.svg" size="md" tone="current" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="default" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="muted" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="inverse" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="primary" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="secondary" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="accent" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="danger" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="success" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="warning" decorative></span>`;

  protected readonly modesCode = `<!-- mask: paints the SVG with the tone color -->
<span nbIcon src="/icons/plane.svg" size="xl" mode="mask" tone="primary" decorative></span>

<!-- image: preserves original asset colors -->
<span nbIcon src="/icons/illustrated-plane.png" size="xl" mode="image" decorative></span>`;

  protected readonly a11yCode = `<!-- Decorative — icon is supplementary to adjacent text -->
<span nbIcon src="/icons/star.svg" size="lg" tone="warning" decorative></span>

<!-- Meaningful — icon stands alone and must be labelled -->
<span nbIcon src="/icons/star.svg" size="lg" tone="warning" label="Top rated"></span>`;

  protected readonly compositionCode = `<!-- Icons inside chips -->
<div nbChipGroup>
  <span nbChip tone="mint">
    <span nbIcon src="/icons/plane.svg" size="sm" decorative></span>
    Flight included
  </span>
  <span nbChip tone="lavender">
    <span nbIcon src="/icons/hotel.svg" size="sm" decorative></span>
    Hotel
  </span>
  <span nbChip tone="pink">
    <span nbIcon src="/icons/star.svg" size="sm" decorative></span>
    Top pick
  </span>
</div>

<!-- Icon inside button trailing slot -->
<button nbButton>
  Book Trip
  <span nbButtonTrailingIcon class="...">
    <span nbIcon src="/icons/arrow-right.svg" size="sm" tone="current" decorative></span>
  </span>
</button>`;

  protected readonly sizes = [
    { value: 'xs', px: '0.75rem' },
    { value: 'sm', px: '1rem' },
    { value: 'md', px: '1.25rem' },
    { value: 'lg', px: '1.5rem' },
    { value: 'xl', px: '2rem' },
  ] satisfies readonly IconSizeDemo[];

  protected readonly tones = [
    { value: 'current' },
    { value: 'default' },
    { value: 'muted' },
    { value: 'inverse' },
    { value: 'primary' },
    { value: 'secondary' },
    { value: 'accent' },
    { value: 'danger' },
    { value: 'success' },
    { value: 'warning' },
  ] satisfies readonly IconToneDemo[];
}
