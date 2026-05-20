import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCard,
  NbCardActions,
  NbCardContent,
  NbCardDescription,
  NbCardFooter,
  NbCardHeader,
  NbCardTitle,
  NbTitle,
} from '@ng-brutalism/ui';

import {
  JobCardBookmarkIcon,
  JobCardBriefcaseIcon,
  JobCardClockIcon,
  JobCardExperienceIcon,
  JobCardHeartIcon,
  JobCardLocationIcon,
  JobCardLogoIcon,
  JobCardRemoteIcon,
  JobCardSalaryIcon,
  JobCardStarIcon,
  JobCardUrgentIcon,
} from './job-listing-card.icons';

@Component({
  selector: 'docs-job-listing-card-example',
  imports: [
    NbButton,
    NbCard,
    NbCardActions,
    NbCardContent,
    NbCardDescription,
    NbCardFooter,
    NbCardHeader,
    NbCardTitle,
    NbTitle,
    JobCardBookmarkIcon,
    JobCardBriefcaseIcon,
    JobCardClockIcon,
    JobCardExperienceIcon,
    JobCardHeartIcon,
    JobCardLocationIcon,
    JobCardLogoIcon,
    JobCardRemoteIcon,
    JobCardSalaryIcon,
    JobCardStarIcon,
    JobCardUrgentIcon,
  ],
  template: `
    <div class="job-card-demo" role="group" aria-label="Job posting">
      <nb-card class="job-card-shell">
        <nb-card-header class="job-card-section">
          <div class="job-card-header">
            <div class="job-card-logo" aria-hidden="true">
              <docs-job-card-logo-icon />
            </div>

            <div class="job-card-title-block">
              <nb-card-title class="job-card-title">
                Senior Frontend<br />
                <span nbTitle>Engineer</span>
              </nb-card-title>
              <nb-card-description class="job-card-subtitle">
                Inspectorio
              </nb-card-description>
            </div>

            <div class="job-card-action">
              <button
                nbButton
                type="button"
                size="icon"
                shadow="none"
                style="--nb-button-bg: #fff"
                aria-label="Save to favorites"
              >
                <docs-job-card-heart-icon />
              </button>
            </div>
          </div>
        </nb-card-header>

        <nb-card-content class="job-card-section">
          <div class="job-card-content">
            <div class="job-card-pills">
              <button
                nbButton
                type="button"
                size="sm"
                shadow="none"
                style="--nb-button-bg: var(--job-pill-green-bg)"
              >
                <docs-job-card-remote-icon />
                Remote
              </button>
              <button
                nbButton
                type="button"
                size="sm"
                shadow="none"
                style="--nb-button-bg: var(--job-pill-purple-bg)"
              >
                <docs-job-card-briefcase-icon />
                Full-time
              </button>
              <button
                nbButton
                type="button"
                size="sm"
                shadow="none"
                style="--nb-button-bg: var(--job-pill-yellow-bg)"
              >
                <docs-job-card-salary-icon />
                Negotiable
              </button>
              <button
                nbButton
                type="button"
                size="sm"
                shadow="none"
                style="--nb-button-bg: var(--job-pill-blue-bg)"
              >
                <docs-job-card-experience-icon />
                5+ years
              </button>
              <button
                nbButton
                type="button"
                size="sm"
                shadow="none"
                style="--nb-button-bg: var(--job-pill-pink-bg)"
              >
                <docs-job-card-urgent-icon />
                Urgent
              </button>
            </div>

            <p class="job-card-tagline">
              Build delightful UI systems and scalable web experiences.
            </p>

            <div class="job-card-highlights">
              <div class="job-card-star" aria-hidden="true">
                <docs-job-card-star-icon />
              </div>
              <span class="job-card-highlights-label">Highlights</span>
              <div class="job-card-highlights-items">
                <span class="job-card-highlight-item"
                  >Angular +<br />TypeScript</span
                >
                <span class="job-card-highlight-item">Design<br />system</span>
                <span class="job-card-highlight-item"
                  >International<br />team</span
                >
              </div>
            </div>
          </div>
        </nb-card-content>

        <nb-card-footer class="job-card-section">
          <div class="job-card-footer">
            <div class="job-card-meta">
              <div class="job-card-meta-row">
                <docs-job-card-location-icon />
                Ho Chi Minh City / Remote
              </div>
              <div class="job-card-meta-row">
                <docs-job-card-clock-icon />
                Posted 2 days ago
              </div>
            </div>

            <nb-card-actions class="job-card-actions" align="end">
              <button nbButton type="button" aria-label="Apply">Apply</button>
              <button nbButton type="button" variant="primary">
                Save
                <docs-job-card-bookmark-icon />
              </button>
            </nb-card-actions>
          </div>
        </nb-card-footer>
      </nb-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: min(100%, 480px);
        container-type: inline-size;
        zoom: 0.9;
      }

      .job-card-demo {
        --job-ink: #1a1a1a;
        --job-paper: #ffffff;
        --job-accent-purple: #8b5cf6;
        --job-inspectorio-blue: #0e47df;
        --job-inspectorio-ink: #232323;
        --job-tile-purple: #e6d6fb;
        --job-pill-green-bg: #d4f5dc;
        --job-pill-purple-bg: #ead9fb;
        --job-pill-yellow-bg: #fdf5b8;
        --job-pill-blue-bg: #d6e8fb;
        --job-pill-pink-bg: #fbd9d9;
        --job-highlights-bg: #fdf3c4;
        --job-highlights-star: #f7c531;
        --job-shadow: #1a1a1a;

        position: relative;
        width: 100%;
        gap: 0;
        padding: clamp(18px, 4.8cqw, 24px);
        border: 3px solid var(--job-ink);
        border-radius: 18px;
        background: var(--job-paper);
        box-shadow: 8px 10px 0 0 var(--job-shadow);
        color: var(--job-ink);
        font-family: 'Patrick Hand', 'Comic Sans MS', 'Bradley Hand',
          'Segoe Print', cursive;
      }

      .job-card-shell {
        display: block;
        gap: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        color: inherit;
        font: inherit;
      }

      .job-card-demo .job-card-section {
        display: block;
        padding: 0;
      }

      .job-card-header {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: clamp(12px, 3cqw, 16px);
        align-items: flex-start;
        padding: 0;
      }

      .job-card-logo {
        display: flex;
        width: clamp(50px, 11.2cqw, 56px);
        height: clamp(50px, 11.2cqw, 56px);
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        border: 2.5px solid var(--job-ink);
        border-radius: 14px;
        background: var(--job-inspectorio-blue);
        box-shadow: 4px 5px 0 0 var(--job-shadow);
        color: var(--job-paper);
      }

      .job-card-logo docs-job-card-logo-icon {
        --job-card-icon-size: clamp(24px, 5.6cqw, 28px);
      }

      .job-card-action docs-job-card-heart-icon {
        --job-card-icon-size: 22px;
      }

      .job-card-pills docs-job-card-remote-icon,
      .job-card-pills docs-job-card-briefcase-icon,
      .job-card-pills docs-job-card-salary-icon,
      .job-card-pills docs-job-card-experience-icon,
      .job-card-pills docs-job-card-urgent-icon {
        --job-card-icon-size: 18px;
      }

      .job-card-title-block {
        min-width: 0;
        padding-top: 2px;
      }

      .job-card-title {
        display: block;
        color: var(--job-ink);
        font-size: clamp(32px, 7.4cqw, 37px);
        font-weight: 400;
        letter-spacing: 0;
        line-height: 0.98;
      }

      .job-card-title span {
        position: relative;
        display: inline-block;
        --nb-title-wave-color: var(--job-inspectorio-blue);
      }

      .job-card-subtitle {
        display: block;
        margin-top: 12px;
        padding-left: 2px;
        color: var(--job-ink);
        font-size: clamp(20px, 4.6cqw, 23px);
        font-weight: 400;
        line-height: 1;
      }

      .job-card-action {
        align-self: start;
        justify-self: end;
      }

      .job-card-content {
        padding: 0;
      }

      .job-card-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 10px 12px;
        margin-top: clamp(22px, 5cqw, 26px);
      }

      .job-card-tagline {
        margin-top: 22px;
        color: var(--job-ink);
        font-size: clamp(18px, 4cqw, 21px);
        line-height: 1.25;
      }

      .job-card-highlights {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 12px 14px;
        margin-top: 18px;
        padding: 14px 16px;
        border: 2.5px solid var(--job-ink);
        border-radius: 15px;
        background: var(--job-highlights-bg);
        box-shadow: 4px 5px 0 0 var(--job-shadow);
        overflow: hidden;
      }

      .job-card-star {
        display: flex;
        width: 44px;
        height: 44px;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        border: 2.5px solid var(--job-ink);
        border-radius: 50%;
        background: var(--job-highlights-star);
      }

      .job-card-star docs-job-card-star-icon {
        --job-card-icon-size: 24px;
      }

      .job-card-highlights-label {
        color: var(--job-ink);
        font-size: clamp(20px, 4.4cqw, 23px);
        line-height: 1;
      }

      .job-card-highlights-items {
        display: flex;
        grid-column: 1 / -1;
        align-items: center;
        justify-content: space-between;
        min-width: 0;
      }

      .job-card-highlight-item {
        display: flex;
        align-items: flex-start;
        gap: 7px;
        padding: 0 10px;
        border-left: 1.5px solid rgba(26, 26, 26, 0.25);
        color: var(--job-ink);
        font-size: clamp(15px, 3.3cqw, 17px);
        line-height: 1.1;
      }

      .job-card-highlight-item:first-child {
        border-left: 0;
        padding-left: 4px;
      }

      .job-card-highlight-item::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 12px;
        flex-shrink: 0;
        margin-top: 4px;
        border-radius: 8px;
        background: var(--job-inspectorio-blue);
      }

      .job-card-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-top: 24px;
        padding: 14px 0 0;
        border-top: 2.5px dashed var(--job-ink);
      }

      .job-card-meta {
        display: flex;
        flex-direction: column;
        gap: 5px;
        color: var(--job-ink);
        font-size: clamp(15px, 3.5cqw, 18px);
      }

      .job-card-meta-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .job-card-meta-row docs-job-card-location-icon,
      .job-card-meta-row docs-job-card-clock-icon {
        --job-card-icon-size: 16px;
      }

      .job-card-actions docs-job-card-bookmark-icon {
        --job-card-icon-size: 20px;
      }

      .job-card-actions {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      @container (max-width: 430px) {
        .job-card-highlights {
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .job-card-highlights-items {
          flex-wrap: wrap;
          gap: 14px 0;
          width: 100%;
          flex-basis: 100%;
        }

        .job-card-actions {
          width: 100%;
          flex-wrap: wrap;
        }
      }

      @container (max-width: 460px) {
        .job-card-header {
          grid-template-columns: auto 1fr;
        }

        .job-card-action {
          grid-column: 2;
          grid-row: 1;
        }

        .job-card-title-block {
          grid-column: 1 / -1;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class JobListingCardExampleComponent {}
