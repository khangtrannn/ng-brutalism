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
  NbSeparator,
  NbStat,
  NbStatusDot,
  NbSticker,
  NbTile,
} from '@ng-brutalism/ui';

import {
  EsportsArrowIcon,
  EsportsBookmarkIcon,
  EsportsCoinIcon,
  EsportsCrownIcon,
  EsportsGamepadIcon,
  EsportsGlobeIcon,
  EsportsTrophyArt,
  EsportsUsersIcon,
} from './esports-card.icons';

@Component({
  selector: 'recipe-esports-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbChip,
    NbChipGroup,
    NbDisplay,
    NbHalftone,
    NbIconButton,
    NbMedia,
    NbSeparator,
    NbStat,
    NbStatusDot,
    NbSticker,
    NbTile,
    EsportsArrowIcon,
    EsportsBookmarkIcon,
    EsportsCoinIcon,
    EsportsCrownIcon,
    EsportsGamepadIcon,
    EsportsGlobeIcon,
    EsportsTrophyArt,
    EsportsUsersIcon,
  ],
  template: `
    <article class="esports-card">
      <nb-sticker class="esports-card__sticker" shape="burst" tone="mint" [rotate]="-8">
        LIVE FINALS!
      </nb-sticker>

      <div class="esports-card__grid">
        <section class="esports-card__main">
          <header class="esports-card__header">
            <span nbChip tone="lavender">
              <recipe-esports-gamepad-icon />
              PIXEL CLASH
            </span>
            <span class="esports-card__dots" aria-hidden="true">⋯</span>
          </header>

          <h1 nbDisplay size="lg" class="esports-card__title">
            INDIE<br />CUP
          </h1>

          <p class="esports-card__desc">
            Where indie teams rise.<br />Only one will pixelate the rest.
          </p>

          <div nbChipGroup class="esports-card__chips">
            <span nbChip>
              <recipe-esports-globe-icon />
              ONLINE
            </span>
            <span nbChip tone="yellow">
              <recipe-esports-users-icon />
              3V3
            </span>
            <span nbChip tone="pink">
              <span nbStatusDot state="live" aria-hidden="true"></span>
              LIVE
            </span>
          </div>

          <div class="esports-card__prize">
            <nb-stat value="$2,500" label="Total Prize Pool" direction="row" class="esports-card__prize-stat">
              <span slot="icon" class="esports-card__prize-coin">
                <recipe-esports-coin-icon />
              </span>
            </nb-stat>
          </div>
        </section>

        <section class="esports-card__side">
          <nb-media class="esports-card__art">
            <recipe-esports-trophy-art />
          </nb-media>

          <div class="esports-card__teams">
            <h3 class="esports-card__teams-label">TOP 4 TEAMS</h3>
            <hr nbSeparator />
            <div class="esports-card__teams-list">
              <nb-tile class="esports-card__team">
                <span slot="icon" class="esports-card__team-icon" style="color:#ff5d8f">
                  <recipe-esports-crown-icon />
                </span>
                <span slot="title">PIXEL PUNKS</span>
              </nb-tile>
              <nb-tile class="esports-card__team">
                <span slot="icon" class="esports-card__team-icon" style="color:#b8a4ff">
                  <recipe-esports-crown-icon />
                </span>
                <span slot="title">BYTE BRIGADE</span>
              </nb-tile>
              <nb-tile class="esports-card__team">
                <span slot="icon" class="esports-card__team-icon" style="color:#7bd96e">
                  <recipe-esports-crown-icon />
                </span>
                <span slot="title">8BIT HEROES</span>
              </nb-tile>
              <nb-tile class="esports-card__team">
                <span slot="icon" class="esports-card__team-icon" style="color:#ffd24a">
                  <recipe-esports-crown-icon />
                </span>
                <span slot="title">LO-FI LEGENDS</span>
              </nb-tile>
            </div>
          </div>
        </section>
      </div>

      <footer class="esports-card__footer">
        <button nbButton type="button" class="esports-card__cta">
          JOIN MATCH
          <span nbButtonTrailingIcon>
            <recipe-esports-arrow-icon />
          </span>
        </button>
        <button nbIconButton type="button" size="sm" aria-label="Save event">
          <recipe-esports-bookmark-icon />
        </button>
      </footer>

      <nb-halftone position="bottom-left" [rows]="5" [cols]="5" [size]="4" [gap]="4" />
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        width: min(100%, 560px);
        container-type: inline-size;
      }

      .esports-card {
        position: relative;
        padding: 22px;
        border: 3px solid var(--nb-border);
        border-radius: 20px;
        background: var(--nb-paper, #fff8ec);
        box-shadow: 8px 10px 0 0 var(--nb-shadow);
        color: var(--nb-foreground);
      }

      .esports-card__sticker {
        position: absolute;
        top: -16px;
        right: -10px;
        z-index: 2;
        width: 84px;
        height: 84px;
        font-size: 10px;
      }

      .esports-card__grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
      }

      .esports-card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 8px;
      }

      .esports-card__dots {
        font-size: 22px;
        font-weight: 900;
        letter-spacing: 2px;
        opacity: 0.5;
      }

      .esports-card__title {
        margin: 4px 0 12px;
        font-size: clamp(34px, 7cqw, 48px);
        line-height: 0.9;
        letter-spacing: -0.02em;
      }

      .esports-card__desc {
        margin: 0 0 14px;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.4;
      }

      .esports-card__chips {
        margin-bottom: 14px;
      }

      .esports-card__chips [nbChip] {
        font-size: 11px;
        padding: 4px 8px;
      }

      .esports-card__prize {
        padding: 12px 16px;
        border: 2.5px solid var(--nb-border);
        border-radius: 12px;
        background: #ffd24a;
        box-shadow: 3px 3px 0 0 var(--nb-shadow);
      }

      .esports-card__prize-stat {
        --nb-stat-value-size: 1.5rem;
        --nb-stat-label-size: 0.55rem;
      }

      .esports-card__prize-coin {
        font-size: 22px;
      }

      .esports-card__side {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .esports-card__art {
        display: block;
        width: 100%;
        height: 110px;
        padding: 0;
        background: #ff7eb6;
        overflow: hidden;
      }

      .esports-card__art recipe-esports-trophy-art {
        width: 100%;
        height: 100%;
      }

      .esports-card__teams {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px 12px;
        border: 2.5px solid var(--nb-border);
        border-radius: 14px;
        background: var(--nb-surface);
        box-shadow: 3px 3px 0 0 var(--nb-shadow);
      }

      .esports-card__teams-label {
        margin: 0;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 0.1em;
        opacity: 0.7;
      }

      .esports-card__teams-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .esports-card__team {
        --nb-tile-shadow: 1px 1px 0 var(--nb-shadow);
        padding: 6px 10px;
      }

      .esports-card__team [slot=title] {
        font-size: 11px !important;
        font-weight: 900;
      }

      .esports-card__team-icon {
        font-size: 14px;
      }

      .esports-card__footer {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 18px;
      }

      .esports-card__cta {
        flex: 1;
        --nb-button-bg: #7bd96e;
        justify-content: center;
        font-size: 14px;
      }

      @container (max-width: 460px) {
        .esports-card__grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EsportsCardRecipe {}
