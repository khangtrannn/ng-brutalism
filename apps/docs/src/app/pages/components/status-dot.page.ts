import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStatusDot } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';

@Component({
  selector: 'docs-status-dot-page',
  imports: [DocsCodeBlock, DocsExample, DocsSourceTile, NbStatusDot],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Neo-Brutalist Angular StatusDot</p>
          <h1>StatusDot</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A directive on <code class="font-mono">&lt;span&gt;</code> that renders a status
            indicator dot. Three states — online, offline, and live — cover presence, availability,
            and real-time streaming use cases.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">span</span>
            <span class="nb-stat-tile__label">Host element</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">3</span>
            <span class="nb-stat-tile__label">States</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/status-dot"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleCode">
          <div class="flex items-center gap-6 p-4">
            <span class="flex items-center gap-2 font-bold">
              <span nbStatusDot state="online"></span> Online
            </span>
            <span class="flex items-center gap-2 font-bold">
              <span nbStatusDot state="offline"></span> Offline
            </span>
            <span class="flex items-center gap-2 font-bold">
              <span nbStatusDot state="live"></span> Live
            </span>
          </div>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
        <docs-code-block title="Template" [code]="defaultExampleCode" />
      </section>

      <section id="states">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">States</h2>
        <docs-example [code]="statesExampleCode">
          <div class="flex flex-col gap-4 p-4">
            <div class="flex items-center gap-3">
              <span nbStatusDot state="online"></span>
              <span class="font-bold">online</span>
              <span class="font-medium text-sm">— green fill, indicates active presence</span>
            </div>
            <div class="flex items-center gap-3">
              <span nbStatusDot state="offline"></span>
              <span class="font-bold">offline</span>
              <span class="font-medium text-sm">— muted fill, indicates unavailability</span>
            </div>
            <div class="flex items-center gap-3">
              <span nbStatusDot state="live"></span>
              <span class="font-bold">live</span>
              <span class="font-medium text-sm">— red pulsing dot, indicates real-time broadcast</span>
            </div>
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
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">state</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'online' | 'offline' | 'live'</td>
                <td class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm">'online'</td>
                <td class="px-4 py-3">The visual state of the indicator.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StatusDotPage {
  protected readonly importCode = `import { NbStatusDot } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<span nbStatusDot state="online"></span>
<span nbStatusDot state="offline"></span>
<span nbStatusDot state="live"></span>`;

  protected readonly statesExampleCode = `<span nbStatusDot state="online"></span>
<span nbStatusDot state="offline"></span>
<span nbStatusDot state="live"></span>`;
}
