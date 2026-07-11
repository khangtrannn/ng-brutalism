import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbChip, NbChipGroup, NbStat, NbSurface } from '@ng-brutalism/ui';

import {
  DocsCodeBlock,
  DocsExample,
  DocsSourceTile,
  DocsStatusBadge,
  DocsTokens,
} from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-chip-page',
  imports: [
    NbStat,
    NbSurface,
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    DocsStatusBadge,
    DocsTokens,
    NbChip,
    NbChipGroup,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Chip</p>
          <h1>Chip</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A directive on <code class="font-mono">&lt;span&gt;</code> for
            compact labels, tags, and categories. Pairs with
            <code class="font-mono">nbChipGroup</code>
            for horizontal chip rows. Supports 10 tones and an optional leading
            icon via
            <code class="font-mono">ng-content</code>.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <docs-status-badge status="stable" />
          <div
            nbSurface
            tone="yellow"
            border="strong"
            padding="sm"
            layout="stack"
            class="items-start"
          >
            <nb-stat value="span" label="Host element" />
          </div>
          <div
            nbSurface
            tone="mint"
            border="strong"
            padding="sm"
            layout="stack"
            class="items-start"
          >
            <nb-stat value="10" label="Tones" />
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/chip"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div nbChipGroup class="p-4">
            <span nbChip>Angular</span>
            <span nbChip tone="mint">TypeScript</span>
            <span nbChip tone="pink">RxJS</span>
            <span nbChip tone="lavender">Signals</span>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="tones">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
        <docs-example [code]="tonesExampleCode">
          <div nbChipGroup class="p-4">
            <span nbChip>default</span>
            <span nbChip tone="ink">ink</span>
            <span nbChip tone="yellow">yellow</span>
            <span nbChip tone="pink">pink</span>
            <span nbChip tone="mint">mint</span>
            <span nbChip tone="lavender">lavender</span>
            <span nbChip tone="accent">accent</span>
            <span nbChip tone="success">success</span>
            <span nbChip tone="warning">warning</span>
            <span nbChip tone="danger">danger</span>
          </div>
        </docs-example>
      </section>

      <section id="tokens">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tokens</h2>
        <docs-example [code]="tokensExampleCode">
          <div nbChipGroup class="p-4">
            <span
              nbChip
              tone="yellow"
              class="gap-[14px] px-[18px] py-[10px] text-[22px] leading-none font-black"
              style="--nb-chip-radius:8px; --nb-chip-shadow:6px 6px 0 0 var(--nb-shadow); --nb-chip-icon-size:36px"
            >
              <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <circle cx="20" cy="20" r="18" fill="currentColor" />
                <text
                  x="20"
                  y="27"
                  text-anchor="middle"
                  font-size="24"
                  font-weight="1000"
                  fill="#fff"
                  font-family="Arial Black, Arial, sans-serif"
                >
                  $
                </text>
              </svg>
              $95K - $130K
            </span>
          </div>
        </docs-example>
      </section>

      <section id="with-icon">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          With Icon
        </h2>
        <p class="mb-4 font-medium">
          Pass an SVG URL to the <code class="font-mono">icon</code> input for a
          leading icon. It renders through <code class="font-mono">nbIcon</code>
          in mask mode, so it tints to the chip's foreground color. Use
          <code class="font-mono">iconSize</code> to scale it.
        </p>
        <docs-example [code]="withIconExampleCode">
          <div nbChipGroup class="p-4">
            <span nbChip tone="mint" icon="/podcast-card/clock.svg"
              >45 MIN</span
            >
            <span nbChip tone="lavender" icon="/podcast-card/sparkle.svg"
              >NEW</span
            >
          </div>
        </docs-example>
        <p class="mt-4 font-medium">
          For full-color or labeled icons, project any element as content
          instead - the leading slot is only used when
          <code class="font-mono">icon</code> is set.
        </p>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <p class="mb-4 font-bold">NbChip</p>
        <div
          tabindex="0"
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-160 border-collapse text-left">
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
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  tone
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'surface' | 'background' | 'ink' | 'yellow' | 'pink' | 'mint'
                  | 'lavender' | 'accent' | 'success' | 'warning' | 'danger'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'surface'
                </td>
                <td class="px-4 py-3">Background color tone.</td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  size
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'none' | 'sm' | 'md' | 'lg' | 'xl'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'md'
                </td>
                <td class="px-4 py-3">Inner padding scale.</td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  radius
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'none' | 'sm' | 'md' | 'lg' | 'full'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'none'
                </td>
                <td class="px-4 py-3">Corner radius scale.</td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  shadow
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'none' | 'sm' | 'md' | 'hard'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'sm'
                </td>
                <td class="px-4 py-3">Drop shadow scale.</td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  icon
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  string
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  -
                </td>
                <td class="px-4 py-3">
                  URL of a leading SVG icon, tinted to the chip's foreground via
                  nbIcon mask mode.
                </td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  iconSize
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'xs' | 'sm' | 'md' | 'lg' | 'xl'
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  'sm'
                </td>
                <td class="px-4 py-3">
                  Size of the <code class="font-mono">icon</code> input's icon.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mt-6 mb-4 font-bold">NbChipGroup</p>
        <p class="font-medium">
          Wrapper directive with
          <code class="font-mono">flex flex-wrap gap-2</code>. No inputs - use
          Tailwind or inline styles to override spacing.
        </p>
      </section>

      <docs-tokens component="chip" />

      <section id="accessibility">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <p class="font-medium">
          <strong>APG pattern:</strong> N/A - a chip is a
          <code class="font-mono">&lt;span&gt;</code>, presentational by
          default. When used as a removable/selectable control (not currently
          built in), give it a real interactive role and keyboard handling
          rather than relying on the visual style alone.
          <strong>Status:</strong> Stable.
        </p>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChipPage {
  protected readonly importCode = `import { NbChip, NbChipGroup } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbChipGroup>
  <span nbChip>Angular</span>
  <span nbChip tone="mint">TypeScript</span>
  <span nbChip tone="pink">RxJS</span>
  <span nbChip tone="lavender">Signals</span>
</div>`;

  protected readonly tonesExampleCode = `<div nbChipGroup>
  <span nbChip>default</span>
  <span nbChip tone="ink">ink</span>
  <span nbChip tone="yellow">yellow</span>
  <span nbChip tone="pink">pink</span>
  <span nbChip tone="mint">mint</span>
  <span nbChip tone="lavender">lavender</span>
  <span nbChip tone="accent">accent</span>
  <span nbChip tone="success">success</span>
  <span nbChip tone="warning">warning</span>
  <span nbChip tone="danger">danger</span>
</div>`;

  protected readonly tokensExampleCode = `<span
  nbChip
  tone="yellow"
  class="gap-[14px] px-[18px] py-[10px] text-[22px] leading-none font-black"
  style="--nb-chip-radius:8px; --nb-chip-shadow:6px 6px 0 0 var(--nb-shadow); --nb-chip-icon-size:36px"
>
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">...</svg>
  $95K - $130K
</span>`;

  protected readonly withIconExampleCode = `<div nbChipGroup>
  <span nbChip tone="mint" icon="/podcast-card/clock.svg">45 MIN</span>
  <span nbChip tone="lavender" icon="/podcast-card/sparkle.svg">NEW</span>
</div>`;
}
