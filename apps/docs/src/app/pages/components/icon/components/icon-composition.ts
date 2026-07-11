import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbChipGroup,
  NbIcon,
  NbStack,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-icon-composition',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbChip,
    NbChipGroup,
    NbIcon,
    NbStack,
    DocsExample,
  ],
  template: `
    <section id="composition">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Composition
      </h2>
      <p class="mb-4 font-medium">
        Because <code class="font-mono">nbIcon</code> is a directive it drops
        into any container without adding a wrapper element.
      </p>
      <docs-example [code]="compositionCode">
        <div class="p-6 w-full" nbStack gap="lg">
          <div nbChipGroup>
            <span nbChip tone="mint">
              <span
                nbIcon
                src="/tokyo-city-escape/nb-plane-fill.svg"
                size="sm"
                decorative
              ></span>
              Flight included
            </span>
            <span nbChip tone="lavender">
              <span
                nbIcon
                src="/tokyo-city-escape/nb-hotel-fill.svg"
                size="sm"
                decorative
              ></span>
              Hotel
            </span>
            <span nbChip tone="pink">
              <span
                nbIcon
                src="/tokyo-city-escape/nb-star-fill.svg"
                size="sm"
                decorative
              ></span>
              Top pick
            </span>
          </div>

          <button
            nbButton
            style="--nb-button-bg: var(--nb-lavender); --nb-button-radius: 0.5rem"
            class="h-12 px-4 font-black tracking-wide uppercase"
          >
            Book Trip
            <span
              nbButtonTrailingIcon
              class="inline-flex size-8 items-center justify-center rounded-full bg-(--nb-foreground) text-(--nb-background)"
            >
              <span
                nbIcon
                src="/tokyo-city-escape/nb-arrow-right.svg"
                size="sm"
                tone="current"
                decorative
              ></span>
            </span>
          </button>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComposition {
  protected readonly compositionCode = `<div nbChipGroup>
  <span nbChip tone="mint">
    <span nbIcon src="/icons/plane.svg" size="sm" decorative></span>
    Flight included
  </span>
  <span nbChip tone="lavender">
    <span nbIcon src="/icons/hotel.svg" size="sm" decorative></span>
    Hotel
  </span>
  <span nbChip tone="pink">
    <span nbIcon src="/icons/star.svg" size="sm" decorative></span>
    Top pick
  </span>
</div>

<button nbButton>
  Book Trip
  <span nbButtonTrailingIcon class="...">
    <span nbIcon src="/icons/arrow-right.svg" size="sm" tone="current" decorative></span>
  </span>
</button>`;
}
