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
  selector: 'recipe-listing-building-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20"/>
      <line x1="8" y1="6" x2="10" y2="6"/>
      <line x1="14" y1="6" x2="16" y2="6"/>
      <line x1="8" y1="10" x2="10" y2="10"/>
      <line x1="14" y1="10" x2="16" y2="10"/>
      <line x1="8" y1="14" x2="10" y2="14"/>
      <line x1="14" y1="14" x2="16" y2="14"/>
      <line x1="10" y1="22" x2="14" y2="22"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingBuildingIcon {}

@Component({
  selector: 'recipe-listing-bed-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2 4v16"/>
      <path d="M22 8v12"/>
      <path d="M2 16h20"/>
      <path d="M2 8h12a4 4 0 0 1 4 4v4"/>
      <circle cx="7" cy="11" r="2"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingBedIcon {}

@Component({
  selector: 'recipe-listing-view-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingViewIcon {}

@Component({
  selector: 'recipe-listing-paw-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="11" r="2.2"/>
      <circle cx="9" cy="6" r="2.2"/>
      <circle cx="15" cy="6" r="2.2"/>
      <circle cx="19" cy="11" r="2.2"/>
      <path d="M7 18 c0 -3 2 -5 5 -5 s5 2 5 5 c0 2 -2 3 -5 3 s-5 -1 -5 -3 z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingPawIcon {}

@Component({
  selector: 'recipe-listing-arrow-icon',
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
export class ListingArrowIcon {}

@Component({
  selector: 'recipe-listing-bookmark-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingBookmarkIcon {}

@Component({
  selector: 'recipe-listing-photo',
  template: `
    <svg viewBox="0 0 340 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <!-- sky -->
      <rect x="0" y="0" width="340" height="200" fill="#e6dccf"/>
      <!-- ceiling -->
      <rect x="0" y="0" width="340" height="40" fill="#cfc2b0"/>
      <!-- window frame -->
      <rect x="20" y="20" width="180" height="120" fill="#1a1a1a"/>
      <rect x="26" y="26" width="80" height="108" fill="#c4d8e8"/>
      <rect x="114" y="26" width="80" height="108" fill="#c4d8e8"/>
      <!-- city silhouette in window -->
      <path d="M26 96 L40 76 L52 88 L66 70 L80 84 L94 92 L106 134 L26 134 Z" fill="#7a8a9c"/>
      <path d="M114 96 L130 78 L142 90 L158 72 L172 86 L186 92 L194 134 L114 134 Z" fill="#7a8a9c"/>
      <!-- sofa -->
      <rect x="30" y="140" width="120" height="40" fill="#f0e2d0" stroke="#1a1a1a" stroke-width="2"/>
      <rect x="38" y="148" width="32" height="20" rx="3" fill="#d9c2a8"/>
      <rect x="78" y="148" width="32" height="20" rx="3" fill="#d9c2a8"/>
      <!-- right side: kitchen -->
      <rect x="210" y="60" width="120" height="80" fill="#3b6b5a"/>
      <rect x="220" y="70" width="100" height="20" fill="#2a4f43"/>
      <rect x="218" y="100" width="50" height="40" fill="#2a4f43"/>
      <!-- stools -->
      <rect x="220" y="148" width="14" height="30" fill="#a87544" stroke="#1a1a1a" stroke-width="2"/>
      <rect x="245" y="148" width="14" height="30" fill="#a87544" stroke="#1a1a1a" stroke-width="2"/>
      <!-- floor line -->
      <rect x="0" y="180" width="340" height="20" fill="#b8966c"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    svg { display: block; width: 100%; height: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingPhoto {}

@Component({
  selector: 'recipe-listing-avatar',
  template: `
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#ffd24a"/>
      <circle cx="20" cy="16" r="6" fill="#1a1a1a"/>
      <path d="M8 36 Q8 26 20 26 Q32 26 32 36 Z" fill="#fbcfa3"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles + ` :host { width: 38px; height: 38px; } svg { width: 100%; height: 100%; border-radius: 50%; border: 2.5px solid #1a1a1a; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingAvatar {}
