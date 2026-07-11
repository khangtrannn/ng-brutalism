import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbText, type NbTextTone } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface TextToneDemo {
  readonly value: NbTextTone;
}

@Component({
  selector: 'docs-text-tones',
  imports: [NbStack, NbText, DocsExample],
  template: `
    <section id="tones">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
      <p class="mb-4 font-medium">
        Tones map to design tokens so they automatically adapt when the theme
        changes.
      </p>
      <docs-example [code]="tonesCode">
        <div class="p-6 w-full" nbStack gap="sm">
          @for (t of tones; track t.value) {
          <div class="flex items-center gap-4">
            <span
              class="w-20 font-mono text-xs font-bold text-right opacity-50 shrink-0"
              >{{ t.value }}</span
            >
            <span nbText size="md" weight="semibold" [tone]="t.value">
              Neo-Brutalism is intentional.
            </span>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTones {
  protected readonly tonesCode = `<span nbText tone="default">Neo-Brutalism is intentional.</span>
<span nbText tone="muted">Neo-Brutalism is intentional.</span>
<span nbText tone="subtle">Neo-Brutalism is intentional.</span>
<span nbText tone="inverse">Neo-Brutalism is intentional.</span>
<span nbText tone="primary">Neo-Brutalism is intentional.</span>
<span nbText tone="secondary">Neo-Brutalism is intentional.</span>
<span nbText tone="accent">Neo-Brutalism is intentional.</span>
<span nbText tone="danger">Neo-Brutalism is intentional.</span>
<span nbText tone="success">Neo-Brutalism is intentional.</span>
<span nbText tone="warning">Neo-Brutalism is intentional.</span>`;

  protected readonly tones = [
    { value: 'default' },
    { value: 'muted' },
    { value: 'subtle' },
    { value: 'inverse' },
    { value: 'primary' },
    { value: 'secondary' },
    { value: 'accent' },
    { value: 'danger' },
    { value: 'success' },
    { value: 'warning' },
  ] satisfies readonly TextToneDemo[];
}
