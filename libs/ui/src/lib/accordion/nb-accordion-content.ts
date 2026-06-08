import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NbAccordionItem } from './nb-accordion-item';

@Component({
  selector: 'nb-accordion-content',
  template: `
    <div
      [id]="item.contentId"
      role="region"
      [attr.aria-labelledby]="item.triggerId"
      data-slot="accordion-content"
      [attr.data-state]="item.open() ? 'open' : 'closed'"
      data-orientation="vertical"
      [attr.aria-hidden]="!item.open()"
      [style.background-color]="item.backgroundStyle()"
      [style.color]="item.foregroundStyle()"
    >
      <div>
        <ng-content />
      </div>
    </div>
  `,
  styles: [
    `
      div[role='region'] {
        display: grid;
        overflow: hidden;
        background-color: var(
          --nb-accordion-content-bg,
          var(--nb-accordion-item-bg, var(--nb-surface))
        );
        color: var(
          --nb-accordion-content-fg,
          var(--nb-accordion-item-fg, var(--nb-surface-foreground))
        );
        font-size: 0.875rem;
        font-weight: 500;
        grid-template-rows: 0fr;
        transition: grid-template-rows 200ms ease-out;
      }

      div[role='region'][data-state='open'] {
        grid-template-rows: 1fr;
      }

      div[role='region'] > div {
        min-height: 0;
        overflow: hidden;
        padding-inline: 1rem;
      }

      div[role='region'] > div::before,
      div[role='region'] > div::after {
        content: '';
        display: block;
        height: 1rem;
      }
    `,
  ],
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionContent {
  protected readonly item = inject(NbAccordionItem);
}
