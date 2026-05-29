import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbCallout,
  NbSeparator,
  type NbCalloutLayout,
  type NbCalloutShadow,
  type NbCalloutSize,
  type NbCalloutTone,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

interface CalloutToneDemo {
  readonly value: NbCalloutTone;
  readonly label: string;
  readonly sample: string;
}

interface CalloutSizeDemo {
  readonly value: NbCalloutSize;
  readonly sample: string;
}

interface CalloutLayoutDemo {
  readonly value: NbCalloutLayout;
  readonly label: string;
}

interface CalloutShadowDemo {
  readonly value: NbCalloutShadow;
  readonly label: string;
}

@Component({
  selector: 'docs-callout-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    DocsTokens,
    NbCallout,
    NbSeparator,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Callout</p>
          <h1>Callout</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A high-emphasis directive for important values. Use
            <code class="font-mono">nbCallout</code> for prices, stats, dates,
            awards, ratings, totals, and other compact pieces of information
            that need the loud brutalist treatment without domain-specific API.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">14</span>
            <span class="nb-stat-tile__label">Tones</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">4</span>
            <span class="nb-stat-tile__label">Sizes</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Layouts</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/callout"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div nbCallout tone="yellow" size="xl">$799</div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Add <code class="font-mono">nbCallout</code> to the element that owns
          the emphasized value. Compose icons, labels, dividers, and secondary
          text inside the host with normal template markup.
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="examples">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Examples</h2>
        <docs-example [code]="examplesCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            <div nbCallout tone="yellow" size="xl">$799</div>

            <div nbCallout tone="pink" size="lg">
              <span>$420K</span>
            </div>

            <div nbCallout tone="mint" size="md">
              <span>4.9</span>
              <hr nbSeparator orientation="vertical" />
              <span class="text-sm">842 REVIEWS</span>
            </div>

            <div nbCallout tone="lavender" size="lg" layout="between">
              <span>TODAY</span>
              <span>3:30 PM</span>
            </div>
          </div>
        </docs-example>
      </section>

      <section id="tones">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
        <docs-example [code]="tonesExampleCode">
          <div class="grid w-full grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (tone of tones; track tone.value) {
              <div nbCallout [tone]="tone.value" size="md" layout="between">
                <span>{{ tone.label }}</span>
                <span>{{ tone.sample }}</span>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="sizes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Sizes</h2>
        <docs-example [code]="sizesExampleCode">
          <div class="flex w-full flex-col items-start gap-4 p-4">
            @for (size of sizes; track size.value) {
              <div nbCallout tone="yellow" [size]="size.value">
                {{ size.sample }}
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="layouts">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Layouts</h2>
        <docs-example [code]="layoutsExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4">
            @for (layout of layouts; track layout.value) {
              <div nbCallout tone="cream" size="md" [layout]="layout.value">
                <span>{{ layout.label }}</span>
                <span>EP 42</span>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="shadows">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Shadows</h2>
        <docs-example [code]="shadowsExampleCode">
          <div class="grid w-full grid-cols-1 gap-5 p-4 sm:grid-cols-3">
            @for (shadow of shadows; track shadow.value) {
              <div
                nbCallout
                tone="blue"
                size="md"
                layout="center"
                [shadow]="shadow.value"
              >
                {{ shadow.label }}
              </div>
            }
          </div>
        </docs-example>
      </section>

      <docs-tokens component="callout" />

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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">tone</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'yellow' | 'pink' | 'mint' | 'lavender' | 'blue' | 'cream' | 'white' | 'black' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'yellow'</td>
                <td class="px-4 py-3">Background and foreground color pair.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">size</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'sm' | 'md' | 'lg' | 'xl'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'lg'</td>
                <td class="px-4 py-3">Height, padding, type size, radius, and border weight preset.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">layout</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'inline' | 'between' | 'center'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'inline'</td>
                <td class="px-4 py-3">Horizontal alignment for the callout content.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">shadow</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'default' | 'hard'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'hard'</td>
                <td class="px-4 py-3">Offset shadow preset.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalloutPage {
  protected readonly importCode = `import { NbCallout, NbSeparator } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbCallout tone="yellow" size="xl">
  $799
</div>`;

  protected readonly examplesCode = `<div nbCallout tone="yellow" size="xl">$799</div>

<div nbCallout tone="mint" size="md">
  <span>4.9</span>
  <hr nbSeparator orientation="vertical" />
  <span class="text-sm">842 REVIEWS</span>
</div>

<div nbCallout tone="lavender" size="lg" layout="between">
  <span>TODAY</span>
  <span>3:30 PM</span>
</div>`;

  protected readonly tonesExampleCode = `<div nbCallout tone="yellow">Yellow</div>
<div nbCallout tone="pink">Pink</div>
<div nbCallout tone="mint">Mint</div>
<div nbCallout tone="black">Black</div>`;

  protected readonly sizesExampleCode = `<div nbCallout size="sm">SM</div>
<div nbCallout size="md">MD</div>
<div nbCallout size="lg">LG</div>
<div nbCallout size="xl">XL</div>`;

  protected readonly layoutsExampleCode = `<div nbCallout layout="inline">
  <span>Inline</span>
  <span>EP 42</span>
</div>

<div nbCallout layout="between">
  <span>Between</span>
  <span>EP 42</span>
</div>

<div nbCallout layout="center">
  <span>Center</span>
  <span>EP 42</span>
</div>`;

  protected readonly shadowsExampleCode = `<div nbCallout shadow="none">None</div>
<div nbCallout shadow="default">Default</div>
<div nbCallout shadow="hard">Hard</div>`;

  protected readonly tones = [
    { value: 'yellow', label: 'yellow', sample: '$799' },
    { value: 'pink', label: 'pink', sample: '$420K' },
    { value: 'mint', label: 'mint', sample: '4.9' },
    { value: 'lavender', label: 'lavender', sample: 'EP 42' },
    { value: 'blue', label: 'blue', sample: '3:30' },
    { value: 'cream', label: 'cream', sample: '$129' },
    { value: 'white', label: 'white', sample: '$8.2K' },
    { value: 'black', label: 'black', sample: '$5K' },
    { value: 'primary', label: 'primary', sample: 'NEW' },
    { value: 'secondary', label: 'secondary', sample: 'SAVE' },
    { value: 'accent', label: 'accent', sample: 'HOT' },
    { value: 'success', label: 'success', sample: 'DONE' },
    { value: 'warning', label: 'warning', sample: 'TODAY' },
    { value: 'danger', label: 'danger', sample: 'LIVE' },
  ] satisfies readonly CalloutToneDemo[];

  protected readonly sizes = [
    { value: 'sm', sample: 'SM $129' },
    { value: 'md', sample: 'MD 4.9' },
    { value: 'lg', sample: 'LG $420K' },
    { value: 'xl', sample: 'XL $799' },
  ] satisfies readonly CalloutSizeDemo[];

  protected readonly layouts = [
    { value: 'inline', label: 'Inline' },
    { value: 'between', label: 'Between' },
    { value: 'center', label: 'Center' },
  ] satisfies readonly CalloutLayoutDemo[];

  protected readonly shadows = [
    { value: 'none', label: 'None' },
    { value: 'default', label: 'Default' },
    { value: 'hard', label: 'Hard' },
  ] satisfies readonly CalloutShadowDemo[];
}
