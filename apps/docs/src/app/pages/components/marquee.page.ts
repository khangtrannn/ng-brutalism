import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton, NbMarquee, NbMarqueeItem } from '@ng-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-marquee-page',
  standalone: true,
  imports: [
    DocsCodeBlockComponent,
    DocsExampleComponent,
    NbButton,
    NbMarquee,
    NbMarqueeItem,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Marquee</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A horizontally scrolling component that loops its content
            infinitely. Supports configurable speed, reverse direction, and
            pause on hover.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">∞</span>
            <span class="nb-stat-tile__label">Loop</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">Directions</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">CSS</span>
            <span class="nb-stat-tile__label">Pure</span>
          </div>

          <a
            nbButton
            size="sm"
            variant="neutral"
            href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/marquee"
            target="_blank"
            rel="noreferrer"
          >
            Source ↗
          </a>
        </div>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <nb-marquee class="w-full" duration="10s">
            <nb-marquee-item>Angular</nb-marquee-item>
            <nb-marquee-item>TypeScript</nb-marquee-item>
            <nb-marquee-item>Tailwind CSS</nb-marquee-item>
            <nb-marquee-item>Vite</nb-marquee-item>
            <nb-marquee-item>Vitest</nb-marquee-item>
          </nb-marquee>
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="reverse">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Reverse</h2>
        <docs-example [code]="reverseExampleCode">
          <nb-marquee class="w-full" duration="10s" [reverse]="true">
            <nb-marquee-item>Angular</nb-marquee-item>
            <nb-marquee-item>TypeScript</nb-marquee-item>
            <nb-marquee-item>Tailwind CSS</nb-marquee-item>
            <nb-marquee-item>Vite</nb-marquee-item>
            <nb-marquee-item>Vitest</nb-marquee-item>
          </nb-marquee>
        </docs-example>
      </section>

      <section id="custom-speed">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Custom speed</h2>
        <docs-example [code]="customSpeedExampleCode">
          <nb-marquee class="w-full" duration="18s">
            <nb-marquee-item>Angular</nb-marquee-item>
            <nb-marquee-item>TypeScript</nb-marquee-item>
            <nb-marquee-item>Tailwind CSS</nb-marquee-item>
            <nb-marquee-item>Vite</nb-marquee-item>
            <nb-marquee-item>Vitest</nb-marquee-item>
          </nb-marquee>
        </docs-example>
      </section>

      <section id="api">
        <h2 class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
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
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Default
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
                >
                  duration
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  string
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  '5s'
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
                >
                  reverse
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  boolean
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  false
                </td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  pauseOnHover
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  boolean
                </td>
                <td class="px-4 py-3 font-mono text-sm">true</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MarqueePageComponent {
  protected readonly importCode = `import { NbMarquee, NbMarqueeItem } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-marquee class="w-full" duration="10s">
  <nb-marquee-item>Angular</nb-marquee-item>
  <nb-marquee-item>TypeScript</nb-marquee-item>
  <nb-marquee-item>Tailwind CSS</nb-marquee-item>
  <nb-marquee-item>Vite</nb-marquee-item>
  <nb-marquee-item>Vitest</nb-marquee-item>
</nb-marquee>`;

  protected readonly reverseExampleCode = `<nb-marquee class="w-full" duration="10s" [reverse]="true">
  <nb-marquee-item>Angular</nb-marquee-item>
  <nb-marquee-item>TypeScript</nb-marquee-item>
  <nb-marquee-item>Tailwind CSS</nb-marquee-item>
  <nb-marquee-item>Vite</nb-marquee-item>
  <nb-marquee-item>Vitest</nb-marquee-item>
</nb-marquee>`;

  protected readonly customSpeedExampleCode = `<nb-marquee class="w-full" duration="18s">
  <nb-marquee-item>Angular</nb-marquee-item>
  <nb-marquee-item>TypeScript</nb-marquee-item>
  <nb-marquee-item>Tailwind CSS</nb-marquee-item>
  <nb-marquee-item>Vite</nb-marquee-item>
  <nb-marquee-item>Vitest</nb-marquee-item>
</nb-marquee>`;
}
