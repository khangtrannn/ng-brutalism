import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCard,
  NbCardActions,
  NbCardContent,
  NbCardDescription,
  NbCardHeader,
  NbCardTitle,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-card-actions',
  imports: [
    DocsExample,
    NbCard,
    NbCardHeader,
    NbCardTitle,
    NbCardDescription,
    NbCardContent,
    NbCardActions,
    NbButton,
  ],
  template: `
    <section id="actions">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Actions</h2>
      <p class="mb-4 text-sm font-medium">
        Use <code class="font-mono text-sm">&lt;nb-card-actions&gt;</code>
        for card-level commands. It can sit directly under the card or inside
        the footer when the footer also contains supporting metadata.
      </p>
      <docs-example [code]="actionsExampleCode">
        <nb-card class="notifications-demo w-full max-w-sm">
          <nb-card-header class="max-sm:px-4!">
            <nb-card-title>
              <h2 class="mt-0!">Notifications</h2>
            </nb-card-title>
            <nb-card-description>
              You have 3 unread messages.
            </nb-card-description>
          </nb-card-header>
          <nb-card-content class="max-sm:px-4!">
            <p class="text-sm">
              Check your inbox for the latest updates from your team.
            </p>
          </nb-card-content>
          <nb-card-actions align="end" class="gap-2! max-sm:px-3!">
            <button nbButton size="sm" tone="background">Mark all read</button>
            <button nbButton size="sm">Open inbox</button>
          </nb-card-actions>
        </nb-card>
      </docs-example>
    </section>
  `,
  styles: [
    `
      .notifications-demo [data-slot='card-title'] h2 {
        max-width: 100%;
        overflow-wrap: anywhere;
      }

      .notifications-demo [data-slot='card-actions'] {
        flex-wrap: nowrap;
      }

      @media (max-width: 480px) {
        .notifications-demo [data-slot='card-title'] h2 {
          padding: 0.25rem 0.55rem;
          font-size: 1.125rem;
          letter-spacing: 0;
        }
      }

      @media (max-width: 374px) {
        .notifications-demo [data-slot='card-actions'] {
          flex-wrap: wrap;
          justify-content: stretch;
        }

        .notifications-demo [data-slot='card-actions'] button {
          flex: 1 1 100%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardActions {
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
    <button nbButton size="sm" tone="background">Mark all read</button>
    <button nbButton size="sm">Open inbox</button>
  </nb-card-actions>
</nb-card>`;
}
