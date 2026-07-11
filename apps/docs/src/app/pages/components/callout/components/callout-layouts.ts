import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout, type NbCalloutLayout } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface CalloutLayoutDemo {
  readonly value: NbCalloutLayout;
  readonly label: string;
}

@Component({
  selector: 'docs-callout-layouts',
  imports: [NbCallout, DocsExample],
  template: `
    <section id="layouts">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Layouts</h2>
      <docs-example [code]="layoutsExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4">
          @for (layout of layouts; track layout.value) {
          <div nbCallout tone="cream" size="md" [layout]="layout.value">
            <span>{{ layout.label }}</span>
            <span>EP 42</span>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutLayouts {
  protected readonly layoutsExampleCode = `<div nbCallout layout="inline">
  <span>Inline</span>
  <span>EP 42</span>
</div>

<div nbCallout layout="between">
  <span>Between</span>
  <span>EP 42</span>
</div>

<div nbCallout layout="center">
  <span>Center</span>
  <span>EP 42</span>
</div>`;

  protected readonly layouts = [
    { value: 'inline', label: 'Inline' },
    { value: 'between', label: 'Between' },
    { value: 'center', label: 'Center' },
  ] satisfies readonly CalloutLayoutDemo[];
}
