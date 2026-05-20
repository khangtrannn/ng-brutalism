import { ChangeDetectionStrategy, Component } from '@angular/core';

const selectIconStyles = `
  :host {
    display: inline-flex;
    width: var(--docs-select-icon-size, 1em);
    height: var(--docs-select-icon-size, 1em);
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    color: var(--docs-select-icon-color, currentColor);
  }

  :host(.size-5) {
    --docs-select-icon-size: 1.25rem;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

@Component({
  selector: 'docs-select-globe-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [selectIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSelectGlobeIcon {}

@Component({
  selector: 'docs-select-briefcase-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8h16v11H4z" />
      <path d="M9 8V5h6v3" />
      <path d="M4 13h16" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [selectIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSelectBriefcaseIcon {}

@Component({
  selector: 'docs-select-clock-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [selectIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSelectClockIcon {}

@Component({
  selector: 'docs-select-building-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 21V4h14v17" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [selectIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSelectBuildingIcon {}

@Component({
  selector: 'docs-select-tag-icon',
  standalone: true,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [selectIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSelectTagIcon {}

@Component({
  selector: 'docs-select-location-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [selectIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSelectLocationIcon {}
