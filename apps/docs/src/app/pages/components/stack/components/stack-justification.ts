import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbSurface, type NbStackJustify } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface StackJustifyDemo {
  readonly value: NbStackJustify;
  readonly label: string;
}

@Component({
  selector: 'docs-stack-justification',
  imports: [NbStack, NbSurface, DocsExample],
  template: `
    <section id="justification">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold text-black!">
        Justification
      </h2>
      <docs-example [code]="justificationExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          @for (justify of justifications; track justify.value) {
          <div nbSurface tone="white" shadow="sm" class="h-56 p-4">
            <div
              nbStack
              gap="sm"
              align="start"
              [justify]="justify.value"
              class="h-full"
            >
              <span class="font-mono text-xs font-black uppercase">{{
                justify.label
              }}</span>
              <span
                class="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-2 font-black"
                >One</span
              >
              <span
                class="border-2 border-(--nb-border) bg-(--nb-blue) px-3 py-2 font-black"
                >Two</span
              >
            </div>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackJustification {
  protected readonly justificationExampleCode = `<div nbStack justify="start" class="h-56">...</div>
<div nbStack justify="center" class="h-56">...</div>
<div nbStack justify="end" class="h-56">...</div>
<div nbStack justify="between" class="h-56">...</div>`;

  protected readonly justifications = [
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
    { value: 'between', label: 'between' },
  ] satisfies readonly StackJustifyDemo[];
}
