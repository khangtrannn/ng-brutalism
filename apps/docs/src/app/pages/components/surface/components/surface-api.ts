import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-surface-api',
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
                'surface' | 'background' | 'cream' | 'white' | 'black' |
                'yellow' | 'pink' | 'mint' | 'lavender' | 'blue' | 'primary' |
                'secondary' | 'accent' | 'success' | 'warning' | 'danger'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'surface'
              </td>
              <td class="px-4 py-3">Background and foreground color pair.</td>
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
                'md'
              </td>
              <td class="px-4 py-3">Corner radius preset.</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                border
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'thin' | 'md' | 'strong' | 'thick'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'md'
              </td>
              <td class="px-4 py-3">Border width preset.</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                shadow
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'sm' | 'md' | 'hard' | 'heavy'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'md'
              </td>
              <td class="px-4 py-3">Offset shadow preset.</td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                padding
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none'
              </td>
              <td class="px-4 py-3">
                Uniform inner padding. Prefer
                <code class="font-mono">nbSection</code> for region-specific
                padding inside a surface.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                size
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'auto' | 'sm' | 'md' | 'lg' | 'xl'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'auto'
              </td>
              <td class="px-4 py-3">
                Fixed square size. Use for avatar containers or icon-sized
                surfaces. <code class="font-mono">'auto'</code> lets content
                define the dimensions.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                layout
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'block' | 'center' | 'row' | 'stack'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'block'
              </td>
              <td class="px-4 py-3">
                Inner display mode.
                <code class="font-mono">center</code> centers content both axes,
                <code class="font-mono">row</code> aligns children in a row,
                <code class="font-mono">stack</code> stacks them vertically.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                edge
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none' | 'top' | 'bottom'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'none'
              </td>
              <td class="px-4 py-3">
                Adds a 2 px accent border on the top or bottom edge using the
                tone's border color. Useful for callout or notification panels.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                typography
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'inherit' | 'body' | 'display' | 'accent' | 'mono'
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                'inherit'
              </td>
              <td class="px-4 py-3">
                Sets a font-family role for the surface and all descendant
                primitives via the cascade. Composes
                <code class="font-mono">nbTypography</code>.
              </td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                clip
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                boolean
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                false
              </td>
              <td class="px-4 py-3">
                Adds overflow hidden to the surface so child media and
                decorations respect the surface radius.
              </td>
            </tr>
            <tr>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                interactive
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                boolean
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                false
              </td>
              <td class="px-4 py-3">
                Lifts on hover, presses on click, and shows a focus ring. Use on
                links and custom clickable surfaces instead of wiring up
                hover/active states by hand.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceApi {}
