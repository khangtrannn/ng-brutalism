import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbChipGroup,
  NbDisplay,
  NbHalftone,
  NbIconButton,
  NbSeparator,
  NbStatusDot,
  NbSticker,
} from '@ng-brutalism/ui';

import {
  ProfileArrowIcon,
  ProfileLinkedinIcon,
  ProfileMailIcon,
  ProfilePortrait,
  ProfileTwitterIcon,
} from './profile-card.icons';

@Component({
  selector: 'recipe-profile-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbChip,
    NbChipGroup,
    NbDisplay,
    NbHalftone,
    NbIconButton,
    NbSeparator,
    NbStatusDot,
    NbSticker,
    ProfileArrowIcon,
    ProfileLinkedinIcon,
    ProfileMailIcon,
    ProfilePortrait,
    ProfileTwitterIcon,
  ],
  template: `
    <article class="profile-card">
      <div class="profile-card__sticker" aria-hidden="true">
        <nb-sticker
          shape="burst"
          tone="pink"
          [rotate]="20"
          decorative
          class="profile-card__star"
          >★</nb-sticker
        >
        <nb-sticker
          shape="splat"
          tone="default"
          [rotate]="-8"
          decorative
          class="profile-card__splat"
        ></nb-sticker>
      </div>

      <div class="profile-card__top">
        <div class="profile-card__portrait">
          <recipe-profile-portrait />
        </div>

        <div class="profile-card__intro">
          <span nbChip tone="mint" class="profile-card__open">
            <span nbStatusDot state="online" aria-hidden="true"></span>
            OPEN TO WORK
          </span>

          <h1 nbDisplay size="lg" class="profile-card__name">NORA<br />CHEN</h1>
        </div>
      </div>

      <div class="profile-card__role-row">
        <div class="profile-card__role-stack">
          <hr nbSeparator variant="thick" class="profile-card__rule" />
          <p class="profile-card__role">Product Designer</p>
        </div>
        <nb-halftone
          position="bottom-right"
          [rows]="5"
          [cols]="5"
          [size]="4"
          [gap]="4"
        />
      </div>

      <div nbChipGroup class="profile-card__tags">
        <span nbChip tone="lavender">UX</span>
        <span nbChip>DESIGN SYSTEMS</span>
        <span nbChip tone="pink">FIGMA</span>
      </div>

      <p class="profile-card__bio">
        Designing intuitive, accessible, and delightful experiences that make an
        impact.
      </p>

      <div class="profile-card__actions">
        <div class="profile-card__socials">
          <button
            nbIconButton
            type="button"
            variant="primary"
            size="sm"
            style="--nb-icon-button-bg: #0a66c2; --nb-icon-button-fg: #fff;"
            aria-label="LinkedIn"
          >
            <recipe-profile-linkedin-icon />
          </button>
          <button
            nbIconButton
            type="button"
            size="sm"
            style="--nb-icon-button-bg: #1da1f2; --nb-icon-button-fg: #fff;"
            aria-label="Twitter"
          >
            <recipe-profile-twitter-icon />
          </button>
          <button
            nbIconButton
            type="button"
            size="sm"
            style="--nb-icon-button-bg: #ffd24a; --nb-icon-button-fg: #000;"
            aria-label="Email"
          >
            <recipe-profile-mail-icon />
          </button>
        </div>

        <button nbButton type="button" class="profile-card__cta">
          VIEW PROFILE
          <span nbButtonTrailingIcon class="profile-card__cta-arrow">
            <recipe-profile-arrow-icon />
          </span>
        </button>
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        width: min(100%, 380px);
        container-type: inline-size;
      }

      .profile-card {
        position: relative;
        padding: 22px;
        border: 3px solid var(--nb-border);
        border-radius: 20px;
        background: var(--nb-paper, #fff8ec);
        box-shadow: 8px 10px 0 0 var(--nb-shadow);
        color: var(--nb-foreground);
      }

      .profile-card__sticker {
        position: absolute;
        top: -28px;
        right: -22px;
        width: 96px;
        height: 96px;
        pointer-events: none;
        z-index: 2;
      }

      .profile-card__star,
      .profile-card__splat {
        position: absolute;
      }

      .profile-card__star {
        top: -10px;
        right: -6px;
        --nb-sticker-min-inline-size: 4rem;
        --nb-sticker-min-block-size: 4rem;
        --nb-sticker-max-inline-size: 4rem;
        --nb-sticker-max-block-size: 4rem;
        --nb-sticker-padding-inline: 0;
        --nb-sticker-padding-block: 0;
        --nb-sticker-font-size: 0;
        --nb-sticker-stroke-width: 3px;
        z-index: 3;
      }

      .profile-card__splat {
        top: 18px;
        right: 8px;
        --nb-sticker-size: 3.5rem;
        z-index: 1;
      }

      .profile-card__top {
        position: relative;
        display: grid;
        grid-template-columns: 124px minmax(0, 1fr);
        gap: 16px;
        align-items: start;
      }

      .profile-card__portrait {
        display: flex;
        width: 124px;
        height: 144px;
        align-items: flex-end;
        justify-content: center;
        overflow: hidden;
        border: 3px solid var(--nb-border);
        border-radius: 16px;
        background: #ff7eb6;
        box-shadow: 4px 4px 0 0 var(--nb-shadow);
      }

      .profile-card__portrait recipe-profile-portrait {
        width: 100%;
        height: 100%;
      }

      .profile-card__intro {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 4px;
        min-width: 0;
      }

      .profile-card__open {
        align-self: flex-start;
        --nb-status-dot-size: 8px;
      }

      .profile-card__name {
        margin: 4px 0 0;
        font-size: clamp(28px, 8.5cqw, 36px);
        line-height: 0.95;
        letter-spacing: -0.02em;
      }

      .profile-card__role-row {
        position: relative;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 12px;
        margin-top: 18px;
      }

      .profile-card__role-stack {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      .profile-card__rule {
        width: 88px !important;
        --nb-separator-color: #ffd24a;
        --nb-separator-thickness: 10px;
        box-shadow: 3px 3px 0 0 var(--nb-shadow);
        border-radius: 1px;
      }

      .profile-card__role {
        margin: 0;
        font-size: 15px;
        font-weight: 700;
      }

      .profile-card__role-row nb-halftone {
        position: relative;
        right: auto;
        bottom: auto;
        display: block;
      }

      .profile-card__tags {
        margin-top: 18px;
      }

      .profile-card__bio {
        margin: 16px 0 0;
        font-size: 14px;
        line-height: 1.45;
        font-weight: 500;
      }

      .profile-card__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-top: 20px;
      }

      .profile-card__socials {
        display: flex;
        gap: 8px;
      }

      .profile-card__cta {
        --nb-button-bg: #ffd24a;
      }

      .profile-card__cta-arrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--nb-foreground);
        color: var(--nb-paper, #fff8ec);
        margin-left: 8px;
      }

      .profile-card__cta-arrow :where(svg) {
        width: 12px !important;
        height: 12px !important;
      }

      @container (max-width: 360px) {
        .profile-card__top {
          grid-template-columns: 1fr;
        }
        .profile-card__portrait {
          width: 100%;
          height: 200px;
        }
        .profile-card__actions {
          flex-direction: column;
          align-items: stretch;
        }
        .profile-card__cta {
          width: 100%;
          justify-content: center;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProfileCard {}
