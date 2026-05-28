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
  selector: 'recipe-job-pin-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobPinIcon {}

@Component({
  selector: 'recipe-job-briefcase-icon',
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="8.2" width="18" height="12" rx="1.2" />
      <path d="M8.5 8.2V5.8c0-1 .8-1.8 1.8-1.8h3.4c1 0 1.8.8 1.8 1.8v2.4" />
      <path d="M8 20.2v-8.8M16 20.2v-8.8" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobBriefcaseIcon {}

@Component({
  selector: 'recipe-job-bolt-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobBoltIcon {}

@Component({
  selector: 'recipe-job-arrow-icon',
  template: `
    <svg
      viewBox="0 0 32 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12h24" />
      <path d="M18.5 3.5 27 12l-8.5 8.5" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobArrowIcon {}

@Component({
  selector: 'recipe-job-bookmark-icon',
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path
        d="M7 21V5.8c0-.9.7-1.6 1.6-1.6h6.8c.9 0 1.6.7 1.6 1.6V21l-5-3.5L7 21z"
      />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobBookmarkIcon {}

@Component({
  selector: 'recipe-job-cash-icon',
  template: `
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="currentColor" />
      <text
        x="20"
        y="27"
        text-anchor="middle"
        font-size="24"
        font-weight="1000"
        fill="#fff"
        font-family="Arial Black, Arial, sans-serif"
      >
        $
      </text>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCashIcon {}

@Component({
  selector: 'recipe-job-logo',
  template: `
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 8 36.8 27.2 56 32 36.8 36.8 32 56 27.2 36.8 8 32 27.2 27.2 32 8z"
        fill="currentColor"
      />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobLogo {}

@Component({
  selector: 'recipe-job-avatar',
  template: `
    <svg viewBox="0 0 88 88" aria-hidden="true">
      <circle cx="44" cy="44" r="44" fill="#b8a4ff" />
      <path
        d="M26 26c5.2-8.8 30.8-8.8 36 0-6.2-2.3-29.8-2.3-36 0z"
        fill="#111"
      />
      <circle cx="44" cy="34" r="14" fill="#111" />
      <path d="M18 84c0-18 11.8-27.2 26-27.2S70 66 70 84H18z" fill="#ffd29f" />
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [
    iconHostStyles +
      ` :host { width: 88px; height: 88px; } svg { width: 100%; height: 100%; border-radius: 50%; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobAvatar {}
