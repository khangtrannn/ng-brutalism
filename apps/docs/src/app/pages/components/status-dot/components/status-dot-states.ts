import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStatusDot } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-status-dot-states',
  imports: [NbStatusDot, DocsExample],
  template: `
    <section id="states">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">States</h2>
      <docs-example [code]="statesExampleCode">
        <div class="flex flex-col gap-4 p-4">
          <div class="flex items-center gap-3">
            <span nbStatusDot state="online"></span>
            <span class="font-bold">online</span>
            <span class="font-medium text-sm"
              >- green fill, indicates active presence</span
            >
          </div>
          <div class="flex items-center gap-3">
            <span nbStatusDot state="offline"></span>
            <span class="font-bold">offline</span>
            <span class="font-medium text-sm"
              >- muted fill, indicates unavailability</span
            >
          </div>
          <div class="flex items-center gap-3">
            <span nbStatusDot state="live"></span>
            <span class="font-bold">live</span>
            <span class="font-medium text-sm"
              >- red pulsing dot, indicates real-time broadcast</span
            >
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusDotStates {
  protected readonly statesExampleCode = `<span nbStatusDot state="online"></span>
<span nbStatusDot state="offline"></span>
<span nbStatusDot state="live"></span>`;
}
