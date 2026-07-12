import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-media-item-usage',
  imports: [DocsCodeBlock],
  template: `
    <section id="usage">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
      <p class="mb-4 font-medium">
        Use inputs for icon, title, and description in the common case. Project
        custom content with
        <code class="font-mono">nb-media-item-icon</code>,
        <code class="font-mono">nb-media-item-title</code>, and
        <code class="font-mono">nb-media-item-description</code> when you need
        custom markup.
      </p>
      <docs-code-block class="block mb-5" title="Import" [code]="importCode" />
      <docs-code-block title="Template" [code]="defaultExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemUsage {
  protected readonly importCode = `import { NbMediaItem, NbMediaItemTitle, NbSeparator, NbSurface } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleCode = `<div nbSurface border="strong" layout="stack" radius="sm" shadow="hard" clip>
  <div class="border-b-2 border-(--nb-border) bg-(--nb-accent) px-4 py-3 text-(--nb-accent-foreground)">
    <span class="font-heading text-2xl uppercase leading-none">Your Flight</span>
  </div>

  <div class="flex flex-col p-4">
    <nb-media-item
      variant="plain"
      class="pb-3"
      style="--nb-media-item-icon-size: 2.5rem; --nb-media-item-title-size: 3rem; --nb-media-item-title-font-family: var(--font-heading)"
      icon="/icons/plane.png"
      iconAlt="Flight"
      description="Jun 14 · 22:15 → 12:45+1"
    >
      <span nbMediaItemTitle>NYC → CDG</span>
    </nb-media-item>

    <div class="flex flex-col gap-2">
      <hr nbSeparator variant="dashed" />

      <nb-media-item
        variant="plain"
        icon="/icons/ticket.png"
        iconAlt="Ticket"
        iconBackground="#ff6aa2"
        title="Seat 14A"
        description="Economy · Window"
      />

      <hr nbSeparator />

      <nb-media-item
        variant="plain"
        icon="/icons/baggage.png"
        iconAlt="Baggage"
        iconBackground="#dcc8ff"
        title="1 checked bag"
        description="23 kg max"
      />
    </div>
  </div>
</div>`;
}
