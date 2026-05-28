import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbAvatarGroup,
  NbButton,
  NbChip,
  NbChipGroup,
  NbDisplay,
  NbHalftone,
  NbIconButton,
  NbProgress,
  NbSticker,
} from '@ng-brutalism/ui';

import {
  CharityBoltIcon,
  CharityBookmarkIcon,
  CharityHeartIcon,
  CharityIllustration,
  CharityPeopleIcon,
  CharityPinIcon,
} from './charity-card.icons';

@Component({
  selector: 'recipe-charity-card',
  imports: [
    NbAvatarGroup,
    NbButton,
    NbChip,
    NbChipGroup,
    NbDisplay,
    NbHalftone,
    NbIconButton,
    NbProgress,
    NbSticker,
    CharityBoltIcon,
    CharityBookmarkIcon,
    CharityHeartIcon,
    CharityIllustration,
    CharityPeopleIcon,
    CharityPinIcon,
  ],
  template: `
    <article class="charity-card">
      <nb-sticker class="charity-card__sticker" shape="burst" tone="mint" [rotate]="8">
        MAKE AN IMPACT!
      </nb-sticker>

      <header class="charity-card__header">
        <span class="charity-card__logo" aria-hidden="true">
          <recipe-charity-heart-icon />
        </span>
        <div class="charity-card__brand">
          <span class="charity-card__brand-name">Kind Box</span>
          <span class="charity-card__brand-tag">Share More. Worry Less.</span>
        </div>
      </header>

      <h1 nbDisplay size="lg" class="charity-card__title">
        FEED 100<br />FAMILIES
      </h1>

      <div class="charity-card__goal">
        <span class="charity-card__goal-amount">$8.2K</span>
        <span class="charity-card__goal-target">/ $10K</span>
        <nb-progress [value]="82" [max]="100" tone="success" class="charity-card__progress" />
      </div>

      <div nbChipGroup class="charity-card__chips">
        <span nbChip tone="yellow">
          <recipe-charity-bolt-icon />
          URGENT
        </span>
        <span nbChip tone="lavender">
          <recipe-charity-people-icon />
          COMMUNITY
        </span>
        <span nbChip tone="mint">
          <recipe-charity-pin-icon />
          LOCAL
        </span>
      </div>

      <div class="charity-card__illustration">
        <recipe-charity-illustration />
      </div>

      <p class="charity-card__desc">
        Your donation helps us provide meals and essentials to families in need.
        Together, we can end hunger in our city.
      </p>

      <footer class="charity-card__footer">
        <div class="charity-card__supporters">
          <nb-avatar-group [overflow]="142">
            <span class="charity-card__mini-avatar" style="background:#ff7eb6"></span>
            <span class="charity-card__mini-avatar" style="background:#99e8c8"></span>
            <span class="charity-card__mini-avatar" style="background:#b8a4ff"></span>
          </nb-avatar-group>
          <span class="charity-card__supporters-text">Over 142 supporters this week</span>
        </div>

        <div class="charity-card__actions">
          <button nbButton type="button" class="charity-card__cta">
            DONATE NOW
          </button>
          <button nbIconButton type="button" size="sm" aria-label="Save">
            <recipe-charity-bookmark-icon />
          </button>
        </div>
      </footer>

      <nb-halftone position="bottom-right" [rows]="6" [cols]="6" [size]="4" [gap]="4" />
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        width: min(100%, 380px);
        container-type: inline-size;
      }

      .charity-card {
        position: relative;
        padding: 22px;
        border: 3px solid var(--nb-border);
        border-radius: 20px;
        background: var(--nb-paper, #fff8ec);
        box-shadow: 8px 10px 0 0 var(--nb-shadow);
        color: var(--nb-foreground);
      }

      .charity-card__sticker {
        position: absolute;
        top: -16px;
        right: -10px;
        z-index: 2;
        width: 80px;
        height: 80px;
        font-size: 9px;
      }

      .charity-card__header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }

      .charity-card__logo {
        display: inline-flex;
        width: 38px;
        height: 38px;
        align-items: center;
        justify-content: center;
        border: 2.5px solid var(--nb-border);
        border-radius: 10px;
        background: #ff7eb6;
        color: #fff;
        font-size: 22px;
      }

      .charity-card__brand {
        display: flex;
        flex-direction: column;
        line-height: 1;
        gap: 2px;
      }

      .charity-card__brand-name {
        font-size: 16px;
        font-weight: 900;
      }

      .charity-card__brand-tag {
        font-size: 11px;
        opacity: 0.7;
        font-weight: 600;
      }

      .charity-card__title {
        margin: 4px 0 14px;
        font-size: clamp(34px, 10cqw, 44px);
        line-height: 0.92;
        letter-spacing: -0.02em;
      }

      .charity-card__goal {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 6px;
        padding: 10px 14px;
        margin-bottom: 16px;
        border: 2.5px solid var(--nb-border);
        border-radius: 12px;
        background: #ffd24a;
        box-shadow: 3px 3px 0 0 var(--nb-shadow);
      }

      .charity-card__goal-amount {
        font-size: 22px;
        font-weight: 900;
      }

      .charity-card__goal-target {
        font-size: 14px;
        opacity: 0.6;
        font-weight: 700;
      }

      .charity-card__progress {
        flex: 1 1 100%;
      }

      .charity-card__chips {
        margin-bottom: 16px;
      }

      .charity-card__chips [nbChip] {
        font-size: 11px;
        padding: 4px 8px;
      }

      .charity-card__illustration {
        margin: 0 -8px 14px;
      }

      .charity-card__desc {
        margin: 0 0 16px;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.4;
      }

      .charity-card__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .charity-card__supporters {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }

      .charity-card__mini-avatar {
        display: inline-block;
        width: 24px;
        height: 24px;
        border: 2px solid var(--nb-border);
        border-radius: 50%;
      }

      .charity-card__supporters-text {
        font-size: 11px;
        font-weight: 600;
        opacity: 0.75;
      }

      .charity-card__actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .charity-card__cta {
        --nb-button-bg: #ff7eb6;
        --nb-button-fg: #fff;
        font-size: 13px;
      }

      @container (max-width: 360px) {
        .charity-card__footer {
          flex-direction: column;
          align-items: stretch;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CharityCardRecipe {}
