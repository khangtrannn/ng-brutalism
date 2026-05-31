import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbMediaFrame,
  type NbMediaFrameFit,
  type NbMediaFrameRadius,
  type NbMediaFrameRatio,
  type NbMediaFrameShadow,
  type NbMediaFrameTone,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

interface MediaFrameRatioDemo {
  readonly value: NbMediaFrameRatio;
  readonly label: string;
  readonly description: string;
}

interface MediaFrameFitDemo {
  readonly value: NbMediaFrameFit;
  readonly label: string;
  readonly description: string;
}

interface MediaFrameShapeDemo {
  readonly label: string;
  readonly description: string;
  readonly radius: NbMediaFrameRadius;
  readonly shadow: NbMediaFrameShadow;
  readonly tone: NbMediaFrameTone;
}

@Component({
  selector: 'docs-media-frame-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, DocsTokens, NbMediaFrame],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular Media Frame</p>
          <h1>Media Frame</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code class="font-mono">nbMediaFrame</code> for framed visual
            content: images, video, illustrations, portraits, waveforms, maps,
            product previews, or any media-like block.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">12</span>
            <span class="nb-stat-tile__label">Tones</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">6</span>
            <span class="nb-stat-tile__label">Ratios</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">6</span>
            <span class="nb-stat-tile__label">Shapes</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/media-frame"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="flex flex-col gap-6 p-4">
            <div nbMediaFrame ratio="16/9" tone="lavender" shadow="hard">
              <img
                src="/assets/images/media-frame-demo.png"
                alt="Neo-brutalist media frame landscape"
              />
            </div>
            <div nbMediaFrame ratio="1/1" tone="pink" radius="full" class="w-48">
              <img
                src="/assets/images/media-frame-demo.png"
                alt="Neo-brutalist media frame circle"
              />
            </div>
            <div nbMediaFrame ratio="1/1" tone="mint" shadow="hard" class="w-48">
              <img
                src="/assets/images/media-frame-demo.png"
                alt="Neo-brutalist media frame square"
              />
            </div>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <p class="mb-5 max-w-3xl font-medium">
          Add the directive to the element that owns the frame. Captions,
          labels, badges, and actions belong outside the primitive.
        </p>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="usageCode" />
      </section>

      <section id="ratios">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Ratios</h2>
        <docs-example [code]="ratiosExampleCode">
          <div class="flex flex-col divide-y-2 divide-(--nb-border) p-4">
            @for (ratio of ratios; track ratio.value) {
              <div class="py-5 first:pt-0 last:pb-0">
                <div class="mb-3 flex items-baseline gap-3">
                  <span class="font-black uppercase">{{ ratio.label }}</span>
                  <span class="text-sm font-medium opacity-60">{{ ratio.description }}</span>
                </div>
                <div
                  nbMediaFrame
                  [ratio]="ratio.value"
                  tone="lavender"
                  shadow="hard"
                  [class]="ratio.value === 'auto' ? 'min-h-48' : ''"
                >
                  <img
                    src="/assets/images/media-frame-demo.png"
                    [alt]="ratio.label + ' ratio demo'"
                  />
                </div>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="fit">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Fit</h2>
        <docs-example [code]="fitExampleCode">
          <div class="flex flex-col divide-y-2 divide-(--nb-border) p-4">
            @for (fit of fits; track fit.value) {
              <div class="py-5 first:pt-0 last:pb-0">
                <div class="mb-3 flex items-baseline gap-3">
                  <span class="font-black uppercase">{{ fit.label }}</span>
                  <span class="text-sm font-medium opacity-60">{{ fit.description }}</span>
                </div>
                <div nbMediaFrame ratio="16/9" tone="mint" [fit]="fit.value">
                  <img
                    src="/assets/images/media-frame-demo.png"
                    [alt]="fit.label + ' fit demo'"
                  />
                </div>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <section id="shape">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Shape</h2>
        <docs-example [code]="shapeExampleCode">
          <div class="flex flex-col divide-y-2 divide-(--nb-border) p-4">
            @for (shape of shapes; track shape.label) {
              <div class="py-5 first:pt-0 last:pb-0">
                <div class="mb-3 flex items-baseline gap-3">
                  <span class="font-black uppercase">{{ shape.label }}</span>
                  <span class="text-sm font-medium opacity-60">{{ shape.description }}</span>
                </div>
                <div
                  nbMediaFrame
                  ratio="1/1"
                  [tone]="shape.tone"
                  [radius]="shape.radius"
                  [shadow]="shape.shadow"
                  class="w-48"
                >
                  <img
                    src="/assets/images/media-frame-demo.png"
                    [alt]="shape.label + ' shape demo'"
                  />
                </div>
              </div>
            }
          </div>
        </docs-example>
      </section>

      <docs-tokens component="media-frame" />

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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default' | 'cream' | 'white' | 'black' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'blue' | 'primary' | 'secondary' | 'accent'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'default'</td>
                <td class="px-4 py-3">Background color shown when content doesn't fill the frame.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">ratio</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'auto' | '1/1' | '4/3' | '3/2' | '16/9' | '21/9'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'auto'</td>
                <td class="px-4 py-3">Locks the frame to the given aspect ratio. <code class="font-mono">'auto'</code> lets content define the height.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">fit</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'cover' | 'contain' | 'fill'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'cover'</td>
                <td class="px-4 py-3">Object-fit applied to direct <code class="font-mono">img</code>, <code class="font-mono">video</code>, and <code class="font-mono">picture</code> children.</td>
              </tr>
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">radius</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'lg'</td>
                <td class="px-4 py-3">Corner radius preset. Use <code class="font-mono">'full'</code> for circular portrait frames.</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">shadow</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none' | 'default' | 'hard'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'none'</td>
                <td class="px-4 py-3">Offset shadow preset. <code class="font-mono">'hard'</code> adds a bold 6 px brutalist drop shadow.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MediaFramePage {
  protected readonly importCode = `import { NbMediaFrame } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbMediaFrame ratio="16/9" tone="lavender" shadow="hard">
  <img src="/assets/images/media-frame-demo.png" alt="..." />
</div>

<div nbMediaFrame ratio="1/1" tone="pink" radius="full" class="w-48">
  <img src="/assets/images/media-frame-demo.png" alt="..." />
</div>

<div nbMediaFrame ratio="1/1" tone="mint" shadow="hard" class="w-48">
  <img src="/assets/images/media-frame-demo.png" alt="..." />
</div>`;

  protected readonly usageCode = `<div nbMediaFrame>
  <img src="/..." alt="" />
</div>

<div nbMediaFrame ratio="16/9" tone="lavender">
  <video src="/..." />
</div>

<div nbMediaFrame ratio="1/1" fit="cover">
  <img src="/profile.png" alt="Profile" />
</div>`;

  protected readonly ratiosExampleCode = `<div nbMediaFrame ratio="1/1" tone="lavender" shadow="hard">
  <img src="/..." alt="Square" />
</div>

<div nbMediaFrame ratio="16/9" tone="lavender" shadow="hard">
  <img src="/..." alt="Video" />
</div>

<div nbMediaFrame ratio="21/9" tone="lavender" shadow="hard">
  <img src="/..." alt="Cinematic" />
</div>`;

  protected readonly fitExampleCode = `<div nbMediaFrame ratio="16/9" tone="mint" fit="cover">
  <img src="/..." alt="" />
</div>

<div nbMediaFrame ratio="16/9" tone="mint" fit="contain">
  <img src="/..." alt="" />
</div>

<div nbMediaFrame ratio="16/9" tone="mint" fit="fill">
  <img src="/..." alt="" />
</div>`;

  protected readonly shapeExampleCode = `<div nbMediaFrame ratio="1/1" tone="yellow" radius="none" shadow="none" class="w-48">
  <img src="/..." alt="Sharp" />
</div>

<div nbMediaFrame ratio="1/1" tone="lavender" radius="lg" shadow="default" class="w-48">
  <img src="/..." alt="Poster" />
</div>

<div nbMediaFrame ratio="1/1" tone="pink" radius="full" shadow="hard" class="w-48">
  <img src="/..." alt="Portrait" />
</div>`;

  protected readonly ratios = [
    { value: 'auto', label: 'Auto', description: 'No ratio enforced — content defines the height' },
    { value: '1/1', label: '1 / 1', description: 'Square — profiles, avatars, album art' },
    { value: '4/3', label: '4 / 3', description: 'Classic photo — product cards, listings' },
    { value: '3/2', label: '3 / 2', description: 'Editorial — standard photography ratio' },
    { value: '16/9', label: '16 / 9', description: 'Video — presentations, hero images' },
    { value: '21/9', label: '21 / 9', description: 'Cinematic — immersive panoramic banners' },
  ] satisfies readonly MediaFrameRatioDemo[];

  protected readonly fits = [
    { value: 'cover', label: 'Cover', description: 'Fills the frame and crops to fit — best for hero images' },
    { value: 'contain', label: 'Contain', description: 'Shows the full image, may reveal the background tone' },
    { value: 'fill', label: 'Fill', description: 'Stretches to fill the exact frame dimensions' },
  ] satisfies readonly MediaFrameFitDemo[];

  protected readonly shapes = [
    { label: 'Sharp', description: 'Hard edges, no shadow — raw brutalist style', radius: 'none', shadow: 'none', tone: 'yellow' },
    { label: 'Poster', description: 'Rounded corners with a soft offset shadow', radius: 'lg', shadow: 'default', tone: 'lavender' },
    { label: 'Portrait', description: 'Fully circular with a bold brutalist drop shadow', radius: 'full', shadow: 'hard', tone: 'pink' },
  ] satisfies readonly MediaFrameShapeDemo[];
}
