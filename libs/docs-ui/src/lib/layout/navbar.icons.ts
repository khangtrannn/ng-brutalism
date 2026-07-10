import { ChangeDetectionStrategy, Component } from '@angular/core';

const sharedIconStyles = `
  :host {
    display: inline-flex;
    width: var(--docs-navbar-icon-size, 1em);
    height: var(--docs-navbar-icon-size, 1em);
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    color: currentColor;
  }

  :host(.size-4) { --docs-navbar-icon-size: 1rem; }
  :host(.size-5) { --docs-navbar-icon-size: 1.25rem; }
  :host(.size-6) { --docs-navbar-icon-size: 1.5rem; }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

@Component({
  selector: 'docs-navbar-external-link-icon',
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
  styles: [sharedIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsNavbarExternalLinkIcon {}

@Component({
  selector: 'docs-navbar-menu-icon',
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
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [sharedIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsNavbarMenuIcon {}

@Component({
  selector: 'docs-navbar-close-icon',
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
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [sharedIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsNavbarCloseIcon {}
