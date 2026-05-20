import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-navbar-external-link-icon',
  standalone: true,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="square"
      stroke-linejoin="miter"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  `,
  host: {
    'aria-hidden': 'true',
  },
  styles: [
    `
      :host {
        display: inline-flex;
        width: var(--docs-navbar-icon-size, 1em);
        height: var(--docs-navbar-icon-size, 1em);
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        color: currentColor;
      }

      :host(.size-4) {
        --docs-navbar-icon-size: 1rem;
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
export class DocsNavbarExternalLinkIcon {}
