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
  selector: 'recipe-esports-gamepad-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 11h4"/>
      <path d="M8 9v4"/>
      <line x1="15" y1="12" x2="15.01" y2="12"/>
      <line x1="18" y1="10" x2="18.01" y2="10"/>
      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258A4 4 0 0 0 17.32 5z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsportsGamepadIcon {}

@Component({
  selector: 'recipe-esports-globe-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsportsGlobeIcon {}

@Component({
  selector: 'recipe-esports-users-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsportsUsersIcon {}

@Component({
  selector: 'recipe-esports-coin-icon',
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#4caf50" stroke="#1a1a1a" stroke-width="2"/>
      <text x="12" y="16" text-anchor="middle" font-size="13" font-weight="900" fill="#fff" font-family="sans-serif">$</text>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles + ` :host { width: 22px; height: 22px; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsportsCoinIcon {}

@Component({
  selector: 'recipe-esports-arrow-icon',
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
export class EsportsArrowIcon {}

@Component({
  selector: 'recipe-esports-bookmark-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsportsBookmarkIcon {}

@Component({
  selector: 'recipe-esports-trophy-art',
  template: `
    <svg viewBox="0 0 160 140" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <!-- character base -->
      <rect x="30" y="80" width="50" height="55" fill="#ff5d8f" stroke="#1a1a1a" stroke-width="3"/>
      <!-- character head -->
      <rect x="34" y="56" width="42" height="32" fill="#ffd24a" stroke="#1a1a1a" stroke-width="3"/>
      <rect x="40" y="64" width="6" height="6" fill="#1a1a1a"/>
      <rect x="60" y="64" width="6" height="6" fill="#1a1a1a"/>
      <!-- sword (pixel) -->
      <rect x="70" y="40" width="6" height="60" fill="#7bd96e" stroke="#1a1a1a" stroke-width="2"/>
      <rect x="62" y="92" width="22" height="6" fill="#7bd96e" stroke="#1a1a1a" stroke-width="2"/>
      <!-- trophy -->
      <path d="M105 50 v-20 h28 v20" fill="#ffd24a" stroke="#1a1a1a" stroke-width="3"/>
      <rect x="98" y="50" width="42" height="30" fill="#ffd24a" stroke="#1a1a1a" stroke-width="3"/>
      <rect x="112" y="80" width="14" height="14" fill="#ffd24a" stroke="#1a1a1a" stroke-width="3"/>
      <rect x="100" y="94" width="38" height="6" fill="#ffd24a" stroke="#1a1a1a" stroke-width="3"/>
      <!-- handles -->
      <path d="M98 50 q-12 8 0 22" fill="none" stroke="#1a1a1a" stroke-width="3"/>
      <path d="M140 50 q12 8 0 22" fill="none" stroke="#1a1a1a" stroke-width="3"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    svg { display: block; width: 100%; height: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsportsTrophyArt {}

@Component({
  selector: 'recipe-esports-crown-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="#1a1a1a" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 18 L5 8 L9 12 L12 6 L15 12 L19 8 L21 18 Z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsportsCrownIcon {}
