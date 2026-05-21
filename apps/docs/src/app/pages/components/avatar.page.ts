import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbAvatar } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
    selector: 'docs-avatar-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsSourceTile,
        DocsTokens,
        NbAvatar,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Avatar</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A circular image frame with a thick border and offset shadow.
            Falls back to projected initials when no image source is provided.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">IMG</span>
            <span class="nb-stat-tile__label">or Text</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/avatar"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <nb-avatar class="h-20 w-20" src="https://github.com/khangtrannn.png" alt="khangtrannn" />
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="fallback">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Fallback (Initials)</h2>
        <docs-example [code]="fallbackExampleCode">
          <nb-avatar alt="John Doe">JD</nb-avatar>
        </docs-example>
      </section>

      <docs-tokens component="avatar" />

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
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr class="border-b-2 border-(--nb-border)">
                <td class="border-r-2 border-(--nb-border) px-4 py-3">src</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string | undefined</td>
                <td class="px-4 py-3 font-mono text-sm">undefined</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">alt</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">string</td>
                <td class="px-4 py-3 font-mono text-sm">''</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AvatarPage {
  protected readonly defaultExampleCode = `<nb-avatar class="h-20 w-20" src="https://github.com/khangtrannn.png" alt="khangtrannn" />`;

  protected readonly importCode = `import { NbAvatar } from '@ng-brutalism/ui';`;

  protected readonly fallbackExampleCode = `<nb-avatar alt="John Doe">JD</nb-avatar>`;
}
