import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbInput,
  NbInputGroup,
  NbInputPrefix,
  NbInputSuffix,
  NbLabel,
  NbTextarea,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

@Component({
  selector: 'docs-input-group-page',
  standalone: true,
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    DocsTokens,
    NbInput,
    NbInputGroup,
    NbInputPrefix,
    NbInputSuffix,
    NbLabel,
    NbTextarea,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Input Group</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Combines inputs or textareas with bordered prefix and suffix
            addons, creating one continuous neo-brutalism control.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">Parts</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">FORM</span>
            <span class="nb-stat-tile__label">Native</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">Slots</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/input-group"
          />
        </div>
      </header>

      <section id="preview">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <nb-input-group class="max-w-80">
            <span nbInputPrefix>&#64;</span>
            <input nbInput placeholder="username" />
          </nb-input-group>
        </docs-example>
      </section>

      <section id="usage">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="prefix-suffix">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Prefix and Suffix</h2>
        <docs-example [code]="prefixSuffixExampleCode">
          <nb-input-group class="max-w-96">
            <span nbInputPrefix>$</span>
            <input nbInput type="number" placeholder="Amount" />
            <span nbInputSuffix>USD</span>
          </nb-input-group>
        </docs-example>
      </section>

      <section id="with-label">
        <h2 class="mt-10 mb-4 text-2xl font-bold">With Label</h2>
        <docs-example [code]="withLabelExampleCode">
          <div class="grid w-full max-w-96 gap-2">
            <label nbLabel for="profile-url">Profile URL</label>
            <nb-input-group>
              <span nbInputPrefix class="text-[0.8rem]">https</span>
              <input nbInput id="profile-url" placeholder="example.com" />
            </nb-input-group>
          </div>
        </docs-example>
      </section>

      <section id="textarea">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Textarea</h2>
        <docs-example [code]="textareaExampleCode">
          <nb-input-group class="max-w-96">
            <span nbInputPrefix align="stretch">TXT</span>
            <textarea nbTextarea placeholder="Write a note..." rows="4"></textarea>
          </nb-input-group>
        </docs-example>
      </section>

      <section id="disabled">
        <h2 class="mt-10 mb-4 text-2xl font-bold">Disabled</h2>
        <docs-example [code]="disabledExampleCode">
          <nb-input-group class="max-w-80">
            <span nbInputPrefix>&#64;</span>
            <input nbInput placeholder="username" disabled />
          </nb-input-group>
        </docs-example>
      </section>

      <docs-tokens component="input-group" />

      <section id="api">
        <h2 class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Selector</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Input</th>
                <th class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold">Type</th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">Default</th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">nb-input-group</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">-</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">-</td>
                <td class="px-4 py-3 font-mono text-sm">-</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">[nbInputPrefix]</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">align</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'center' | 'stretch'</td>
                <td class="px-4 py-3 font-mono text-sm">'center'</td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">[nbInputSuffix]</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">align</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'center' | 'stretch'</td>
                <td class="px-4 py-3 font-mono text-sm">'center'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputGroupPageComponent {
  protected readonly defaultExampleCode = `<nb-input-group class="max-w-80">
  <span nbInputPrefix>@</span>
  <input nbInput placeholder="username" />
</nb-input-group>`;

  protected readonly importCode = `import { NbInput, NbInputGroup, NbInputPrefix, NbInputSuffix } from '@ng-brutalism/ui';`;

  protected readonly prefixSuffixExampleCode = `<nb-input-group class="max-w-96">
  <span nbInputPrefix>$</span>
  <input nbInput type="number" placeholder="Amount" />
  <span nbInputSuffix>USD</span>
</nb-input-group>`;

  protected readonly withLabelExampleCode = `<div class="grid w-full max-w-96 gap-2">
  <label nbLabel for="profile-url">Profile URL</label>
  <nb-input-group>
    <span nbInputPrefix>https</span>
    <input nbInput id="profile-url" placeholder="example.com" />
  </nb-input-group>
</div>`;

  protected readonly textareaExampleCode = `<nb-input-group class="max-w-96">
  <span nbInputPrefix align="stretch">TXT</span>
  <textarea nbTextarea placeholder="Write a note..." rows="4"></textarea>
</nb-input-group>`;

  protected readonly disabledExampleCode = `<nb-input-group class="max-w-80">
  <span nbInputPrefix>@</span>
  <input nbInput placeholder="username" disabled />
</nb-input-group>`;
}
