import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbCard,
  NbCardContent,
  NbCardDescription,
  NbCardFooter,
  NbCardHeader,
  NbCardTitle,
  NbTitle,
} from '@ng-brutalism/ui';

@Component({
  selector: 'docs-job-listing-card-example',
  standalone: true,
  imports: [
    NbButton,
    NbCard,
    NbCardContent,
    NbCardDescription,
    NbCardFooter,
    NbCardHeader,
    NbCardTitle,
    NbTitle,
  ],
  template: `
    <div class="job-card-demo" role="group" aria-label="Job posting">
      <nb-card class="job-card-shell">
        <nb-card-header class="job-card-section">
          <div class="job-card-header">
            <div class="job-card-logo" aria-hidden="true">
              <!-- Previous implementation, kept for reference:
              <span>n.</span>
              -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 113.1845 121.4197"
              >
                <g fill="currentColor">
                  <circle cx="56.5904" cy="15.4347" r="15.4347" />
                  <circle cx="15.4345" cy="37.0428" r="15.4347" />
                  <circle cx="97.7498" cy="37.0436" r="15.4347" />
                  <circle cx="56.5904" cy="60.7108" r="15.4347" />
                  <circle cx="15.4346" cy="84.3761" r="15.4347" />
                  <circle cx="97.7498" cy="84.3753" r="15.4347" />
                  <circle cx="56.5904" cy="105.985" r="15.4347" />
                </g>
              </svg>
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
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path
                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                  />
                </svg>
                Remote
              </button>
              <button
                nbButton
                type="button"
                size="sm"
                shadow="none"
                style="--nb-button-bg: var(--job-pill-purple-bg)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                Full-time
              </button>
              <button
                nbButton
                type="button"
                size="sm"
                shadow="none"
                style="--nb-button-bg: var(--job-pill-yellow-bg)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <line x1="12" y1="6" x2="12" y2="8" />
                  <line x1="12" y1="16" x2="12" y2="18" />
                </svg>
                Negotiable
              </button>
              <button
                nbButton
                type="button"
                size="sm"
                shadow="none"
                style="--nb-button-bg: var(--job-pill-blue-bg)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="6" y1="20" x2="6" y2="14" />
                  <line x1="12" y1="20" x2="12" y2="10" />
                  <line x1="18" y1="20" x2="18" y2="6" />
                </svg>
                5+ years
              </button>
              <button
                nbButton
                type="button"
                size="sm"
                shadow="none"
                style="--nb-button-bg: var(--job-pill-pink-bg)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#1a1a1a"
                  stroke="#1a1a1a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Urgent
              </button>
            </div>

            <p class="job-card-tagline">
              Build delightful UI systems and scalable web experiences.
            </p>

            <div class="job-card-highlights">
              <div class="job-card-star" aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  />
                </svg>
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Ho Chi Minh City / Remote
              </div>
              <div class="job-card-meta-row">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Posted 2 days ago
              </div>
            </div>

            <div class="job-card-actions">
              <button
                nbButton
                type="button"
                variant="neutral"
                style="--nb-button-bg: #fff"
                aria-label="Apply"
              >
                Apply
              </button>
              <button
                nbButton
                type="button"
                variant="neutral"
                style="--nb-button-bg: #fff"
              >
                Save
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
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

      .job-card-logo svg {
        width: clamp(24px, 5.6cqw, 28px);
        height: auto;
        display: block;
      }

      /* Previous implementation, kept for reference:
      .job-card-logo {
        font-family: 'Caveat', 'Patrick Hand', 'Bradley Hand', 'Segoe Print',
          cursive;
        font-size: clamp(28px, 6.4cqw, 32px);
        font-style: italic;
        font-weight: 500;
        line-height: 1;
      }

      .job-card-logo span {
        transform: translateY(-2px);
      }
      */

      .job-card-title-block {
        min-width: 0;
        padding-top: 2px;
      }

      .job-card-title {
        display: block;
        color: var(--job-ink);
        font-family: 'Patrick Hand', 'Comic Sans MS', 'Bradley Hand',
          'Segoe Print', cursive;
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
        font-family: 'Patrick Hand', 'Comic Sans MS', 'Bradley Hand',
          'Segoe Print', cursive;
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
        font-family: 'Patrick Hand', 'Comic Sans MS', 'Bradley Hand',
          'Segoe Print', cursive;
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

      .job-card-star svg {
        width: 24px;
        height: 24px;
      }

      .job-card-highlights-label {
        color: var(--job-ink);
        font-family: 'Patrick Hand', 'Comic Sans MS', 'Bradley Hand',
          'Segoe Print', cursive;
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
        font-family: 'Patrick Hand', 'Comic Sans MS', 'Bradley Hand',
          'Segoe Print', cursive;
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
        font-family: 'Patrick Hand', 'Comic Sans MS', 'Bradley Hand',
          'Segoe Print', cursive;
        font-size: clamp(15px, 3.5cqw, 18px);
      }

      .job-card-meta-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .job-card-meta-row svg {
        width: 16px;
        height: 16px;
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
