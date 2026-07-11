import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbIcon, NbStack, type NbIconTone } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface IconToneDemo {
  readonly value: NbIconTone;
}

@Component({
  selector: 'docs-icon-tones',
  imports: [NbIcon, NbStack, DocsExample],
  template: `
    <section id="tones">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
      <p class="mb-4 font-medium">
        Tones map to design tokens and adapt automatically when the theme
        changes. <code class="font-mono">current</code> (default) inherits the
        CSS <code class="font-mono">color</code> of the parent element.
      </p>
      <docs-example [code]="tonesCode">
        <div class="p-6 w-full" nbStack gap="sm">
          @for (t of tones; track t.value) {
          <div class="flex items-center gap-4">
            <span
              class="w-20 font-mono text-xs font-bold text-right opacity-50 shrink-0"
              >{{ t.value }}</span
            >
            <span
              nbIcon
              src="/tokyo-city-escape/nb-star-fill.svg"
              size="md"
              [tone]="t.value"
              decorative
            ></span>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconTones {
  protected readonly tonesCode = `<span nbIcon src="/icons/star.svg" size="md" tone="current" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="default" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="muted" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="inverse" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="primary" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="secondary" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="accent" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="danger" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="success" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="warning" decorative></span>`;

  protected readonly tones = [
    { value: 'current' },
    { value: 'default' },
    { value: 'muted' },
    { value: 'inverse' },
    { value: 'primary' },
    { value: 'secondary' },
    { value: 'accent' },
    { value: 'danger' },
    { value: 'success' },
    { value: 'warning' },
  ] satisfies readonly IconToneDemo[];
}
