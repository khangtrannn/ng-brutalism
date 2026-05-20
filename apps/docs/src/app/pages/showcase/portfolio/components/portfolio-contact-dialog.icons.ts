import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-portfolio-contact-zigzag-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 68 22" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="2,17 13,5 24,17 35,5 46,17 57,5 66,17" />
    </svg>
  `,
  host: {
    'aria-hidden': 'true',
  },
  styles: [
    `
      :host {
        display: inline-flex;
        width: var(--portfolio-contact-icon-width, 68px);
        height: var(--portfolio-contact-icon-height, 22px);
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        color: #ff2f68;
      }

      svg {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPortfolioContactZigzagIcon {}
