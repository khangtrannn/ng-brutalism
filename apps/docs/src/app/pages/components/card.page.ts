import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCard,
  NbCardActions,
  NbCardContent,
  NbCardDescription,
  NbCardFooter,
  NbCardHeader,
  NbCardTitle,
} from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';
import JobListingCardExampleComponent from './examples/job-listing-card';

@Component({
  selector: 'docs-card-page',
  imports: [
    DocsCodeBlock,
    DocsExample,
    DocsSourceTile,
    DocsTokens,
    JobListingCardExampleComponent,
    NbButton,
    NbCard,
    NbCardActions,
    NbCardContent,
    NbCardDescription,
    NbCardFooter,
    NbCardHeader,
    NbCardTitle,
  ],
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Components</p>
          <h1>Card</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Displays a card with header, content, and footer.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">7</span>
            <span class="nb-stat-tile__label">Parts</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">SLOT</span>
            <span class="nb-stat-tile__label">Composable</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">∞</span>
            <span class="nb-stat-tile__label">Layouts</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/card"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <p class="mb-4 text-sm font-medium">
          The live demo is a styled composition showcase. The Code tab below
          shows the underlying card primitive usage; see the
          <a
            class="underline"
            href="https://github.com/khangtrannn/ng-brutalism/blob/main/apps/docs/src/app/pages/components/examples/job-listing-card.ts"
            target="_blank"
            rel="noreferrer"
            >example source</a
          >
          for the full implementation.
        </p>
        <docs-example [code]="templateCode">
          <docs-job-listing-card-example />
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block title="Template" [code]="templateCode" />
      </section>

      <section id="parts">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Sub-parts
        </h2>
        <p class="mb-4 text-sm font-medium">
          The card component is composed of 7 sub-parts that can be used
          independently.
        </p>

        <div
          class="overflow-hidden border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Selector
                </th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-card
                </td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                  Root container with border, shadow, and background
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-card-header
                </td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                  Top section for title and description content
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-card-title
                </td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                  Heading text inside the header
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-card-description
                </td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                  Subtitle or description text inside the header
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-card-actions
                </td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                  Action row for one or more card-level commands
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-card-content
                </td>
                <td class="border-b-2 border-(--nb-border) px-4 py-3 text-sm">
                  Main body area
                </td>
              </tr>
              <tr>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  nb-card-footer
                </td>
                <td class="px-4 py-3 text-sm">
                  Bottom section for metadata, summaries, and supporting layout
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="actions">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Actions</h2>
        <p class="mb-4 text-sm font-medium">
          Use <code class="font-mono text-sm">&lt;nb-card-actions&gt;</code>
          for card-level commands. It can sit directly under the card or inside
          the footer when the footer also contains supporting metadata.
        </p>
        <docs-example [code]="actionsExampleCode">
          <nb-card class="w-full max-w-sm">
            <nb-card-header>
              <nb-card-title>Notifications</nb-card-title>
              <nb-card-description>
                You have 3 unread messages.
              </nb-card-description>
            </nb-card-header>
            <nb-card-content>
              <p class="text-sm">
                Check your inbox for the latest updates from your team.
              </p>
            </nb-card-content>
            <nb-card-actions align="end">
              <button nbButton size="sm" variant="neutral">
                Mark all read
              </button>
              <button nbButton size="sm">Open inbox</button>
            </nb-card-actions>
          </nb-card>
        </docs-example>
      </section>

      <section id="footer-actions">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
          Footer with actions
        </h2>
        <p class="mb-4 text-sm font-medium">
          Combine <code class="font-mono text-sm">&lt;nb-card-footer&gt;</code>
          with actions when the bottom row needs both metadata and commands.
        </p>
        <docs-example [code]="footerActionsExampleCode">
          <nb-card class="w-full max-w-xl">
            <nb-card-header>
              <nb-card-title>Senior Frontend Engineer</nb-card-title>
              <nb-card-description>Inspectorio</nb-card-description>
            </nb-card-header>
            <nb-card-content>
              <p class="text-sm">
                Build delightful UI systems and scalable web experiences.
              </p>
            </nb-card-content>
            <nb-card-footer class="border-t">
              <div class="space-y-2 text-sm">
                <p>Ho Chi Minh City / Remote</p>
                <p>Posted 2 days ago</p>
              </div>
              <nb-card-actions align="end">
                <button nbButton>Apply</button>
                <button nbButton variant="primary">Save</button>
              </nb-card-actions>
            </nb-card-footer>
          </nb-card>
        </docs-example>
      </section>

      <docs-tokens component="card" />
    </article>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardPageComponent {
  protected readonly importCode = `import {
  NbCard,
  NbCardHeader,
  NbCardTitle,
  NbCardDescription,
  NbCardActions,
  NbCardContent,
  NbCardFooter,
} from '@ng-brutalism/ui';`;

  protected readonly templateCode = `<nb-card>
  <nb-card-header>
    <nb-card-title>Card Title</nb-card-title>
    <nb-card-description>Card Description</nb-card-description>
  </nb-card-header>
  <nb-card-content>
    <p>Card Content</p>
  </nb-card-content>
  <nb-card-actions>
    <button nbButton>Action</button>
  </nb-card-actions>
</nb-card>`;

  protected readonly actionsExampleCode = `<nb-card class="w-full max-w-sm">
  <nb-card-header>
    <nb-card-title>Notifications</nb-card-title>
    <nb-card-description>
      You have 3 unread messages.
    </nb-card-description>
  </nb-card-header>
  <nb-card-content>
    <p class="text-sm">
      Check your inbox for the latest updates from your team.
    </p>
  </nb-card-content>
  <nb-card-actions align="end">
    <button nbButton size="sm" variant="neutral">Mark all read</button>
    <button nbButton size="sm">Open inbox</button>
  </nb-card-actions>
</nb-card>`;

  protected readonly footerActionsExampleCode = `<nb-card class="w-full max-w-xl">
  <nb-card-header>
    <nb-card-title>Senior Frontend Engineer</nb-card-title>
    <nb-card-description>Inspectorio</nb-card-description>
  </nb-card-header>
  <nb-card-content>
    <p class="text-sm">
      Build delightful UI systems and scalable web experiences.
    </p>
  </nb-card-content>
  <nb-card-footer class="border-t">
    <div class="space-y-2 text-sm">
      <p>Ho Chi Minh City / Remote</p>
      <p>Posted 2 days ago</p>
    </div>
    <nb-card-actions align="end">
      <button nbButton>Apply</button>
      <button nbButton variant="primary">Save</button>
    </nb-card-actions>
  </nb-card-footer>
</nb-card>`;
}
