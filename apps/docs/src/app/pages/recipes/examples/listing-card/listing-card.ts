import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbChipGroup,
  NbDisplay,
  NbHalftone,
  NbIconButton,
  NbMedia,
  NbStatusDot,
  NbSticker,
} from '@ng-brutalism/ui';

import {
  ListingArrowIcon,
  ListingAvatar,
  ListingBedIcon,
  ListingBookmarkIcon,
  ListingBuildingIcon,
  ListingPawIcon,
  ListingPhoto,
  ListingViewIcon,
} from './listing-card.icons';

@Component({
  selector: 'recipe-listing-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbChip,
    NbChipGroup,
    NbDisplay,
    NbHalftone,
    NbIconButton,
    NbMedia,
    NbStatusDot,
    NbSticker,
    ListingArrowIcon,
    ListingAvatar,
    ListingBedIcon,
    ListingBookmarkIcon,
    ListingBuildingIcon,
    ListingPawIcon,
    ListingPhoto,
    ListingViewIcon,
  ],
  template: `
    <article class="listing-card">
      <nb-sticker class="listing-card__sticker" shape="burst" tone="mint" [rotate]="10">
        NEW LISTING!
      </nb-sticker>

      <header class="listing-card__header">
        <span class="listing-card__logo" aria-hidden="true">
          <recipe-listing-building-icon />
        </span>
        <div class="listing-card__brand">
          <span class="listing-card__brand-name">Bricklane</span>
          <span class="listing-card__brand-name">Homes</span>
        </div>
        <span class="listing-card__est">EST. 2021</span>
      </header>

      <nb-media class="listing-card__photo">
        <recipe-listing-photo />
      </nb-media>

      <h1 nbDisplay size="lg" class="listing-card__title">
        SUNLIT <span class="listing-card__title-accent">LOFT</span>
      </h1>

      <div nbChipGroup class="listing-card__chips">
        <span nbChip>
          <recipe-listing-bed-icon />
          2 BED
        </span>
        <span nbChip tone="lavender">
          <recipe-listing-view-icon />
          CITY VIEW
        </span>
        <span nbChip tone="yellow">
          <recipe-listing-paw-icon />
          PET FRIENDLY
        </span>
      </div>

      <div class="listing-card__price">$420K</div>

      <p class="listing-card__desc">
        Bright, airy loft with floor-to-ceiling windows, modern finishes, and unbeatable views.
      </p>

      <footer class="listing-card__footer">
        <div class="listing-card__agent">
          <recipe-listing-avatar />
          <div class="listing-card__agent-meta">
            <span class="listing-card__agent-name">Lena Park</span>
            <span class="listing-card__agent-role">Sr. Property Advisor</span>
            <span class="listing-card__agent-status">
              <span nbStatusDot state="online" aria-hidden="true"></span>
              ONLINE
            </span>
          </div>
        </div>

        <div class="listing-card__actions">
          <button nbButton type="button" class="listing-card__cta">
            VIEW TOUR
            <span nbButtonTrailingIcon>
              <recipe-listing-arrow-icon />
            </span>
          </button>
          <button nbIconButton type="button" size="sm" aria-label="Save listing">
            <recipe-listing-bookmark-icon />
          </button>
        </div>
      </footer>

      <nb-halftone position="bottom-left" [rows]="5" [cols]="5" [size]="4" [gap]="4" />
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        width: min(100%, 380px);
        container-type: inline-size;
      }

      .listing-card {
        position: relative;
        padding: 20px 22px 22px;
        border: 3px solid var(--nb-border);
        border-radius: 20px;
        background: var(--nb-paper, #fff8ec);
        box-shadow: 8px 10px 0 0 var(--nb-shadow);
        color: var(--nb-foreground);
      }

      .listing-card__sticker {
        position: absolute;
        top: -16px;
        right: -10px;
        z-index: 2;
        width: 80px;
        height: 80px;
        font-size: 9px;
      }

      .listing-card__header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
      }

      .listing-card__logo {
        display: inline-flex;
        width: 34px;
        height: 34px;
        align-items: center;
        justify-content: center;
        border: 2.5px solid var(--nb-border);
        border-radius: 8px;
        background: var(--nb-surface);
        font-size: 20px;
      }

      .listing-card__brand {
        display: flex;
        flex-direction: column;
        line-height: 1;
        gap: 0;
      }

      .listing-card__brand-name {
        font-size: 14px;
        font-weight: 900;
        line-height: 1;
      }

      .listing-card__est {
        margin-left: auto;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.1em;
        opacity: 0.55;
      }

      .listing-card__photo {
        display: block;
        width: 100%;
        height: 160px;
        margin-bottom: 16px;
        padding: 0;
        overflow: hidden;
      }

      .listing-card__photo recipe-listing-photo {
        width: 100%;
        height: 100%;
      }

      .listing-card__title {
        margin: 0 0 14px;
        font-size: clamp(34px, 10cqw, 42px);
        line-height: 0.95;
        letter-spacing: -0.02em;
      }

      .listing-card__title-accent {
        color: #ff5d8f;
        border-bottom: 5px solid #ff5d8f;
        line-height: 0.92;
      }

      .listing-card__chips {
        margin-bottom: 14px;
      }

      .listing-card__chips [nbChip] {
        font-size: 11px;
        padding: 4px 8px;
      }

      .listing-card__price {
        display: inline-block;
        padding: 8px 18px;
        margin-bottom: 14px;
        border: 2.5px solid var(--nb-border);
        border-radius: 999px;
        background: #ff7eb6;
        color: #fff;
        font-size: 22px;
        font-weight: 900;
        box-shadow: 3px 3px 0 0 var(--nb-shadow);
      }

      .listing-card__desc {
        margin: 0 0 18px;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.4;
      }

      .listing-card__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-top: 14px;
        border-top: 2.5px dashed var(--nb-border);
      }

      .listing-card__agent {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }

      .listing-card__agent-meta {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .listing-card__agent-name {
        font-size: 13px;
        font-weight: 900;
      }

      .listing-card__agent-role {
        font-size: 11px;
        font-weight: 600;
        opacity: 0.7;
      }

      .listing-card__agent-status {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 10px;
        font-weight: 700;
        --nb-status-dot-size: 7px;
      }

      .listing-card__actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .listing-card__cta {
        --nb-button-bg: #ffd24a;
        font-size: 13px;
      }

      @container (max-width: 360px) {
        .listing-card__footer {
          flex-direction: column;
          align-items: stretch;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListingCardRecipe {}
