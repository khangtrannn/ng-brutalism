import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-design-props-page',
  imports: [DocsCodeBlock, RouterLink],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Concepts</p>
          <h1>Design Props</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Every ng-brutalism primitive draws its visual inputs from the same
            small vocabulary. Learn the 7 categories once and you can predict
            what every component's API looks like before you open its docs page.
          </p>
        </div>
      </header>

      <section id="vocabulary">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          The vocabulary - 7 categories
        </h2>
        <p class="mb-5 text-base font-medium">
          A component only exposes the categories that make sense for it - see
          <a href="#archetypes" class="underline">archetypes</a> below. The core
          rule that makes this vocabulary predictable: the Angular input and the
          CSS customization variable write the
          <strong>same public slot</strong>. There is no separate
          <code class="font-mono">--*-input</code> vs
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

      <section id="archetypes">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          The 5 archetypes
        </h2>
        <p class="mb-5 text-base font-medium">
          Every primitive falls into one of five shapes. Knowing a component's
          archetype tells you which of the 7 categories above it will actually
          expose.
        </p>

        <div class="grid gap-4 sm:grid-cols-2">
          <div
            class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-lg font-black uppercase">
              Surface / box
            </h3>
            <p class="mt-2 text-sm font-medium">
              tone + radius + shadow + border.
              <code class="font-mono">card</code>,
              <code class="font-mono">surface</code>,
              <code class="font-mono">callout</code>,
              <code class="font-mono">media-frame</code>,
              <code class="font-mono">image-card</code>,
              <code class="font-mono">dialog</code>.
            </p>
          </div>
          <div
            class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-lg font-black uppercase">Layout</h3>
            <p class="mt-2 text-sm font-medium">
              Spacing only, no visual props.
              <code class="font-mono">stack</code>,
              <code class="font-mono">cluster</code>,
              <code class="font-mono">split</code>.
            </p>
          </div>
          <div
            class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-lg font-black uppercase">
              Interactive
            </h3>
            <p class="mt-2 text-sm font-medium">
              tone + size + radius + shadow + border.
              <code class="font-mono">button</code>,
              <code class="font-mono">icon-button</code>,
              <code class="font-mono">input</code>,
              <code class="font-mono">textarea</code>,
              <code class="font-mono">select</code>,
              <code class="font-mono">checkbox</code>,
              <code class="font-mono">chip</code>.
            </p>
          </div>
          <div
            class="border-3 border-(--nb-border) bg-nb-surface p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]"
          >
            <h3 class="font-heading text-lg font-black uppercase">Text</h3>
            <p class="mt-2 text-sm font-medium">
              Typography only. <code class="font-mono">text</code>,
              <code class="font-mono">display</code>.
              <code class="font-mono">title</code> and
              <code class="font-mono">label</code> are structural markers with
              no visual props.
            </p>
          </div>
          <div nbCard tone="surface" class="p-5 sm:col-span-2">
            <h3 class="font-heading text-lg font-black uppercase">
              Indicator / leaf
            </h3>
            <p class="mt-2 text-sm font-medium">
              Exempt by design, usually tone-only -
              <code class="font-mono">badge</code>,
              <code class="font-mono">avatar</code>,
              <code class="font-mono">status-dot</code>,
              <code class="font-mono">progress</code>,
              <code class="font-mono">rating</code>,
              <code class="font-mono">separator</code>. A small prop surface
              here is deliberate, not a gap.
            </p>
          </div>
        </div>
      </section>

      <section id="example">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Example</h2>
        <p class="mb-4 font-medium">
          An input and a CSS override targeting the same category resolve to the
          same visual result - pick whichever fits the scope of the change. See
          the
          <a routerLink="/docs/customization" class="underline"
            >Customization</a
          >
          guide for how the two interact when both are present.
        </p>
        <docs-code-block title="Input" [code]="inputCode" />
        <docs-code-block title="CSS" [code]="cssCode" class="block mt-5" />
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DesignPropsPage {
  protected readonly inputCode = `<nb-card radius="xl">...</nb-card>`;

  protected readonly cssCode = `.pricing-cards {
  --nb-card-radius: var(--nb-radius-xl);
}`;
}
