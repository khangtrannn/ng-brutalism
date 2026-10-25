import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbMediaItem,
  NbMediaItemTitle,
  NbSeparator,
  NbSurface,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-media-item-preview',
  imports: [NbMediaItem, NbMediaItemTitle, NbSeparator, NbSurface, DocsExample],
  template: `
    <section id="preview">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
      <docs-example [code]="defaultExampleCode">
        <div class="grid w-full max-w-100 grid-cols-1 gap-6 p-4">
          <div
            nbSurface
            border="strong"
            layout="stack"
            radius="sm"
            shadow="hard"
            clip
          >
            <div
              class="border-b-2 border-(--nb-border) bg-(--nb-accent) px-4 py-3 text-(--nb-accent-foreground)"
            >
              <span class="font-heading text-2xl uppercase leading-none"
                >Your Flight</span
              >
            </div>

            <div class="flex flex-col p-4">
              <nb-media-item
                variant="plain"
                class="pb-3"
                style="--nb-media-item-icon-size: 2.5rem; --nb-media-item-title-font-size: 2rem; --nb-media-item-title-font-family: var(--font-heading)"
                icon="/icons/plane.png"
                iconAlt="Flight"
                description="Jun 14 &middot; 22:15 &#x2192; 12:45+1"
              >
                <span nbMediaItemTitle>NYC &#x2192; CDG</span>
              </nb-media-item>

              <div class="flex flex-col gap-2">
                <hr nbSeparator variant="dashed" />

                <nb-media-item
                  variant="plain"
                  icon="/icons/ticket.png"
                  iconAlt="Ticket"
                  iconBackground="#ff6aa2"
                  title="Seat 14A"
                  description="Economy &middot; Window"
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
          </div>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaItemPreview {
  protected readonly defaultExampleCode = `<div nbSurface border="strong" layout="stack" radius="sm" shadow="hard" clip>
  <div class="border-b-2 border-(--nb-border) bg-(--nb-accent) px-4 py-3 text-(--nb-accent-foreground)">
    <span class="font-heading text-2xl uppercase leading-none">Your Flight</span>
  </div>

  <div class="flex flex-col p-4">
    <nb-media-item
      variant="plain"
      class="pb-3"
      style="--nb-media-item-icon-size: 2.5rem; --nb-media-item-title-font-size: 3rem; --nb-media-item-title-font-family: var(--font-heading)"
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
