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
  selector: 'recipe-charity-heart-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8-2.5 4.5-9.5 9-9.5 9z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharityHeartIcon {}

@Component({
  selector: 'recipe-charity-bolt-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharityBoltIcon {}

@Component({
  selector: 'recipe-charity-people-icon',
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
export class CharityPeopleIcon {}

@Component({
  selector: 'recipe-charity-pin-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharityPinIcon {}

@Component({
  selector: 'recipe-charity-bookmark-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharityBookmarkIcon {}

@Component({
  selector: 'recipe-charity-illustration',
  template: `
    <svg viewBox="0 0 240 110" aria-hidden="true">
      <!-- left hand -->
      <path d="M5 90 L25 75 L48 80 L58 70 L70 78 L70 100 L5 100 Z" fill="#e8a988" stroke="#1a1a1a" stroke-width="2.5"/>
      <!-- right hand -->
      <path d="M235 90 L215 75 L192 80 L182 70 L170 78 L170 100 L235 100 Z" fill="#e8a988" stroke="#1a1a1a" stroke-width="2.5"/>
      <!-- box -->
      <rect x="60" y="40" width="120" height="55" fill="#d9b58a" stroke="#1a1a1a" stroke-width="2.5"/>
      <line x1="120" y1="40" x2="120" y2="95" stroke="#1a1a1a" stroke-width="2.5"/>
      <path d="M85 65 c-4 -4 -4 -10 0 -14 c2 -2 6 -2 8 0 c2 -2 6 -2 8 0 c4 4 4 10 0 14 l-8 8 z" fill="#ff5d5d" stroke="#1a1a1a" stroke-width="2"/>
      <!-- bread on top -->
      <ellipse cx="100" cy="35" rx="20" ry="8" fill="#d97f3a" stroke="#1a1a1a" stroke-width="2.5"/>
      <!-- bottle -->
      <rect x="138" y="20" width="14" height="22" fill="#99e8c8" stroke="#1a1a1a" stroke-width="2.5"/>
      <rect x="141" y="14" width="8" height="6" fill="#99e8c8" stroke="#1a1a1a" stroke-width="2.5"/>
      <!-- can -->
      <rect x="158" y="22" width="16" height="20" rx="2" fill="#ffd24a" stroke="#1a1a1a" stroke-width="2.5"/>
      <!-- wheat -->
      <line x1="125" y1="38" x2="130" y2="18" stroke="#7a5a30" stroke-width="2"/>
      <ellipse cx="128" cy="22" rx="3" ry="6" fill="#ffd24a" stroke="#1a1a1a" stroke-width="1.5"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [`
    :host { display: block; width: 100%; }
    svg { display: block; width: 100%; height: auto; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharityIllustration {}

