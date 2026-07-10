import { ChangeDetectionStrategy, Component, input } from '@angular/core';

const codeBlockIconStyles = `
  :host {
    display: inline-flex;
    width: var(--docs-code-icon-size, 1em);
    height: var(--docs-code-icon-size, 1em);
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    color: var(--docs-code-icon-color, currentColor);
  }

  :host(.size-3) {
    --docs-code-icon-size: 0.75rem;
  }

  :host(.size-4) {
    --docs-code-icon-size: 1rem;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

@Component({
  selector: 'docs-code-copy-icon',
  template: `
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="square"
      stroke-linejoin="miter"
      aria-hidden="true"
    >
      <rect x="5" y="5" width="9" height="9" />
      <path d="M2 11V2h9v2" />
      <line x1="7" y1="8.5" x2="12" y2="8.5" />
      <line x1="7" y1="10.5" x2="12" y2="10.5" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [codeBlockIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsCodeCopyIcon {}

@Component({
  selector: 'docs-code-info-icon',
  template: `
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" />
      <line x1="8" y1="7" x2="8" y2="11.5" stroke-linecap="round" />
      <circle cx="8" cy="4.6" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [codeBlockIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsCodeInfoIcon {}

@Component({
  selector: 'docs-code-expand-icon',
  template: `
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="12" height="12" stroke-dasharray="2 2" />
      <line x1="8" y1="5.5" x2="8" y2="10.5" stroke-linecap="round" />
      @if (!expanded()) {
        <line x1="5.5" y1="8" x2="10.5" y2="8" stroke-linecap="round" />
      }
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [codeBlockIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsCodeExpandIcon {
  readonly expanded = input(false);
}

@Component({
  selector: 'docs-code-chevron-icon',
  template: `
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @if (direction() === 'up') {
        <path d="M2 8L6 4l4 4" />
      } @else {
        <path d="M2 4l4 4 4-4" />
      }
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [codeBlockIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsCodeChevronIcon {
  readonly direction = input<'up' | 'down'>('down');
}
