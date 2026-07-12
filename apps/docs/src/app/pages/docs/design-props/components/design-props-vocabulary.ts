import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-design-props-vocabulary',
  template: `
    <section id="vocabulary">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        The vocabulary - 7 categories
      </h2>
      <p class="mb-5 text-base font-medium">
        A component only exposes the categories that make sense for it - see
        <a href="#archetypes" class="underline">archetypes</a> below. The core
        rule that makes this vocabulary predictable: the Angular input and the
        CSS customization variable write the <strong>same public slot</strong>.
        There is no separate <code class="font-mono">--*-input</code> vs
        <code class="font-mono">--*-default</code> variable pair to keep in
        sync.
      </p>

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
                Category
              </th>
              <th
                class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
              >
                Type
              </th>
              <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                What it controls
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
                NbTone
              </td>
              <td class="px-4 py-3">
                Semantic color recipe, reflected as
                <code class="font-mono">data-nb-tone</code>.
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
                component-local
              </td>
              <td class="px-4 py-3">
                Usually <code class="font-mono">sm · md · lg</code>. Presets,
                not raw scalars.
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
                NbRadius
              </td>
              <td class="px-4 py-3">
                <code class="font-mono">none · sm · md · lg · xl · full</code>
              </td>
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
                NbShadow
              </td>
              <td class="px-4 py-3">
                <code class="font-mono">none · sm · md · hard · heavy</code>
              </td>
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
                NbBorderStrength
              </td>
              <td class="px-4 py-3">
                Width only - border <em>color</em> always comes from tone.
              </td>
            </tr>
            <tr class="border-b-2 border-(--nb-border)">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                spacing
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                NbSpacing / NbPadding
              </td>
              <td class="px-4 py-3">
                Gap and padding scales on layout primitives.
              </td>
            </tr>
            <tr class="last:border-b-0">
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                typography
              </td>
              <td
                class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
              >
                size / weight / tone
              </td>
              <td class="px-4 py-3">
                Exclusive to <code class="font-mono">nbText</code> and
                <code class="font-mono">nbDisplay</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignPropsVocabulary {}
