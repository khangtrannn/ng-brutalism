import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbAvatar, NbButton } from '@ng-brutalism/ui';

import { DocsCodeBlockComponent } from '../../docs/docs-code-block.component';
import { DocsExampleComponent } from '../../docs/docs-example.component';

@Component({
  selector: 'docs-avatar-page',
  standalone: true,
  imports: [DocsCodeBlockComponent, DocsExampleComponent, NbAvatar, NbButton],
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

          <a
            nbButton
            size="sm"
            variant="neutral"
            href="https://github.com/khangtrannn/ng-neo-brutalism-workspace/tree/main/libs/ui/src/lib/avatar"
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
          <nb-avatar src="https://github.com/shadcn.png" alt="shadcn" />
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="fallback">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Fallback (Initials)</h2>
        <docs-example [code]="fallbackExampleCode">
          <nb-avatar alt="John Doe">JD</nb-avatar>
        </docs-example>
      </section>

      <section id="sizes">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Custom Sizes</h2>
        <docs-example [code]="sizesExampleCode">
          <div class="flex items-center gap-4">
            <nb-avatar alt="SM" class="h-8 w-8 text-xs">SM</nb-avatar>
            <nb-avatar alt="MD">MD</nb-avatar>
            <nb-avatar alt="LG" class="h-14 w-14 text-base">LG</nb-avatar>
          </div>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AvatarPageComponent {
  protected readonly defaultExampleCode = `<nb-avatar src="https://github.com/shadcn.png" alt="shadcn" />`;

  protected readonly importCode = `import { NbAvatar } from '@ng-brutalism/ui';`;

  protected readonly fallbackExampleCode = `<nb-avatar alt="John Doe">JD</nb-avatar>`;

  protected readonly sizesExampleCode = `<nb-avatar alt="SM" class="h-8 w-8 text-xs">SM</nb-avatar>
<nb-avatar alt="MD">MD</nb-avatar>
<nb-avatar alt="LG" class="h-14 w-14 text-base">LG</nb-avatar>`;
}
