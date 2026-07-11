import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbProgress } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-progress-tones',
  imports: [NbProgress, DocsExample],
  template: `
    <section id="tones">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
      <docs-example [code]="tonesExampleCode">
        <div class="flex w-full flex-col gap-5 p-4">
          <div>
            <p
              class="mb-2 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              default
            </p>
            <nb-progress [value]="60" />
          </div>
          <div>
            <p
              class="mb-2 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              success
            </p>
            <nb-progress [value]="80" tone="success" />
          </div>
          <div>
            <p
              class="mb-2 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              warning
            </p>
            <nb-progress [value]="45" tone="warning" />
          </div>
          <div>
            <p
              class="mb-2 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              danger
            </p>
            <nb-progress [value]="20" tone="danger" />
          </div>
          <div>
            <p
              class="mb-2 font-mono text-xs font-bold uppercase text-(--nb-border)"
            >
              accent
            </p>
            <nb-progress [value]="70" tone="accent" />
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressTones {
  protected readonly tonesExampleCode = `<nb-progress [value]="60" />
<nb-progress [value]="80" tone="success" />
<nb-progress [value]="45" tone="warning" />
<nb-progress [value]="20" tone="danger" />
<nb-progress [value]="70" tone="accent" />`;
}
