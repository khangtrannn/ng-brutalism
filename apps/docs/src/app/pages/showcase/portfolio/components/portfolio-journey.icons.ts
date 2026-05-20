import { ChangeDetectionStrategy, Component } from '@angular/core';

const journeyIconStyles = `
  :host {
    display: inline-flex;
    width: var(--portfolio-journey-icon-size, 1em);
    height: var(--portfolio-journey-icon-size, 1em);
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    color: currentColor;
  }

  :host(.size-5) {
    --portfolio-journey-icon-size: 1.25rem;
  }

  :host(.size-6) {
    --portfolio-journey-icon-size: 1.5rem;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

@Component({
  selector: 'docs-portfolio-chevron-left-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [journeyIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPortfolioChevronLeftIcon {}

@Component({
  selector: 'docs-portfolio-menu-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [journeyIconStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPortfolioMenuIcon {}
