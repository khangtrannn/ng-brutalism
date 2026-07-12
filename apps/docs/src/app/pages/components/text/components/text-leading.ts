import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbText, type NbTextLeading } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface TextLeadingDemo {
  readonly value: NbTextLeading;
  readonly numeric: string;
}

@Component({
  selector: 'docs-text-leading',
  imports: [NbStack, NbText, DocsExample],
  template: `
    <section id="leading">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Leading</h2>
      <p class="mb-4 font-medium">
        Controls line-height. By default,
        <code class="font-mono">nbText</code> picks a sensible line-height for
        the active <code class="font-mono">size</code>. Use
        <code class="font-mono">leading="relaxed"</code> for long-form reading.
      </p>
      <docs-example [code]="leadingCode">
        <div class="p-6 w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
          @for (l of leadings; track l.value) {
            <div nbStack gap="xs">
              <span class="font-mono text-xs font-bold opacity-50">
                leading="{{ l.value }}" - {{ l.numeric }}
              </span>
              <p nbText size="md" measure="sm" [leading]="l.value">
                Brutalist interfaces work best when layout, typography, and
                contrast are intentional.
              </p>
            </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLeading {
  protected readonly leadingCode = `<p nbText size="md" measure="sm" leading="none">...</p>
<p nbText size="md" measure="sm" leading="tight">...</p>
<p nbText size="md" measure="sm" leading="normal">...</p>
<p nbText size="md" measure="sm" leading="relaxed">...</p>`;

  protected readonly leadings = [
    { value: 'none', numeric: '1' },
    { value: 'tight', numeric: '1.15' },
    { value: 'normal', numeric: 'size-matched' },
    { value: 'relaxed', numeric: '1.65' },
  ] satisfies readonly TextLeadingDemo[];
}
