import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-media-frame-api',
  template: `
    <section id="api">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
      <div
        tabindex="0"
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
                tone
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'surface' | 'cream' | 'white' | 'black' | 'yellow' | 'pink' |
                'mint' | 'lavender' | 'blue' | 'primary' | 'secondary' |
                'accent' | 'background' | 'ink'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'surface'
              </td>
              <td class="px-4 py-3">
                Background color shown when content doesn't fill the frame.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                ratio
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'auto' | '1/1' | '3/4' | '4/3' | '3/2' | '16/9' | '21/9'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'auto'
              </td>
              <td class="px-4 py-3">
                Locks the frame to the given aspect ratio.
                <code class="font-mono">'auto'</code> lets content define the
                height.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                fit
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'cover' | 'contain' | 'fill'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'cover'
              </td>
              <td class="px-4 py-3">
                Object-fit applied to direct
                <code class="font-mono">img</code>,
                <code class="font-mono">video</code>, and
                <code class="font-mono">picture</code> children.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                radius
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'lg'
              </td>
              <td class="px-4 py-3">
                Corner radius preset. Use
                <code class="font-mono">'full'</code> for circular portrait
                frames.
              </td>
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
                'none' | 'md' | 'hard'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none'
              </td>
              <td class="px-4 py-3">
                Offset shadow preset.
                <code class="font-mono">'hard'</code> adds a bold 6 px brutalist
                drop shadow.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaFrameApi {}
