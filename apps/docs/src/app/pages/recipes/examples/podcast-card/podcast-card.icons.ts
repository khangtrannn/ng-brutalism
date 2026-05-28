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
  selector: 'recipe-podcast-mic-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastMicIcon {}

@Component({
  selector: 'recipe-podcast-clock-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastClockIcon {}

@Component({
  selector: 'recipe-podcast-spark-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastSparkIcon {}

@Component({
  selector: 'recipe-podcast-tag-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastTagIcon {}

@Component({
  selector: 'recipe-podcast-play-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="6 4 20 12 6 20"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastPlayIcon {}

@Component({
  selector: 'recipe-podcast-bookmark-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastBookmarkIcon {}

@Component({
  selector: 'recipe-podcast-avatar',
  template: `
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#b8a4ff"/>
      <circle cx="20" cy="16" r="6" fill="#1a1a1a"/>
      <path d="M8 36 Q8 26 20 26 Q32 26 32 36 Z" fill="#fbcfa3"/>
      <rect x="14" y="14" width="12" height="3" fill="#1a1a1a"/>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [iconHostStyles + ` :host { width: 38px; height: 38px; } svg { width: 100%; height: 100%; border-radius: 50%; border: 2.5px solid #1a1a1a; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastAvatar {}

@Component({
  selector: 'recipe-podcast-waveform',
  template: `
    <svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
      <g fill="currentColor">
        <rect x="0" y="8" width="2" height="4"/>
        <rect x="4" y="6" width="2" height="8"/>
        <rect x="8" y="3" width="2" height="14"/>
        <rect x="12" y="7" width="2" height="6"/>
        <rect x="16" y="2" width="2" height="16"/>
        <rect x="20" y="5" width="2" height="10"/>
        <rect x="24" y="8" width="2" height="4"/>
        <rect x="28" y="4" width="2" height="12"/>
        <rect x="32" y="6" width="2" height="8"/>
        <rect x="36" y="2" width="2" height="16"/>
        <rect x="40" y="7" width="2" height="6"/>
        <rect x="44" y="5" width="2" height="10"/>
        <rect x="48" y="8" width="2" height="4"/>
        <rect x="52" y="3" width="2" height="14"/>
        <rect x="56" y="7" width="2" height="6"/>
        <rect x="60" y="5" width="2" height="10"/>
        <rect x="64" y="8" width="2" height="4"/>
        <rect x="68" y="6" width="2" height="8"/>
        <rect x="72" y="9" width="2" height="2"/>
        <rect x="76" y="8" width="2" height="4"/>
        <rect x="80" y="9" width="2" height="2"/>
        <rect x="84" y="9" width="2" height="2"/>
        <rect x="88" y="9" width="2" height="2"/>
        <rect x="92" y="9" width="2" height="2"/>
        <rect x="96" y="9" width="2" height="2"/>
      </g>
    </svg>
  `,
  host: { 'aria-hidden': 'true' },
  styles: [`
    :host { display: block; width: 100%; height: 20px; color: var(--nb-foreground); }
    svg { display: block; width: 100%; height: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastWaveform {}
