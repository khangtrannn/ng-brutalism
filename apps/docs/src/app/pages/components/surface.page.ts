import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbSurface,
  type NbSurfaceBorder,
  type NbSurfaceRadius,
  type NbSurfaceShadow,
  type NbSurfaceTone,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

interface SurfaceToneDemo {
  readonly value: NbSurfaceTone;
  readonly label: string;
  readonly description: string;
}

interface SurfaceShapeDemo {
  readonly label: string;
  readonly tone: NbSurfaceTone;
  readonly radius: NbSurfaceRadius;
  readonly border: NbSurfaceBorder;
  readonly shadow: NbSurfaceShadow;
}

@Component({
  selector: 'docs-surface-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, DocsTokens, NbSurface],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Surface</p>
          <h1>Surface</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A directive for turning any host element into a brutalist panel.
            Use <code class="font-mono">nbSurface</code> for layout shells,
            callouts, recipe containers, and custom compositions that need the
            same borders, tones, radius, and offset shadow system as the
            packaged components.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">div</span>
            <span class="nb-stat-tile__label">Any host</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">17</span>
            <span class="nb-stat-tile__label">Tones</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">CSS</span>
            <span class="nb-stat-tile__label">Token driven</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/surface"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <article
            nbSurface
            tone="yellow"
            radius="xl"
            border="thick"
            shadow="heavy"
            clip
            class="w-full max-w-md"
          >
            <div class="border-b-2 border-(--nb-border) bg-nb-primary px-5 py-3 text-nb-primary-fg">
              <p class="font-mono text-xs font-black uppercase">Launch deck</p>
            </div>
            <div class="p-5">
              <h3 class="text-2xl font-black">Ship the loud version</h3>
              <p class="mt-2 text-sm font-medium">
                Surface gives custom layouts the same brutalist frame as the
                core components.
              </p>
            </div>
          </article>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-4 font-medium">
          Add <code class="font-mono">nbSurface</code> to the element that owns
          the panel. Spacing and internal layout stay in your template via
          normal classes.
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="tones">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
        <docs-example [code]="tonesExampleCode">
          <div class="grid w-full grid-cols-1 gap-3 p-4 sm:grid-cols-2">
            @for (tone of tones; track tone.value) {
              <div nbSurface [tone]="tone.value" shadow="sm" class="p-4">
                <p class="font-mono text-xs font-black uppercase opacity-75">
                  {{ tone.label }}
                </p>
                <p class="mt-1 text-sm font-bold">{{ tone.description }}</p>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="shape">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Shape</h2>
        <p class="mb-4 font-medium">
          Combine <code class="font-mono">radius</code>,
          <code class="font-mono">border</code>, and
          <code class="font-mono">shadow</code> presets for different surface
          weights.
        </p>
        <docs-example [code]="shapeExampleCode">
          <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-3">
            @for (shape of shapes; track shape.label) {
              <div
                nbSurface
                [tone]="shape.tone"
                [radius]="shape.radius"
                [border]="shape.border"
                [shadow]="shape.shadow"
                class="min-h-32 p-4"
              >
                <p class="font-black">{{ shape.label }}</p>
                <p class="mt-2 font-mono text-xs">
                  {{ shape.radius }} / {{ shape.border }} / {{ shape.shadow }}
                </p>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="clip">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Clip</h2>
        <p class="mb-4 font-medium">
          Use the boolean <code class="font-mono">clip</code> input when a
          surface has colored bands, media, or decorative children that should
          respect the surface radius.
        </p>
        <docs-example [code]="clipExampleCode">
          <article nbSurface tone="white" radius="xl" shadow="hard" clip class="relative w-full max-w-sm">
            <div class="relative h-44 bg-(--nb-blue) text-white">
              <div
                class="absolute -right-10 -top-10 size-28 rounded-full border-2 border-(--nb-border) bg-(--nb-yellow)"
                aria-hidden="true"
              ></div>
              <div
                class="absolute -left-12 bottom-8 h-10 w-44 rotate-[-14deg] border-2 border-(--nb-border) bg-(--nb-primary)"
                aria-hidden="true"
              ></div>
            </div>
            <div class="p-5">
              <p class="text-sm font-black uppercase">Corners hold</p>
              <p class="mt-2 text-sm font-medium">
                Decorative children stay inside the surface radius.
              </p>
            </div>
          </article>
        </docs-example>
      </section>

      <docs-tokens component="surface" />

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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default' | 'background' | 'surface' | 'cream' | 'white' | 'black' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'blue' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default'</td>
                <td class="px-4 py-3">Background and foreground color pair.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">radius</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'md'</td>
                <td class="px-4 py-3">Corner radius preset.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">border</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'thin' | 'default' | 'thick'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default'</td>
                <td class="px-4 py-3">Border width preset.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">shadow</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'sm' | 'default' | 'hard' | 'heavy'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default'</td>
                <td class="px-4 py-3">Offset shadow preset.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">clip</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">boolean</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">false</td>
                <td class="px-4 py-3">Adds overflow hidden to the surface.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SurfacePage {
  protected readonly importCode = `import { NbSurface } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<article
  nbSurface
  tone="yellow"
  radius="xl"
  border="thick"
  shadow="heavy"
  clip
  class="max-w-md"
>
  <div class="border-b-2 border-(--nb-border) bg-nb-primary px-5 py-3">
    <p class="font-mono text-xs font-black uppercase">Launch deck</p>
  </div>
  <div class="p-5">
    <h3>Ship the loud version</h3>
    <p>Surface gives custom layouts the same brutalist frame.</p>
  </div>
</article>`;

  protected readonly tonesExampleCode = `<div nbSurface tone="default">Default theme surface</div>
<div nbSurface tone="yellow">Yellow surface</div>
<div nbSurface tone="black">Black surface</div>
<div nbSurface tone="success">Success surface</div>`;

  protected readonly shapeExampleCode = `<div nbSurface radius="sm" border="thin" shadow="sm">Compact</div>
<div nbSurface tone="pink" radius="lg" border="default" shadow="hard">Poster</div>
<div nbSurface tone="mint" radius="xl" border="thick" shadow="heavy">Feature</div>`;

  protected readonly clipExampleCode = `<article nbSurface radius="xl" clip class="relative">
  <div class="relative h-44 bg-(--nb-blue)">
    <div class="absolute -right-10 -top-10 size-28 rounded-full bg-(--nb-yellow)"></div>
    <div class="absolute -left-12 bottom-8 h-10 w-44 rotate-[-14deg] bg-(--nb-primary)"></div>
  </div>
  <div class="p-5">Decorative children stay inside the surface radius.</div>
</article>`;

  protected readonly tones = [
    {
      value: 'default',
      label: 'default',
      description: 'Uses --nb-surface tokens.',
    },
    {
      value: 'background',
      label: 'background',
      description: 'Uses the page background tokens.',
    },
    {
      value: 'surface',
      label: 'surface',
      description: 'Explicit component surface tone.',
    },
    { value: 'cream', label: 'cream', description: 'Warm editorial panel.' },
    { value: 'white', label: 'white', description: 'Crisp white panel.' },
    { value: 'black', label: 'black', description: 'High contrast black panel.' },
    { value: 'yellow', label: 'yellow', description: 'Main brutalist yellow.' },
    { value: 'pink', label: 'pink', description: 'Punchy pink accent.' },
    { value: 'mint', label: 'mint', description: 'Soft pastel mint.' },
    { value: 'lavender', label: 'lavender', description: 'Pale lavender surface.' },
    { value: 'blue', label: 'blue', description: 'Clear sky blue surface.' },
    { value: 'primary', label: 'primary', description: 'Theme primary color.' },
    {
      value: 'secondary',
      label: 'secondary',
      description: 'Theme secondary color.',
    },
    { value: 'accent', label: 'accent', description: 'Theme accent color.' },
    { value: 'success', label: 'success', description: 'Semantic success tone.' },
    { value: 'warning', label: 'warning', description: 'Semantic warning tone.' },
    { value: 'danger', label: 'danger', description: 'Semantic danger tone.' },
  ] satisfies readonly SurfaceToneDemo[];

  protected readonly shapes = [
    {
      label: 'Compact',
      tone: 'white',
      radius: 'sm',
      border: 'thin',
      shadow: 'sm',
    },
    {
      label: 'Poster',
      tone: 'pink',
      radius: 'lg',
      border: 'default',
      shadow: 'hard',
    },
    {
      label: 'Feature',
      tone: 'mint',
      radius: 'xl',
      border: 'thick',
      shadow: 'heavy',
    },
  ] satisfies readonly SurfaceShapeDemo[];
}
