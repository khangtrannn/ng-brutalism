import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout, type NbCalloutShadow } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface CalloutShadowDemo {
  readonly value: NbCalloutShadow;
  readonly label: string;
}

@Component({
  selector: 'docs-callout-shadows',
  imports: [NbCallout, DocsExample],
  template: `
    <section id="shadows">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Shadows</h2>
      <docs-example [code]="shadowsExampleCode">
        <div class="grid w-full grid-cols-1 gap-5 p-4 sm:grid-cols-3">
          @for (shadow of shadows; track shadow.value) {
            <div
              nbCallout
              tone="blue"
              size="md"
              layout="center"
              [shadow]="shadow.value"
            >
              {{ shadow.label }}
            </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutShadows {
  protected readonly shadowsExampleCode = `<div nbCallout shadow="none">None</div>
<div nbCallout shadow="md">Md</div>
<div nbCallout shadow="hard">Hard</div>`;

  protected readonly shadows = [
    { value: 'none', label: 'None' },
    { value: 'md', label: 'Md' },
    { value: 'hard', label: 'Hard' },
  ] satisfies readonly CalloutShadowDemo[];
}
