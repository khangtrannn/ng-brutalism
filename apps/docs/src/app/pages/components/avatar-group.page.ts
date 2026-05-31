import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbAvatar, NbAvatarGroup } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-avatar-group-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, NbAvatar, NbAvatarGroup],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular AvatarGroup</p>
          <h1>AvatarGroup</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A component that stacks <code class="font-mono">NbAvatar</code> elements
            with negative overlap and appends an overflow badge when the count exceeds
            what's shown. Common in charity, event, and social card designs.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">flex</span>
            <span class="nb-stat-tile__label">Overlap layout</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">+N</span>
            <span class="nb-stat-tile__label">Overflow badge</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/avatar-group"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="p-4">
            <nb-avatar-group [overflow]="142">
              <nb-avatar alt="Alice">A</nb-avatar>
              <nb-avatar alt="Bob">B</nb-avatar>
              <nb-avatar alt="Carol">C</nb-avatar>
            </nb-avatar-group>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="no-overflow">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Without overflow</h2>
        <docs-example [code]="noOverflowCode">
          <div class="p-4">
            <nb-avatar-group>
              <nb-avatar alt="Alice">A</nb-avatar>
              <nb-avatar alt="Bob">B</nb-avatar>
              <nb-avatar alt="Carol">C</nb-avatar>
              <nb-avatar alt="Dave">D</nb-avatar>
            </nb-avatar-group>
          </div>
        </docs-example>
      </section>

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>
        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-160 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Input</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Type</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Description</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">overflow</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">number</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">0</td>
                <td class="px-4 py-3">Number of hidden members. Renders a <code class="font-mono">+N</code> badge when > 0.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AvatarGroupPage {
  protected readonly importCode = `import { NbAvatar, NbAvatarGroup } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<nb-avatar-group [overflow]="142">
  <nb-avatar alt="Alice">A</nb-avatar>
  <nb-avatar alt="Bob">B</nb-avatar>
  <nb-avatar alt="Carol">C</nb-avatar>
</nb-avatar-group>`;

  protected readonly noOverflowCode = `<nb-avatar-group>
  <nb-avatar alt="Alice">A</nb-avatar>
  <nb-avatar alt="Bob">B</nb-avatar>
  <nb-avatar alt="Carol">C</nb-avatar>
  <nb-avatar alt="Dave">D</nb-avatar>
</nb-avatar-group>`;
}
