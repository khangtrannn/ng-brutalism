import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbChip, NbChipGroup } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-chip-tokens',
  imports: [DocsExample, NbChip, NbChipGroup],
  template: `
    <section id="tokens">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tokens</h2>
      <docs-example [code]="tokensExampleCode">
        <div nbChipGroup class="p-4">
          <span
            nbChip
            tone="yellow"
            class="gap-[14px] px-[18px] py-[10px] text-[22px] leading-none font-black"
            style="--nb-chip-radius:8px; --nb-chip-shadow:6px 6px 0 0 var(--nb-shadow); --nb-chip-icon-size:36px"
          >
            <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="18" fill="currentColor" />
              <text
                x="20"
                y="27"
                text-anchor="middle"
                font-size="24"
                font-weight="1000"
                fill="#fff"
                font-family="Arial Black, Arial, sans-serif"
              >
                $
              </text>
            </svg>
            $95K - $130K
          </span>
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipTokens {
  protected readonly tokensExampleCode = `<span
  nbChip
  tone="yellow"
  class="gap-[14px] px-[18px] py-[10px] text-[22px] leading-none font-black"
  style="--nb-chip-radius:8px; --nb-chip-shadow:6px 6px 0 0 var(--nb-shadow); --nb-chip-icon-size:36px"
>
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">...</svg>
  $95K - $130K
</span>`;
}
