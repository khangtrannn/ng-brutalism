import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack, NbText } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-text-underline',
  imports: [NbStack, NbText, DocsExample],
  template: `
    <section id="underline">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Underline</h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">underline="bar"</code> adds a built-in accent
        bar beneath the text - handy for brand names and section labels with no
        extra markup. Use <code class="font-mono">"wave"</code> for the squiggly
        variant. Recolor and resize it with the
        <code class="font-mono">--nb-underline-color</code>,
        <code class="font-mono">--nb-underline-width</code>,
        <code class="font-mono">--nb-underline-height</code>,
        <code class="font-mono">--nb-underline-gap</code> and
        <code class="font-mono">--nb-underline-radius</code> tokens.
      </p>
      <docs-example [code]="underlineCode">
        <div class="p-6 w-full" nbStack gap="lg">
          <span nbText size="3xl" weight="extrabold" underline="bar">
            Build Loud FM
          </span>
          <span nbText size="2xl" weight="extrabold" underline="wave">
            Stay Sharp
          </span>
          <span
            nbText
            size="2xl"
            weight="extrabold"
            underline="bar"
            style="--nb-underline-color: var(--nb-mint)"
          >
            Mint Accent
          </span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextUnderline {
  protected readonly underlineCode = `<span nbText size="3xl" weight="extrabold" underline="bar">
  Build Loud FM
</span>

<span nbText size="2xl" weight="extrabold" underline="wave">
  Stay Sharp
</span>

<span
  nbText
  size="2xl"
  weight="extrabold"
  underline="bar"
  style="--nb-underline-color: var(--nb-mint)"
>
  Mint Accent
</span>`;
}
