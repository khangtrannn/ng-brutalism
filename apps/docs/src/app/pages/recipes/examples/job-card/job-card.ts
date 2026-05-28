import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbCard,
  NbCardActions,
  NbCardContent,
  NbCardDescription,
  NbCardHeader,
  NbCardTitle,
  NbChip,
  NbChipGroup,
  NbDisplay,
  NbIconButton,
  NbHalftone,
  NbSeparator,
  NbStatusDot,
  NbSticker,
} from '@ng-brutalism/ui';

import {
  JobAvatar,
  JobArrowIcon,
  JobBoltIcon,
  JobBookmarkIcon,
  JobBriefcaseIcon,
  JobCashIcon,
  JobLogo,
  JobPinIcon,
} from './job-card.icons';

@Component({
  selector: 'recipe-job-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbChip,
    NbChipGroup,
    NbDisplay,
    NbIconButton,
    NbHalftone,
    NbStatusDot,
    NbSticker,
    JobAvatar,
    JobArrowIcon,
    JobBoltIcon,
    JobBookmarkIcon,
    JobBriefcaseIcon,
    JobCashIcon,
    JobLogo,
    JobPinIcon,
    NbCard,
    NbCardHeader,
    NbCardTitle,
    NbCardDescription,
    NbCardContent,
    NbCardActions,
    NbSeparator,
  ],
  template: `
    <nb-card class="job-card">
      <nb-sticker class="job-card__sticker" shape="burst" tone="mint" [rotate]="8">
        NEW<br />JOB!
      </nb-sticker>
      <span class="job-card__spark" aria-hidden="true"></span>
      <span class="job-card__lines" aria-hidden="true"></span>
      <span class="job-card__plane" aria-hidden="true"></span>
      <span class="job-card__trail" aria-hidden="true"></span>
      <nb-halftone
        class="job-card__halftone"
        position="bottom-right"
        [rows]="6"
        [cols]="7"
        [size]="4"
        [gap]="5"
      />

      <nb-card-header>
        <div class="job-card__topbar">
          <span nbChip class="job-card__jobs">JOBS</span>
          <span class="job-card__dots" aria-hidden="true">...</span>
        </div>

        <div class="job-card__company">
          <span class="job-card__logo">
            <recipe-job-logo />
          </span>
          <div class="job-card__company-copy">
            <span>Nebula Labs</span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <nb-card-title>
          <h2 nbDisplay class="uppercase">SENIOR<br />ANGULAR<br />ENGINEER</h2>
        </nb-card-title>
        <nb-card-description>
          <div nbChipGroup class="job-card__chips">
            <span nbChip class="job-card__chip job-card__chip--remote">
              <recipe-job-pin-icon />
              REMOTE
            </span>
            <span nbChip class="job-card__chip job-card__chip--time">
              <recipe-job-briefcase-icon />
              FULL-TIME
            </span>
            <span nbChip class="job-card__chip job-card__chip--urgent">
              <recipe-job-bolt-icon />
              URGENT
            </span>
          </div>
        </nb-card-description>
      </nb-card-header>
      <nb-card-content>
        <div class="job-card__body flex flex-col gap-4">
          <span
            nbChip
            tone="yellow"
            class="job-card__salary"
            aria-label="Salary range $95K to $130K"
          >
            <recipe-job-cash-icon />
            $95K - $130K
          </span>

          Build accessible UI primitives for modern web apps.
        </div>
      </nb-card-content>

      <nb-card-actions align="end">
        <hr nbSeparator class="job-card__separator" />

        <div class="job-card__footer">
          <div class="job-card__person">
            <div class="job-card__avatar" aria-hidden="true">
              <recipe-job-avatar />
            </div>
            <div class="job-card__person-meta">
              <span class="job-card__person-name">Alex Kim</span>
              <span class="job-card__person-role">Hiring Manager</span>
              <span class="job-card__person-status">
                <span nbStatusDot state="online" aria-hidden="true"></span>
                ONLINE
              </span>
            </div>
          </div>

          <div class="job-card__actions">
            <button nbButton type="button" class="job-card__cta">
              APPLY NOW
              <span nbButtonTrailingIcon class="job-card__cta-icon">
                <recipe-job-arrow-icon />
              </span>
            </button>
            <button
              nbIconButton
              type="button"
              class="job-card__save"
              aria-label="Save job"
            >
              <recipe-job-bookmark-icon />
            </button>
          </div>
        </div>
      </nb-card-actions>
    </nb-card>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .job-card {
        --nb-card-radius: 18px;
        --nb-card-padding: 24px;
        --nb-card-shadow: 6px 7px 0 0 var(--nb-shadow);
        container-type: inline-size;
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        max-width: 716px;
        box-sizing: border-box;
      }

      nb-card-header {
        position: relative;
        gap: 22px;
        padding-top: 28px;
      }

      .job-card__topbar {
        display: flex;
        align-items: center;
        gap: 24px;
        min-height: 44px;
      }

      .job-card__jobs {
        min-width: 104px;
        justify-content: center;
        padding: 10px 22px;
        font-size: 21px;
        font-weight: 1000;
        --nb-chip-bg: #b995ff;
        --nb-chip-radius: 4px;
        --nb-chip-shadow: 3px 3px 0 0 var(--nb-shadow);
      }

      .job-card__dots {
        margin-top: -8px;
        font-size: 40px;
        line-height: 1;
        font-weight: 1000;
        letter-spacing: 3px;
      }

      .job-card__company {
        display: flex;
        align-items: center;
        gap: 26px;
      }

      .job-card__logo {
        display: inline-flex;
        width: 94px;
        height: 94px;
        align-items: center;
        justify-content: center;
        border: 3px solid var(--nb-border);
        border-radius: 8px;
        background: #050505;
        color: #ff5ab3;
        font-size: 58px;
      }

      .job-card__company-copy {
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-size: 36px;
        line-height: 1;
        font-weight: 1000;
      }

      .job-card__company-copy span:last-child {
        width: 92px;
        height: 8px;
        border-radius: 99px;
        background: #ff70bd;
      }

      nb-card-title h2 {
        font-size: 64px;
        line-height: 0.92;
        letter-spacing: 0;
      }

      .job-card__chips {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 22px;
      }

      .job-card__chip {
        justify-content: center;
        min-height: 46px;
        padding: 10px 14px;
        gap: 10px;
        font-size: 18px;
        line-height: 1;
        font-weight: 1000;
        white-space: nowrap;
        --nb-chip-radius: 8px;
        --nb-chip-shadow: none;
        --nb-chip-icon-size: 21px;
      }

      .job-card__chip--remote {
        --nb-chip-bg: #d8f5e7;
      }

      .job-card__chip--time {
        --nb-chip-bg: #d9c9ff;
      }

      .job-card__chip--urgent {
        --nb-chip-bg: #ff9bcb;
      }

      .job-card__body {
        position: relative;
        padding-inline: var(--nb-card-padding);
        padding-top: 26px;
        padding-bottom: 20px;
      }

      .job-card__salary {
        width: 314px;
        max-width: 100%;
        box-sizing: border-box;
        gap: 16px;
        padding: 14px 18px;
        font-size: 24px;
        line-height: 1;
        font-weight: 1000;
        --nb-chip-radius: 8px;
        --nb-chip-shadow: 6px 6px 0 0 var(--nb-shadow);
        --nb-chip-icon-size: 48px;
      }

      .job-card__body {
        font-size: 22px;
        line-height: 1.25;
        font-weight: 700;
      }

      .job-card__separator {
        flex-basis: 100%;
        margin-block: 0 20px;
      }

      .job-card__footer {
        display: grid;
        grid-template-columns: minmax(214px, 1fr) minmax(0, 388px);
        align-items: center;
        gap: 18px;
        width: 100%;
      }

      .job-card__person {
        display: flex;
        align-items: center;
        gap: 16px;
        min-width: 0;
      }

      .job-card__avatar {
        width: 74px;
        height: 74px;
        flex: 0 0 auto;
        border: 3px solid var(--nb-border);
        border-radius: 999px;
        background: #b995ff;
        overflow: hidden;
      }

      .job-card__avatar recipe-job-avatar {
        width: 100% !important;
        height: 100% !important;
      }

      .job-card__person-meta {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3px;
        line-height: 1.1;
        text-align: left;
      }

      .job-card__person-name {
        font-size: 22px;
        font-weight: 1000;
        white-space: nowrap;
      }

      .job-card__person-role {
        color: color-mix(in srgb, var(--nb-foreground) 68%, transparent);
        font-size: 18px;
        font-weight: 500;
        line-height: 1;
      }

      .job-card__person-status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 6px;
        font-size: 14px;
        font-weight: 900;
        --nb-status-dot-size: 14px;
      }

      .job-card__actions {
        display: grid;
        grid-template-columns: minmax(0, 294px) 76px;
        align-items: stretch;
        justify-content: end;
        gap: 18px;
        min-width: 0;
      }

      .job-card__cta {
        --nb-button-bg: #b995ff;
        --nb-button-fg: #050505;
        --nb-button-radius: 12px;
        --nb-button-shadow: 7px 8px 0 0 var(--nb-shadow);
        width: 100%;
        min-height: 82px;
        padding-inline: 32px 14px;
        gap: 14px;
        font-size: 24px;
        font-weight: 1000;
      }

      .job-card__cta-icon {
        display: inline-flex;
        width: 44px;
        height: 44px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #050505;
        color: #fff;
      }

      .job-card__cta-icon recipe-job-arrow-icon {
        font-size: 24px;
      }

      .job-card__save {
        --nb-icon-button-bg: var(--nb-background);
        --nb-icon-button-fg: var(--nb-foreground);
        width: 76px;
        height: auto;
        min-height: 82px;
        border-radius: 12px;
        box-shadow: 7px 8px 0 0 var(--nb-shadow);
      }

      .job-card__save recipe-job-bookmark-icon {
        font-size: 40px;
      }

      .job-card__sticker {
        position: absolute;
        top: 10px;
        right: 20px;
        z-index: 2;
        width: 134px;
        min-height: 110px;
        padding: 18px 20px;
        font-size: 27px;
        line-height: 0.95;
        text-align: center;
      }

      .job-card__spark {
        position: absolute;
        top: 178px;
        right: 90px;
        width: 54px;
        height: 54px;
        z-index: 1;
        background: #6fb7ff;
        clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
        filter: drop-shadow(2px 2px 0 #050505);
      }

      .job-card__lines {
        position: absolute;
        top: 250px;
        right: 64px;
        width: 58px;
        height: 48px;
        background:
          linear-gradient(118deg, transparent 0 46%, #050505 48% 53%, transparent 55%) 0 0 / 34px 28px no-repeat,
          linear-gradient(100deg, transparent 0 45%, #050505 48% 54%, transparent 57%) 20px 22px / 34px 22px no-repeat,
          linear-gradient(0deg, transparent 0 45%, #050505 48% 54%, transparent 57%) 36px 40px / 32px 10px no-repeat;
      }

      .job-card__plane {
        position: absolute;
        right: 122px;
        bottom: 250px;
        width: 38px;
        height: 38px;
        z-index: 1;
        background: #ff70bd;
        clip-path: polygon(11% 8%, 94% 50%, 54% 62%, 38% 95%);
        filter: drop-shadow(2px 2px 0 #050505);
        transform: rotate(-12deg);
      }

      .job-card__trail {
        position: absolute;
        right: 184px;
        bottom: 226px;
        width: 128px;
        height: 78px;
        border-top: 4px dashed #050505;
        border-radius: 50%;
        transform: rotate(7deg);
      }

      .job-card__halftone {
        position: absolute;
        right: 34px;
        bottom: 152px;
        width: 126px;
        height: 90px;
        opacity: 1;
        --nb-halftone-color: #050505;
      }

      @container (max-width: 620px) {
        .job-card {
          --nb-card-padding: 24px;
        }

        nb-card-header {
          gap: 18px;
          padding-top: 24px;
        }

        .job-card__topbar {
          gap: 18px;
          min-height: 36px;
        }

        .job-card__jobs {
          min-width: 92px;
          padding: 8px 18px;
          font-size: 18px;
        }

        .job-card__dots {
          font-size: 31px;
        }

        .job-card__company {
          gap: 18px;
        }

        .job-card__logo {
          width: 68px;
          height: 68px;
          font-size: 42px;
        }

        .job-card__company-copy {
          gap: 8px;
          font-size: 25px;
        }

        nb-card-title h2 {
          font-size: 42px;
        }

        .job-card__chips {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 9px;
        }

        .job-card__chip {
          justify-content: center;
          min-height: 36px;
          padding: 8px 6px;
          gap: 4px;
          font-size: 12px;
          --nb-chip-icon-size: 16px;
        }

        .job-card__body {
          padding-top: 20px;
          font-size: 18px;
        }

        .job-card__salary {
          width: 100%;
          gap: 12px;
          padding-inline: 16px;
          font-size: 20px;
          --nb-chip-icon-size: 42px;
        }

        .job-card__footer {
          grid-template-columns: minmax(0, 128px) minmax(0, 1fr);
          align-items: center;
          gap: 10px;
        }

        .job-card__person {
          gap: 8px;
        }

        .job-card__actions {
          gap: 8px;
          grid-template-columns: minmax(0, 1fr) 42px;
        }

        .job-card__cta {
          min-height: 58px;
          padding-inline: 10px 6px;
          gap: 6px;
          font-size: 14px;
          --nb-button-shadow: 5px 6px 0 0 var(--nb-shadow);
        }

        .job-card__cta-icon {
          width: 32px;
          height: 32px;
        }

        .job-card__save {
          width: 42px;
          min-height: 58px;
          box-shadow: 5px 6px 0 0 var(--nb-shadow);
        }

        .job-card__avatar {
          width: 54px;
          height: 54px;
        }

        .job-card__person-name {
          font-size: 16px;
        }

        .job-card__person-role {
          font-size: 13px;
        }

        .job-card__person-status {
          gap: 5px;
          margin-top: 4px;
          font-size: 11px;
          --nb-status-dot-size: 11px;
        }

        .job-card__save recipe-job-bookmark-icon {
          font-size: 30px;
        }

        .job-card__sticker {
          top: 16px;
          right: 12px;
          width: 92px;
          min-height: 78px;
          padding: 14px;
          font-size: 20px;
        }

        .job-card__spark,
        .job-card__lines,
        .job-card__plane,
        .job-card__trail,
        .job-card__halftone {
          display: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class JobCardRecipe {}
