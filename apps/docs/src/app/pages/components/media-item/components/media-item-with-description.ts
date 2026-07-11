import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMediaItem } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-media-item-with-description',
  imports: [NbMediaItem, DocsExample],
  template: `
    <section id="with-description">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        With description
      </h2>
      <p class="mb-4 font-medium">
        Add <code class="font-mono">description</code> for secondary context.
        It renders below the title with reduced opacity and follows the
        component size preset.
      </p>
      <docs-example [code]="withDescriptionCode">
        <div class="flex flex-wrap gap-4 p-4">
          <nb-media-item
            variant="plain"
            size="md"
            icon="/icons/ticket.png"
            iconAlt="Ticket"
            title="Boarding Pass"
          />

          <nb-media-item
            variant="plain"
            size="md"
            icon="/icons/ticket.png"
            iconAlt="Ticket"
            title="Boarding Pass"
            description="Seat 14A · Economy"
          />

          <nb-media-item
            variant="boxed"
            size="md"
            tone="blue"
            icon="/icons/support.png"
            iconAlt="Support"
            title="24/7 Support"
            description="Response within 2h"
          />
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemWithDescription {
  protected readonly withDescriptionCode = `<nb-media-item
  variant="plain"
  size="md"
  icon="/icons/ticket.png"
  iconAlt="Ticket"
  title="Boarding Pass"
/>

<nb-media-item
  variant="plain"
  size="md"
  icon="/icons/ticket.png"
  iconAlt="Ticket"
  title="Boarding Pass"
  description="Seat 14A · Economy"
/>`;
}
