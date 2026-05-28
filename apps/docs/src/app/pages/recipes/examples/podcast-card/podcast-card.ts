import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbChipGroup,
  NbDisplay,
  NbHalftone,
  NbIconButton,
  NbProgress,
  NbStatusDot,
  NbSticker,
} from '@ng-brutalism/ui';

import {
  PodcastAvatar,
  PodcastBookmarkIcon,
  PodcastClockIcon,
  PodcastMicIcon,
  PodcastPlayIcon,
  PodcastSparkIcon,
  PodcastTagIcon,
  PodcastWaveform,
} from './podcast-card.icons';

@Component({
  selector: 'recipe-podcast-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbChip,
    NbChipGroup,
    NbDisplay,
    NbHalftone,
    NbIconButton,
    NbProgress,
    NbStatusDot,
    NbSticker,
    PodcastAvatar,
    PodcastBookmarkIcon,
    PodcastClockIcon,
    PodcastMicIcon,
    PodcastPlayIcon,
    PodcastSparkIcon,
    PodcastTagIcon,
    PodcastWaveform,
  ],
  template: `
    <article class="podcast-card">
      <nb-sticker class="podcast-card__sticker" shape="burst" tone="yellow" [rotate]="10">
        ★
      </nb-sticker>

      <header class="podcast-card__header">
        <span nbChip tone="pink">
          <recipe-podcast-mic-icon />
          PODCAST
        </span>
      </header>

      <div class="podcast-card__brand">
        <span class="podcast-card__logo" aria-hidden="true">B+FM</span>
        <span class="podcast-card__brand-name">Build Loud FM</span>
      </div>

      <span class="podcast-card__episode">EP 42</span>

      <h1 nbDisplay size="lg" class="podcast-card__title">
        DESIGN<br />SYSTEMS<br /><span class="podcast-card__title-accent">THAT SCALE</span>
      </h1>

      <div nbChipGroup class="podcast-card__chips">
        <span nbChip>
          <recipe-podcast-clock-icon />
          45 MIN
        </span>
        <span nbChip tone="mint">
          <recipe-podcast-spark-icon />
          NEW
        </span>
        <span nbChip tone="lavender">
          <recipe-podcast-tag-icon />
          UX
        </span>
      </div>

      <p class="podcast-card__desc">
        Practical strategies for building design systems that grow with your product.
      </p>

      <div class="podcast-card__host">
        <recipe-podcast-avatar />
        <div class="podcast-card__host-meta">
          <span class="podcast-card__host-name">Kai Nguyen</span>
          <span class="podcast-card__host-role">Host</span>
          <span class="podcast-card__host-status">
            <span nbStatusDot state="live" aria-hidden="true"></span>
            ON AIR
          </span>
        </div>
      </div>

      <div class="podcast-card__player">
        <button nbIconButton type="button" shape="circle" size="sm" aria-label="Play">
          <recipe-podcast-play-icon />
        </button>
        <div class="podcast-card__progress-wrap">
          <recipe-podcast-waveform class="podcast-card__waveform" />
          <nb-progress [value]="49" [max]="100" tone="accent" class="podcast-card__progress" label="Playback position" />
        </div>
        <span class="podcast-card__time">22:18 / 45:00</span>
      </div>

      <footer class="podcast-card__footer">
        <button nbButton type="button" class="podcast-card__cta">
          LISTEN NOW
          <span nbButtonTrailingIcon>
            <recipe-podcast-play-icon />
          </span>
        </button>
        <button nbIconButton type="button" size="sm" aria-label="Save episode">
          <recipe-podcast-bookmark-icon />
        </button>
      </footer>

      <nb-halftone position="bottom-right" [rows]="5" [cols]="5" [size]="4" [gap]="4" />
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        width: min(100%, 380px);
        container-type: inline-size;
      }

      .podcast-card {
        position: relative;
        padding: 20px 22px 22px;
        border: 3px solid var(--nb-border);
        border-radius: 20px;
        background: var(--nb-paper, #fff8ec);
        box-shadow: 8px 10px 0 0 var(--nb-shadow);
        color: var(--nb-foreground);
      }

      .podcast-card__sticker {
        position: absolute;
        top: -16px;
        right: -10px;
        z-index: 2;
        width: 80px;
        height: 80px;
        font-size: 28px;
      }

      .podcast-card__header {
        margin-bottom: 14px;
      }

      .podcast-card__brand {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }

      .podcast-card__logo {
        display: inline-flex;
        width: 38px;
        height: 38px;
        align-items: center;
        justify-content: center;
        border: 2.5px solid var(--nb-border);
        border-radius: 8px;
        background: #4a8de0;
        color: #fff;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: -0.04em;
      }

      .podcast-card__brand-name {
        font-size: 16px;
        font-weight: 900;
      }

      .podcast-card__episode {
        display: inline-block;
        padding: 4px 12px;
        margin-bottom: 12px;
        border: 2.5px solid var(--nb-border);
        border-radius: 999px;
        background: #b8a4ff;
        font-size: 12px;
        font-weight: 900;
        box-shadow: 2px 2px 0 0 var(--nb-shadow);
      }

      .podcast-card__title {
        margin: 4px 0 14px;
        font-size: clamp(32px, 9.5cqw, 40px);
        line-height: 0.92;
        letter-spacing: -0.02em;
      }

      .podcast-card__title-accent {
        display: inline-block;
        color: #6d4ad8;
        border-bottom: 5px solid #6d4ad8;
        line-height: 0.92;
      }

      .podcast-card__chips {
        margin-bottom: 14px;
      }

      .podcast-card__chips [nbChip] {
        font-size: 11px;
        padding: 4px 8px;
      }

      .podcast-card__desc {
        margin: 0 0 16px;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.4;
      }

      .podcast-card__host {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
      }

      .podcast-card__host-meta {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .podcast-card__host-name {
        font-size: 13px;
        font-weight: 900;
      }

      .podcast-card__host-role {
        font-size: 11px;
        font-weight: 600;
        opacity: 0.7;
      }

      .podcast-card__host-status {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 10px;
        font-weight: 700;
        --nb-status-dot-size: 7px;
      }

      .podcast-card__player {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        margin-bottom: 14px;
        border: 2.5px solid var(--nb-border);
        border-radius: 999px;
        background: var(--nb-surface);
        box-shadow: 3px 3px 0 0 var(--nb-shadow);
      }

      .podcast-card__progress-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .podcast-card__waveform {
        width: 100%;
      }

      .podcast-card__progress {
        --nb-progress-height: 4px;
        height: 4px;
      }

      .podcast-card__time {
        font-family: var(--font-mono, ui-monospace, monospace);
        font-size: 10px;
        font-weight: 700;
      }

      .podcast-card__footer {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .podcast-card__cta {
        flex: 1;
        --nb-button-bg: #b8a4ff;
        --nb-button-fg: #fff;
        justify-content: center;
        font-size: 14px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PodcastCardRecipe {}
