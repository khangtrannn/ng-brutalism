import { ChangeDetectionStrategy, Component } from '@angular/core';

const iconHostStyles = `
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
  }
  svg { display: block; width: 1em; height: 1em; }
`;

@Component({
  selector: 'recipe-profile-linkedin-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.27 2.36 4.27 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM3.56 20.45h3.55V9H3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLinkedinIcon {}

@Component({
  selector: 'recipe-profile-twitter-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTwitterIcon {}

@Component({
  selector: 'recipe-profile-mail-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="M3 7l9 7 9-7"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMailIcon {}

@Component({
  selector: 'recipe-profile-arrow-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M5 12h14"/>
      <path d="M13 5l7 7-7 7"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileArrowIcon {}

@Component({
  selector: 'recipe-profile-portrait',
  template: `
    <svg viewBox="0 0 120 130" aria-hidden="true">
      <!-- hair back -->
      <path d="M30 50 Q30 22 60 22 Q90 22 90 50 L90 70 Q90 75 86 75 L34 75 Q30 75 30 70 Z" fill="#1a1a1a"/>
      <!-- face -->
      <path d="M40 50 Q40 38 60 38 Q80 38 80 50 L80 64 Q80 76 60 78 Q40 76 40 64 Z" fill="#fbcfa3"/>
      <!-- glasses -->
      <circle cx="50" cy="56" r="6.5" fill="none" stroke="#1a1a1a" stroke-width="2.5"/>
      <circle cx="70" cy="56" r="6.5" fill="none" stroke="#1a1a1a" stroke-width="2.5"/>
      <line x1="56" y1="56" x2="64" y2="56" stroke="#1a1a1a" stroke-width="2.5"/>
      <!-- smile -->
      <path d="M54 67 Q60 71 66 67" fill="none" stroke="#1a1a1a" stroke-width="2.2" stroke-linecap="round"/>
      <!-- shirt -->
      <path d="M28 130 L28 100 Q28 86 44 84 L76 84 Q92 86 92 100 L92 130 Z" fill="#b8a4ff"/>
      <!-- neck -->
      <path d="M52 78 L52 86 Q60 89 68 86 L68 78 Z" fill="#e8a988"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    svg { display: block; width: 100%; height: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePortrait {}
