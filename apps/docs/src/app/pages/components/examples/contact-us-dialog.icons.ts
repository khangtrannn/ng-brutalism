import { ChangeDetectionStrategy, Component } from '@angular/core';

const contactIconStyles = `
  :host {
    display: inline-flex;
    width: var(--contact-dialog-icon-width, var(--contact-dialog-icon-size, 1em));
    height: var(--contact-dialog-icon-height, var(--contact-dialog-icon-size, 1em));
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    color: var(--contact-dialog-icon-color, currentColor);
  }

  :host(.size-4) {
    --contact-dialog-icon-size: 1rem;
  }

  :host(.size-5) {
    --contact-dialog-icon-size: 1.25rem;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

@Component({
  selector: 'docs-contact-user-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [contactIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsContactUserIcon {}

@Component({
  selector: 'docs-contact-mail-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [contactIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsContactMailIcon {}

@Component({
  selector: 'docs-contact-tag-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [contactIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsContactTagIcon {}

@Component({
  selector: 'docs-contact-edit-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [contactIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsContactEditIcon {}

@Component({
  selector: 'docs-contact-shield-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [contactIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsContactShieldIcon {}

@Component({
  selector: 'docs-contact-send-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [contactIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsContactSendIcon {}

@Component({
  selector: 'docs-contact-zigzag-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 36 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="2,11 7,3 13,11 19,3 25,11 31,3 34,11" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [contactIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsContactZigzagIcon {}
