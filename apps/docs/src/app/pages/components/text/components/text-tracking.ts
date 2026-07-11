import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbText, type NbTextTracking } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface TextTrackingDemo {
  readonly value: NbTextTracking;
  readonly em: string;
}

@Component({
  selector: 'docs-text-tracking',
  imports: [NbStack, NbText, DocsExample],
  template: `
    <section id="tracking">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Tracking
      </h2>
      <p class="mb-4 font-medium">
        Letter-spacing. Combine
        <code class="font-mono">tracking="wide"</code> with
        <code class="font-mono">transform="uppercase"</code> for classic
        brutalist labels.
      </p>
      <docs-example [code]="trackingCode">
        <div class="p-6 w-full" nbStack gap="md">
          @for (t of trackings; track t.value) {
          <div class="flex items-baseline gap-4">
            <span
              class="w-16 font-mono text-xs font-bold text-right opacity-50 shrink-0"
              >{{ t.value }}</span
            >
            <span
              nbText
              size="md"
              weight="black"
              transform="uppercase"
              [tracking]="t.value"
            >
              New release
            </span>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTracking {
  protected readonly trackingCode = `<span nbText weight="black" transform="uppercase" tracking="tight">New release</span>
<span nbText weight="black" transform="uppercase" tracking="normal">New release</span>
<span nbText weight="black" transform="uppercase" tracking="wide">New release</span>
<span nbText weight="black" transform="uppercase" tracking="wider">New release</span>`;

  protected readonly trackings = [
    { value: 'tight', em: '−0.025em' },
    { value: 'normal', em: 'normal' },
    { value: 'wide', em: '0.025em' },
    { value: 'wider', em: '0.05em' },
  ] satisfies readonly TextTrackingDemo[];
}
