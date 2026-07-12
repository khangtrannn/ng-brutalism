import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbText, type NbTextMeasure } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface TextMeasureDemo {
  readonly value: NbTextMeasure;
  readonly rem: string;
}

@Component({
  selector: 'docs-text-measure',
  imports: [NbStack, NbText, DocsExample],
  template: `
    <section id="measure">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Measure</h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">measure</code> caps
        <code class="font-mono">max-width</code> for readable line lengths. Use
        it on paragraph text so lines don't stretch too wide on large screens.
      </p>
      <docs-example [code]="measureCode">
        <div class="p-6 w-full" nbStack gap="lg">
          @for (m of measures; track m.value) {
            <div nbStack gap="xs">
              <span class="font-mono text-xs font-bold opacity-50">
                measure="{{ m.value }}" - {{ m.rem }}
              </span>
              <p nbText tone="muted" [measure]="m.value">
                A token-driven neo-brutalist Angular UI library for expressive
                product interfaces. Build loud. Stay sharp.
              </p>
            </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMeasure {
  protected readonly measureCode = `<p nbText measure="none">A token-driven neo-brutalist Angular UI library...</p>

<p nbText tone="muted" measure="xs">A token-driven neo-brutalist Angular UI library...</p>

<p nbText tone="muted" measure="sm">A token-driven neo-brutalist Angular UI library...</p>

<p nbText tone="muted" measure="md">A token-driven neo-brutalist Angular UI library...</p>

<p nbText tone="muted" measure="lg">A token-driven neo-brutalist Angular UI library...</p>`;

  protected readonly measures = [
    { value: 'none', rem: 'no cap' },
    { value: 'xs', rem: '20rem' },
    { value: 'sm', rem: '28rem' },
    { value: 'md', rem: '36rem' },
    { value: 'lg', rem: '44rem' },
  ] satisfies readonly TextMeasureDemo[];
}
